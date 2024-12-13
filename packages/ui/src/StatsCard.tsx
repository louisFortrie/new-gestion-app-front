import { H2, YStack, YStackProps, styled, H3, Stack, Text, H4 } from 'tamagui'

interface StatsCardProps extends YStackProps {
  title: string
  value: string | number
  icon: React.ReactNode
}

const StyledYStack = styled(YStack, {
  paddingHorizontal: '$7',
  paddingVertical: '$4',
  borderRadius: '$6',
  width: '100%',
  height: 'fit-content',
  gap: '$2',
})

const IconContainer = styled(Stack, {
  justifyContent: 'flex-end',
  alignItems: 'center',
  borderRadius: '$4',
  backgroundColor: 'white',
  padding: '$3',
  width: 'fit-content',
  marginBottom: '$3',
  boxShadow: '0px 4px 4px 0px #0000000D',
})

export const StatsCard = ({ title, value, icon, ...props }: StatsCardProps) => {
  return (
    <StyledYStack {...props}>
      <IconContainer>{icon}</IconContainer>
      <Text color={'black'} fontSize={18} alignSelf="flex-start">
        {title}
      </Text>
      <H4 fontWeight={'600'} fontSize={32}>
        {value}
      </H4>
    </StyledYStack>
  )
}
