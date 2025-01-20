import { useState } from 'react'
import { XStack, Button, styled } from 'tamagui'
import { StarFull } from '@tamagui/lucide-icons'

interface StarRatingFilterProps {
  onChange: (value: number) => void
  value: number
}

const StyledButton = styled(Button, {
  backgroundColor: 'transparent',
  borderWidth: 0,
  padding: 0,
  margin: 0,
  cursor: 'pointer',
  hoverStyle: {
    backgroundColor: 'transparent',
  },
  pressStyle: {
    backgroundColor: 'transparent',
  },
})

export const StarRatingFilter = ({ onChange, value }: StarRatingFilterProps) => {
  const [rating, setRating] = useState(value)

  const handleRating = (newRating: number) => {
    setRating(newRating)
    onChange(newRating)
  }

  return (
    <XStack justifyContent="space-between">
      {[1, 2, 3, 4, 5].map((star) => (
        <StyledButton
          icon={<StarFull size={'$2'} color={star <= rating ? 'gold' : 'gray'} />}
          key={star}
          onPress={() => handleRating(star)}
        />
      ))}
    </XStack>
  )
}
