import { use, useEffect, useState } from 'react'
import {
  Sheet,
  Button,
  YStack,
  XStack,
  styled,
  Text,
  AnimatePresence,
  Stack,
  TextArea,
  Dialog,
  Unspaced,
} from 'tamagui'
import {
  Calendar,
  LayoutTemplate,
  MessagesSquare,
  PenSquare,
  Reply,
  Sparkles,
  Star,
  Trash2,
  User2,
  X,
} from '@tamagui/lucide-icons'
import { CustomButton } from './CustomButton'
import axios from 'axios'
import useAuth from 'app/hooks/useAuth'

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

const TemplateCard = styled(YStack, {
  gap: '$2',
  backgroundColor: 'white',
  padding: '$4',
  borderRadius: '$4',
  height: 230,
  justifyContent: 'space-between',
  borderColor: '#E2E8F0',
  borderWidth: 1,
})

const TemplateCategory = styled(Text, {
  paddingVertical: '$2',
  paddingHorizontal: '$3',
  borderRadius: 1000,
  borderWidth: 1,
  width: 'fit-content',
  fontSize: 14,
  variants: {
    positive: {
      true: {
        borderColor: '#17B26A',
        color: '#067647',
        backgroundColor: '#DCFAE6',
      },
    },
    neutral: {
      true: {
        borderColor: '#B54708',
        color: '#B54708',
        backgroundColor: '#FEF0C7',
      },
    },
    negative: {
      true: {
        borderColor: '#B42318',
        color: '#B42318',
        backgroundColor: '#FEE4E2',
      },
    },
  } as const,
})

const TemplateTitle = styled(Text, {
  fontSize: 18,
  fontWeight: 600,
})

