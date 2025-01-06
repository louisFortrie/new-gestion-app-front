import { XStack, Text } from 'tamagui'
import { CustomInput } from './CustomInput'
import { Search, Command } from '@tamagui/lucide-icons'

export const CustomHeader = () => {
  return (
    <XStack marginBottom={32}>
      <CustomInput
        placeholder="Search"
        PreIcon={<Search color={'#94A3B8'} size={'$1'} />}
        PostIcon={
          <Text
            color={'#0F172A'}
            fontSize={'$2'}
            height={'$1.5'}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#F4F6F9',
              padding: '5px 7px',
              borderRadius: 100,
            }}
          >
            <Command color={'#0F172A'} size={13} />K
          </Text>
        }
      ></CustomInput>
    </XStack>
  )
}
