'use client'

import React from 'react'
import { XStack, XStackProps, NavBar, YStack, CustomHeader } from '@my/ui'
import { usePathname } from 'solito/navigation'
interface HocLayoutProps extends XStackProps {
  children: React.ReactNode
}

const HocLayout: React.FC<HocLayoutProps> = ({ children, ...rest }) => {
  const pathname = usePathname()
  const isInloginpage = pathname?.startsWith('/login')

  return (
    <XStack {...rest} width={'100%'} position="relative">
      {!isInloginpage && <NavBar />}
      <YStack
        paddingHorizontal={!isInloginpage ? '$10' : 0}
        paddingVertical={!isInloginpage ? '$5' : 0}
        f={1}
      >
        {/* {!isInloginpage && <CustomHeader></CustomHeader>} */}

        {children}
      </YStack>
    </XStack>
  )
}

export default HocLayout
