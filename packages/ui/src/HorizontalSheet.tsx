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

export const HorizontalSheet = () => {
  const [open, setOpen] = useState(false)

  return (
    <YStack padding="$4">
      <Button onPress={() => setOpen(true)}>Open Sheet</Button>

      <AnimatePresence>
        {open && (
          <>
            <Overlay
              animation="quick"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
              opacity={1}
              onPress={() => setOpen(false)}
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
                    <Text>Arlene McCoy</Text>
                  </YStack>
                </XStack>
                <XStack alignItems="center" gap="$4">
                  <LogoContainer>
                    <Star />
                  </LogoContainer>
                  <YStack>
                    <SectionTitle>Note</SectionTitle>
                    <Text>4.8</Text>
                  </YStack>
                </XStack>
                <XStack alignItems="center" gap="$4">
                  <LogoContainer>
                    <MessagesSquare />
                  </LogoContainer>
                  <YStack>
                    <SectionTitle>Commentaire</SectionTitle>
                    <Text>sdqihfsidohfkjsdhfjsdbfujhsdbfjkhsbqdfkjhbsqdkjhfbsqkjhfdb</Text>
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
              <Button onPress={() => setOpen(false)}>Cancel</Button>
            </HorizontalSheetStyled>
          </>
        )}
      </AnimatePresence>
    </YStack>
  )
}
