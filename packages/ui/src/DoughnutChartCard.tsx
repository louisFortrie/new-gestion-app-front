import { Text, YStack, styled, Group, XStack, Stack } from 'tamagui'
import { Star } from '@tamagui/lucide-icons'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { TimeSpanGroup } from '@my/ui'
import { useEffect, useState } from 'react'

// Enregistrer les composants nécessaires de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend)

const StyledDoughnutChartCard = styled(Group, {
  gap: '$2',
  backgroundColor: 'white',
  borderRadius: '$4',
  borderWidth: 1,
  borderColor: '#F1F5F9',
  height: 400,
  justifyContent: 'space-between',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
})

const InsideText = styled(Text, {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: 26,
  fontWeight: 600,
  color: '#0F172A',
})

const RatingCard = styled(YStack, {
  gap: '$2',
  backgroundColor: 'white',
  paddingVertical: '$3',
  paddingHorizontal: '$4',
  borderRadius: '$4',
  borderWidth: 1,
  borderColor: '#F1F5F9',
  alignItems: 'center',
  justifyContent: 'space-between',
  flex: 1,
})

interface DoughnutChartCardProps {
  title: string
  dataProps: any
  icon?: React.ReactNode
}

export const DoughnutChartCard = ({ title, dataProps, icon }: DoughnutChartCardProps) => {
  const { daily, weekly, monthly } = dataProps
  const [insideText, setInsideText] = useState('0')
  const [dataToUse, setDataToUse] = useState(daily)
  const [data, setData] = useState({
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: [
      {
        data: [0],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  })

  const handleTimeSpanChange = (timeSpan: 'daily' | 'weekly' | 'monthly') => {
    console.log(timeSpan, 'timeSpan')

    switch (timeSpan) {
      case 'daily':
        setDataToUse(daily)
        break
      case 'weekly':
        setDataToUse(weekly)
        break
      case 'monthly':
        setDataToUse(monthly)
        break
    }

  }

  useEffect(() => {
    setDataToUse(daily)
  }, [dataProps])

  useEffect(() => {
    const allZero = Object.values(dataToUse.comparison.current).every((value) => value === 0)
    console.log(dataToUse, 'dataToUse')

    if (allZero) {
      setInsideText('-')
      setData({
        labels: ['No Data'],
        datasets: [
          {
            data: [1],
            backgroundColor: ['#D3D3D3'],
            hoverBackgroundColor: ['#D3D3D3'],
          },
        ],
      })
    } else {
      setInsideText((Math.round(dataToUse.comparison.current.average * 10)/10).toString())
      setData({
        labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
        datasets: [
          {
            data: [
              dataToUse.comparison.current.oneStar,
              dataToUse.comparison.current.twoStars,
              dataToUse.comparison.current.threeStars,
              dataToUse.comparison.current.fourStars,
              dataToUse.comparison.current.fiveStars,
            ],
            backgroundColor: ['#F04438', '#F97066', '#FAC515', '#EAAA08', '#17B26A'],
            hoverBackgroundColor: ['#F04438', '#F97066', '#FAC515', '#EAAA08', '#17B26A'],
          },
        ],
      })
    }
  }, [dataToUse])

  // Options du graphique
  const options = {
    responsive: true,
    cutout: '75%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true, // Afficher les info-bulles
      },
    },
  }

  return (
    <StyledDoughnutChartCard>
      <XStack borderBottomColor={'#E2E8F0'} borderBottomWidth={1} gap={16} width={'100%'}>
        <XStack f={1} paddingVertical={'$3'} paddingHorizontal={'$4'} alignItems="center" gap={16}>
          {icon}
          <Text fontWeight={600} fontSize={18} color={'#0F172A'}>
            {title}
          </Text>
          <Stack f={1}></Stack>
          <TimeSpanGroup
            onTimeSpanChange={(timeSpan) => handleTimeSpanChange(timeSpan)}
          ></TimeSpanGroup>
        </XStack>
      </XStack>
      <Stack f={1} width={'100%'} padding={'$4'} gap={16}>
        <Stack
          position="relative"
          f={1}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Doughnut data={data} options={options} />
          <InsideText>{insideText}</InsideText>
        </Stack>
        <XStack gap={16} width={'100%'}>
          <RatingCard borderBottomWidth={4} borderBottomColor={'#17B26A'}>
            <Text fontSize={14}>{dataToUse.comparison.current.fiveStars}</Text>
            <Text fontSize={12}>5 étoiles</Text>
          </RatingCard>
          <RatingCard borderBottomWidth={4} borderBottomColor={'#EAAA08'}>
            <Text fontSize={14}>{dataToUse.comparison.current.fourStars}</Text>
            <Text fontSize={12}>4 étoiles</Text>
          </RatingCard>
          <RatingCard borderBottomWidth={4} borderBottomColor={'#FAC515'}>
            <Text fontSize={14}>{dataToUse.comparison.current.threeStars}</Text>
            <Text fontSize={12}>3 étoiles</Text>
          </RatingCard>
          <RatingCard borderBottomWidth={4} borderBottomColor={'#F97066'}>
            <Text fontSize={14}>{dataToUse.comparison.current.twoStars}</Text>
            <Text fontSize={12}>2 étoiles</Text>
          </RatingCard>
          <RatingCard borderBottomWidth={4} borderBottomColor={'#F04438'}>
            <Text fontSize={14}>{dataToUse.comparison.current.oneStar}</Text>
            <Text fontSize={12}>1 étoiles</Text>
          </RatingCard>
        </XStack>
      </Stack>
    </StyledDoughnutChartCard>
  )
}
