import { DoughnutChartCard } from '@my/ui'
import { Clock, PieChart, Star } from '@tamagui/lucide-icons'
import { Text, XStack, Stack, YStack, styled } from 'tamagui'

const HeadCard = styled(XStack, {
  gap: '$2',
  backgroundColor: 'white',
  padding: '$4',
  borderRadius: '$4',
  justifyContent: 'flex-start',
  flex: 1,
  alignItems: 'center',
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

export const DashboardScreen = () => {
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

  return (
    <YStack gap={32}>
      <Text>Dashboard</Text>
      <XStack height={270} gap={16}>
        <HeadCard f={1} height={'100%'}></HeadCard>
        <YStack f={1} gap={16}>
          <XStack f={1} gap={16}>
            <HeadCard f={1}>
              <IconContainer>
                <Clock></Clock>
              </IconContainer>
              <YStack>
                <Text>Nombre total d'avis</Text>
                <Text>1298</Text>
              </YStack>
            </HeadCard>
            <HeadCard backgroundColor={'#C8DCFF'}>
              <IconContainer>
                <Clock color={'#3B82F6'}></Clock>
              </IconContainer>
              <YStack>
                <Text>Temps de réponse moyen</Text>
                <Text>2heures</Text>
              </YStack>
            </HeadCard>
          </XStack>
          <XStack f={1} gap={16}>
            <HeadCard backgroundColor={'#C5F4F7'}>
              <IconContainer>
                <Clock></Clock>
              </IconContainer>
              <YStack>
                <Text>Note moyenne</Text>
                <Text>4.5</Text>
              </YStack>
            </HeadCard>
            <HeadCard backgroundColor={'#BBF6D7'}>
              <IconContainer>
                <Clock></Clock>
              </IconContainer>
              <YStack>
                <Text>Taux de réponse</Text>
                <Text>100%</Text>
              </YStack>
            </HeadCard>
          </XStack>
        </YStack>
      </XStack>
      <YStack>
        <XStack gap={16}>
          <DoughnutChartCard
            title="Répartition de la note moyenne"
            dataProps={data}
            icon={<Star size={20} color={'#94A3B8'}></Star>}
          ></DoughnutChartCard>
          <DoughnutChartCard
            title="Répartition du taux de réponse"
            dataProps={data}
            icon={<PieChart size={20} color={'#94A3B8'}></PieChart>}
          ></DoughnutChartCard>
        </XStack>
      </YStack>
    </YStack>
  )
}
