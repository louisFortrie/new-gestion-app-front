import { XStack, Text, styled, XStackProps } from 'tamagui'
import { ArrowDown, ArrowUp, Equal } from '@tamagui/lucide-icons'

interface GraphCardProps extends XStackProps{
 currValue: number
  prevValue: number
}

const Container = styled(XStack, {
  gap: 8,
  padding: '$2',
  borderRadius: '$4',
  alignItems: 'center',
})

export const EvolutionGraphIndicator = ({currValue, prevValue, ...props} : GraphCardProps) => {
  const diff = currValue - prevValue
  const diffPercent = Math.round(diff / prevValue * 100)
  const backgroundColor =  diff > 0 ? "#ECFDF3" : diff === 0 ? "#F1F5F9" : "#FFFAEB"
  const color = diff > 0 ? "#17B26A" : diff === 0 ? "#0F172A" : "#F04438"
  const displayIcon = diff > 0 ? <ArrowUp color={"#17B26A"} /> : diff === 0 ? <Equal color={'#0F172A'}/> : <ArrowDown  color={"#F04438"}/>
  
  return <Container backgroundColor={backgroundColor} {...props}>
    <Text fontSize={16} fontWeight={600} color={'#0F172A'}>{currValue}</Text>
    <XStack gap={8} alignItems='center' backgroundColor={'white'} borderRadius={'$3'} paddingHorizontal={'$2'} >
      {displayIcon}
      <Text fontSize={13} fontWeight={500} color={ color}>{diffPercent}%</Text>
    </XStack>
  </Container>
}
