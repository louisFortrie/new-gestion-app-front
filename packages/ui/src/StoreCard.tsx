import { Text, YStack, YStackProps, styled, Stack, XStack, Popover, Button, Image  } from 'tamagui'
import { MoreVertical, StarFull } from '@tamagui/lucide-icons'

const Card = styled(YStack, {
  borderWidth: 2,
  borderColor: '#F1F5F9',
  borderRadius: '$4',
  backgroundColor: 'white',
  padding: '$4',
  width: 'calc(100% / 4 - 12px)',
  gap: 16,
  transition: 'all 0.2s',
  hoverStyle: {
    borderWidth: 2,
    borderColor: '#CDF463',
    cursor: 'pointer',
  },
})

const CoverContainer = styled(Stack, {
  borderRadius: '$4',
  aspectRatio: '1/1',
  width: '100%',
  height: 'auto',
  backgroundColor: 'lightgray',
})
interface StoreCardProps extends YStackProps {
  title: string
  averageRating: number
  totalReviews: number
  imageUrl ?: string
}
export const StoreCard = ({ title, averageRating, totalReviews, imageUrl, ...props }: StoreCardProps) => {
  return (
    <Card {...props}>
      <CoverContainer backgroundImage={`url(${imageUrl})`} backgroundSize="cover" backgroundPosition="center">
       

      </CoverContainer>
      <XStack justifyContent="space-between">
        <Text fontSize={18} color={'#020617'} fontWeight={600}>
          {title}
        </Text>
        {/* <Popover >
          <Popover.Trigger>
            <MoreVertical size={'$1'}></MoreVertical>
          </Popover.Trigger>

           <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
      >
            <Popover.Arrow borderWidth={1} borderColor="$borderColor" />

        

      </Popover.Content>
        </Popover > */}
      </XStack>
      <XStack alignItems="center" gap={3}>
        <StarFull size={'$1'} color={'orange'}></StarFull>
        <Text fontSize={14} fontWeight={500}>
          {averageRating}
        </Text>
        <Text fontSize={14} color={'#64748B'}>
          ({totalReviews})
        </Text>
      </XStack>
    </Card>
  )
}
