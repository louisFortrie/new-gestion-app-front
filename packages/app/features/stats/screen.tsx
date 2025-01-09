import { H1, H3, H4, Text, YStack, XStack } from 'tamagui'
import { ReviewTable, StatsCard, TableLoadingSkeleton } from '@my/ui'
import { Check, MessagesSquare, Clock, Reply, ArrowUp } from '@tamagui/lucide-icons'
import useStores from 'app/hooks/useStores'
import { useEffect, useState } from 'react'
import useAuth from 'app/hooks/useAuth'
import axios from 'axios'

interface ReviewResponseMetrics {
  averageResponseTime: number
  responseRate: number
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL
export const StatsScreen = () => {
  const { user } = useAuth()
  const { selectedStore } = useStores(false)
  const [reviews, setReviews] = useState<any[]>([])
  const [reviewsLoading, setReviewsLoading] = useState(true)
  const [metrics, setMetrics] = useState<ReviewResponseMetrics>({
    averageResponseTime: 0,
    responseRate: 0,
  })
  const [nextPageToken, setNextPageToken] = useState<string | null>(null)
  const [totalReviews, setTotalReviews] = useState(0)

  const fetchReviews = async (pageToken: string | null = null) => {
    const response = await axios.get(
      `${apiUrl}/api/gestion/getReviews/${selectedStore.accountId}/${selectedStore.name.split('/')[1]}${pageToken ? '?pageToken=' + pageToken : ''}`,
      {
        withCredentials: true,
      }
    )
    setReviews((prev) => [...prev, ...response.data.reviews])
    // setTotalReviews(response.data.totalReviews)
    setNextPageToken(response.data.pageToken)
    if (response.data.pageToken) {
      fetchReviews(response.data.pageToken)
    }
  }

  const handlePageChange = (page) => {
    // console.log('page', page, nextPageToken)
    // const totalPages = Math.ceil(reviews.length / 10)
    // if (page > totalPages && nextPageToken) {
    //   fetchReviews(nextPageToken)
    // }
  }

  useEffect(() => {
    if (!selectedStore || !user) return
    console.log('use effect reviews')

    axios
      .get(`${apiUrl}/api/gestionStore/storeMetrics/${selectedStore.name.split('/')[1]}`, {
        withCredentials: true,
      })
      .then((response) => {
        setMetrics(response.data)
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des métriques:', error)
      })
    setReviewsLoading(true)
    // axios
    //   .get(
    //     `${apiUrl}/api/gestion/getReviews/${selectedStore.accountId}/${selectedStore.name.split('/')[1]}${nextPageToken ? '?pageToken=' + nextPageToken : ''}`,
    //     {
    //       withCredentials: true,
    //     }
    //   )
    //   .then((response) => {
    //     setReviews(response.data)
    //     console.log(response.data)
    //     setReviewsLoading(false)
    //     response.data.pageToken ? setNextPageToken(response.data.pageToken) : setNextPageToken(null)
    //   })
    //   .catch((error) => {
    //     console.error('Erreur lors de la récupération des avis:', error)
    //   })
    fetchReviews()
    setReviewsLoading(false)

    setTotalReviews(selectedStore.reviews.totalReviewCount)
    // axios.get
    // setReviews(selectedStore.reviews.reviews)
  }, [selectedStore])

  return (
    <YStack gap={32}>
      <YStack gap={16}>
        <H4>Visualisation des performances</H4>
        <XStack f={1} gap={16}>
          <StatsCard
            title="Total des avis reçus"
            value={totalReviews}
            backgroundColor={'#E3DEFF'}
            f={1}
            icon={<MessagesSquare color={'#9333EA'} />}
          />
          <StatsCard
            title="Temps de réponse moyen"
            value={
              metrics.averageResponseTime > 2160
                ? `${Math.floor(metrics.averageResponseTime / 168)} Sem.`
                : metrics.averageResponseTime > 24
                  ? `${Math.floor(metrics.averageResponseTime / 24)} J`
                  : `${metrics.averageResponseTime} H`
            }
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
            title="Avis sans réponse"
            value={`${Math.round(totalReviews * (1 - metrics.responseRate / 100))}`}
            backgroundColor={'#BBF6D7'}
            f={1}
            icon={<ArrowUp color={'#10B981'} />}
          />
        </XStack>
      </YStack>
      {reviewsLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <ReviewTable
          pageChange={handlePageChange}
          totalCount={totalReviews}
          reviews={reviews}
        ></ReviewTable>
      )}
    </YStack>
  )
}
