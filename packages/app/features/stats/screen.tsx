import { H1, H3, H4, Text, YStack, XStack } from 'tamagui'
import { ReviewTable, StatsCard } from '@my/ui'
import { Check, MessagesSquare, Clock, Reply, ArrowUp } from '@tamagui/lucide-icons'

export const StatsScreen = () => {
  return (
    <YStack gap={32}>
      <YStack gap={16}>
        <H4>Visualisation des performances</H4>
        <XStack f={1} gap={16}>
          <StatsCard
            title="Total des avis reçus"
            value={1350}
            backgroundColor={'#E3DEFF'}
            f={1}
            icon={<MessagesSquare color={'#9333EA'} />}
          />
          <StatsCard
            title="Temps de réponse moyen"
            value={'2H'}
            backgroundColor={'#C8DCFF'}
            f={1}
            icon={<Clock color={'#3B82F6'} />}
          />
          <StatsCard
            title="Taux de réponse"
            value={'92%'}
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
      <ReviewTable
        reviews={[
          {
            reviewer: 'John Doe',
            date: '01/01/2021',
            rating: 5,
            comment: 'Great place',
            tag: 'tag1',
            status: 'published',
          },
        ]}
      ></ReviewTable>
    </YStack>
  )
}
