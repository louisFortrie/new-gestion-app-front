import { BarChart, DoughnutChartCard, GraphCard, LineChart } from '@my/ui'
import {
  Clock,
  Eye,
  Laptop,
  MapPin,
  MessageSquare,
  MessagesSquare,
  Phone,
  PieChart,
  Reply,
  Star,
  StarFull,
} from '@tamagui/lucide-icons'
import { Text, XStack, Stack, YStack, styled, H2, H3 } from 'tamagui'
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
  const { selectedStore, loading } = useStores(false)
  const { user } = useAuth()
  const [metrics, setMetrics] = useState<ReviewResponseMetrics>({
    averageResponseTimeHours: 0,
    respondedReviews: 0,
    responseRate: 0,
    totalReviews: 0,
  })
  const [groupedReviews, setGroupedReviews] = useState<any>({
    daily: {
      comparison: {
        current: {
          oneStar: 0,
          twoStars: 0,
          threeStars: 0,
          fourStars: 0,
          fiveStars: 0,
        },
      },
    },
    weekly: {
      comparison: {
        current: {
          oneStar: 0,
          twoStars: 0,
          threeStars: 0,
          fourStars: 0,
          fiveStars: 0,
        },
      },
    },
    monthly: {
      comparison: {
        current: {
          oneStar: 0,
          twoStars: 0,
          threeStars: 0,
          fourStars: 0,
          fiveStars: 0,
        },
      },
    },
  })

  const [googleMetrics, setGoogleMetrics] = useState<any>(undefined)

  const [gestionStoreMetrics, setGestionStoreMetrics] = useState<any>({
    averageResponseTime: 0,
    responseRate: 0,
    metric: {
      daily: {
        comparison: {
          current: [],
          previous: [],
        },
      },
      weekly: {
        comparison: {
          current: [],
          previous: [],
        },
      },
      monthly: {
        comparison: {
          current: [],
          previous: [],
        },
      },
    },
  })
  useEffect(() => {
    // if (!selectedStore || !user || user.googleAccounts.length === 0 || loading) return
    console.log(selectedStore)

    if (!selectedStore) return
    axios
      .get(`${apiUrl}/api/gestionStore/storeMetrics/${selectedStore.name.split('/')[1]}`, {
        withCredentials: true,
      })
      .then((response) => {
        setGestionStoreMetrics(response.data)
        if(response.data.googleRatingGrouped.daily ) 
        setGroupedReviews(response.data.googleRatingGrouped)
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des métriques:', error)
      })

    axios
      .get(
        `${apiUrl}/api/mybusiness/locations/${selectedStore.name.split('/')[1]}/metrics/${selectedStore.accountId}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data)
        setGoogleMetrics(response.data)
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des métriques:', error)
      })
  }, [selectedStore])

  // useEffect(() => {
  //   if (!selectedStore || !user || user.googleAccounts.length === 0 || loading) return
  //   console.log(user)
  //   axios
  //     .get(
  //       `${apiUrl}/api/gestion/metrics/${user.googleAccounts[0].googleAccount.accountId}/${selectedStore.name.split('/')[1]}`,
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((response) => {
  //       setMetrics(response.data)
  //       console.log(response.data)
  //     })
  //     .catch((error) => {
  //       console.error('Erreur lors de la récupération des métriques:', error)
  //     })

  //   axios
  //     .get(
  //       `${apiUrl}/api/gestion/groupedReviews/${user.googleAccounts[0].googleAccount.accountId}/${selectedStore.name.split('/')[1]}`,
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((response) => {
  //       setGroupedReviews(response.data)
  //       console.log(response.data)
  //     })
  //     .catch((error) => {
  //       console.error('Erreur lors de la récupération des métriques:', error)
  //     })

  //   // axios.get(
  //   //   `${apiUrl}/api/gestion/ratingEvolution/${user.googleAccounts[0].googleAccount.accountId}/${selectedStore.name.split('/')[1]}`,
  //   //   {
  //   //     withCredentials: true,
  //   //   }
  //   // )

  //   axios
  //     .get(`${apiUrl}/api/mybusiness/locations/${selectedStore.name.split('/')[1]}/metrics`, {
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       console.log(response.data)
  //       setGoogleMetrics(response.data)
  //     })
  //     .catch((error) => {
  //       console.error('Erreur lors de la récupération des métriques:', error)
  //     })
  // }, [loading])

  // useEffect(() => {
  //   if (!selectedStore || !user || user.googleAccounts.length === 0 || loading) return
  //   axios.get(
  //     `${apiUrl}/api/gestion/account/${user.googleAccounts[0].googleAccount.accountId}/location/${selectedStore.name.split('/')[1]}/store/${selectedStore.id}/initialize`,
  //     {
  //       withCredentials: true,
  //     }
  //   )
  // }, [loading])

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

  const [averageRatingEvolutionChartData, setAverageRatingEvolutionChartData] = useState<{
    labels: string[]
    datasets: {
      label: string
      data: number[]
      borderColor: string
      backgroundColor: any
      tension: number
      fill: boolean
    }[]
  }>({
    labels: [],
    datasets: [],
  })
  const [selectedPeriodRatingEvolution, setSelectedPeriodRatingEvolution] = useState<
    'daily' | 'weekly' | 'monthly' | 'total'
  >('daily')

  useEffect(() => {
    console.log(gestionStoreMetrics, 'gestionStoreMetrics')
    if (gestionStoreMetrics.metric.daily.comparison.current.length == 0) return

    const getMetricData = (period) => {
      switch (period) {
        case 'daily':
          return gestionStoreMetrics.metric.daily.comparison.current
        case 'weekly':
          return gestionStoreMetrics.metric.weekly.comparison.current
        case 'monthly':
          return gestionStoreMetrics.metric.monthly.comparison.current
        case 'total':
          return gestionStoreMetrics.metric.totalByMonths.data
        default:
          return gestionStoreMetrics.metric.daily.comparison.current
      }
    }

    const metricData = getMetricData(selectedPeriodRatingEvolution)

    console.log(metricData)

    setAverageRatingEvolutionChartData({
      labels: metricData.map((item: any) => item.key),
      datasets: [
        {
          label: 'Note moyenne',
          data: metricData.map((item: any) => item.value.average),
          borderColor: '#17B26A',
          backgroundColor: (context) => {
            const chart = context.chart
            const { ctx, chartArea } = chart

            if (!chartArea) {
              return null // Retourne null tant que le chartArea n'est pas calculé
            }

            // Crée un gradient avec les couleurs spécifiées
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
            gradient.addColorStop(0, 'rgba(23, 178, 106, 0.3)') // Couleur au sommet
            gradient.addColorStop(1, 'rgba(23, 178, 106, 0.1)') // Couleur à la base
            return gradient
          },
          tension: 0.4,
          fill: true,
        },
      ],
    })
  }, [gestionStoreMetrics, selectedPeriodRatingEvolution])

  const [selectedPeriodTotalReviews, setSelectedPeriodTotalReviews] = useState<
    'daily' | 'weekly' | 'monthly' | 'total'
  >('daily')
  const [chartDataTotalReviews, setChartDataTotalReviews] = useState<{
    labels: string[]
    datasets: {
      label: string
      data: number[]
      borderColor: string
      backgroundColor: any
      tension: number
      fill: boolean
    }[]
  }>({ labels: [], datasets: [] })

  useEffect(() => {
    console.log(gestionStoreMetrics, 'gestionStoreMetrics')
    if (gestionStoreMetrics.metric.daily.comparison.current.length == 0) return

    const getMetricData = (period) => {
      console.log(period)

      switch (period) {
        case 'daily':
          return gestionStoreMetrics.metric.daily.comparison.current
        case 'weekly':
          return gestionStoreMetrics.metric.weekly.comparison.current
        case 'monthly':
          return gestionStoreMetrics.metric.monthly.comparison.current
        case 'total':
          return gestionStoreMetrics.metric.totalByMonths.data
        default:
          return gestionStoreMetrics.metric.daily.comparison.current
      }
    }

    const metricData = getMetricData(selectedPeriodTotalReviews)

    console.log(metricData)

    setChartDataTotalReviews({
      labels: metricData.map((item: any) => item.key),
      datasets: [
        {
          label: "Nombre d'avis",
          data: metricData.map((item: any) => item.value.total),
          borderColor: '#17B26A',
          backgroundColor: (context) => {
            const chart = context.chart
            const { ctx, chartArea } = chart

            if (!chartArea) {
              return null // Retourne null tant que le chartArea n'est pas calculé
            }

            // Crée un gradient avec les couleurs spécifiées
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
            gradient.addColorStop(0, 'rgba(23, 178, 106, 0.3)') // Couleur au sommet
            gradient.addColorStop(1, 'rgba(23, 178, 106, 0.1)') // Couleur à la base
            return gradient
          },
          tension: 0.4,
          fill: true,
        },
      ],
    })
  }, [gestionStoreMetrics, selectedPeriodTotalReviews])

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

  const [selectedPeriod, setSelectedPeriod] = useState('daily')
  const [chartData, setChartData] = useState<{
    labels: string[]
    datasets: {
      label: string
      data: number[]
      borderColor: string
      backgroundColor: any
      tension: number
      fill: boolean
    }[]
  }>({ labels: [], datasets: [] })

  useEffect(() => {
    if (!googleMetrics) return
    console.log(googleMetrics)

    const formatDataForChart = () => {
      let dates: string[] = []
      let values: any[] = []

      if (selectedPeriod === 'daily') {
        Object.entries(googleMetrics.metrics.daily.data).forEach(([date, data]) => {
          dates.push(date)
          values.push((data as any).BUSINESS_DIRECTION_REQUESTS)
        })
      } else if (selectedPeriod === 'weekly') {
        Object.entries(googleMetrics.metrics.weekly.data).forEach(([week, data]) => {
          dates.push(week)
          values.push((data as any).BUSINESS_DIRECTION_REQUESTS)
        })
      } else {
        Object.entries(googleMetrics.metrics.monthly.data).forEach(([month, data]) => {
          dates.push(month)
          values.push((data as any).BUSINESS_DIRECTION_REQUESTS)
        })
      }

      setChartData({
        labels: dates,
        datasets: [
          {
            label: 'Demandes de direction',
            data: values,
            borderColor: '#C8DCFF',
            backgroundColor: (context) => {
              const chart = context.chart
              const { ctx, chartArea } = chart

              if (!chartArea) {
                return null // Retourne null tant que le chartArea n'est pas calculé
              }

              // Crée un gradient avec les couleurs spécifiées
              const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
              gradient.addColorStop(0, 'rgba(200, 220, 255, 0.5)') // Couleur au sommet
              gradient.addColorStop(1, 'rgba(200, 220, 255, 0.2)') // Couleur à la base
              return gradient
            },
            tension: 0.4,
            fill: true,
          },
        ],
      })
    }
    formatDataForChart()
  }, [selectedPeriod, googleMetrics])

  const [selectedPeriodCalls, setSelectedPeriodCalls] = useState('daily')
  const [chartDataCalls, setChartDataCalls] = useState<{
    labels: string[]
    datasets: {
      label: string
      data: number[]
      borderColor: string
      backgroundColor: any
      tension: number
      fill: boolean
    }[]
  }>({ labels: [], datasets: [] })

  useEffect(() => {
    if (!googleMetrics) return
    console.log(googleMetrics)

    const formatDataForChart = () => {
      let dates: string[] = []
      let values: any[] = []

      if (selectedPeriodCalls === 'daily') {
        Object.entries(googleMetrics.metrics.daily.data).forEach(([date, data]) => {
          dates.push(date)
          values.push((data as any).CALL_CLICKS)
        })
      } else if (selectedPeriodCalls === 'weekly') {
        Object.entries(googleMetrics.metrics.weekly.data).forEach(([week, data]) => {
          dates.push(week)
          values.push((data as any).CALL_CLICKS)
        })
      } else {
        Object.entries(googleMetrics.metrics.monthly.data).forEach(([month, data]) => {
          dates.push(month)
          values.push((data as any).CALL_CLICKS)
        })
      }

      setChartDataCalls({
        labels: dates,
        datasets: [
          {
            label: 'Cliques sur "Appeler"',
            data: values,
            borderColor: '#C8DCFF',
            backgroundColor: (context) => {
              const chart = context.chart
              const { ctx, chartArea } = chart

              if (!chartArea) {
                return null // Retourne null tant que le chartArea n'est pas calculé
              }

              // Crée un gradient avec les couleurs spécifiées
              const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
              gradient.addColorStop(0, 'rgba(200, 220, 255, 0.5)') // Couleur au sommet
              gradient.addColorStop(1, 'rgba(200, 220, 255, 0.2)') // Couleur à la base
              return gradient
            },
            tension: 0.4,
            fill: true,
          },
        ],
      })
    }
    formatDataForChart()
  }, [selectedPeriodCalls, googleMetrics])

  const [selectedPeriodViews, setSelectedPeriodViews] = useState('daily')
  const [chartDataViews, setChartDataViews] = useState<{
    labels: string[]
    datasets: {
      label: string
      data: number[]
      borderColor: string
      backgroundColor: any
      tension: number
      fill: boolean
    }[]
  }>({ labels: [], datasets: [] })

  useEffect(() => {
    if (!googleMetrics) return
    console.log(googleMetrics)

    const formatDataForChart = () => {
      let dates: string[] = []
      let values: any[] = []

      if (selectedPeriodViews === 'daily') {
        Object.entries(googleMetrics.metrics.daily.data).forEach(([date, data]) => {
          dates.push(date)
          values.push(
            (data as any).BUSINESS_IMPRESSIONS_DESKTOP_MAPS +
              (data as any).BUSINESS_IMPRESSIONS_MOBILE_MAPS +
              (data as any).BUSINESS_IMPRESSIONS_MOBILE_SEARCH +
              (data as any).BUSINESS_IMPRESSIONS_DESKTOP_SEARCH
          )
        })
      } else if (selectedPeriodViews === 'weekly') {
        Object.entries(googleMetrics.metrics.weekly.data).forEach(([week, data]) => {
          dates.push(week)
          values.push(
            (data as any).BUSINESS_IMPRESSIONS_DESKTOP_MAPS +
              (data as any).BUSINESS_IMPRESSIONS_MOBILE_MAPS +
              (data as any).BUSINESS_IMPRESSIONS_MOBILE_SEARCH +
              (data as any).BUSINESS_IMPRESSIONS_DESKTOP_SEARCH
          )
        })
      } else {
        Object.entries(googleMetrics.metrics.monthly.data).forEach(([month, data]) => {
          dates.push(month)
          values.push(
            (data as any).BUSINESS_IMPRESSIONS_DESKTOP_MAPS +
              (data as any).BUSINESS_IMPRESSIONS_MOBILE_MAPS +
              (data as any).BUSINESS_IMPRESSIONS_MOBILE_SEARCH +
              (data as any).BUSINESS_IMPRESSIONS_DESKTOP_SEARCH
          )
        })
      }

      setChartDataViews({
        labels: dates,
        datasets: [
          {
            label: 'Vue de la page',
            data: values,
            borderColor: '#C8DCFF',
            backgroundColor: (context) => {
              const chart = context.chart
              const { ctx, chartArea } = chart

              if (!chartArea) {
                return null // Retourne null tant que le chartArea n'est pas calculé
              }

              // Crée un gradient avec les couleurs spécifiées
              const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
              gradient.addColorStop(0, 'rgba(200, 220, 255, 0.5)') // Couleur au sommet
              gradient.addColorStop(1, 'rgba(200, 220, 255, 0.2)') // Couleur à la base
              return gradient
            },
            tension: 0.4,
            fill: true,
          },
        ],
      })
    }
    formatDataForChart()
  }, [selectedPeriodViews, googleMetrics])

  const [selectedPeriodClicks, setSelectedPeriodClicks] = useState('daily')
  const [chartDataClicks, setChartDataClicks] = useState<{
    labels: string[]
    datasets: {
      label: string
      data: number[]
      borderColor: string
      backgroundColor: any
      tension?: number
      fill?: boolean
      borderWidth?: number
      borderRadius?: number
    }[]
  }>({ labels: [], datasets: [] })

  useEffect(() => {
    if (!googleMetrics) return
    console.log(googleMetrics)

    const formatDataForChart = () => {
      let dates: string[] = []
      let values: any[] = []

      if (selectedPeriodClicks === 'daily') {
        Object.entries(googleMetrics.metrics.daily.data).forEach(([date, data]) => {
          dates.push(date)
          values.push((data as any).WEBSITE_CLICKS)
        })
      } else if (selectedPeriodClicks === 'weekly') {
        Object.entries(googleMetrics.metrics.weekly.data).forEach(([week, data]) => {
          dates.push(week)
          values.push((data as any).WEBSITE_CLICKS)
        })
      } else {
        Object.entries(googleMetrics.metrics.monthly.data).forEach(([month, data]) => {
          dates.push(month)
          values.push((data as any).WEBSITE_CLICKS)
        })
      }

      setChartDataClicks({
        labels: dates,
        datasets: [
          {
            label: 'Cliques vers le site web',
            data: values,
            borderColor: '#C8DCFF',
            backgroundColor: '#E3DEFF',
            borderWidth: 1,
            borderRadius: 4,
          },
        ],
      })
    }
    formatDataForChart()
  }, [selectedPeriodClicks, googleMetrics])

  return (
    <YStack gap={32}>
      <Text col={'#0F172A'} fontSize={24} fontWeight={600}>
        Dashboard
      </Text>
      <H3>{selectedStore ? selectedStore.title : ''}</H3>
      <XStack height={270} gap={16}>
        {/* TODO faire un composant HeadCard */}
        <HeadCard
          height={'100%'}
          backgroundImage={`url(${selectedStore?.medias ? selectedStore?.medias[0]?.googleUrl : ''})`}
          backgroundSize="cover"
          backgroundPosition="center"
          width={'35%'}
          backgroundColor={'#E3DEFF'}
        ></HeadCard>
        <YStack f={1} gap={16}>
          <XStack f={1} gap={16}>
            <HeadCard>
              <IconContainer>
                <MessageSquare></MessageSquare>
              </IconContainer>
              <YStack gap={8}>
                <Text>Nombre total d'avis</Text>
                <Text fontSize={32} fontWeight={600}>
                  {selectedStore?.reviews?.totalReviewCount || 0}
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
                  {gestionStoreMetrics.averageResponseTime > 2160
                    ? `${Math.floor(gestionStoreMetrics.averageResponseTime / 168)} Sem.`
                    : gestionStoreMetrics.averageResponseTime > 24
                      ? `${Math.floor(gestionStoreMetrics.averageResponseTime / 24)} J`
                      : `${gestionStoreMetrics.averageResponseTime || 0} H`}
                </Text>
              </YStack>
            </HeadCard>
          </XStack>
          <XStack f={1} gap={16}>
            <HeadCard backgroundColor={'#C5F4F7'}>
              <IconContainer>
                <Star color={'#06B6D4'}></Star>
              </IconContainer>
              <YStack gap={8}>
                <Text>Note moyenne</Text>
                <Text fontSize={32} fontWeight={600}>
                  {(Math.round(selectedStore?.reviews?.averageRating * 10) / 10) || 0}
                </Text>
              </YStack>
            </HeadCard>
            <HeadCard backgroundColor={'#BBF6D7'}>
              <IconContainer>
                <Reply color={'#10B981'}></Reply>
              </IconContainer>
              <YStack>
                <Text>Taux de réponse</Text>
                <Text fontSize={32} fontWeight={600}>
                  {gestionStoreMetrics.responseRate || 0}%
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
            graph={
              <LineChart
                dataprops={averageRatingEvolutionChartData}
                customOptions={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false, // Position de la légende
                    },
                    title: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      title: {
                        display: false,
                      },
                      grid: {
                        display: false,
                      },
                    },
                    y: {
                      beginAtZero: true,
                      max: 5,
                      ticks: {
                        stepSize: 0.5,
                      },
                      title: {
                        display: false,
                      },
                    },
                  },
                }}
              ></LineChart>
            }
            onTimeSpanChange={(timeSpan) => setSelectedPeriodRatingEvolution(timeSpan)}
            totalEnabled={true}
          ></GraphCard>
          <GraphCard
            title="Cliques généré vers le site web"
            icon={<Laptop size={20} color={'#94A3B8'} />}
            currValue={
              googleMetrics?.metrics[selectedPeriodClicks].comparison.current.totals.WEBSITE_CLICKS
            }
            prevValue={
              googleMetrics?.metrics[selectedPeriodClicks].comparison.previous.totals.WEBSITE_CLICKS
            }
            onTimeSpanChange={(timeSpan) => setSelectedPeriodClicks(timeSpan)}
            graph={<BarChart dataProps={chartDataClicks}></BarChart>}
          ></GraphCard>
          <GraphCard
            title="Vue de la page"
            currValue={
              googleMetrics?.metrics[selectedPeriodViews].comparison.current.totals
                .BUSINESS_IMPRESSIONS_DESKTOP_SEARCH +
              googleMetrics?.metrics[selectedPeriodViews].comparison.current.totals
                .BUSINESS_IMPRESSIONS_MOBILE_SEARCH +
              googleMetrics?.metrics[selectedPeriodViews].comparison.current.totals
                .BUSINESS_IMPRESSIONS_DESKTOP_MAPS +
              googleMetrics?.metrics[selectedPeriodViews].comparison.current.totals
                .BUSINESS_IMPRESSIONS_MOBILE_MAPS
            }
            prevValue={
              googleMetrics?.metrics[selectedPeriodViews].comparison.previous.totals
                .BUSINESS_IMPRESSIONS_DESKTOP_SEARCH +
              googleMetrics?.metrics[selectedPeriodViews].comparison.previous.totals
                .BUSINESS_IMPRESSIONS_MOBILE_SEARCH +
              googleMetrics?.metrics[selectedPeriodViews].comparison.previous.totals
                .BUSINESS_IMPRESSIONS_DESKTOP_MAPS +
              googleMetrics?.metrics[selectedPeriodViews].comparison.previous.totals
                .BUSINESS_IMPRESSIONS_MOBILE_MAPS
            }
            onTimeSpanChange={(timeSpan) => setSelectedPeriodViews(timeSpan)}
            icon={<Eye size={20} color={'#94A3B8'} />}
            graph={<LineChart dataprops={chartDataViews}></LineChart>}
          ></GraphCard>
        </XStack>
        <XStack f={1} gap={16} width={'100%'}>
          <GraphCard
            title='Cliques sur "itinéraire"'
            icon={<MapPin size={20} color={'#94A3B8'} />}
            graph={<LineChart dataprops={chartData}></LineChart>}
            currValue={
              googleMetrics?.metrics[selectedPeriod].comparison.current.totals
                .BUSINESS_DIRECTION_REQUESTS
            }
            prevValue={
              googleMetrics?.metrics[selectedPeriod].comparison.previous.totals
                .BUSINESS_DIRECTION_REQUESTS
            }
            onTimeSpanChange={(timeSpan) => setSelectedPeriod(timeSpan)}
          ></GraphCard>
          <GraphCard
            currValue={
              googleMetrics?.metrics[selectedPeriodCalls].comparison.current.totals.CALL_CLICKS
            }
            prevValue={
              googleMetrics?.metrics[selectedPeriodCalls].comparison.previous.totals.CALL_CLICKS
            }
            onTimeSpanChange={(timeSpan) => setSelectedPeriodCalls(timeSpan)}
            title="Appels téléphoniques"
            icon={<Phone size={20} color={'#94A3B8'} />}
            graph={<LineChart dataprops={chartDataCalls}></LineChart>}
          ></GraphCard>
          <GraphCard
            title="Nombre d'avis"
            icon={<MessagesSquare size={20} color={'#94A3B8'} />}
            prevValue={2}
            currValue={2}
            graph={
              <LineChart
                dataprops={chartDataTotalReviews}
                customOptions={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false, // Position de la légende
                    },
                    title: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      title: {
                        display: false,
                      },
                      grid: {
                        display: false,
                      },
                    },
                    y: {
                      ticks: {
                        stepSize: 1,
                      },
                      beginAtZero: true,
                      title: {
                        display: false,
                      },
                    },
                  },
                }}
              ></LineChart>
            }
            onTimeSpanChange={(timeSpan) => setSelectedPeriodTotalReviews(timeSpan)}
            totalEnabled={true}
          ></GraphCard>
        </XStack>
      </YStack>
    </YStack>
  )
}
