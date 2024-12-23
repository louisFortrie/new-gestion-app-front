'use client'

import { Text, XStack, YStack, Dialog } from 'tamagui'
import { CustomButton, StoreCard } from '@my/ui'
import useStores from 'app/hooks/useStores'
import { useRouter } from 'solito/navigation'
import useAuth from 'app/hooks/useAuth'
import axios from 'axios'
import { useEffect, useState } from 'react'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const StoresListScreen = () => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const { stores, setSelectedStore } = useStores()
  const { user } = useAuth()
  const router = useRouter()
  const handleSelectStore = (store: any) => {
    setSelectedStore(store)
    localStorage.setItem('selectedStore', JSON.stringify(store))
    router.push('/dashboard')
  }

  // const refreshToken = async () => {
  //   try {
  //     await axios.get(apiUrl + '/api/refresh/' + user.id, {
  //       withCredentials: true,
  //     })
  //   } catch (error) {
  //     console.error('Erreur lors de la récupération des magasins:', error)
  //   }
  // }

  useEffect(() => {
    if (!user) return
    if (!user.googleAccounts || user.googleAccounts.length === 0) {
      setDialogOpen(true)
    }
  }, [user])

  return (
    <YStack gap={16}>
      <Dialog modal open={dialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay
            key="overlay"
            animation="slow"
            opacity={0.5}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />

          <Dialog.Content
            bordered
            elevate
            key="content"
            animateOnly={['transform', 'opacity']}
            animation={[
              'quicker',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            gap="$4"
          >
            <Dialog.Title>Aucun compte google connécté</Dialog.Title>
            <Dialog.Description>
              Accéder aux paramètres pour connecter votre compte google
            </Dialog.Description>
            <CustomButton onPress={() => router.push('/settings')}>
              Accéder aux paramètres
            </CustomButton>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
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
