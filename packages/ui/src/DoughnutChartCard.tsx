import { Text, YStack, styled, Group, XStack, Stack } from 'tamagui'
import {Star} from '@tamagui/lucide-icons'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

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
  color : "#0F172A"
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
        <XStack paddingVertical={'$3'} paddingHorizontal={"$4"} alignItems='center' gap={16}>

            {icon}
        <Text fontWeight={600} fontSize={18} color={"#0F172A"} >
          {title}
          </Text>
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
          <Doughnut data={dataProps} options={options} />
          <InsideText>OUI</InsideText>
        </Stack>
        <XStack gap={16} width={'100%'}>
          <RatingCard borderBottomWidth={4} borderBottomColor={'#17B26A'}>
            <Text fontSize={14}>10</Text>
            <Text fontSize={12}>5 étoiles</Text>
          </RatingCard>
          <RatingCard borderBottomWidth={4} borderBottomColor={'#EAAA08'}>
            <Text fontSize={14}>10</Text>
            <Text fontSize={12}>4 étoiles</Text>
          </RatingCard>
          <RatingCard borderBottomWidth={4} borderBottomColor={'#FAC515'}>
            <Text fontSize={14}>10</Text>
            <Text fontSize={12}>3 étoiles</Text>
          </RatingCard>
          <RatingCard borderBottomWidth={4} borderBottomColor={'#F97066'}>
            <Text fontSize={14}>10</Text>
            <Text fontSize={12}>2 étoiles</Text>
          </RatingCard>
          <RatingCard borderBottomWidth={4} borderBottomColor={'#F04438'}>
            <Text fontSize={14}>10</Text>
            <Text fontSize={12}>1 étoiles</Text>
          </RatingCard>
        </XStack>
      </Stack>
    </StyledDoughnutChartCard>
  )
}
