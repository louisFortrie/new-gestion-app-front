import { useState } from 'react'
import { Button, styled, XStack } from 'tamagui'

const StyledButton = styled(Button, {
  backgroundColor: 'white',
  color: '#64748B',
  borderRadius: 5,
  border: 'none',

  hoverStyle: {
    backgroundColor: '#F1F7FF',
    color: '#377DDF',
    border: 'none',
  },
  pressStyle: {
    backgroundColor: '#d9e9ff',
    color: '#377DDF',
    border: 'none',
  },
  variants: {
    active: {
      true: {
        backgroundColor: '#F1F7FF',
        color: '#377DDF',
        border: 'none',
      },
    },
  } as const,
})

interface TimeSpanGroupProps {
  onTimeSpanChange: (timeSpan: 'daily' | 'weekly' | 'monthly') => void
}

export const TimeSpanGroup = ({ onTimeSpanChange }: TimeSpanGroupProps) => {
  const [timeSpanSelected, setTimeSpanSelected] = useState<'daily' | 'weekly' | 'monthly'>('daily')

  return (
    <XStack gap={8}>
      <StyledButton
        active={timeSpanSelected === 'daily'}
        onPress={() => setTimeSpanSelected('daily')}
      >
        Jour
      </StyledButton>
      <StyledButton
        active={timeSpanSelected === 'weekly'}
        onPress={() => setTimeSpanSelected('weekly')}
      >
        Semaine
      </StyledButton>
      <StyledButton
        active={timeSpanSelected === 'monthly'}
        onPress={() => setTimeSpanSelected('monthly')}
      >
        Mois
      </StyledButton>
    </XStack>
  )
}
