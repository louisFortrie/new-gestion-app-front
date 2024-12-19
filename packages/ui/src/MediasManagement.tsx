import { H1, Stack, styled, Text, YStack } from 'tamagui'
import { Plus } from '@tamagui/lucide-icons'

const AddMediaInput = styled(YStack, {
  gap: '$2',
  padding: '$2',
  backgroundColor: '#f1f5f9',
  borderRadius: '$4',
  borderColor: '#CBD5E1',
  borderStyle: 'dashed',
  borderWidth: 1,
  alignItems: 'center',
  justifyContent: 'center',
  height: 100,
  width: 100,
  cursor: 'pointer',
})

export const MediasManagement = () => {
  return (
    <AddMediaInput>
      <Plus></Plus>
      <Text>Upload</Text>
    </AddMediaInput>
  )
}
