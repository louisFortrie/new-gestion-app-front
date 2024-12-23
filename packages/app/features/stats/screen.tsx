import { H1, H3, H4, Text, YStack, XStack } from 'tamagui'
import { ReviewTable, StatsCard } from '@my/ui'
import { Check, MessagesSquare, Clock, Reply, ArrowUp } from '@tamagui/lucide-icons'
import useStores from 'app/hooks/useStores'
import { useEffect, useState } from 'react'
import useAuth from 'app/hooks/useAuth'
import axios from 'axios'

interface ReviewResponseMetrics {
  averageResponseTimeHours: number
  respondedReviews: number
  responseRate: number
  totalReviews: number
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL
export const StatsScreen = () => {
  const { user } = useAuth()
  const { selectedStore, loading } = useStores()
  const [reviews, setReviews] = useState<any[]>([])
  const [metrics, setMetrics] = useState<ReviewResponseMetrics>({
    averageResponseTimeHours: 0,
    respondedReviews: 0,
    responseRate: 0,
    totalReviews: 0,
  })

  useEffect(() => {
    if (!selectedStore || !user || loading) return
    axios
      .get(
        `${apiUrl}/api/gestion/metrics/${user.googleAccounts[0].googleAccount.accountId}/${selectedStore.name.split('/')[1]}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setMetrics(response.data)
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des métriques:', error)
      })
    setReviews(selectedStore.reviews.reviews)
  }, [selectedStore, user, loading])
  return (
    <YStack gap={32}>
      <YStack gap={16}>
        <H4>Visualisation des performances</H4>
        <XStack f={1} gap={16}>
          <StatsCard
            title="Total des avis reçus"
            value={metrics.totalReviews}
            backgroundColor={'#E3DEFF'}
            f={1}
            icon={<MessagesSquare color={'#9333EA'} />}
          />
          <StatsCard
            title="Temps de réponse moyen"
            value={`${metrics.averageResponseTimeHours}h`}
            backgroundColor={'#C8DCFF'}
            f={1}
            icon={<Clock color={'#3B82F6'} />}
          />
          <StatsCard
            title="Taux de réponse"
            value={`${metrics.responseRate}%`}
            backgroundColor={'#C5F4F7'}
            f={1}
            icon={<Reply color={'#06B6D4'} />}
          />
          <StatsCard
            title="Change"
            value={'+10%'}
            backgroundColor={'#BBF6D7'}
            f={1}
            icon={<ArrowUp color={'#10B981'} />}
          />
        </XStack>
      </YStack>
      <ReviewTable reviews={reviews}></ReviewTable>
    </YStack>
  )
}
