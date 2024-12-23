'use client'

import { XStack, YStack, Text, Input, Button, styled, H4, YGroup } from 'tamagui'
import { ArrowLeft, ArrowRight, StarFull } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { HorizontalSheet } from './HorizontalSheet'
import axios from 'axios'
import useAuth from 'app/hooks/useAuth'
import useStores from 'app/hooks/useStores'

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

const convertStarRatingToNumber = (starRating: string) => {
  switch (starRating) {
    case 'ONE':
      return 1
    case 'TWO':
      return 2
    case 'THREE':
      return 3
    case 'FOUR':
      return 4
    case 'FIVE':
      return 5
    default:
      return 0
  }
}
const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const ReviewTable = ({ reviews }) => {
  const [responseSheetOpen, setResponseSheetOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState({})
  const { user } = useAuth()
  const { selectedStore } = useStores()

  const handleClickResponse = (reviewId: string) => {
    setResponseSheetOpen(true)
    setSelectedReview(reviews.find((review) => review.id === reviewId))
    console.log('selectedReview', selectedReview)
  }

  const handleSendResponse = (reviewId, responseText) => {
    axios.put(
      `${apiUrl}/api/mybusiness/locations/reviews/updateReply`,
      {
        reviewId,
        reply: responseText,
        accountId: user.googleAccounts[0].googleAccount.accountId,
        locationId: selectedStore.name.split('/')[1],
      },
      {
        withCredentials: true,
      }
    )
  }

  return (
    <>
      <TableContainer>
        <TableHeader>
          <H4 fontSize={18}>Avis centralisés</H4>
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
                Note
              </Text>
            </TableCell>
            <TableCell>
              <Text color={'#475569'} fontWeight={500} fontSize={12}>
                Commentaire
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
                <Text>{review.reviewer.displayName}</Text>
              </TableCell>
              <TableCell>
                <Text>{new Date(review.createTime).toLocaleDateString('fr')}</Text>
              </TableCell>
              <TableCell>
                <XStack alignItems="center" gap="$1">
                  <StarFull color={'orange'} size={'$1'} />
                  <Text>{convertStarRatingToNumber(review.starRating)}</Text>
                </XStack>
              </TableCell>
              <TableCell>
                <Text numberOfLines={1}>{review.comment}</Text>
              </TableCell>

              <TableCell>
                <StatusIndicator status={review.reviewReply ? 'responded' : 'notResponded'}>
                  <Dot />
                  <Text>{review.reviewReply ? 'Répondu' : 'Pas répondu'}</Text>
                </StatusIndicator>
              </TableCell>
              <TableCell>
                <Button variant="outlined" onPress={() => handleClickResponse(review.id)}>
                  Répondre
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </Table>

        {/* <PaginationContainer>
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
        </PaginationContainer> */}
      </TableContainer>

      {/* Response Sheet */}
      <HorizontalSheet
        handleSendPress={(reviewId, responseText) => handleSendResponse(reviewId, responseText)}
        handleOpenPressed={(isOpen) => setResponseSheetOpen(isOpen)}
        open={responseSheetOpen}
        selectedReview={selectedReview}
      ></HorizontalSheet>
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