const TemplateDescription = styled(Text, {
  fontSize: 14,
  color: '#475569',
})
const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const HorizontalSheet = ({ open, selectedReview, handleOpenPressed, handleSendPress }) => {
  const [response, setResponse] = useState(selectedReview?.reviewReply?.comment || '')
  const [templates, setTemplates] = useState([])

  const { user } = useAuth()
  console.log(selectedReview)
  const getTemplates = () => {
    axios
      .get(`${apiUrl}/api/templates/${user.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        const templates = response.data.responseTemplates
        setTemplates(templates)
      })
  }

  const handleUseTemplate = (templateId) => {
    const usedTemplate = templates.find((template) => template.id === templateId)

    setResponse(usedTemplate?.message || '')
  }

  useEffect(() => {
    if (!user) return
    getTemplates()
  }, [user])

  useEffect(() => {
    setResponse(selectedReview?.reviewReply?.comment || '')
  }, [selectedReview])

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
              <YStack padding="$4" gap={32}>
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
                <XStack alignItems="flex-start" gap="$4">
                  <LogoContainer>
                    <Reply />
                  </LogoContainer>
                  <YStack f={1} gap={8}>
                    <XStack justifyContent="space-between">
                      <SectionTitle>Réponse</SectionTitle>
                      <XStack gap={8}>
                        <Button iconAfter={<Sparkles />}>Générer par l'IA</Button>
                        <Dialog modal>
                          <Dialog.Trigger asChild>
                            <Button iconAfter={<LayoutTemplate />}>Utiliser un template</Button>
                          </Dialog.Trigger>
                          <Dialog.Portal>
                            <Dialog.Overlay
                              key="overlay"
                              animation="quick"
                              opacity={0.5}
                              enterStyle={{ opacity: 0 }}
                              exitStyle={{ opacity: 0 }}
                            />
                            <Dialog.Content
                              width={'60%'}
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
                            >
                              <Dialog.Title marginBottom={16}>Choisissez un template</Dialog.Title>
                              <XStack f={1} gap={16}>
                                <YStack f={1} gap={16} width={'calc(33% - 16px)'}>
                                  {templates.length > 0 &&
                                    templates
                                      .filter((template) => template.category === 'positive')
                                      .map((template) => (
                                        <TemplateCard key={template.title}>
                                          <TemplateCategory positive>Positif</TemplateCategory>
                                          <TemplateTitle>{template.title}</TemplateTitle>
                                          <TemplateDescription>
                                            {template.message}
                                          </TemplateDescription>
                                          <XStack gap={16} width={'100%'}>
                                            <Dialog.Close>
                                              <CustomButton
                                                f={1}
                                                onPress={() => handleUseTemplate(template.id)}
                                              >
                                                Utiliser
                                              </CustomButton>
                                            </Dialog.Close>
                                          </XStack>
                                        </TemplateCard>
                                      ))}
                                  {/* <TemplateCard>

            <TemplateCategory positive>Positive</TemplateCategory>
            <TemplateTitle>Merci pour vos mots doux ! </TemplateTitle>
            <TemplateDescription>
              We’re thrilled to know you enjoyed dining with us! Your satisfaction is our priority,
              and we can’t wait to serve you again soon.
            </TemplateDescription>
            <XStack gap={16}>
              <Button icon={<PenSquare />}>Modifier</Button>
              <Button icon={<Trash2 />}>Supprimer</Button>
            </XStack>
          </TemplateCard>
          <TemplateCard>
            <TemplateCategory positive>Positive</TemplateCategory>
            <TemplateTitle>Merci pour vos mots doux ! </TemplateTitle>
            <TemplateDescription>
              We’re thrilled to know you enjoyed dining with us! Your satisfaction is our priority,
              and we can’t wait to serve you again soon.
            </TemplateDescription>
            <XStack gap={16}>
              <Button icon={<PenSquare />}>Modifier</Button>
              <Button icon={<Trash2 />}>Supprimer</Button>
            </XStack>
          </TemplateCard> */}
                                </YStack>
                                <YStack f={1} gap={16} width={'calc(33% - 16px)'}>
                                  {templates.length > 0 &&
                                    templates
                                      .filter((template) => template.category === 'neutral')
                                      .map((template) => (
                                        <TemplateCard key={template.title}>
                                          <TemplateCategory neutral>Neutre</TemplateCategory>
                                          <TemplateTitle>{template.title}</TemplateTitle>
                                          <TemplateDescription>
                                            {template.message}
                                          </TemplateDescription>
                                          <XStack gap={16} width={'100%'}>
                                            <Dialog.Close>
                                              <CustomButton
                                                f={1}
                                                onPress={() => handleUseTemplate(template.id)}
                                              >
                                                Utiliser
                                              </CustomButton>
                                            </Dialog.Close>
                                          </XStack>
                                        </TemplateCard>
                                      ))}

                                  {/* <TemplateCard>
            <TemplateCategory positive>Positive</TemplateCategory>
            <TemplateTitle>Merci pour vos mots doux ! </TemplateTitle>
            <TemplateDescription>
              We’re thrilled to know you enjoyed dining with us! Your satisfaction is our priority,
              and we can’t wait to serve you again soon.
            </TemplateDescription>
            <XStack gap={16}>
              <Button icon={<PenSquare />}>Modifier</Button>
              <Button icon={<Trash2 />}>Supprimer</Button>
            </XStack>
          </TemplateCard> */}
                                </YStack>
                                <YStack f={1} gap={16} width={'calc(33% - 16px)'}>
                                  {templates.length > 0 &&
                                    templates
                                      .filter((template) => template.category === 'negative')
                                      .map((template) => (
                                        <TemplateCard key={template.title}>
                                          <TemplateCategory negative>Négatif</TemplateCategory>
                                          <TemplateTitle>{template.title}</TemplateTitle>
                                          <TemplateDescription>
                                            {template.message}
                                          </TemplateDescription>
                                          <XStack gap={16} width={'100%'}>
                                            <Dialog.Close>
                                              <CustomButton
                                                f={1}
                                                onPress={() => handleUseTemplate(template.id)}
                                              >
                                                Utiliser
                                              </CustomButton>
                                            </Dialog.Close>
                                          </XStack>
                                        </TemplateCard>
                                      ))}
                                  {/* <TemplateCard>
            <TemplateCategory positive>Positive</TemplateCategory>
            <TemplateTitle>Merci pour vos mots doux ! </TemplateTitle>
            <TemplateDescription>
              We’re thrilled to know you enjoyed dining with us! Your satisfaction is our priority,
              and we can’t wait to serve you again soon.
            </TemplateDescription>
            <XStack gap={16}>
              <Button icon={<PenSquare />}>Modifier</Button>
              <Button icon={<Trash2 />}>Supprimer</Button>
            </XStack>
          </TemplateCard>
          <TemplateCard>
            <TemplateCategory positive>Positive</TemplateCategory>
            <TemplateTitle>Merci pour vos mots doux ! </TemplateTitle>
            <TemplateDescription>
              We’re thrilled to know you enjoyed dining with us! Your satisfaction is our priority,
              and we can’t wait to serve you again soon.
            </TemplateDescription>
            <XStack gap={16}>
              <Button icon={<PenSquare />}>Modifier</Button>
              <Button icon={<Trash2 />}>Supprimer</Button>
            </XStack>
          </TemplateCard> */}
                                </YStack>
                              </XStack>
                              <Unspaced>
                                <Dialog.Close asChild>
                                  <Button
                                    position="absolute"
                                    top="$3"
                                    right="$3"
                                    size="$2"
                                    circular
                                    icon={X}
                                  />
                                </Dialog.Close>
                              </Unspaced>
                            </Dialog.Content>
                          </Dialog.Portal>
                        </Dialog>
                      </XStack>
                    </XStack>
                    <TextArea
                      onChangeText={(text) => setResponse(text)}
                      value={response}
                    ></TextArea>
                  </YStack>
                </XStack>
              </YStack>
              <XStack alignSelf="flex-end" padding={'$4'}>
                <CustomButton
                  onPress={() => {
                    handleSendPress(selectedReview.reviewId, response)
                    handleOpenPressed(false)
                  }}
                  alignSelf="flex-end"
                  marginRight="$4"
                >
                  Envoyer
                </CustomButton>
                <Button
                  onPress={() => handleOpenPressed(false)}
                  alignSelf="flex-end"
                  variant="outlined"
                >
                  Annuler
                </Button>
              </XStack>
            </HorizontalSheetStyled>
          </>
        )}
      </AnimatePresence>
    </YStack>
  )
}
