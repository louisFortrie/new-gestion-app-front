export const convertStarRatingToNumber = (starRating: string) => {
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
