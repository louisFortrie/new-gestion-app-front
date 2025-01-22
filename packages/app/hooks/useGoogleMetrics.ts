import { useState, useEffect } from 'react'
import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

interface MetricValues {
  BUSINESS_DIRECTION_REQUESTS: number
  CALL_CLICKS: number
  BUSINESS_IMPRESSIONS_DESKTOP_MAPS: number
  BUSINESS_IMPRESSIONS_MOBILE_MAPS: number
  BUSINESS_IMPRESSIONS_MOBILE_SEARCH: number
  BUSINESS_IMPRESSIONS_DESKTOP_SEARCH: number
  WEBSITE_CLICKS: number
}

interface ComparisonData {
  totals: MetricValues
}

interface MetricData {
  data: Record<string, MetricValues>
  comparison: {
    current: ComparisonData
    previous: ComparisonData
  }
}

interface GoogleMetrics {
  metrics: {
    daily: MetricData
    weekly: MetricData
    monthly: MetricData
  }
}

interface UseGoogleMetricsProps {
  storeId: string
  accountId: string
}

interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: any
    tension?: number
    fill?: boolean
  }[]
}

type PeriodType = 'daily' | 'weekly' | 'monthly'

export const useGoogleMetrics = ({ storeId, accountId }: UseGoogleMetricsProps) => {
  const [metrics, setMetrics] = useState<GoogleMetrics | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  // État pour les différents types de données de graphiques
  const [directionRequestsData, setDirectionRequestsData] = useState<ChartData>({
    labels: [],
    datasets: [],
  })
  const [callsData, setCallsData] = useState<ChartData>({ labels: [], datasets: [] })
  const [viewsData, setViewsData] = useState<ChartData>({ labels: [], datasets: [] })
  const [websiteClicksData, setWebsiteClicksData] = useState<ChartData>({
    labels: [],
    datasets: [],
  })

  // Fonction pour formater les données de graphique
  const formatChartData = (
    metricData: Record<string, MetricValues>,
    metricKey: keyof MetricValues,
    label: string
  ): ChartData => {
    const dates = Object.keys(metricData)
    const values = dates.map((date) => metricData[date][metricKey])

    return {
      labels: dates,
      datasets: [
        {
          label,
          data: values,
          borderColor: '#C8DCFF',
          backgroundColor: (context: any) => {
            if (!context.chart.chartArea) return null

            const { ctx, chartArea } = context.chart
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
            gradient.addColorStop(0, 'rgba(200, 220, 255, 0.5)')
            gradient.addColorStop(1, 'rgba(200, 220, 255, 0.2)')
            return gradient
          },
          tension: 0.4,
          fill: true,
        },
      ],
    }
  }

  // Fonction pour mettre à jour les données des graphiques
  const updateChartData = (period: PeriodType) => {
    if (!metrics) return

    const metricData = metrics.metrics[period].data

    // Mise à jour des données pour chaque type de graphique
    setDirectionRequestsData(
      formatChartData(metricData, 'BUSINESS_DIRECTION_REQUESTS', 'Demandes de direction')
    )

    setCallsData(formatChartData(metricData, 'CALL_CLICKS', 'Appels'))

    const totalViews = Object.keys(metricData).reduce(
      (acc, date) => {
        acc[date] =
          metricData[date].BUSINESS_IMPRESSIONS_DESKTOP_MAPS +
          metricData[date].BUSINESS_IMPRESSIONS_MOBILE_MAPS +
          metricData[date].BUSINESS_IMPRESSIONS_MOBILE_SEARCH +
          metricData[date].BUSINESS_IMPRESSIONS_DESKTOP_SEARCH
        return acc
      },
      {} as Record<string, number>
    )

    setViewsData({
      labels: Object.keys(totalViews),
      datasets: [
        {
          label: 'Vues totales',
          data: Object.values(totalViews),
          borderColor: '#C8DCFF',
          backgroundColor: (context: any) => {
            if (!context.chart.chartArea) return null

            const { ctx, chartArea } = context.chart
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
            gradient.addColorStop(0, 'rgba(200, 220, 255, 0.5)')
            gradient.addColorStop(1, 'rgba(200, 220, 255, 0.2)')
            return gradient
          },
          tension: 0.4,
          fill: true,
        },
      ],
    })

    setWebsiteClicksData(formatChartData(metricData, 'WEBSITE_CLICKS', 'Clics sur le site web'))
  }

  // Charger les données
  useEffect(() => {
    const fetchMetrics = async () => {
      if (!storeId || !accountId) return

      setLoading(true)
      try {
        const response = await axios.get(
          `${apiUrl}/api/mybusiness/locations/${storeId}/metrics/${accountId}`,
          { withCredentials: true }
        )
        setMetrics(response.data)
        updateChartData('daily') // Initial data format
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch metrics'))
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [storeId, accountId, apiUrl])

  // Récupérer les totaux pour une période donnée
  const getTotals = (period: PeriodType) => {
    if (!metrics) return null
    return {
      current: metrics.metrics[period].comparison.current.totals,
      previous: metrics.metrics[period].comparison.previous.totals,
    }
  }

  return {
    googleMetricsHook: metrics,
    googleMetricsLoading: loading,
    error,
    directionRequestsData,
    callsData,
    viewsData,
    websiteClicksData,
    updateChartData,
    getTotals,
  }
}
