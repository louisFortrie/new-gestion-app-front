import { Button, XStack, YStack, styled, H1, Text, Switch } from 'tamagui'
import { CustomSelect, CustomInput } from '@my/ui'
import { Clock, Plus } from '@tamagui/lucide-icons'

type Day = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY'

const displayDay: Readonly<Record<Day, string>> = {
  MONDAY: 'Lundi',
  TUESDAY: 'Mardi',
  WEDNESDAY: 'Mercredi',
  THURSDAY: 'Jeudi',
  FRIDAY: 'Vendredi',
  SATURDAY: 'Samedi',
  SUNDAY: 'Dimanche',
} as const

interface TimePeriod {
  openDay: Day
  openTime: { hours?: number; minutes?: number }
  closeDay: Day
  closeTime: { hours: number; minutes?: number }
}

interface BusinessHours {
  periods: TimePeriod[]
}

interface BusinessHoursEditorProps {
  businessHours: BusinessHours
  onBusinessHoursChange: (businessHours: BusinessHours) => void
}

const halfHourOptions = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2)
  const minute = i % 2 === 0 ? '00' : '30'
  return `${hour.toString().padStart(2, '0')}:${minute}`
}).concat(['24h/24'])

const openTimeOptions = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2)
  const minute = i % 2 === 0 ? '00' : '30'
  return `${hour.toString().padStart(2, '0')}:${minute}`
}).concat(['24h/24'])

const closeTimeOptions = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2)
  const minute = i % 2 === 0 ? '00' : '30'
  return `${hour.toString().padStart(2, '0')}:${minute}`
})

const DayContainer = styled(XStack, {
  backgroundColor: '#F8FAFC',
  borderColor: '#E2E8F0',
  borderRadius: '$4',
  borderWidth: 1,
  paddingHorizontal: '$4',
  paddingVertical: '$3',
  justifyContent: 'space-between',
})

const StyledButton = styled(Button, {
  width: 'fit-content',
})

export const BusinessHoursEditor: React.FC<BusinessHoursEditorProps> = ({
  businessHours,
  onBusinessHoursChange,
}) => {
  return (
    <YStack gap={16}>
      <DayContainer>
        <Text>Lundi</Text>
        <XStack alignItems="center" height={'fit-content'} gap={16}>
          <Switch backgroundColor={'#CDF463'} size={'$3'}>
            <Switch.Thumb animation={'quick'} />
          </Switch>
          <Text>Ouvert</Text>
        </XStack>
        <YStack f={0.8} gap={8}>
          <XStack gap={16} f={1}>
            <CustomSelect
              width={'49%'}
              options={halfHourOptions.map((time) => ({ name: time }))}
              iconAfter={<Clock />}
            ></CustomSelect>
            <CustomSelect
              width={'49%'}
              options={halfHourOptions.map((time) => ({ name: time }))}
              iconAfter={<Clock />}
            ></CustomSelect>
          </XStack>
          <XStack gap={16} f={1}>
            <CustomSelect
              width={'49%'}
              options={halfHourOptions.map((time) => ({ name: time }))}
              iconAfter={<Clock />}
            ></CustomSelect>
            <CustomSelect
              width={'49%'}
              options={halfHourOptions.map((time) => ({ name: time }))}
              iconAfter={<Clock />}
            ></CustomSelect>
          </XStack>
          <StyledButton icon={<Plus />}>Ajouter des horaires</StyledButton>
        </YStack>
      </DayContainer>
    </YStack>
  )
}
