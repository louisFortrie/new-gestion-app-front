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

type Day = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY'
export const Manage = () => {
  console.log('render manage')

  const [businessHours, setBusinessHours] = useState({
    periods: [],
  })
  const [newStoreInfo, setNewStoreInfo] = useState({
    title: '',
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
  })

  const [isEditingSpecialHours, setIsEditingSpecialHours] = useState(false)

  const { selectedStore } = useStores()

  useEffect(() => {
    if (!selectedStore) return
    setBusinessHours(selectedStore.regularHours)
    setNewStoreInfo(selectedStore)
    console.log('selectedStore use effect')
  }, [selectedStore])

  const handleIsEditingSpecialHours = useCallback((checked) => {
    setIsEditingSpecialHours(checked)
  }, [])

  const handleBusinessHoursChange = useCallback((businessHoursNew) => {
    setBusinessHours(businessHoursNew)
    console.log('business hours changed', businessHoursNew)
  }, [])

  const memoizedBusinessHours = useMemo(() => businessHours, [businessHours])

  if (businessHours.periods.length === 0) {
    return <Spinner size="large" color={'black'} />
  }

  const handleSaveModifications = () => {
    console.log('save', businessHours, newStoreInfo)
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
            <CustomInput placeholder="description"></CustomInput>
          </YStack>
        </XStack>
      </StyledYstack>
      {/* <Title>Télécharger ou Remplacer les Photos de l'établissement</Title>
      <StyledXStack>
        <MediasManagement></MediasManagement>
      </StyledXStack> */}
      <XStack alignItems="center" gap={32}>
        <Title>Horaire d'ouvertures</Title>
        <Switch
          backgroundColor={'#CDF463'}
          size={'$3'}
          onCheckedChange={(checked) => handleIsEditingSpecialHours(checked)}
        >
          <Switch.Thumb animation={'quick'} />
        </Switch>
        <Text>Horaires {isEditingSpecialHours ? 'exceptionnels' : 'basiques'}</Text>
      </XStack>

      {isEditingSpecialHours ? (
        <SpecialBusinessHoursEditor />
      ) : (
        <BusinessHoursEditor
          businessHours={memoizedBusinessHours}
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
