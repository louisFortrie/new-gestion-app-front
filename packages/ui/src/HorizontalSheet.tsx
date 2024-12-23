import { useState } from 'react'
import { Sheet, Button, YStack, XStack, styled, Text, AnimatePresence, Stack } from 'tamagui'
import { Calendar, MessagesSquare, Reply, Star, User2 } from '@tamagui/lucide-icons'

const HorizontalSheetStyled = styled(YStack, {
  position: 'fixed',
  top: 0,
  right: 0,
  height: '100%',
  backgroundColor: '$background',
  borderLeftWidth: 1,
  borderColor: '$borderColor',
  shadowColor: '$shadowColor',
  shadowOffset: { width: -2, height: 0 },
  shadowOpacity: 0.2,
  shadowRadius: 10,
  variants: {
    position: {
      right: {
        right: 0,
      },
      left: {
        left: 0,
      },
    },
  } as const,
})

const Overlay = styled(YStack, {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
})

const LogoContainer = styled(Stack, {
  borderRadius: '$4',
  backgroundColor: '#F1F5F9',
  padding: '$3',
})

const SectionTitle = styled(Text, {
  color: '#1E293B',
  fontSize: 20,
  fontWeight: 600,
})

export const HorizontalSheet = ({open, selectedReview, handleOpenPressed}) => {

  return (
    <YStack padding="$4">

      <AnimatePresence>
        {open && (
          <>
            <Overlay
              animation="quick"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
              opacity={1}
              onPress={() => handleOpenPressed(false)}
            />

            <HorizontalSheetStyled
              width={'70%'}
              animation="100ms"
              enterStyle={{ x: '100%' }}
              exitStyle={{ x: '100%' }}
              x={0}
            >
              <YStack padding="$4" space="$4">
                <XStack alignItems="center" gap="$4">
                  <LogoContainer>
                    <User2 />
                  </LogoContainer>
                  <YStack>
                    <SectionTitle>Reviewer</SectionTitle>
                    <Text>{selectedReview.reviewer.displayName}</Text>
                  </YStack>
                </XStack>
                <XStack alignItems="center" gap="$4">
                  <LogoContainer>
                    <Star />
                  </LogoContainer>
                  <YStack>
                    <SectionTitle>Note</SectionTitle>
                    <Text>{selectedReview.starRating}</Text>
                  </YStack>
                </XStack>
                <XStack alignItems="center" gap="$4">
                  <LogoContainer>
                    <MessagesSquare />
                  </LogoContainer>
                  <YStack>
                    <SectionTitle>Commentaire</SectionTitle>
                    <Text>{selectedReview.comment}</Text>
                  </YStack>
                </XStack>
                <XStack alignItems="center" gap="$4">
                  <LogoContainer>
                    <Calendar />
                  </LogoContainer>
                  <YStack>
                    <SectionTitle>Calendar</SectionTitle>
                    <Text>2024-10-21</Text>
                  </YStack>
                </XStack>
                <XStack alignItems="center" gap="$4">
                  <LogoContainer>
                    <Reply />
                  </LogoContainer>
                  <YStack>
                    <SectionTitle>Calendar</SectionTitle>
                    <Text>2024-10-21</Text>
                  </YStack>
                </XStack>
              </YStack>
              <Button onPress={() => handleOpenPressed(false)}>Cancel</Button>
            </HorizontalSheetStyled>
          </>
        )}
      </AnimatePresence>
    </YStack>
  )
}
