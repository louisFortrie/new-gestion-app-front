import { BarChart, DoughnutChartCard, GraphCard, LineChart } from '@my/ui'
import {
  Clock,
  Eye,
  Laptop,
  MapPin,
  MessagesSquare,
  Phone,
  PieChart,
  Star,
} from '@tamagui/lucide-icons'
import { Text, XStack, Stack, YStack, styled } from 'tamagui'
import useStores from 'app/hooks/useStores'
import { useEffect, useState } from 'react'
import useAuth from 'app/hooks/useAuth'
import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

const HeadCard = styled(XStack, {
  gap: 16,
  backgroundColor: 'white',
  padding: '$4',
  borderRadius: '$4',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: 'calc(50% - 16px)',
})

const IconContainer = styled(Stack, {
  borderRadius: '$4',
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  padding: '$3',
  height: 'fit-content',
  width: 'auto',
  aspectRatio: 1,
})

interface ReviewResponseMetrics {
  averageResponseTimeHours: number
  respondedReviews: number
  responseRate: number
  totalReviews: number
}

export const DashboardScreen = () => {
  const { selectedStore, loading } = useStores()
  const { user } = useAuth()
  const [metrics, setMetrics] = useState<ReviewResponseMetrics>({
    averageResponseTimeHours: 0,
    respondedReviews: 0,
    responseRate: 0,
    totalReviews: 0,
  })
  const [groupedReviews, setGroupedReviews] = useState<any>({
    daily: {
      current: {
        oneStar: 0,
        twoStar: 0,
        threeStar: 0,
        fourStar: 0,
        fiveStar: 0,
      },
    },
    weekly: {
      current: {
        oneStar: 0,
        twoStar: 0,
        threeStar: 0,
        fourStar: 0,
        fiveStar: 0,
      },
    },
    monthly: {
      current: {
        oneStar: 0,
        twoStar: 0,
        threeStar: 0,
        fourStar: 0,
        fiveStar: 0,
      },
    },
  })

  useEffect(() => {
    if (!selectedStore || !user || user.googleAccounts.length === 0 || loading) return
    console.log(user)
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

    axios
      .get(
        `${apiUrl}/api/gestion/groupedReviews/${user.googleAccounts[0].googleAccount.accountId}/${selectedStore.name.split('/')[1]}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setGroupedReviews(response.data)
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des métriques:', error)
      })

    axios.get(
      `${apiUrl}/api/gestion/ratingEvolution/${user.googleAccounts[0].googleAccount.accountId}/${selectedStore.name.split('/')[1]}`,
      {
        withCredentials: true,
      }
    )
  }, [loading])

  const data = {
    labels: ['Rouge', 'Bleu', 'Jaune'],
    datasets: [
      {
        label: 'Votes',
        data: [12, 19, 3],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderWidth: 1,
      },
    ],
  }

  const AverageGoogleratingLineData = {
    // Données du graphique
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Ventes 2024',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: '#17B26A',
        backgroundColor: (context) => {
          const chart = context.chart
          const { ctx, chartArea } = chart

          if (!chartArea) {
            return null // Retourne null tant que le chartArea n'est pas calculé
          }

          // Crée un gradient avec les couleurs spécifiées
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
          gradient.addColorStop(0, 'rgba(117, 224, 167, 0.5)') // Couleur au sommet
          gradient.addColorStop(1, 'rgba(173, 230, 200, 0.2)') // Couleur à la base
          return gradient
        },
        tension: 0.4, // Lissage des lignes (0 pour lignes droites)
        fill: true,
      },
    ],
  }

  return (
    <YStack gap={32}>
      <Text>Dashboard</Text>
      <XStack height={270} gap={16}>
        {/* TODO faire un composant HeadCard */}
        <HeadCard
          height={'100%'}
          backgroundImage={`url(${selectedStore?.medias[0]?.googleUrl})`}
          backgroundSize="cover"
          backgroundPosition="center"
          width={'35%'}
        ></HeadCard>
        <YStack f={1} gap={16}>
          <XStack f={1} gap={16}>
            <HeadCard>
              <IconContainer>
                <Clock></Clock>
              </IconContainer>
              <YStack gap={8}>
                <Text>Nombre total d'avis</Text>
                <Text fontSize={32} fontWeight={600}>
                  {selectedStore?.reviews?.totalReviewCount}
                </Text>
              </YStack>
            </HeadCard>
            <HeadCard backgroundColor={'#C8DCFF'}>
              <IconContainer>
                <Clock color={'#3B82F6'}></Clock>
              </IconContainer>
              <YStack gap={8}>
                <Text>Temps de réponse moyen</Text>
                <Text fontSize={32} fontWeight={600}>
                  {metrics.averageResponseTimeHours} H
                </Text>
              </YStack>
            </HeadCard>
          </XStack>
          <XStack f={1} gap={16}>
            <HeadCard backgroundColor={'#C5F4F7'}>
              <IconContainer>
                <Clock></Clock>
              </IconContainer>
              <YStack gap={8}>
                <Text>Note moyenne</Text>
                <Text fontSize={32} fontWeight={600}>
                  {Math.round(selectedStore?.reviews?.averageRating * 10) / 10}
                </Text>
              </YStack>
            </HeadCard>
            <HeadCard backgroundColor={'#BBF6D7'}>
              <IconContainer>
                <Clock></Clock>
              </IconContainer>
              <YStack>
                <Text>Taux de réponse</Text>
                <Text fontSize={32} fontWeight={600}>
                  {metrics.responseRate}%
                </Text>
              </YStack>
            </HeadCard>
          </XStack>
        </YStack>
      </XStack>
      <YStack>
        <XStack gap={16}>
          <DoughnutChartCard
            title="Répartition de la note moyenne"
            dataProps={groupedReviews}
            icon={<Star size={20} color={'#94A3B8'}></Star>}
          ></DoughnutChartCard>
          {/* <DoughnutChartCard
            title="Répartition du taux de réponse"
            dataProps={data}
            icon={<PieChart size={20} color={'#94A3B8'}></PieChart>}
          ></DoughnutChartCard> */}
        </XStack>
      </YStack>
      <YStack f={1} gap={16} width={'100%'}>
        <XStack f={1} gap={16} width={'100%'}>
          <GraphCard
            title="Evolution de la note moyenne"
            icon={<Star size={20} color={'#94A3B8'} />}
            graph={<LineChart dataprops={AverageGoogleratingLineData}></LineChart>}
          ></GraphCard>
          <GraphCard
            title="Cliques généré vers le site web"
            icon={<Laptop size={20} color={'#94A3B8'} />}
            graph={<BarChart></BarChart>}
          ></GraphCard>
          <GraphCard
            title="Vue de la page"
            icon={<Eye size={20} color={'#94A3B8'} />}
            graph={<LineChart dataprops={AverageGoogleratingLineData}></LineChart>}
          ></GraphCard>
        </XStack>
        <XStack f={1} gap={16} width={'100%'}>
          <GraphCard
            title='Cliques sur "itinéraire"'
            icon={<MapPin size={20} color={'#94A3B8'} />}
            graph={<LineChart dataprops={AverageGoogleratingLineData}></LineChart>}
          ></GraphCard>
          <GraphCard
            title="Appels téléphoniques"
            icon={<Phone size={20} color={'#94A3B8'} />}
            graph={<LineChart dataprops={AverageGoogleratingLineData}></LineChart>}
          ></GraphCard>
          <GraphCard
            title="Nombre d'avis"
            icon={<MessagesSquare size={20} color={'#94A3B8'} />}
            graph={<LineChart dataprops={AverageGoogleratingLineData}></LineChart>}
          ></GraphCard>
        </XStack>
      </YStack>
    </YStack>
  )
}
