import { Text, styled, YStack, XStack, Group, Stack } from 'tamagui'
import { EvolutionGraphIndicator, TimeSpanGroup } from '@my/ui'

const Card = styled(Group, {
  gap: 16,
  backgroundColor: 'white',
  borderRadius: '$4',
  borderWidth: 1,
  borderColor: '#F1F5F9',
  justifyContent: 'space-between',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',

  flex: 1,
})

interface GraphCardProps {
  title: string
  graph: React.ReactNode
  prevValue?: number
  currValue?: number
  onTimeSpanChange?: (timeSpan: 'daily' | 'weekly' | 'monthly' | 'total') => void
  icon?: React.ReactNode
  totalEnabled?: boolean
}

export const GraphCard = ({
  title,
  graph,
  onTimeSpanChange = () => {},
  icon,
  prevValue,
  currValue,
  totalEnabled = false
}: GraphCardProps) => {
  return (
    <Card>
      <XStack
        justifyContent="flex-start"
        f={1}
        paddingVertical={'$3'}
        paddingHorizontal={'$4'}
        alignItems="center"
        gap={16}
        width={'100%'}
        borderBottomColor={'#E2E8F0'}
        borderBottomWidth={1}
      >
        {icon}
        <Text fontWeight={600} fontSize={18} color={'#0F172A'}>
          {title}
        </Text>
      </XStack>
      <XStack
        borderBottomWidth={1}
        borderBottomColor={'#E2E8F0'}
        f={1}
        width={'100%'}
        paddingBottom={16}
        alignItems="center"
        justifyContent="center"
      >
        <TimeSpanGroup
        totalEnabled={totalEnabled}
          onTimeSpanChange={(timespan) => onTimeSpanChange && onTimeSpanChange(timespan)}
        ></TimeSpanGroup>
      </XStack>
      <EvolutionGraphIndicator
        alignSelf="flex-start"
        prevValue={prevValue || 0}
        currValue={currValue || 0}
        marginLeft={16}
      ></EvolutionGraphIndicator>
      <Stack paddingVertical={'$3'} paddingHorizontal={'$6'} width={'100%'} gap={16} height={300}>
        {graph}
      </Stack>
    </Card>
  )
}
