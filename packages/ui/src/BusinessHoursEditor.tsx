import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Button, XStack, YStack, styled, Text, Switch, Stack } from 'tamagui'
import { CustomSelect } from '@my/ui'
import { Clock, Plus, Trash } from '@tamagui/lucide-icons'

type Day = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY'

const displayDay: Record<Day, string> = {
  MONDAY: 'Lundi',
  TUESDAY: 'Mardi',
  WEDNESDAY: 'Mercredi',
  THURSDAY: 'Jeudi',
  FRIDAY: 'Vendredi',
  SATURDAY: 'Samedi',
  SUNDAY: 'Dimanche',
} as const

interface Time {
  hours?: number
  minutes?: number
}

interface TimePeriod {
  openDay: Day
  openTime: Time
  closeDay: Day
  closeTime: Time
}

interface BusinessHours {
  periods: TimePeriod[]
}

interface BusinessHoursEditorProps {
  businessHours: BusinessHours
  onBusinessHoursChange: (businessHours: BusinessHours) => void
}

const timeOptions = Array.from({ length: 48 }, (_, i) => {
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

const DayPeriods = memo(
  ({
    day,
    periods,
    onUpdatePeriod,
    onAddPeriod,
    onRemovePeriod,
  }: {
    day: Day
    periods: TimePeriod[]
    onUpdatePeriod: (day: Day, index: number, updatedPeriod: TimePeriod) => void
    onAddPeriod: (day: Day) => void
    onRemovePeriod: (day: Day, index: number) => void
  }) => {
    const handleOpenTimeChange = useCallback(
      (value: string, index: number) => {
        const [hours, minutes] = value.split(':').map(Number)
        const updatedPeriod = {
          ...periods[index],
          openTime: value === '24h/24' ? {} : { hours, minutes },
        }
        onUpdatePeriod(day, index, updatedPeriod)
      },
      [day, periods, onUpdatePeriod]
    )

    const handleCloseTimeChange = useCallback(
      (value: string, index: number) => {
        const [hours, minutes] = value.split(':').map(Number)
        const updatedPeriod = {
          ...periods[index],
          closeTime: {
            hours: value.split(':')[0] === '00' ? 24 : hours,
            minutes,
          },
        }
        onUpdatePeriod(day, index, updatedPeriod)
      },
      [day, periods, onUpdatePeriod]
    )

    return (
      <YStack gap={8} width="75%">
        {periods.map((period, index) => {
          const openTime =
            period.openTime.hours !== undefined
              ? `${period.openTime.hours.toString().padStart(2, '0')}:${period.openTime.minutes?.toString().padStart(2, '0') || '00'}`
              : '24h/24'
          const closeTime = `${period.closeTime.hours?.toString().padStart(2, '0')}:${period.closeTime.minutes?.toString().padStart(2, '0') || '00'}`
          const is24Hours =
            !period.openTime.hours && !period.openTime.minutes && period.closeTime.hours === 24

          return (
            <XStack key={index} gap={16} flex={1}>
              <CustomSelect
                width="46%"
                value={is24Hours ? '24h/24' : openTime}
                options={[...timeOptions, { name: '24h/24' }]}
                iconAfter={<Clock />}
                onChange={(value) => handleOpenTimeChange(value, index)}
              />
              {!is24Hours && (
                <CustomSelect
                  width="46%"
                  value={closeTime}
                  options={timeOptions}
                  iconAfter={<Clock />}
                  onChange={(value) => handleCloseTimeChange(value, index)}
                />
              )}
              {index > 0 && (
                <Button theme="red" icon={<Trash />} onPress={() => onRemovePeriod(day, index)} />
              )}
            </XStack>
          )
        })}
        <StyledButton icon={<Plus />} onPress={() => onAddPeriod(day)}>
          Ajouter des horaires
        </StyledButton>
      </YStack>
    )
  }
)

export const BusinessHoursEditor = memo(
  ({ businessHours, onBusinessHoursChange }: BusinessHoursEditorProps) => {
    const periodsByDay = useMemo(() => {
      const initial: Record<Day, TimePeriod[]> = {
        MONDAY: [],
        TUESDAY: [],
        WEDNESDAY: [],
        THURSDAY: [],
        FRIDAY: [],
        SATURDAY: [],
        SUNDAY: [],
      }

      return businessHours.periods.reduce((acc, period) => {
        acc[period.openDay].push(period)
        return acc
      }, initial)
    }, [businessHours])

    const [periodForMonday, setPeriodForMonday] = useState<TimePeriod[]>(periodsByDay['MONDAY'])
    // useEffect(() => {
      
    //   setPeriodForMonday(periodsByDay['MONDAY'])
    //   console.log('periodsByDay', periodsByDay, periodForMonday);
      
    // }, [periodsByDay['MONDAY']])

    const [periodForTuesday, setPeriodForTuesday] = useState<TimePeriod[]>(periodsByDay['TUESDAY'])
    // useEffect(() => {
    //   setPeriodForTuesday(periodsByDay['TUESDAY'])
    // }, [periodsByDay])

    const [periodForWednesday, setPeriodForWednesday] = useState<TimePeriod[]>(periodsByDay['WEDNESDAY'])
    // useEffect(() => {
    //   setPeriodForWednesday(periodsByDay['WEDNESDAY'])
    // }, [periodsByDay])

    const [periodForThursday, setPeriodForThursday] = useState<TimePeriod[]>(periodsByDay['THURSDAY'])
    // useEffect(() => {
    //   setPeriodForThursday(periodsByDay['THURSDAY'])
    // }, [periodsByDay])

    const [periodForFriday, setPeriodForFriday] = useState<TimePeriod[]>(periodsByDay['FRIDAY'])
    // useEffect(() => {
    //   setPeriodForFriday(periodsByDay['FRIDAY'])
    // }, [periodsByDay])

    const [periodForSaturday, setPeriodForSaturday] = useState<TimePeriod[]>(periodsByDay['SATURDAY'])
    // useEffect(() => {
    //   setPeriodForSaturday(periodsByDay['SATURDAY'])
    // }, [periodsByDay])

    const [periodForSunday, setPeriodForSunday] = useState<TimePeriod[]>(periodsByDay['SUNDAY'])
    useEffect(() => {
      console.log('resetting periods for sunday');
      
      setPeriodForSunday(periodsByDay['SUNDAY'])
    }, [periodsByDay])

    const handleDayToggle = 
      (checked: boolean, day: Day) => {

        console.log('checked', checked, day);
        
        switch (day) {
          case 'MONDAY':
            setPeriodForMonday(
              checked
                ? [{ openDay: day, openTime: {}, closeDay: day, closeTime: { hours: 24 } }]
                : []
            )
            break
          case 'TUESDAY':
            setPeriodForTuesday(
              checked
                ? [{ openDay: day, openTime: {}, closeDay: day, closeTime: { hours: 24 } }]
                : []
            )
            break
          case 'WEDNESDAY':
            setPeriodForWednesday(
              checked
                ? [{ openDay: day, openTime: {}, closeDay: day, closeTime: { hours: 24 } }]
                : []
            )
            break
          case 'THURSDAY':
            setPeriodForThursday(
              checked
                ? [{ openDay: day, openTime: {}, closeDay: day, closeTime: { hours: 24 } }]
                : []
            )
            break
          case 'FRIDAY':
            setPeriodForFriday(
              checked
                ? [{ openDay: day, openTime: {}, closeDay: day, closeTime: { hours: 24 } }]
                : []
            )
            break
          case 'SATURDAY':
            setPeriodForSaturday(
              checked
                ? [{ openDay: day, openTime: {}, closeDay: day, closeTime: { hours: 24 } }]
                : []
            )
            break
          case 'SUNDAY':
            setPeriodForSunday(
              checked
                ? [{ openDay: day, openTime: {}, closeDay: day, closeTime: { hours: 24 } }]
                : []
            )
            break
        }

        // const newPeriods = Object.entries(periodsByDay).flatMap(([currentDay, periods]) => {
        //   if (currentDay === day) {
        //     return checked
        //       ? [
        //           {
        //             openDay: day,
        //             openTime: {},
        //             closeDay: day,
        //             closeTime: { hours: 24 },
        //           },
        //         ]
        //       : []
        //   }
        //   return periods
        // })

        // onBusinessHoursChange({ periods: newPeriods })
      }

    const handleUpdatePeriod = useCallback(
      (day: Day, index: number, updatedPeriod: TimePeriod) => {
        console.log('updatedPeriod', updatedPeriod)

        switch (day) {
          case 'MONDAY':
            setPeriodForMonday((prev) => {
              const updated = [...prev]
              updated[index] = updatedPeriod
              return updated
            })
            break
          case 'TUESDAY':
            setPeriodForTuesday((prev) => {
              const updated = [...prev]
              updated[index] = updatedPeriod
              return updated
            })
            break
          case 'WEDNESDAY':
            setPeriodForWednesday((prev) => {
              const updated = [...prev]
              updated[index] = updatedPeriod
              return updated
            })
            break
          case 'THURSDAY':
            setPeriodForThursday((prev) => {
              const updated = [...prev]
              updated[index] = updatedPeriod
              return updated
            })
            break
          case 'FRIDAY':
            setPeriodForFriday((prev) => {
              const updated = [...prev]
              updated[index] = updatedPeriod
              return updated
            })
            break
          case 'SATURDAY':
            setPeriodForSaturday((prev) => {
              const updated = [...prev]
              updated[index] = updatedPeriod
              return updated
            })
            break
          case 'SUNDAY':
            setPeriodForSunday((prev) => {
              const updated = [...prev]
              updated[index] = updatedPeriod
              return updated
            })
            console.log('sunday', periodForSunday);
            
            break
        }
        


        return

        const newPeriods = Object.entries(periodsByDay).flatMap(([currentDay, periods]) => {
          if (currentDay === day) {
            const updatedPeriods = [...periods]
            updatedPeriods[index] = updatedPeriod
            return updatedPeriods
          }
          return periods
        })

        onBusinessHoursChange({ periods: newPeriods })
      },
      [periodsByDay, onBusinessHoursChange]
    )



    useEffect( () => {
    

      const newPeriods = [
      ...periodForMonday,
      ...periodForTuesday,
      ...periodForWednesday,
      ...periodForThursday,
      ...periodForFriday,
      ...periodForSaturday,
      ...periodForSunday,
      ]
      console.log('newperiods', newPeriods);
      
      onBusinessHoursChange({ periods: newPeriods })
    }, [
      periodForMonday,
      periodForTuesday,
      periodForWednesday,
      periodForThursday,
      periodForFriday,
      periodForSaturday,
      periodForSunday,
      

    ])

    const getCorrectPeriodForDay = (day: Day) => {
      switch (day) {
        case 'MONDAY':
          return periodForMonday
        case 'TUESDAY':
          return periodForTuesday
        case 'WEDNESDAY':
          return periodForWednesday
        case 'THURSDAY':
          return periodForThursday
        case 'FRIDAY':
          return periodForFriday
        case 'SATURDAY':
          return periodForSaturday
        case 'SUNDAY':
          return periodForSunday
      }
    }

    const handleAddPeriod = useCallback(
      (day: Day) => {
        switch (day) {
          case 'MONDAY':
            setPeriodForMonday((prev) => [
              ...prev,
              { openDay: day, openTime: {}, closeDay: day, closeTime: { hours: 24 } },
            ])
            break
          case 'TUESDAY':
            setPeriodForTuesday((prev) => [
              ...prev,
              { openDay: day, openTime: {}, closeDay: day, closeTime: { hours: 24 } },
            ])
            break
          case 'WEDNESDAY':
            setPeriodForWednesday((prev) => [
              ...prev,
              { openDay: day, openTime: {}, closeDay: day, closeTime: { hours: 24 } },
            ])
            break
          case 'THURSDAY':
            setPeriodForThursday((prev) => [
              ...prev,
              { openDay: day, openTime: {}, closeDay: day, closeTime: { hours: 24 } },
            ])
            break
          case 'FRIDAY':
            setPeriodForFriday((prev) => [
              ...prev,
              { openDay: day, openTime: {}, closeDay: day, closeTime: { hours: 24 } },
            ])
            break
          case 'SATURDAY':
            setPeriodForSaturday((prev) => [
              ...prev,
              { openDay: day, openTime: {}, closeDay: day, closeTime: { hours: 24 } },
            ])
            break
          case 'SUNDAY':
            setPeriodForSunday((prev) => [
              ...prev,
              { openDay: day, openTime: {}, closeDay: day, closeTime: { hours: 24 } },
            ])
            break
        }

        // const newPeriods = Object.entries(periodsByDay).flatMap(([currentDay, periods]) => {
        //   if (currentDay === day) {
        //     return [
        //       ...periods,
        //       {
        //         openDay: day,
        //         openTime: {},
        //         closeDay: day,
        //         closeTime: { hours: 24 },
        //       },
        //     ]
        //   }
        //   return periods
        // })

        // onBusinessHoursChange({ periods: newPeriods })
      },
      [periodsByDay, onBusinessHoursChange]
    )

    const handleRemovePeriod = useCallback(
      (day: Day, index: number) => {
        switch (day) {
          case 'MONDAY':
            setPeriodForMonday((prev) => prev.filter((_, i) => i !== index))
            break
          case 'TUESDAY':
            setPeriodForTuesday((prev) => prev.filter((_, i) => i !== index))
            break
          case 'WEDNESDAY':
            setPeriodForWednesday((prev) => prev.filter((_, i) => i !== index))
            break
          case 'THURSDAY':
            setPeriodForThursday((prev) => prev.filter((_, i) => i !== index))
            break
          case 'FRIDAY':
            setPeriodForFriday((prev) => prev.filter((_, i) => i !== index))
            break
          case 'SATURDAY':
            setPeriodForSaturday((prev) => prev.filter((_, i) => i !== index))
            break
          case 'SUNDAY':
            setPeriodForSunday((prev) => prev.filter((_, i) => i !== index))
            break
        }
        // const newPeriods = Object.entries(periodsByDay).flatMap(([currentDay, periods]) => {
        //   if (currentDay === day) {
        //     return periods.filter((_, i) => i !== index)
        //   }
        //   return periods
        // })

        // onBusinessHoursChange({ periods: newPeriods })
      },
      [periodsByDay, onBusinessHoursChange]
    )

    return (
      <YStack gap={16}>
        {/* <DayContainer key={'MONDAY'} backgroundColor={'red'}>
          <Text width={100}>{displayDay['MONDAY']}</Text>
          <XStack alignItems="center" height="fit-content" gap={16}>
            <Switch
              backgroundColor={periodForMonday.length > 0 ? '#CDF463' : 'lightgray'}
              size="$3"
              checked={periodForMonday.length > 0}
              onCheckedChange={(checked) => handleDayToggle(checked, 'MONDAY')}
            >
              <Switch.Thumb animation="quick" />
            </Switch>
            <Text>{periodForMonday.length > 0 ? 'Ouvert' : 'Fermé'}</Text>
          </XStack>
          {periodForMonday.length === 0 && <Stack width={'76%'} />}
          {periodForMonday.length > 0 && (
            <DayPeriods
              day={'MONDAY'}
              periods={periodForMonday}
              onUpdatePeriod={handleUpdatePeriod}
              onAddPeriod={handleAddPeriod}
              onRemovePeriod={handleRemovePeriod}
            />
          )}
        </DayContainer> */}

        {(Object.keys(periodsByDay) as Day[]).map((day, index) => {
          const isOpen = getCorrectPeriodForDay(day).length > 0

          return (
            <DayContainer key={index}>
              <Text width={100}>{displayDay[day]}</Text>
              <XStack alignItems="center" height="fit-content" gap={16}>
                <Switch
                  backgroundColor={isOpen ? '#CDF463' : 'lightgray'}
                  size="$3"
                  checked={isOpen}
                  onCheckedChange={(checked) => handleDayToggle(checked, day)}
                >
                  <Switch.Thumb animation="quick" />
                </Switch>
                <Text>{isOpen ? 'Ouvert' : 'Fermé'}</Text>
              </XStack>
              {!isOpen && <Stack width={'76%'} />}
              {isOpen && (
                <DayPeriods
                  day={day}
                  periods={getCorrectPeriodForDay(day)}
                  onUpdatePeriod={handleUpdatePeriod}
                  onAddPeriod={handleAddPeriod}
                  onRemovePeriod={handleRemovePeriod}
                />
              )}
            </DayContainer>
          )
        })}
      </YStack>
    )
  }
)
