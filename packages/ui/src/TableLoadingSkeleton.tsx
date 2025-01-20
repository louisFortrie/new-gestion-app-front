import React from 'react'
import { XStack, YStack, Text, styled, Separator, View } from 'tamagui'
import { createAnimations } from '@tamagui/animations-css'

// Styled components using Tamagui
const TableContainer = styled(YStack, {
  backgroundColor: '$background',
  borderRadius: '$4',
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: '#E2E8F0',
})

const TableHeader = styled(XStack, {
  padding: '$4',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#E2E8F0',
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
  } as const,
})

const TableCell = styled(XStack, {
  flex: 1,
  paddingHorizontal: '$2',
  width: 'calc(100% / 6)',
  overflow: 'hidden',
})

const SkeletonText = styled(Text, {
  backgroundColor: '#E2E8F0',
  height: 16,
  borderRadius: '$2',
})

export const TableLoadingSkeleton = () => {
  const rows = Array.from({ length: 10 })

  return (
    <TableContainer>
      <style>
        {`
      @keyframes shimmer {
          0% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.5;
        }
   `}
      </style>
      <TableHeader>
        <SkeletonText
          style={{
            animation: 'all 2s infinite',
            animationName: 'shimmer',
          }}
          width={200}
        />
        <SkeletonText
          style={{
            animation: 'all 2s infinite',
            animationName: 'shimmer',
          }}
          width={100}
        />
      </TableHeader>
      {rows.map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <SkeletonText
              style={{
                animation: 'all 2s infinite',
                animationName: 'shimmer',
              }}
              width={100}
              marginLeft={8}
            />
          </TableCell>
          <TableCell>
            <SkeletonText
              style={{
                animation: 'all 2s infinite',
                animationName: 'shimmer',
              }}
              width={80}
            />
          </TableCell>
          <TableCell>
            <SkeletonText
              style={{
                animation: 'all 2s infinite',
                animationName: 'shimmer',
              }}
              width={50}
            />
          </TableCell>
          <TableCell>
            <SkeletonText
              style={{
                animation: 'all 2s infinite',
                animationName: 'shimmer',
              }}
              width={150}
            />
          </TableCell>
          <TableCell>
            <SkeletonText
              style={{
                animation: 'all 2s infinite',
                animationName: 'shimmer',
              }}
              width={100}
            />
          </TableCell>
          <TableCell>
            <SkeletonText
              style={{
                animation: 'all 2s infinite',
                animationName: 'shimmer',
              }}
              width={80}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableContainer>
  )
}
