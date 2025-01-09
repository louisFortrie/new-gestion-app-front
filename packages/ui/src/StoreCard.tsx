import { Text, YStack, YStackProps, styled, Stack, XStack, Popover, Button, Image } from 'tamagui'
import { MoreVertical, StarFull } from '@tamagui/lucide-icons'
import { useEffect } from 'react'
import axios from 'axios'
import useAuth from 'app/hooks/useAuth'

const Card = styled(YStack, {
  borderWidth: 2,
  borderColor: '#F1F5F9',
  borderRadius: '$4',
  backgroundColor: 'white',
  padding: '$4',
  width: 'calc(100% / 5 - 12px)',
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
  locationId: string
  title: string
  averageRating: number
  totalReviews: number
  accountId : string
  address : string
  locality : string
  imageUrl?: string
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const StoreCard = ({
  locationId,
  title,
  averageRating,
  totalReviews,
  imageUrl,
  accountId,
  address,
  locality,
  ...props
}: StoreCardProps) => {
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    axios
      .get(
        `${apiUrl}/api/gestionStore/checkIfStoreExists/locationId/${locationId}/accountId/${accountId}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des avis:', error)
      })
  }, [user])

  return (
    <Card {...props}>
      <CoverContainer
        backgroundImage={`url(${imageUrl})`}
        backgroundSize="cover"
        backgroundPosition="center"
      ></CoverContainer>
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
      <Text fontSize={14}>{address}, {locality}</Text>
      
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
