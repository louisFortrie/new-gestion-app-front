import { styled, YStack, Text, XStack, Label, Stack, Spinner, Switch } from 'tamagui'
import {
  CustomInput,
  BusinessHoursEditor,
  CustomButton,
  SpecialBusinessHoursEditor,
  SearchSelect,
  useToastController,
} from '@my/ui'
import { Check } from '@tamagui/lucide-icons'
import useStores from 'app/hooks/useStores'
import { memo, useCallback, useEffect, useState } from 'react'
import axios from 'axios'

const MemoizedBusinessHoursEditor = memo(BusinessHoursEditor)

const StyledYstack = styled(YStack, {
  gap: '$2',
  padding: '$2',
  backgroundColor: 'white',
  borderRadius: '$4',
})

const Title = styled(Text, {
  color: '#0F172A',
  fontSize: 20,
  fontWeight: 500,
})

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const Manage = () => {
  const toast = useToastController()

  console.log('render manage')

  const [businessHours, setBusinessHours] = useState({
    periods: [],
  })
  const [specialHours, setSpecialHours] = useState<any>({
    specialHourPeriods: [],
  })
  const [newStoreInfo, setNewStoreInfo] = useState({
    title: '',
    medias: [],
    storefrontAddress: {
      addressLines: [''],
      locality: '',
    },
    categories: {
      primaryCategory: {
        displayName: '',
      },
    },
    websiteUri: '',
    phoneNumbers: {
      primaryPhone: '',
    },
    profile: {
      description: '',
    },
  })

  const [isEditingSpecialHours, setIsEditingSpecialHours] = useState(false)

  const { selectedStore, stores, loading, setSelectedStore } = useStores()
  const [selectDefaultValue, setSelectDefaultValue] = useState('')
  useEffect(() => {
    if (loading) return
    setSelectDefaultValue(selectedStore?.title.toLowerCase())
  }, [loading])

  useEffect(() => {
    if (!selectedStore) return
    const { reviews, storeCode, ...storeInfo } = selectedStore
    setBusinessHours(selectedStore.regularHours)
    setSpecialHours(selectedStore.specialHours || { specialHourPeriods: [] })
    setNewStoreInfo(storeInfo)
    console.log('selectedStore use effect')
  }, [selectedStore])
  const [isEditingStoreInfo, setIsEditingStoreInfo] = useState(false)

  const handleIsEditingSpecialHours = useCallback((checked) => {
    setIsEditingSpecialHours(checked)
  }, [])

  const handleBusinessHoursChange = useCallback((businessHoursNew) => {
    const localSelectedStore = JSON.parse(localStorage.getItem('selectedStore')!)
    setBusinessHours(businessHoursNew)

    console.log('business hours changed', businessHoursNew)
    if (businessHoursNew === localSelectedStore.regularHours) {
      console.log('no change')

      setIsEditingStoreInfo(false)
    } else {
      console.log('change')

      setIsEditingStoreInfo(true)
    }
  }, [])

  if (businessHours.periods.length === 0) {
    return <Spinner size="large" color={'black'} />
  }

  const handleSaveModifications = () => {
    const { medias, phoneNumbers, ...newLocation } = newStoreInfo
    const phoneNumbersChanged =
      JSON.stringify(newStoreInfo.phoneNumbers) !== JSON.stringify(selectedStore.phoneNumbers)

    const updatedLocation = {
      ...newLocation,
      regularHours: businessHours,
      specialHours: specialHours,
      ...(phoneNumbersChanged && { phoneNumbers: newStoreInfo.phoneNumbers }), // Inclure phoneNumbers seulement s'ils ont changé
    }

    axios
      .put(
        `${apiUrl}/api/mybusiness/locations/${selectedStore?.name.split('/')[1]}`,
        {
          newLocation: updatedLocation,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log('res', res)
        setIsEditingStoreInfo(false)
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour des informations de l'établissement:", error)
        toast.show("Erreur lors de la mise à jour des informations de l'établissement", {
          type: 'error',
          message:
            "une erreur est survenue lors de la mise à jour des informations de l'établissement vérifiez votre connexion",
          customData: { theme: 'red' },
        })
      })
  }

  const handleSelectedStoreChange = (option: { label: string; value: string }) => {
    console.log(option, 'select store option')

    const selectedStore = stores.find((store) => store.title.toLowerCase() === option.value)
    console.log(selectedStore, 'selected store')

    setSelectedStore(selectedStore)
    localStorage.setItem('selectedStore', JSON.stringify(selectedStore))
  }

  return (
    <YStack gap={32}>
      <XStack f={1} justifyContent="space-between">
        <YStack>
          <Title>Gérer les informations des fiches d'établissement</Title>
          <Text color={'#535862'} fontSize={14}>
            Mettez à jour les informations de votre d'établissement et assurer leurs consistance
          </Text>
        </YStack>
        <SearchSelect
          options={stores.map((store) => ({
            label: store.title,
            value: store.title.toLowerCase(),
          }))}
          onSelect={handleSelectedStoreChange}
          selectedOption={{
            label: selectedStore?.title,
            value: selectedStore?.title.toLowerCase(),
          }}
          loading={loading}
        ></SearchSelect>
      </XStack>
      <StyledYstack padding={'$5'}>
        <XStack gap={64} f={1} justifyContent="center">
          <YStack justifyContent="center" gap={24}>
            <Label>Nom</Label>
            <Label>Adresse</Label>
            <Label>URL du site web</Label>

            <Label>Description</Label>
          </YStack>
          <YStack f={1} gap={24}>
            <CustomInput
              placeholder="La maison du convertible"
              value={newStoreInfo?.title}
              onChangeText={(text) => {
                setNewStoreInfo((prev) => ({ ...prev, title: text }))
                setIsEditingStoreInfo(true)
              }}
            ></CustomInput>
            <XStack gap={32} width={'100%'}>
              <Stack width={'40%'}>
                <CustomInput
                  placeholder="adresse"
                  value={`${newStoreInfo?.storefrontAddress?.addressLines[0]}, ${newStoreInfo?.storefrontAddress?.locality}`}
                  disabled
                ></CustomInput>
              </Stack>
              <XStack gap={16} justifyContent="space-between" f={1}>
                <Label>Catégorie</Label>
                <Stack width={'75%'}>
                  <CustomInput
                    placeholder="Restaurant"
                    value={newStoreInfo?.categories?.primaryCategory?.displayName}
                    disabled
                  ></CustomInput>
                </Stack>
              </XStack>
            </XStack>
            <XStack gap={32} width={'100%'}>
              <Stack width={'40%'}>
                <CustomInput
                  placeholder="www.example.com"
                  value={newStoreInfo?.websiteUri}
                  onChangeText={(text) => {
                    setNewStoreInfo({ ...newStoreInfo, websiteUri: text })
                    setIsEditingStoreInfo(true)
                  }}
                ></CustomInput>
              </Stack>
              <XStack gap={16} justifyContent="space-between" f={1}>
                <Label>Numéro de téléphone</Label>
                <Stack width={'75%'}>
                  <CustomInput
                    placeholder="+33 1 23 45 67 89"
                    value={newStoreInfo?.phoneNumbers?.primaryPhone}
                    onChangeText={(text) => {
                      setNewStoreInfo({ ...newStoreInfo, phoneNumbers: { primaryPhone: text } })
                      setIsEditingStoreInfo(true)
                    }}
                  ></CustomInput>
                </Stack>
              </XStack>
            </XStack>
            <CustomInput
              placeholder="description"
              value={newStoreInfo?.profile?.description}
              onChangeText={(text) => {
                setNewStoreInfo({ ...newStoreInfo, profile: { description: text } })
                setIsEditingStoreInfo(true)
              }}
            ></CustomInput>
          </YStack>
        </XStack>
      </StyledYstack>
      {/* <Title>Télécharger ou Remplacer les Photos de l'établissement</Title>
      <StyledXStack>
        <MediasManagement></MediasManagement>
      </StyledXStack> */}
      <XStack alignItems="center" gap={32}>
        <Title>Horaires d'ouverture</Title>
        <Switch
          backgroundColor={'#CDF463'}
          size={'$3'}
          onCheckedChange={(checked) => handleIsEditingSpecialHours(checked)}
        >
          <Switch.Thumb animation={'quick'} />
        </Switch>
        <Text>Horaires exceptionnelles</Text>
      </XStack>

      {isEditingSpecialHours ? (
        <SpecialBusinessHoursEditor
          specialTimePeriodsProps={specialHours.specialHourPeriods}
          onSpecialTimePeriodsChange={(specialHourPeriods) => {
            setSpecialHours({ specialHourPeriods })
            setIsEditingStoreInfo(true)
          }}
        />
      ) : (
        <MemoizedBusinessHoursEditor
          businessHours={businessHours}
          onBusinessHoursChange={handleBusinessHoursChange}
        ></MemoizedBusinessHoursEditor>
      )}

      <XStack justifyContent="flex-end" gap={16}>
        <CustomButton
          disabled={!isEditingStoreInfo}
          backgroundColor={!isEditingStoreInfo ? 'lightgray' : '#CDF463'}
          onPress={() => handleSaveModifications()}
          icon={<Check />}
        >
          Sauvegarder
        </CustomButton>
      </XStack>
    </YStack>
  )
}
