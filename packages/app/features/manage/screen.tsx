import { styled, YStack, Text, XStack, Label, Stack, Button } from 'tamagui'
import { CustomInput, BusinessHoursEditor, CustomButton } from '@my/ui'
import { Check, SquarePen } from '@tamagui/lucide-icons'

const StyledYstack = styled(YStack, {
  gap: '$2',
  padding: '$2',
  backgroundColor: 'white',
  borderRadius: '$4',
})

const StyledXStack = styled(XStack, {
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

export const Manage = () => {
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
            <CustomInput placeholder="La maison du convertible"></CustomInput>
            <XStack gap={32} width={'100%'}>
              <Stack width={'40%'}>
                <CustomInput placeholder="adresse"></CustomInput>
              </Stack>
              <XStack gap={16} justifyContent="space-between" f={1}>
                <Label>Catégorie</Label>
                <Stack width={'75%'}>
                  <CustomInput placeholder="Restaurant"></CustomInput>
                </Stack>
              </XStack>
            </XStack>
            <XStack gap={32} width={'100%'}>
              <Stack width={'40%'}>
                <CustomInput placeholder="www.example.com"></CustomInput>
              </Stack>
              <XStack gap={16} justifyContent="space-between" f={1}>
                <Label>Numéro de téléphone</Label>
                <Stack width={'75%'}>
                  <CustomInput placeholder="+33 1 23 45 67 89"></CustomInput>
                </Stack>
              </XStack>
            </XStack>
            <CustomInput placeholder="Experience de eodk qsdkpo k"></CustomInput>
          </YStack>
        </XStack>
      </StyledYstack>
      <Title>Télécharger ou Remplacer les Photos de l'établissement</Title>
      <StyledXStack></StyledXStack>
      <Title>Horaire d'ouvertures</Title>
      <BusinessHoursEditor
        businessHours={{
          periods: [
            {
              openDay: 'MONDAY',
              openTime: { hours: 8, minutes: 0 },
              closeDay: 'MONDAY',
              closeTime: { hours: 18, minutes: 0 },
            },
          ],
        }}
        onBusinessHoursChange={() => {}}
      ></BusinessHoursEditor>
      <XStack justifyContent="flex-end" gap={16}>
        <Button icon={<SquarePen />}>Modifier</Button>
        <CustomButton icon={<Check />}>Approuver</CustomButton>
      </XStack>
    </YStack>
  )
}
