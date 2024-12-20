'use client'
import { CustomButton, CustomInput, CustomSelect } from '@my/ui'
import { PenSquare, Trash2 } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { YStack, Text, styled, Form, XStack, Stack, Button } from 'tamagui'

const StyledForm = styled(Form, {
  width: '100%',
  gap: '$2',
  backgroundColor: 'white',
  padding: '$4',
  borderRadius: '$4',
})

const TemplateCard = styled(YStack, {
  gap: '$2',
  backgroundColor: 'white',
  padding: '$4',
  borderRadius: '$4',
  height: 230,
  justifyContent: 'space-between',
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

export const TemplatesScreen = () => {
  const [templates, setTemplates] = useState([
    {
      title: 'Merci pour vos mots doux !',
      category: 'positive',
      description:
        'We’re thrilled to know you enjoyed dining with us! Your satisfaction is our priority, and we can’t wait to serve you again soon.',
    },
    {
      title: 'Merci pour vos mots doux !',
      category: 'positive',
      description:
        'We’re thrilled to know you enjoyed dining with us! Your satisfaction is our priority, and we can’t wait to serve you again soon.',
    },
    {
      title: 'bif bof',
      category: 'neutral',
      description:
        'We’re thrilled to know you enjoyed dining with us! Your satisfaction is our priority, and we can’t wait to serve you again soon.',
    },
    {
      title: 'pas content',
      category: 'negative',
      description:
        'We’re thrilled to know you enjoyed dining with us! Your satisfaction is our priority, and we can’t wait to serve you again soon.',
    },
    {
      title: 'pas content',
      category: 'negative',
      description:
        'We’re thrilled to know you enjoyed dining with us! Your satisfaction is our priority, and we can’t wait to serve you again soon.',
    },
    {
      title: 'pas content',
      category: 'negative',
      description:
        'We’re thrilled to know you enjoyed dining with us! Your satisfaction is our priority, and we can’t wait to serve you again soon.',
    },
  ])

  const [newTemplate, setNewTemplate] = useState({
    title: '',
    category: '',
    description: '',
  })

  const handleTitleChange = (e) => {
    console.log(e.target.value)

    setNewTemplate({
      ...newTemplate,
      title: e.target.value,
    })
  }

  const handleCategoryChange = (e) => {
    setNewTemplate({
      ...newTemplate,
      category: e,
    })
  }

  const handleDescriptionChange = (e) => {
    setNewTemplate({
      ...newTemplate,
      description: e.target.value,
    })
  }

  const handleSave = () => {
    setTemplates([...templates, newTemplate])
    setNewTemplate({
      title: '',
      category: '',
      description: '',
    })
  }

  return (
    <YStack>
      <Text>Créer un nouveau template de réponse</Text>
      <StyledForm>
        <XStack>
          <Text>Titre du template</Text>
          <CustomInput placeholder="Titre du template" onChange={(e) => handleTitleChange(e)} />
        </XStack>
        <XStack>
          <Text>Catégorie</Text>
          <CustomSelect
            onChange={(e) => handleCategoryChange(e)}
            options={[
              {
                name: 'positive',
              },
              {
                name: 'neutral',
              },
              {
                name: 'negative',
              },
            ]}
          ></CustomSelect>
        </XStack>
        <XStack>
          <Text>Contenue de la réponse</Text>
          <CustomInput placeholder="Déscription" onChange={(e) => handleDescriptionChange(e)} />
        </XStack>
        <CustomButton onPress={() => handleSave()}>Sauvegarder</CustomButton>
      </StyledForm>
      <Text>Templates de réponses sauvegardés</Text>
      <XStack f={1} gap={16}>
        <YStack f={1} gap={16}>
          {templates
            .filter((template) => template.category === 'positive')
            .map((template) => (
              <TemplateCard key={template.title}>
                <TemplateCategory positive>Positif</TemplateCategory>
                <TemplateTitle>{template.title}</TemplateTitle>
                <TemplateDescription>{template.description}</TemplateDescription>
                <XStack gap={16}>
                  <Button icon={<PenSquare />} f={1}>
                    Modifier
                  </Button>
                  <Button icon={<Trash2 />} f={1}>
                    Supprimer
                  </Button>
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
        <YStack f={1} gap={16}>
          {templates
            .filter((template) => template.category === 'neutral')
            .map((template) => (
              <TemplateCard key={template.title}>
                <TemplateCategory neutral>Neutre</TemplateCategory>
                <TemplateTitle>{template.title}</TemplateTitle>
                <TemplateDescription>{template.description}</TemplateDescription>
                <XStack gap={16}>
                  <Button icon={<PenSquare />}>Modifier</Button>
                  <Button icon={<Trash2 />}>Supprimer</Button>
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
        <YStack f={1} gap={16}>
          {templates
            .filter((template) => template.category === 'negative')
            .map((template) => (
              <TemplateCard key={template.title}>
                <TemplateCategory negative>Négatif</TemplateCategory>
                <TemplateTitle>{template.title}</TemplateTitle>
                <TemplateDescription>{template.description}</TemplateDescription>
                <XStack gap={16}>
                  <Button icon={<PenSquare />}>Modifier</Button>
                  <Button icon={<Trash2 />}>Supprimer</Button>
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
    </YStack>
  )
}
