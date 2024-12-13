'use client'

import React from 'react'
import { XStack, XStackProps, NavBar, YStack, CustomHeader } from '@my/ui'

interface HocLayoutProps extends XStackProps {
  children: React.ReactNode
}

const HocLayout: React.FC<HocLayoutProps> = ({ children, ...rest }) => {
  return (
    <XStack {...rest} width={'100%'}>
      <NavBar />
      <YStack paddingHorizontal={'$10'} paddingVertical={'$5'} f={1}>
        <CustomHeader></CustomHeader>
        {children}
      </YStack>
    </XStack>
  )
}

export default HocLayout
