import { Button, H1, H4, styled, Switch, XStack, YStack, Text } from 'tamagui'
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { useEffect, useState } from 'react'
import { CustomButton, CustomSelect } from '@my/ui'
import { Clock, Plus, Trash } from '@tamagui/lucide-icons'

interface GoogleDate {
  year: number
  month: number
  day: number
}

interface GoogleTime {
  hours: number
  minutes?: number
  seconds?: number
  nanos?: number
}

interface SpecialTimePeriod {
  startDate: GoogleDate
  openTime: GoogleTime
  endDate: GoogleDate
  closeTime: GoogleTime
  closed: boolean
}

const DayContainer = styled(XStack, {
  backgroundColor: '#F8FAFC',
  borderColor: '#E2E8F0',
  borderRadius: '$4',
  borderWidth: 1,
  paddingHorizontal: '$4',
  paddingVertical: '$3',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 16,
})

const timeOptions = [
  { name: '00:00' },
  { name: '00:30' },
  { name: '01:00' },
  { name: '01:30' },
  { name: '02:00' },
  { name: '02:30' },
  { name: '03:00' },
  { name: '03:30' },
  { name: '04:00' },
  { name: '04:30' },
  { name: '05:00' },
  { name: '05:30' },
  { name: '06:00' },
  { name: '06:30' },
  { name: '07:00' },
  { name: '07:30' },
  { name: '08:00' },
  { name: '08:30' },
  { name: '09:00' },
  { name: '09:30' },
  { name: '10:00' },
  { name: '10:30' },
  { name: '11:00' },
  { name: '11:30' },
  { name: '12:00' },
  { name: '12:30' },
  { name: '13:00' },
  { name: '13:30' },
  { name: '14:00' },
  { name: '14:30' },
  { name: '15:00' },
  { name: '15:30' },
  { name: '16:00' },
  { name: '16:30' },
  { name: '17:00' },
  { name: '17:30' },
  { name: '18:00' },
  { name: '18:30' },
  { name: '19:00' },
  { name: '19:30' },
  { name: '20:00' },
  { name: '20:30' },
  { name: '21:00' },
  { name: '21:30' },
  { name: '22:00' },
  { name: '22:30' },
  { name: '23:00' },
  { name: '23:30' },
]

interface SpecialBusinessHoursEditorProps {
  specialTimePeriodsProps: SpecialTimePeriod[]
  onSpecialTimePeriodsChange: (specialTimePeriods: SpecialTimePeriod[]) => void
}

