import { styled, YStack, Text, XStack, Label, Stack, Button, Spinner, Switch } from 'tamagui'
import {
  CustomInput,
  BusinessHoursEditor,
  CustomButton,
  MediasManagement,
  SpecialBusinessHoursEditor,
} from '@my/ui'
import { Check, SquarePen } from '@tamagui/lucide-icons'
import useStores from 'app/hooks/useStores'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'

const StyledYstack = styled(YStack, {
  gap: '$2',
  padding: '$2',
  backgroundColor: 'white',
  borderRadius: '$4',
})

const StyledXStack = styled(XStack, {
  gap: '$2',
  padding: '$4',
  backgroundColor: 'white',
  borderRadius: '$4',
})

const Title = styled(Text, {
  color: '#0F172A',
  fontSize: 20,
  fontWeight: 500,
})

const apiUrl = process.env.NEXT_PUBLIC_API_URL

type Day = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY'
export const Manage = () => {
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

  const { selectedStore } = useStores()

  useEffect(() => {
    if (!selectedStore) return
    const { reviews, storeCode, ...storeInfo } = selectedStore
    setBusinessHours(selectedStore.regularHours)
    setSpecialHours(selectedStore.specialHours || { specialHourPeriods: [] })
    setNewStoreInfo(storeInfo)
    console.log('selectedStore use effect')
  }, [selectedStore])

  const handleIsEditingSpecialHours = useCallback((checked) => {
    setIsEditingSpecialHours(checked)
  }, [])

  const handleBusinessHoursChange = useCallback((businessHoursNew) => {
    setBusinessHours(businessHoursNew)
    console.log('business hours changed', businessHoursNew)
  }, [])

  if (businessHours.periods.length === 0) {
    return <Spinner size="large" color={'black'} />
  }

  const handleSaveModifications = () => {
    const { medias, ...newLocation } = newStoreInfo
    axios
      .put(
        `${apiUrl}/api/mybusiness/locations/${selectedStore?.name.split('/')[1]}`,
        {
          newLocation: {
            ...newLocation,
            regularHours: businessHours,
            specialHours: specialHours,
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log('res', res)
      })
  }

  return (
    <YStack gap={32}>
      <YStack>
        <Title>Gérer les informations des fiches d'établissement</Title>
        <Text color={'#535862'} fontSize={14}>
          Mettez à jour les informations de votre d'établissement et assurer leurs consistance
        </Text>
      </YStack>
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
          onSpecialTimePeriodsChange={(specialHourPeriods) =>
            setSpecialHours({ specialHourPeriods })
          }
        />
      ) : (
        <BusinessHoursEditor
          businessHours={businessHours}
          onBusinessHoursChange={handleBusinessHoursChange}
        ></BusinessHoursEditor>
      )}

      <XStack justifyContent="flex-end" gap={16}>
        <Button icon={<SquarePen />}>Modifier</Button>
        <CustomButton onPress={() => handleSaveModifications()} icon={<Check />}>
          Approuver
        </CustomButton>
      </XStack>
    </YStack>
  )
}
