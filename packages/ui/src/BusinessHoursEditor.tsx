import { Button, XStack, YStack, styled, Text, Switch, Spinner } from 'tamagui'
import { CustomSelect } from '@my/ui'
import { Clock, Plus } from '@tamagui/lucide-icons'
import { memo, useState } from 'react'

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

const selectOptions = halfHourOptions.map((time) => ({ name: time }))

const openTimeOptions = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2)
  const minute = i % 2 === 0 ? '00' : '30'
  return { name: `${hour.toString().padStart(2, '0')}:${minute}` }
}).concat([{ name: '24h/24' }])

const closeTimeOptions = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2)
  const minute = i % 2 === 0 ? '00' : '30'
  return { name: `${hour.toString().padStart(2, '0')}:${minute}` }
}).concat([{ name: '24:00' }])

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

export const BusinessHoursEditor: React.FC<BusinessHoursEditorProps> = memo(({
  businessHours,
  onBusinessHoursChange,
}) => {
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
  if (!businessHours) {
    return <Spinner size={'large'} color={'black'} />
  }

  return (
    <YStack gap={16}>
      {days.map((day) => {
        const dayKey = Object.keys(displayDay).find((key) => displayDay[key as Day] === day) as Day
        const dayHours = businessHours.periods.filter((period) => period.openDay === dayKey)
        const isOpen = dayHours.length > 0
        console.log('isOpen', isOpen, dayHours, businessHours, dayKey, day)
        return (
          <DayContainer key={day}>
            <Text width={100}>{day}</Text>
            <XStack alignItems="center" height={'fit-content'} gap={16}>
              <Switch
                backgroundColor={'#CDF463'}
                size={'$3'}
                defaultChecked={isOpen}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onBusinessHoursChange({
                      ...businessHours,
                      periods: [
                        ...businessHours.periods,
                        {
                          openDay: dayKey,
                          openTime: { hours: 9, minutes: 0 },
                          closeDay: dayKey,
                          closeTime: { hours: 17, minutes: 0 },
                        },
                      ],
                    })
                  } else {
                    onBusinessHoursChange({
                      ...businessHours,
                      periods: businessHours.periods.filter((period) => period.openDay !== dayKey),
                    })
                  }
                }}
              >
                <Switch.Thumb animation={'quick'} />
              </Switch>
              <Text>{isOpen ? 'Ouvert' : 'Fermé'}</Text>
            </XStack>
            <YStack gap={8} width={'75%'}>
            {isOpen && (
              <>
                {dayHours.map((period, index) => {
                  const openTime = `${period.openTime.hours?.toString().padStart(2, '0')}:${period.openTime.minutes?.toString().padStart(2, '0')}`
                  const closeTime = `${period.closeTime.hours?.toString().padStart(2, '0')}:${period.closeTime.minutes?.toString().padStart(2, '0') || '00'}`
                  const is24Hours = closeTime === '24:00' && !period.openTime.hours && !period.openTime.minutes
                  console.log(
                    'is24Hours',
                    is24Hours,
                    openTime,
                    closeTime,
                    is24Hours ? '24h/24' : openTime
                  )

                  return (
                    <XStack key={index} gap={16} f={1}>
                      <CustomSelect
                        width={'49%'}
                        value={is24Hours ? '24h/24' : openTime}
                        options={openTimeOptions}
                        iconAfter={<Clock />}
                        onChange={(value) => {
                          const [hours, minutes] = value.split(':').map(Number)
                          const newPeriods = businessHours.periods.map(period => 
                            period.openDay === dayKey ? { ...period, openTime: { hours, minutes } } : period
                          )
                          console.log('newPeriods', newPeriods);
                          
                          onBusinessHoursChange({ ...businessHours, periods: newPeriods })
                        }}
                      />
                      {!is24Hours && (
                        <CustomSelect
                          width={'49%'}
                          value={closeTime}
                          options={closeTimeOptions}
                          iconAfter={<Clock />}
                          onChange={(value) => {
                            const [hours, minutes] = value.split(':').map(Number)
                            const newPeriods = [...businessHours.periods]
                            newPeriods[index].closeTime = { hours, minutes }
                            onBusinessHoursChange({ ...businessHours, periods: newPeriods })
                          }}
                        />
                      )}
                    </XStack>
                  )
                })}
                <StyledButton
                  icon={<Plus />}
                  onPress={() => {
                    const newPeriods = [...businessHours.periods]
                    newPeriods.push({
                      openDay: dayKey,
                      openTime: { hours: 9, minutes: 0 },
                      closeDay: dayKey,
                      closeTime: { hours: 17, minutes: 0 },
                    })
                    onBusinessHoursChange({ ...businessHours, periods: newPeriods })
                  }}
                >
                  Ajouter des horaires
                </StyledButton>
              </>

            )}
              </YStack>
          </DayContainer>
        )
      })}
    </YStack>
  )
})
