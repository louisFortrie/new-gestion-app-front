'use client'

import { YStack, Text, styled, XStack, H1, H2, Stack, Button, Separator } from 'tamagui'
import {
  ChartLine,
  ChevronDown,
  Cog,
  Dot,
  LayoutDashboard,
  LogOut,
  MessageSquareMore,
  Settings,
  ShieldCheck,
  Store,
  TicketCheck,
  Users2,
} from '@tamagui/lucide-icons'
import { usePathname, useRouter } from 'solito/navigation'
import { useEffect, useState } from 'react'
import useAuth from 'app/hooks/useAuth'

const StyledYStack = styled(YStack, {
  width: '$20',
  height: '100vh',
  backgroundColor: 'white',
  alignItems: 'center',
  gap: '$2',
  paddingHorizontal: '$4',
  paddingVertical: '$4',
})

const StyledText = styled(Text, {
  color: 'black',
  padding: '$2',
  margin: '$2',
})

const StyledButton = styled(Button, {
  width: '100%',
  borderRadius: '$10',
  borderColor: 'transparent',
  outlineColor: 'transparent',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingHorizontal: '$4',
  hoverStyle: {
    outlineColor: 'transparent',
    backgroundColor: '#dcfa89',
    cursor: 'pointer',
    borderColor: 'transparent',
  },
  pressStyle: {
    outlineColor: 'transparent',
    borderColor: 'transparent',
    backgroundColor: '#cdf463',
  },
  backgroundColor: 'transparent',

  variants: {
    active: {
      true: {
        backgroundColor: '#CDF463',
      },
    },
  } as const,
})

export const NavBar = () => {
  const [isReviewsOpen, setIsReviewsOpen] = useState(false)

  const router = useRouter()
  const pathName = usePathname()
  const { logout } = useAuth()

  const isActive = (path: string) => pathName === path
  const isInStoreListPage = pathName?.startsWith('/stores-list')

  useEffect(() => {
    const isReviewPath = pathName?.endsWith('/stats') || pathName?.endsWith('/templates')
    setIsReviewsOpen(isReviewPath || false)
  }, [pathName])

  return (
    <StyledYStack>
      <H2 color={'black'} marginBottom={'$10'} alignSelf="flex-start">
        Gstar
      </H2>

      {!isInStoreListPage && (
        <>
          <StyledButton onPress={() => router.push('/dashboard')} active={isActive('/dashboard')}>
            <LayoutDashboard color={'black'} />
            <StyledText>Dashboard</StyledText>
          </StyledButton>
          <StyledButton onPress={() => router.push('/manage')} active={isActive('/manage')}>
            <Store color={'black'} />
            <StyledText>Gérer</StyledText>
          </StyledButton>
          <StyledButton onPress={() => setIsReviewsOpen(!isReviewsOpen)}>
            <MessageSquareMore color={'black'} />
            <StyledText>Avis</StyledText>
            <Stack f={1}></Stack>
            <ChevronDown
              color={'black'}
              transform={isReviewsOpen ? 'rotate(180deg)' : 'rotate(0)'}
              transition="transform .3s ease"
            />
          </StyledButton>
          {isReviewsOpen && (
            <YStack gap={4}>
              <StyledButton active={isActive('/stats')} onPress={() => router.push('/stats')}>
                <XStack alignItems="center">
                  <Dot color={'#475569'} />
                  <StyledText color={'#475569'} fontWeight={400}>
                    Statistics des avis
                  </StyledText>
                </XStack>
              </StyledButton>
              <StyledButton
                active={isActive('/templates')}
                onPress={() => router.push('/templates')}
              >
                <XStack alignItems="center">
                  <Dot color={'#475569'} />

                  <StyledText color={'#475569'} fontWeight={400}>
                    Templates de réponses
                  </StyledText>
                </XStack>
              </StyledButton>
            </YStack>
          )}
        </>
      )}

      <StyledButton active={isActive('/help')} onPress={() => router.push('/help')}>
        <ShieldCheck color={'black'} />
        <StyledText>Aide et support</StyledText>
      </StyledButton>
      <Separator alignSelf="stretch" marginVertical={16}></Separator>
      {!isInStoreListPage && (
        <StyledButton onPress={() => router.push('/stores-list')}>
          <Settings color={'black'} />
          <StyledText>Choix de boutique</StyledText>
        </StyledButton>
      )}
      <StyledButton active={isActive('/settings')} onPress={() => router.push('/settings')}>
        <Settings color={'black'} />
        <StyledText>Paramètres</StyledText>
      </StyledButton>
      <StyledButton onPress={() => logout()}>
        <LogOut color={'black'} />
        <StyledText>Se déconnecter</StyledText>
      </StyledButton>
    </StyledYStack>
  )
}