export const SpecialBusinessHoursEditor = ({
  specialTimePeriodsProps,
  onSpecialTimePeriodsChange,
}: SpecialBusinessHoursEditorProps) => {
  const handleAddPeriod = () => {
    onSpecialTimePeriodsChange([
      ...specialTimePeriodsProps,
      {
        startDate: {
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          day: new Date().getDate(),
        },
        openTime: {
          hours: 0,
          minutes: 0,
        },
        endDate: {
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          day: new Date().getDate(),
        },
        closeTime: {
          hours: 0,
          minutes: 0,
        },
        closed: false,
      },
    ])
  }

  return (
    <>
      <YStack gap={32}>
        <style>
          {`
            /* Styliser l'input directement */
            .react-date-picker__wrapper {
              border: 2px solid gray;
              border-radius: 0.375rem;
              padding: 0.5rem;
            }

            .react-date-picker__inputGroup {
              font-family: sans-serif;
              font-size: 1rem;
              color: #1f2937;
            }

            /* Styliser le calendrier popup */
            .react-calendar {
              background-color: white;
              border: 1px solid #e5e7eb;
              border-radius: 0.5rem;
              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
            }

            .react-calendar__tile--active {
              background-color: #2563eb !important;
              color: white;
            }

            .react-calendar__tile:hover {
              background-color: #bfdbfe;
            }

            /* Styliser les icônes */
            .react-date-picker__button {
              padding: 0.25rem;
            }

            .react-date-picker__button:hover {
              background-color: #f3f4f6;
              border-radius: 0.25rem;
            }

            /* Styliser l'état focus */
            .react-date-picker__wrapper:focus-within {
              border-color: #3b82f6;
              box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
              outline: none;
            }
          `}
        </style>
        <XStack gap={32}>
          <CustomButton icon={<Plus />} onPress={handleAddPeriod}>
            Ajouter une horaire
          </CustomButton>
        </XStack>
        {specialTimePeriodsProps.map((period, index) => {
          const defaultDate = new Date(
            period.startDate.year,
            period.startDate.month - 1,
            period.startDate.day
          )
          return (
            <DayContainer key={index}>
              <XStack alignItems="center" gap={32} f={1}>
                <DatePicker
                  clearIcon={null}
                  // minDate={new Date()}
                  value={defaultDate}
                  onChange={(date) => {
                    console.log('date', (date as Date).getMonth())
                    const newSpecialTimePeriods = [...specialTimePeriodsProps]
                    newSpecialTimePeriods[index].startDate = {
                      year: (date as Date).getFullYear(),
                      month: (date as Date).getMonth() + 1,
                      day: (date as Date).getDate(),
                    }
                    newSpecialTimePeriods[index].endDate = {
                      year: (date as Date).getFullYear(),
                      month: (date as Date).getMonth() + 1,
                      day: (date as Date).getDate(),
                    }
                    onSpecialTimePeriodsChange(newSpecialTimePeriods)
                  }}
                />
                <XStack gap={16}>
                  <Switch
                    backgroundColor={'#CDF463'}
                    size={'$3'}
                    defaultChecked={!specialTimePeriodsProps[index].closed}
                    onCheckedChange={(checked) => {
                      const newSpecialTimePeriods = [...specialTimePeriodsProps]
                      newSpecialTimePeriods[index].closed = !checked
                      onSpecialTimePeriodsChange(newSpecialTimePeriods)
                    }}
                  >
                    <Switch.Thumb animation={'quick'} />
                  </Switch>
                  <Text>{period.closed ? 'Fermé' : 'Ouvert'}</Text>
                </XStack>
                {!period.closed && (
                  <XStack f={1} width={'100%'} justifyContent="space-between">
                    <CustomSelect
                      width={'49%'}
                      options={timeOptions}
                      value={`${period.openTime?.hours?.toString().padStart(2, '0') || '09'}:${period.openTime?.minutes?.toString().padStart(2, '0') || '00'}`}
                      onChange={(time) => {
                        const newSpecialTimePeriods = [...specialTimePeriodsProps]
                        newSpecialTimePeriods[index].openTime = {
                          hours: parseInt(time.split(':')[0]),
                          minutes: parseInt(time.split(':')[1]),
                        }
                        onSpecialTimePeriodsChange(newSpecialTimePeriods)
                      }}
                      iconAfter={<Clock />}
                    />

                    <CustomSelect
                      width={'49%'}
                      options={timeOptions}
                      value={`${period.closeTime?.hours?.toString().padStart(2, '0') || '17'}:${period.closeTime?.minutes?.toString().padStart(2, '0') || '00'}`}
                      onChange={(time) => {
                        const newSpecialTimePeriods = [...specialTimePeriodsProps]
                        newSpecialTimePeriods[index].closeTime = {
                          hours: parseInt(time.split(':')[0]),
                          minutes: parseInt(time.split(':')[1]),
                        }
                        onSpecialTimePeriodsChange(newSpecialTimePeriods)
                      }}
                      iconAfter={<Clock />}
                    />
                  </XStack>
                )}

                <Button
                  icon={<Trash />}
                  theme={'red'}
                  onPress={() => {
                    const newSpecialTimePeriods = [...specialTimePeriodsProps]
                    newSpecialTimePeriods.splice(index, 1)
                    onSpecialTimePeriodsChange(newSpecialTimePeriods)
                  }}
                >
                  Supprimer
                </Button>
              </XStack>
            </DayContainer>
          )
        })}
      </YStack>
    </>
  )
}
