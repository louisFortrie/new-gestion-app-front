'use client'

import { XStack, YStack, Text, Input, Button, styled, H4, YGroup } from 'tamagui'
import { ArrowLeft, ArrowRight, StarFull } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { HorizontalSheet } from './HorizontalSheet'

// Styled components using Tamagui
const TableContainer = styled(YGroup, {
  backgroundColor: '$background',
  borderRadius: '$4',
  overflow: 'hidden',
})

const TableHeader = styled(XStack, {
  padding: '$4',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#E2E8F0',
  // borderTopEndRadius: '$4',
  // borderTopStartRadius: '$4',
})

const SearchInput = styled(Input, {
  width: 200,
  backgroundColor: 'transparent',
})

const Table = styled(YStack, {
  width: '100%',
})

const TableRow = styled(XStack, {
  padding: '$4',
  borderWidth: 1,
  borderColor: '#E2E8F0',
  alignItems: 'center',
  variants: {
    isHeader: {
      true: {
        backgroundColor: '#F1F5F9',
      },
    },
    isHovered: {
      true: {
        backgroundColor: '$backgroundHover',
      },
    },
  } as const,
})

const TableCell = styled(XStack, {
  flex: 1,
  paddingHorizontal: '$2',
})

const Tag = styled(XStack, {
  borderRadius: '$10',
  paddingHorizontal: '$3',
  paddingVertical: '$1',
  variants: {
    type: {
      price: {
        backgroundColor: '$green2Light',
      },
      quality: {
        backgroundColor: '$purple2Light',
      },
      service: {
        backgroundColor: '$blue2Light',
      },
      staff: {
        backgroundColor: '$orange2Light',
      },
    },
  } as const,
})

const StatusIndicator = styled(XStack, {
  alignItems: 'center',
  gap: '$2',
  variants: {
    status: {
      responded: {
        color: '$green11',
      },
      notResponded: {
        color: '$orange11',
      },
    },
  } as const,
})

const Dot = styled(XStack, {
  width: 8,
  height: 8,
  borderRadius: 1000,
  // backgroundColor: 'currentColor',
})

const PaginationContainer = styled(XStack, {
  padding: '$4',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#E2E8F0',
})

const PageButton = styled(Button, {
  variants: {
    isActive: {
      true: {
        backgroundColor: '$blue4Light',
      },
    },
  } as const,
})

export const ReviewTable = ({ reviews }) => {
  const [responseSheetOpen, setResponseSheetOpen] = useState(false)
  const handleClickResponse = () => {
    setResponseSheetOpen(true)
  }

  return (
    <>
      <TableContainer>
        <TableHeader>
          <H4 fontSize={18}>Centralized Review</H4>
          <XStack gap="$4">
            <SearchInput placeholder="Search" />
            <Button>Filters</Button>
          </XStack>
        </TableHeader>

        <Table>
          {/* Header */}
          <TableRow isHeader>
            <TableCell>
              <Text color={'#475569'} fontWeight={500} fontSize={12}>
                Reviewer
              </Text>
            </TableCell>
            <TableCell>
              <Text color={'#475569'} fontWeight={500} fontSize={12}>
                Date
              </Text>
            </TableCell>
            <TableCell>
              <Text color={'#475569'} fontWeight={500} fontSize={12}>
                Rating
              </Text>
            </TableCell>
            <TableCell>
              <Text color={'#475569'} fontWeight={500} fontSize={12}>
                Reviews
              </Text>
            </TableCell>
            <TableCell>
              <Text color={'#475569'} fontWeight={500} fontSize={12}>
                Tags
              </Text>
            </TableCell>
            <TableCell>
              <Text color={'#475569'} fontWeight={500} fontSize={12}>
                Status
              </Text>
            </TableCell>
            <TableCell>
              <Text color={'#475569'} fontWeight={500} fontSize={12}>
                Action
              </Text>
            </TableCell>
          </TableRow>

          {/* Rows */}
          {reviews.map((review, index) => (
            <TableRow key={index} pressStyle={{ backgroundColor: '$backgroundHover' }}>
              <TableCell>
                <Text>{review.reviewer}</Text>
              </TableCell>
              <TableCell>
                <Text>{review.date}</Text>
              </TableCell>
              <TableCell>
                <XStack alignItems="center" gap="$1">
                  <StarFull color={'orange'} size={'$1'} />
                  <Text>{review.rating}</Text>
                </XStack>
              </TableCell>
              <TableCell>
                <Text numberOfLines={1}>{review.comment}</Text>
              </TableCell>
              <TableCell>
                <Tag type={review.tag.toLowerCase()}>
                  <Text>{review.tag}</Text>
                </Tag>
              </TableCell>
              <TableCell>
                <StatusIndicator status={review.responded ? 'responded' : 'notResponded'}>
                  <Dot />
                  <Text>{review.responded ? 'Responded' : 'Not Responded'}</Text>
                </StatusIndicator>
              </TableCell>
              <TableCell>
                <Button variant="outlined" onPress={() => handleClickResponse()}>
                  Response
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </Table>

        <PaginationContainer>
          <Button variant="outlined" icon={<ArrowLeft />}>
            Previous
          </Button>
          <XStack gap="$2">
            {[1, 2, 3, '...', 8, 9, 10].map((page, index) => (
              <PageButton key={index} isActive={page === 1} circular>
                <Text>{page}</Text>
              </PageButton>
            ))}
          </XStack>
          <Button variant="outlined" iconAfter={<ArrowRight />}>
            Next
          </Button>
        </PaginationContainer>
      </TableContainer>

      {/* Response Sheet */}
      <HorizontalSheet></HorizontalSheet>
    </>
  )
}

// Usage example:
const reviews = [
  {
    reviewer: 'Arlene McCoy',
    date: '2024-12-01',
    rating: 4.8,
    comment: 'Excellent service and friendly...',
    tag: 'Price',
    responded: false,
  },
  {
    reviewer: 'Eleanor Pena',
    date: '2024-11-28',
    rating: 4.5,
    comment: 'Good quality but a bit expen...',
    tag: 'Quality',
    responded: true,
  },
]
