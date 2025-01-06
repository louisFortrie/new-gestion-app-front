'use client'

import { XStack, YStack, Text, Input, Button, styled, H4, YGroup, Image, Stack, XGroup, Separator, View } from 'tamagui'
import { ArrowLeft, ArrowRight, StarFull } from '@tamagui/lucide-icons'
import { useMemo, useState, useEffect } from 'react'
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
  width: 'calc(100% / 6)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
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
  backgroundColor: '#FFFAEB',
  borderRadius: 100,
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  variants: {
    responded: {
      true : {
        backgroundColor: '#ECFDF3',
      }
    },
    
  } as const,
})

const Dot = styled(XStack, {
  width: 8,
  height: 8,
  borderRadius: 1000,
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

export const ReviewTable = ({ reviews, totalCount, pageChange }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [responseSheetOpen, setResponseSheetOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState({})
  const { user } = useAuth()
  const { selectedStore } = useStores()
  
  const itemsPerPage = 10
  const [hasNextPage, setHasNextPage] = useState(true) // Whether there are more reviews to load

  // Filter and paginate reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter(review => 
      review.reviewer.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [reviews, searchQuery])

  useEffect(() => {
    pageChange(currentPage)
  }, [currentPage])

  const totalPages = Math.ceil(totalCount / itemsPerPage)
 
  
  
  const paginatedReviews = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredReviews.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredReviews, currentPage])

  const handleClickResponse = (reviewId: string) => {
    setResponseSheetOpen(true)
    setSelectedReview(reviews.find((review) => review.reviewId === reviewId))
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
      .then(() => {
        setResponseSheetOpen(false)
        setSelectedReview({})
        const reviewIndex = reviews.findIndex((review) => review.reviewId === reviewId)
        reviews[reviewIndex].reviewReply = responseText
      })
      .catch((error) => {
        console.error('Erreur lors de la réponse à l\'avis:', error)
      })
  }

  return (
    <>
      <YGroup f={1} width={'100%'} borderRadius={4} borderWidth={1} borderColor={'#E2E8F0'} separator={<Separator backgroundColor="#E2E8F0" height={1}/>}>
        <YGroup.Item>
          <XStack f={1} backgroundColor={"white"} justifyContent='space-between' alignItems='center' padding={16} gap={8}>
            <H4 fontSize={18}>Avis centralisés</H4>
            <XStack gap="$4">
              <SearchInput 
                placeholder="Search" 
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <Button>Filters</Button>
            </XStack>
          </XStack>
        </YGroup.Item>

        <YGroup.Item>
          <XGroup f={1} width={'100%'}>
            {/* Your existing columns structure */}
            <XGroup.Item>
              <YGroup justifyContent='flex-start' f={1} separator={<Separator backgroundColor="#E2E8F0" height={1}/>} borderRadius={0}>
                <YGroup.Item>
                  <Text paddingVertical={16}  paddingHorizontal={32} color={'#475569'} fontWeight={500} fontSize={12}>
                    Reviewer
                  </Text>
                </YGroup.Item>
                {paginatedReviews.map((review, index) => (
                  <YGroup.Item key={index} f={1}>
                    <View f={1} backgroundColor="white" padding={32}  flexDirection='row' alignItems='center' gap={8}>
                      <Image 
                        source={{
                          uri: review.reviewer.profilePhotoUrl
                        }}
                        width={32}
                        height={32}
                      />
                      <Text color={"#475569"}>{review.reviewer.displayName}</Text>
                    </View>
                  </YGroup.Item>
                ))}
              </YGroup>
            </XGroup.Item>

            <XGroup.Item>
              <YGroup justifyContent='flex-start' f={1} separator={<Separator backgroundColor="#E2E8F0" height={1}/>} borderRadius={0}>
                <YGroup.Item>
                  <Text paddingVertical={16}  paddingHorizontal={32} color={'#475569'} fontWeight={500} fontSize={12}>
                    Date
                  </Text>
                </YGroup.Item>
                {paginatedReviews.map((review, index) => (
                  <YGroup.Item key={index} f={1}>
                    <View f={1} backgroundColor="white" padding={32} justifyContent='center'>
                      <Text color={"#475569"}>{new Date(review.createTime).toLocaleDateString('fr')}</Text>
                    </View>
                  </YGroup.Item>
                ))}
              </YGroup>
            </XGroup.Item>

            <XGroup.Item>
              <YGroup justifyContent='flex-start' f={1} separator={<Separator backgroundColor="#E2E8F0" height={1}/>} borderRadius={0}>
                <YGroup.Item>
                  <Text paddingVertical={16}  paddingHorizontal={32} color={'#475569'} fontWeight={500} fontSize={12}>
                    Note
                  </Text>
                </YGroup.Item>
                {paginatedReviews.map((review, index) => (
                  <YGroup.Item key={index} f={1}>
                    <View backgroundColor="white" padding={32} f={1}  flexDirection='row' alignItems='center' gap={8}>
                      <StarFull color={'orange'} size={'$1'} />
                      <Text color={'orange'}>{convertStarRatingToNumber(review.starRating)}</Text>
                    </View>
                  </YGroup.Item>
                ))}
              </YGroup>
            </XGroup.Item>

            <XGroup.Item >
              <YGroup  justifyContent='flex-start' f={1} separator={<Separator backgroundColor="#E2E8F0" height={1}/>} borderRadius={0}>
                <YGroup.Item  >
                  <Text paddingVertical={16}  paddingHorizontal={32} color={'#475569'} fontWeight={500} fontSize={12}>
                    Commentaire
                  </Text>
                </YGroup.Item>
                {paginatedReviews.map((review, index) => (
                  <YGroup.Item key={index} f={1}   width={200} height={"100%"}>
                    <View  f={1} backgroundColor="white" padding={32} justifyContent='center' >
                      <Text width={200} numberOfLines={1} height={20} color={"#475569"}>{review.comment || " "}</Text>
                    </View>
                  </YGroup.Item>
                ))}
              </YGroup>
            </XGroup.Item>

            <XGroup.Item>
              <YGroup justifyContent='flex-start' f={1} separator={<Separator backgroundColor="#E2E8F0" height={1}/>} borderRadius={0}>
                <YGroup.Item>
                  <Text paddingVertical={16}  paddingHorizontal={32} color={'#475569'} fontWeight={500} fontSize={12}>
                    Status
                  </Text>
                </YGroup.Item>
                {paginatedReviews.map((review, index) => (
                  <YGroup.Item key={index} f={1} >
                    <View f={1} backgroundColor="white" padding={32} justifyContent='center'>
                      <StatusIndicator responded={review.reviewReply ? true : false} alignSelf='flex-start'>
                        <Dot backgroundColor={review.reviewReply ? "#17B26A" : "#F79009"} />
                        <Text color={review.reviewReply ? "#067647" : "#B54708"} >{review.reviewReply ? 'Répondu' : 'Pas répondu'}</Text>
                      </StatusIndicator>
                    </View>
                  </YGroup.Item>
                ))}
              </YGroup>
            </XGroup.Item>

            <XGroup.Item>
              <YGroup justifyContent='flex-start' f={1} separator={<Separator backgroundColor="#E2E8F0" height={1}/>} borderRadius={0}>
                <YGroup.Item>
                  <Text paddingVertical={16}  paddingHorizontal={32} color={'#475569'} fontWeight={500} fontSize={12}>
                    Action
                  </Text>
                </YGroup.Item>
                {paginatedReviews.map((review, index) => (
                  <YGroup.Item key={index} f={1}>
                    <View f={1} backgroundColor="white" padding={32} justifyContent='center'>
                      <Button variant="outlined" onPress={() => handleClickResponse(review.reviewId)} >
                        Répondre
                      </Button>
                    </View>
                  </YGroup.Item>
                ))}
              </YGroup>
            </XGroup.Item>
          </XGroup>
        </YGroup.Item>

        <YGroup.Item>
          <XStack 
            backgroundColor="white" 
            padding={16} 
            justifyContent="space-between" 
            alignItems="center"
            borderTopWidth={1}
            borderColor="#E2E8F0"
          >
            <Text color="#475569">
              Affichage de {((currentPage - 1) * itemsPerPage) + 1} à {Math.min(currentPage * itemsPerPage, filteredReviews.length)} des {totalCount} avis
            </Text>
            <XStack gap={8}>
                <Button variant="outlined" disabled={currentPage === 1} onPress={() => setCurrentPage(1)}>
                  Revenir au début
                </Button>

              <Button 
                variant="outlined" 
                disabled={currentPage === 1}
                onPress={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                <ArrowLeft />
                Précédent
              </Button>
              
              <Text color="#475569">
                Page {currentPage}
              </Text>
              
              <Button 
                variant="outlined"
                disabled={currentPage === totalPages}
                onPress={() => setCurrentPage(prev => prev + 1)}
              >
                Suivant
                <ArrowRight />
              </Button>
            </XStack>
          </XStack>
        </YGroup.Item>
      </YGroup>

      <HorizontalSheet
        handleSendPress={handleSendResponse}
        handleOpenPressed={setResponseSheetOpen}
        open={responseSheetOpen}
        selectedReview={selectedReview}
      />
    </>
  )
}