'use client'

import {
  XStack,
  YStack,
  Text,
  Input,
  Button,
  styled,
  H4,
  YGroup,
  Image,
  XGroup,
  Separator,
  View,
  Popover,
  Checkbox,
  Label,
  Spinner,
} from 'tamagui'
import { ArrowLeft, ArrowRight, StarFull } from '@tamagui/lucide-icons'
import { useMemo, useState, useEffect, useRef } from 'react'
import { HorizontalSheet } from './HorizontalSheet'
import axios from 'axios'
import useStores from 'app/hooks/useStores'
import { Check as CheckIcon } from '@tamagui/lucide-icons'
import { StarRatingFilter } from '@my/ui'
import {convertStarRatingToNumber} from 'app/utils/convertions'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css'
import 'react-calendar/dist/Calendar.css'


const SearchInput = styled(Input, {
  width: 200,
  backgroundColor: 'transparent',
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
      true: {
        backgroundColor: '#ECFDF3',
      },
    },
  } as const,
})

const Dot = styled(XStack, {
  width: 8,
  height: 8,
  borderRadius: 1000,
})



const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const ReviewTable = ({ reviews, totalCount, loading }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [responseSheetOpen, setResponseSheetOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState({})
  const { selectedStore } = useStores(false)
  const itemsPerPage = 10
  const [respondedChecked, setRespondedChecked] = useState(true) // Whether the 'responded' checkbox is checked
  const [notRespondedChecked, setNotRespondedChecked] = useState(true) // Whether the 'not responded' checkbox is checked
  const [totalReviewsCount, setTotalReviewsCount] = useState(totalCount)
  const [totalPages, setTotalPages] = useState(Math.ceil(totalCount / itemsPerPage))
  const [ratingFilter, setRatingFilter] = useState(5)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [minDate, setMinDate] = useState(new Date())
  const [maxDate, setMaxDate] = useState(new Date())

  // Filter and paginate reviews
  const filteredReviews = useMemo(() => {
    const filteredReviewsByResponseStatus = reviews.filter((review) => {
      if (respondedChecked && notRespondedChecked) {
        return true
      }
      if (respondedChecked) {
        return review.reviewReply
      }
      if (notRespondedChecked) {
        return !review.reviewReply
      }
      return true
    })

    const filteredReviewsByRating = filteredReviewsByResponseStatus.filter(
      (review) => convertStarRatingToNumber(review.starRating) <= ratingFilter
    )
    const filteredReviewsByDate = filteredReviewsByRating.filter(
      (review) => new Date(review.createTime) >= startDate && new Date(review.createTime) <= endDate
    )

    const filteredReviewsByContent = filteredReviewsByDate.filter(
      (review) =>
        review.reviewer.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.comment?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    setTotalPages(Math.ceil(filteredReviewsByContent.length / itemsPerPage))

    setTotalReviewsCount(filteredReviewsByContent.length)
    return filteredReviewsByContent
  }, [
    reviews,
    searchQuery,
    respondedChecked,
    notRespondedChecked,
    ratingFilter,
    startDate,
    endDate,
  ])

 
  useEffect(() => {
    if (!reviews || reviews.length === 0) return
    const startDate = new Date(reviews[reviews.length - 1].createTime)
    const endDate = new Date(reviews[0].createTime)
    setMinDate(startDate)
    setMaxDate(endDate)
    setStartDate(startDate)
    setEndDate(endDate)
  }, [reviews])

  const paginatedReviews = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredReviews.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredReviews, currentPage])

  const handleClickResponse = (reviewId: string) => {
    setResponseSheetOpen(true)
    setSelectedReview(reviews.find((review) => review.reviewId === reviewId))
  }

  const handleSendResponse = (reviewId, responseText) => {
    axios
      .put(
        `${apiUrl}/api/mybusiness/locations/reviews/updateReply`,
        {
          reviewId,
          reply: responseText,
          accountId: selectedStore.accountId,
          locationId: selectedStore.name.split('/')[1],
          totalReviewCount: totalReviewsCount,
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
        console.error("Erreur lors de la réponse à l'avis:", error)
      })
  }

  return (
    <>
      <style>
        {`
            /* Styliser l'input directement */
            .react-daterange-picker__wrapper {
              border: 2px solid gray;
              border-radius: 0.375rem;
              padding: 0.5rem;
            }

            .react-daterange-picker__inputGroup {
              font-family: sans-serif;
              font-size: 1rem;
              color: #1f2937;
            }

            /* Styliser le calendrier popup */
            .react-calendar {
              background-color: white;
              border: 1px solid #e5e7eb;
              border-radius: 0.5rem;
              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
            }

            .react-calendar__tile--active {
              background-color: #2563eb !important;
              color: white;
            }

            .react-calendar__tile:hover {
              background-color: #bfdbfe;
            }

            /* Styliser les icônes */
            .react-daterange-picker__button {
              padding: 0.25rem;
            }

            .react-daterange-picker__button:hover {
              background-color: #f3f4f6;
              border-radius: 0.25rem;
            }

            /* Styliser l'état focus */
            .react-daterange-picker__wrapper:focus-within {
              border-color: #3b82f6;
              box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
              outline: none;
            }
          `}
      </style>
      <YGroup
        f={1}
        width={'100%'}
        borderRadius={4}
        borderWidth={1}
        borderColor={'#E2E8F0'}
        separator={<Separator backgroundColor="#E2E8F0" height={1} />}
      >
        <YGroup.Item>
          <XStack
            f={1}
            backgroundColor={'white'}
            justifyContent="space-between"
            alignItems="center"
            padding={16}
            gap={8}
          >
            <H4 fontSize={18}>Avis centralisés</H4>
            <XStack gap="$4">
              {loading && <Spinner color='black' alignSelf='center'/>}
              <SearchInput placeholder="Search" value={searchQuery} onChangeText={setSearchQuery} />
              <Popover allowFlip>
                <Popover.Trigger asChild>
                  <Button>Filtres</Button>
                </Popover.Trigger>
                <Popover.Content
                  onOpenAutoFocus={(event) => event.preventDefault()}
                  trapFocus={false}
                  borderWidth={1}
                  borderColor="$borderColor"
                  enterStyle={{ y: -10, opacity: 0 }}
                  exitStyle={{ y: -10, opacity: 0 }}
                  elevate
                  animation={[
                    'quick',
                    {
                      opacity: {
                        overshootClamping: true,
                      },
                    },
                  ]}
                >
                  <YStack gap="$3">
                    <Text fontWeight={600} fontSize={'$3'}>
                      Dates
                    </Text>
                    <DateRangePicker
                      autoFocus={false}
                      value={[startDate, endDate]}
                      onChange={(value) => {
                        if (value === null) {
                          setStartDate(minDate)
                          setEndDate(maxDate)
                          return
                        }
                        setStartDate(value[0])
                        setEndDate(value[1])
                      }}
                      showLeadingZeros={true}
                      disabled={loading}
                    />
                    <Text fontWeight={600} fontSize={'$3'}>
                      Notes
                    </Text>
                    <StarRatingFilter
                      onChange={(value) => setRatingFilter(value)}
                      value={ratingFilter}
                    ></StarRatingFilter>
                    <Text fontWeight={600} fontSize={'$3'}>
                      Statut
                    </Text>
                    <XStack alignItems="center" gap={8}>
                      <Checkbox
                        id="responded"
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setRespondedChecked(true)
                          } else {
                            setRespondedChecked(false)
                          }
                        }}
                        defaultChecked={respondedChecked}
                      >
                        <Checkbox.Indicator>
                          <CheckIcon />
                        </Checkbox.Indicator>
                      </Checkbox>
                      <Label htmlFor="responded">
                        {' '}
                        <StatusIndicator responded alignSelf="flex-start" paddingVertical={0}>
                          <Dot backgroundColor={'#17B26A'} />
                          <Text color={'#067647'}>{'Répondu'}</Text>
                        </StatusIndicator>
                      </Label>
                    </XStack>
                    <XStack alignItems="center" gap={8}>
                      <Checkbox
                        id="notResponded"
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setNotRespondedChecked(true)
                          } else {
                            setNotRespondedChecked(false)
                          }
                        }}
                        defaultChecked={notRespondedChecked}
                      >
                        <Checkbox.Indicator>
                          <CheckIcon />
                        </Checkbox.Indicator>
                      </Checkbox>
                      <Label htmlFor="notResponded">
                        <StatusIndicator
                          responded={false}
                          alignSelf="flex-start"
                          paddingVertical={0}
                        >
                          <Dot backgroundColor={'#F79009'} />
                          <Text color={'#B54708'}>Pas répondu</Text>
                        </StatusIndicator>
                      </Label>
                    </XStack>
                    <Popover.Close asChild>
                      <Button
                        size="$3"
                        onPress={() => {
                          /* Custom code goes here, does not interfere with popover closure */
                        }}
                      >
                        Confirmer
                      </Button>
                    </Popover.Close>
                  </YStack>
                </Popover.Content>
              </Popover>
            </XStack>
          </XStack>
        </YGroup.Item>

        <YGroup.Item>
          <XGroup f={1} width={'100%'}>
            {/* Your existing columns structure */}
            <XGroup.Item>
              <YGroup
                justifyContent="flex-start"
                f={1}
                separator={<Separator backgroundColor="#E2E8F0" height={1} />}
                borderRadius={0}
              >
                <YGroup.Item>
                  <Text
                    paddingVertical={16}
                    paddingHorizontal={32}
                    color={'#475569'}
                    fontWeight={500}
                    fontSize={16}
                  >
                    Reviewer
                  </Text>
                </YGroup.Item>
                {paginatedReviews.map((review, index) => (
                  <YGroup.Item key={index} f={1}>
                    <View
                      f={1}
                      backgroundColor="white"
                      padding={32}
                      flexDirection="row"
                      alignItems="center"
                      gap={8}
                    >
                      <Image
                        source={{
                          uri: review.reviewer.profilePhotoUrl,
                        }}
                        width={32}
                        height={32}
                      />
                      <Text color={'#475569'}>{review.reviewer.displayName}</Text>
                    </View>
                  </YGroup.Item>
                ))}
              </YGroup>
            </XGroup.Item>

            <XGroup.Item>
              <YGroup
                justifyContent="flex-start"
                f={1}
                separator={<Separator backgroundColor="#E2E8F0" height={1} />}
                borderRadius={0}
              >
                <YGroup.Item>
                  <Text
                    textAlign="center"
                    paddingVertical={16}
                    paddingHorizontal={32}
                    color={'#475569'}
                    fontWeight={500}
                    fontSize={16}
                  >
                    Date
                  </Text>
                </YGroup.Item>
                {paginatedReviews.map((review, index) => (
                  <YGroup.Item key={index} f={1}>
                    <View f={1} backgroundColor="white" padding={32} justifyContent="center">
                      <Text color={'#475569'} textAlign="center">
                        {new Date(review.createTime).toLocaleDateString('fr')}
                      </Text>
                    </View>
                  </YGroup.Item>
                ))}
              </YGroup>
            </XGroup.Item>

            <XGroup.Item>
              <YGroup
                justifyContent="flex-start"
                f={1}
                separator={<Separator backgroundColor="#E2E8F0" height={1} />}
                borderRadius={0}
              >
                <YGroup.Item>
                  <Text
                    paddingVertical={16}
                    paddingHorizontal={32}
                    color={'#475569'}
                    fontWeight={500}
                    fontSize={16}
                    textAlign="center"
                  >
                    Note
                  </Text>
                </YGroup.Item>
                {paginatedReviews.map((review, index) => (
                  <YGroup.Item key={index} f={1}>
                    <View
                      backgroundColor="white"
                      padding={32}
                      f={1}
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="center"
                      gap={8}
                    >
                      <Text color={'orange'} fontWeight={600}>
                        {convertStarRatingToNumber(review.starRating)}
                      </Text>
                      <StarFull color={'orange'} size={'$1'} />
                    </View>
                  </YGroup.Item>
                ))}
              </YGroup>
            </XGroup.Item>

            <XGroup.Item>
              <YGroup
                justifyContent="flex-start"
                f={1}
                separator={<Separator backgroundColor="#E2E8F0" height={1} />}
                borderRadius={0}
              >
                <YGroup.Item>
                  <Text
                    paddingVertical={16}
                    paddingHorizontal={32}
                    color={'#475569'}
                    fontWeight={500}
                    fontSize={16}
                    textAlign="center"
                  >
                    Commentaire
                  </Text>
                </YGroup.Item>
                {paginatedReviews.map((review, index) => (
                  <YGroup.Item key={index} f={1} width={200} height={'100%'}>
                    <View
                      f={1}
                      backgroundColor="white"
                      padding={32}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Text
                        width={200}
                        numberOfLines={1}
                        height={20}
                        color={'#475569'}
                        textAlign="center"
                      >
                        {review.comment || ' '}
                      </Text>
                    </View>
                  </YGroup.Item>
                ))}
              </YGroup>
            </XGroup.Item>

            <XGroup.Item>
              <YGroup
                justifyContent="flex-start"
                f={1}
                separator={<Separator backgroundColor="#E2E8F0" height={1} />}
                borderRadius={0}
              >
                <YGroup.Item>
                  <Text
                    paddingVertical={16}
                    paddingHorizontal={32}
                    color={'#475569'}
                    fontWeight={500}
                    fontSize={16}
                    textAlign="center"
                  >
                    Status
                  </Text>
                </YGroup.Item>
                {paginatedReviews.map((review, index) => (
                  <YGroup.Item key={index} f={1}>
                    <View f={1} backgroundColor="white" padding={32} justifyContent="center">
                      <StatusIndicator
                        responded={review.reviewReply ? true : false}
                        alignSelf="center"
                      >
                        <Dot backgroundColor={review.reviewReply ? '#17B26A' : '#F79009'} />
                        <Text color={review.reviewReply ? '#067647' : '#B54708'}>
                          {review.reviewReply ? 'Répondu' : 'Pas répondu'}
                        </Text>
                      </StatusIndicator>
                    </View>
                  </YGroup.Item>
                ))}
              </YGroup>
            </XGroup.Item>

            <XGroup.Item>
              <YGroup
                justifyContent="flex-start"
                f={1}
                separator={<Separator backgroundColor="#E2E8F0" height={1} />}
                borderRadius={0}
              >
                <YGroup.Item>
                  <Text
                    paddingVertical={16}
                    paddingHorizontal={32}
                    color={'#475569'}
                    fontWeight={500}
                    fontSize={16}
                    textAlign="center"
                  >
                    Action
                  </Text>
                </YGroup.Item>
                {paginatedReviews.map((review, index) => (
                  <YGroup.Item key={index} f={1}>
                    <View f={1} backgroundColor="white" padding={32} justifyContent="center">
                      <Button
                        variant="outlined"
                        onPress={() => handleClickResponse(review.reviewId)}
                      >
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
              Affichage de {(currentPage - 1) * itemsPerPage + 1} à{' '}
              {Math.min(currentPage * itemsPerPage, filteredReviews.length)} des {totalReviewsCount}{' '}
              avis
            </Text>
            <XStack gap={8} alignItems="center">
              <Button
                variant="outlined"
                disabled={currentPage === 1}
                onPress={() => setCurrentPage(1)}
              >
                Revenir au début
              </Button>

              <Button
                variant="outlined"
                disabled={currentPage === 1}
                onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                <ArrowLeft />
                Précédent
              </Button>

              <Text color="#475569">Page {currentPage}</Text>

              <Button
                variant="outlined"
                disabled={currentPage === totalPages}
                onPress={() => setCurrentPage((prev) => prev + 1)}
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
