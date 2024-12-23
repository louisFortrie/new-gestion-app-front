'use client'

import { Text, XStack, YStack } from 'tamagui'
import { StoreCard } from '@my/ui'
import useStores from 'app/hooks/useStores'
import { useRouter } from 'solito/navigation'
import useAuth from 'app/hooks/useAuth'
import axios from 'axios'
import { useEffect } from 'react'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const StoresListScreen = () => {
  const { stores, setSelectedStore } = useStores()
  const { user } = useAuth()
  const router = useRouter()
  const handleSelectStore = (store: any) => {
    setSelectedStore(store)
    localStorage.setItem('selectedStore', JSON.stringify(store))
    router.push('/dashboard')
  }

  const refreshToken = async () => {
    try {
      await axios.get(apiUrl + '/api/refresh/' + user.id, {
        withCredentials: true,
      })
    } catch (error) {
      console.error('Erreur lors de la récupération des magasins:', error)
    }
  }

  useEffect(() => {
    refreshToken()
  }, [])

  return (
    <YStack gap={16}>
      <Text fontSize={24} color={'#0F172A'} fontWeight={600}>
        Choix de la boutique
      </Text>
      <XStack gap={16} flexWrap="wrap">
        {stores.map((store) => (
          <StoreCard
            key={store.id}
            title={store.title}
            averageRating={store.reviews.averageRating}
            totalReviews={store.reviews.totalReviewCount}
            imageUrl={store.medias?.[0]?.googleUrl}
            onPress={() => handleSelectStore(store)}
          />
        ))}
      </XStack>
    </YStack>
  )
}
