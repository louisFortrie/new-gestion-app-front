import { Button, H1, H4, styled, Switch, XStack, YStack, Text } from 'tamagui'
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { useEffect, useState } from 'react'
import { CustomButton, CustomSelect } from '@my/ui'
import { Clock, Plus, Trash } from '@tamagui/lucide-icons'

interface SpecialTimePeriod {
  openDate: Date
  openTime: string
  closeDate: Date
  closeTime: string
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
  { name: '01:00' },
  { name: '02:00' },
  { name: '03:00' },
  { name: '04:00' },
  { name: '05:00' },
  { name: '06:00' },
  { name: '07:00' },
  { name: '08:00' },
  { name: '09:00' },
  { name: '10:00' },
  { name: '11:00' },
  { name: '12:00' },
  { name: '13:00' },
  { name: '14:00' },
  { name: '15:00' },
  { name: '16:00' },
  { name: '17:00' },
  { name: '18:00' },
  { name: '19:00' },
  { name: '20:00' },
  { name: '21:00' },
  { name: '22:00' },
  { name: '23:00' },
]

interface SpecialBusinessHoursEditorProps {
  specialTimePeriodsProps: SpecialTimePeriod[]
}

export const SpecialBusinessHoursEditor = ({
  specialTimePeriodsProps,
}: SpecialBusinessHoursEditorProps) => {
  const [specialTimePeriods, setSpecialTimePeriods] = useState<SpecialTimePeriod[]>([])
  const handleAddPeriod = () => {
    setSpecialTimePeriods([
      ...specialTimePeriods,
      {
        openDate: new Date(),
        openTime: '00:00',
        closeDate: new Date(),
        closeTime: '00:00',
        closed: false,
      },
    ])
  }
  useEffect(() => {
    if (!specialTimePeriodsProps) return
    setSpecialTimePeriods(specialTimePeriodsProps)
  }, [specialTimePeriodsProps])

  useEffect(() => {
    console.log(specialTimePeriods)
  }, [specialTimePeriods])

  return (
    <YStack gap={32}>
      <XStack gap={32}>
        <CustomButton icon={<Plus />} onPress={handleAddPeriod}>
          Ajouter une horaire
        </CustomButton>
      </XStack>
      {specialTimePeriods.map((period, index) => {
        return (
          <DayContainer key={index}>
            <XStack alignItems="center" gap={32} f={1}>
              <DatePicker
                minDate={new Date()}
                value={period.openDate}
                onChange={(date) => {
                  const newSpecialTimePeriods = [...specialTimePeriods]
                  newSpecialTimePeriods[index].openDate = date as Date
                  setSpecialTimePeriods(newSpecialTimePeriods)
                }}
              />
              <XStack gap={16}>
                <Switch
                  backgroundColor={'#CDF463'}
                  size={'$3'}
                  defaultChecked={true}
                  onCheckedChange={(checked) => {
                    const newSpecialTimePeriods = [...specialTimePeriods]
                    newSpecialTimePeriods[index].closed = !checked
                    setSpecialTimePeriods(newSpecialTimePeriods)
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
                    value={period.openTime}
                    onChange={(time) => {
                      const newSpecialTimePeriods = [...specialTimePeriods]
                      newSpecialTimePeriods[index].openTime = time
                      setSpecialTimePeriods(newSpecialTimePeriods)
                    }}
                    iconAfter={<Clock />}
                  />

                  <CustomSelect
                    width={'49%'}
                    options={timeOptions}
                    value={period.closeTime}
                    onChange={(time) => {
                      const newSpecialTimePeriods = [...specialTimePeriods]
                      newSpecialTimePeriods[index].closeTime = time
                      setSpecialTimePeriods(newSpecialTimePeriods)
                    }}
                    iconAfter={<Clock />}
                  />
                </XStack>
              )}

              <Button
                icon={<Trash />}
                theme={'red'}
                onPress={() => {
                  const newSpecialTimePeriods = [...specialTimePeriods]
                  newSpecialTimePeriods.splice(index, 1)
                  setSpecialTimePeriods(newSpecialTimePeriods)
                }}
              >
                Supprimer
              </Button>
            </XStack>
          </DayContainer>
        )
      })}
    </YStack>
  )
}
