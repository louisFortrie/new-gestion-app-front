'use client'

import { Text, XStack, YStack, Dialog, Unspaced, Button } from 'tamagui'
import { CustomButton, StoreCard } from '@my/ui'
import useStores from 'app/hooks/useStores'
import { useRouter } from 'solito/navigation'
import useAuth from 'app/hooks/useAuth'
import { useEffect, useState } from 'react'
import { Plus, X } from '@tamagui/lucide-icons'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const StoresListScreen = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [needsRefresh, setNeedsRefresh] = useState(false)
  const { stores, setSelectedStore } = useStores()
  const { user } = useAuth()
  const router = useRouter()

  const handleSelectStore = (store: any) => {
    localStorage.setItem('selectedStore', JSON.stringify(store))
    setSelectedStore(store)

    router.push('/stats')
  }

  const handleAddAccount = async () => {
    window.location.href = apiUrl + '/api/gestion/google'
  }

  useEffect(() => {
    if (!user) return
    if (!user.googleAccounts || user.googleAccounts.length === 0 || !stores) {
      setDialogOpen(true)
      return
    }

    const googleAccounts = user.googleAccounts
    const accountsThatNeedRefresh = googleAccounts.filter((account) => account.needsRefresh)
    if (accountsThatNeedRefresh.length > 0) {
      setNeedsRefresh(true)
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
            onPress={() => needsRefresh && setDialogOpen(false)}
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
            {needsRefresh && (
              <>
                <Dialog.Title>Besoin de se reconnecter</Dialog.Title>
                <Dialog.Description>
                  Un ou plusieurs compte google ont besoin d'être reconnectés accédez aux paramètres
                  pour les reconnecter
                </Dialog.Description>
                <Unspaced>
                  <Dialog.Close asChild>
                    <Button
                      position="absolute"
                      top="$3"
                      right="$3"
                      size="$2"
                      circular
                      icon={X}
                      onPress={() => setDialogOpen(false)}
                    />
                  </Dialog.Close>
                </Unspaced>
              </>
            )}
            {!needsRefresh && (
              <>
                <Dialog.Title>Aucun compte google connécté</Dialog.Title>
                <Dialog.Description>
                  Accéder aux paramètres pour connecter votre compte google
                </Dialog.Description>
              </>
            )}
            <CustomButton onPress={() => router.push('/settings')}>
              Accéder aux paramètres
            </CustomButton>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
      <Text fontSize={24} color={'#0F172A'} fontWeight={600}>
        Choix de la boutique
      </Text>
      <XStack gap={16} flexWrap="wrap" alignItems="center">
        {stores?.map((store, index) => (
          <StoreCard
            key={store.name}
            locationId={store.name.split('/')[1]}
            title={store.title}
            averageRating={Math.round(store.reviews.averageRating * 10) / 10 || 0}
            totalReviews={store.reviews.totalReviewCount || 0}
            imageUrl={store.medias?.[0]?.googleUrl || ''}
            onPress={() => handleSelectStore(store)}
            accountId={store.accountId}
            address={store.storefrontAddress?.addressLines[0]}
            locality={store.storefrontAddress?.locality}
          />
        ))}
        <CustomButton width={200} height={200} onPress={handleAddAccount}>
          <Plus></Plus>
        </CustomButton>
      </XStack>
    </YStack>
  )
}
