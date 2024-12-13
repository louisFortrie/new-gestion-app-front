'use client'

import { useEffect, useState } from 'react'
import { Input, styled, InputProps, XStack, Label } from 'tamagui'

interface CustomInputProps extends InputProps {
  PreIcon?: React.ReactNode
  PostIcon?: React.ReactNode
}

const StyledInput = styled(Input, {
  width: '100%',
  backgroundColor: 'white',
  color: 'black',
  placeholderTextColor: '#475569',
  margin: '$0',
  borderRadius: 100,
  borderColor: 'transparent',
  hoverStyle: {
    borderColor: 'transparent',
    outlineColor: 'transparent',
  },
  focusStyle: {
    borderColor: 'transparent',
    outlineColor: 'transparent',
  },
  focusVisibleStyle: {
    borderColor: 'transparent',
    outlineColor: 'transparent',
  },
})

export const CustomInput: React.FC<CustomInputProps> = ({ PreIcon, PostIcon, ...props }) => {
  const [isFocused, setIsFocused] = useState(false)
  useEffect(() => {
    console.log('isFocused', isFocused)
  }, [isFocused])
  return (
    <XStack
      alignItems="center"
      style={{
        backgroundColor: 'white',
        borderRadius: 10,
        padding: '0 10px',
        borderColor: isFocused ? '#475569' : '#E2E8F0',
        borderWidth: 2,
        flex : 1
      }}
    >
      <Label htmlFor="Input"> {PreIcon && <XStack marginRight="$2">{PreIcon}</XStack>} </Label>
      <StyledInput
        {...props}
        id="Input"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Label htmlFor="Input">{PostIcon && <XStack marginLeft="$2">{PostIcon}</XStack>} </Label>
    </XStack>
  )
}
