import { XStack, Text, YStack, styled, View, YGroup } from 'tamagui'

const TableHeading = styled(XStack, {
  paddingHorizontal: '$4',
  paddingVertical: '$2',
  borderColor: '#E2E8F0',
  borderWidth: 2,
  backgroundColor: '#F1F5F9',
  width: '100%',
})
const TableRow = styled(XStack, {
  padding: '$4',
  backgroundColor: 'white',
  borderBottomColor: '#E2E8F0',
  borderBottomWidth: 2,
  borderLeftColor: '#E2E8F0',
  borderLeftWidth: 2,
  borderRightColor: '#E2E8F0',
  borderRightWidth: 2,
  width: '100%',
  hoverStyle: {
    backgroundColor: '#E2E8F0',
  },
})

interface PromoTableProps {
  heading: string[]
  codes: any[]
}

const colors = [
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
  'orange',
  'pink',
  'brown',
  'black',
  'white',
]

export const PromoTable = ({ heading, codes }: PromoTableProps) => {
  return (
    <YGroup>
      <TableHeading>
        {heading.map((item, index) => (
          <View
            width={'calc(100% / 4)'}
            padding="$2"
            style={{
              textAlign: 'center',
              // background: colors[index],
              background: '#F1F5F9',
            }}
            key={index}
          >
            <Text fontSize={12} fontWeight={500}>
              {item}
            </Text>
          </View>
        ))}
      </TableHeading>
      {codes.map((row, index) => (
        <TableRow key={index}>
          <View
            flex={1}
            padding="$2"
            width={'calc(100% / 4)'}
            style={{
              textAlign: 'center',
              // backgroundColor: 'red',
            }}
          >
            <Text fontWeight={400} fontSize={14}>
              {new Date(row.createdAt).toLocaleDateString()}
            </Text>
          </View>
          <View
            flex={1}
            padding="$2"
            width={'calc(100% / 4)'}
            style={{
              textAlign: 'center',
              // backgroundColor: 'blue',
            }}
          >
            <Text fontWeight={400} fontSize={14}>
              {new Date(row.usedAt).toLocaleDateString() || '-'}
            </Text>
          </View>
          <View
            flex={1}
            width={'calc(100% / 4)'}
            padding="$2"
            style={{
              textAlign: 'center',
              // backgroundColor: 'green',
            }}
          >
            <Text fontWeight={400} fontSize={14}>
              {row.code}
            </Text>
          </View>

          <View
            flex={1}
            padding="$2"
            width={'calc(100% / 4)'}
            style={{
              textAlign: 'center',
              // backgroundColor: 'yellow',
            }}
          >
            <Text fontWeight={400} fontSize={14}>
              {row.discount}
            </Text>
          </View>
        </TableRow>
      ))}
    </YGroup>
  )
}
