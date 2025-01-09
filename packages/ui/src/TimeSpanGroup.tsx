import { useEffect, useState } from 'react'
import { Button, styled, XStack } from 'tamagui'

const StyledButton = styled(Button, {
  backgroundColor: 'white',
  color: '#64748B',
  borderRadius: 5,
  borderWidth: 0,

  hoverStyle: {
    backgroundColor: '#F1F7FF',
    color: '#377DDF',
    borderWidth: 0,
  },
  pressStyle: {
    backgroundColor: '#d9e9ff',
    color: '#377DDF',
    borderWidth: 0,
  },
  variants: {
    active: {
      true: {
        backgroundColor: '#F1F7FF',
        color: '#377DDF',
        borderWidth: 0,
      },
    },
  } as const,
})

interface TimeSpanGroupProps {
  onTimeSpanChange: (timeSpan: 'daily' | 'weekly' | 'monthly' | 'total') => void
  totalEnabled?: boolean
}

export const TimeSpanGroup = ({
  onTimeSpanChange = () => {},
  totalEnabled = false,
}: TimeSpanGroupProps) => {
  const [timeSpanSelected, setTimeSpanSelected] = useState<
    'daily' | 'weekly' | 'monthly' | 'total'
  >('daily')

  useEffect(() => {
    onTimeSpanChange(timeSpanSelected)
  }, [timeSpanSelected])

  return (
    <XStack gap={8}>
      <StyledButton
        active={timeSpanSelected === 'daily'}
        onPress={() => setTimeSpanSelected('daily')}
      >
        Hebdo
      </StyledButton>
      <StyledButton
        active={timeSpanSelected === 'weekly'}
        onPress={() => setTimeSpanSelected('weekly')}
      >
        Mensuel
      </StyledButton>
      <StyledButton
        active={timeSpanSelected === 'monthly'}
        onPress={() => setTimeSpanSelected('monthly')}
      >
        Semestriel
      </StyledButton>
      {totalEnabled && (
        <StyledButton
          active={timeSpanSelected === 'total' && totalEnabled}
          onPress={() => setTimeSpanSelected('total')}
        >
          Total
        </StyledButton>
      )}
    </XStack>
  )
}
