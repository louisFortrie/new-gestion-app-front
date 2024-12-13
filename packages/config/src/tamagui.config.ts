import { createTamagui } from 'tamagui'
import { createFont } from 'tamagui'
import { shorthands } from '@tamagui/shorthands'
import { tokens, themes } from '@tamagui/config/v3'
import { createMedia } from '@tamagui/react-native-media-driver'
import { createThemeBuilder } from '@tamagui/theme-builder'

import { animations } from '@my/ui/src/animations'

const outfitFont = createFont({
  family: 'Outfit',
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 32,
    8: 40,
    9: 48,
    10: 64,
  },
  weight: {
    1: '300',
    2: '400',
    3: '500',
    4: '600',
    5: '700',
  },
  lineHeight: {
    1: 16,
    2: 20,
    3: 24,
    4: 28,
    5: 32,
    6: 40,
    7: 48,
    8: 56,
    9: 64,
    10: 80,
  },
  letterSpacing: {
    1: 0,
    2: 0,
    3: -0.5,
    4: -0.5,
    5: -1,
  },
  face: {
    400: { normal: 'Outfit-Regular' },
    700: { normal: 'Outfit-Bold' },
  },
})

// Définir les polices heading et body pour Tamagui
const headingFont = outfitFont
const bodyFont = outfitFont

const primary = [
  '#F1F5F9', // bg
  '#CDF463', // primary
  '#9ebd4a', // pressed
  '#dcfa89', // hover
  '#000000', // text
]

const template = {
  background: 1,
  backgroundFocus: 1,
  backgroundHover: 3,
  backgroundPress: 2,
  borderColor: 1,
  borderColorFocus: 1,
  borderColorHover: 3,
  borderColorPress: 2,
  color: 4,
  colorFocus: 1,
  colorHover: 3,
  colorPress: 2,
  colorTransparent: 'transparent',
  placeholderColor: 1,
  shadowColor: 1,
  shadowColorFocus: 1,
  shadowColorHover: 3,
  shadowColorPress: 2,
}

const themesBuilder = createThemeBuilder()
  .addPalettes({
    primary: primary,
  })
  .addTemplates({
    primary: template,
  })
  .addThemes({
    primary: {
      template: 'primary',
      palette: 'primary',
    },
  })

const avistarTheme = themesBuilder.build()

export const config = createTamagui({
  defaultFont: 'body',
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,

  // highly recommended to turn this on if you are using shorthands
  // to avoid having multiple valid style keys that do the same thing
  // we leave it off by default because it can be confusing as you onboard.
  onlyAllowShorthands: false,
  shorthands,

  fonts: {
    body: bodyFont,
    heading: headingFont,
  },
  settings: {
    allowedStyleValues: 'somewhat-strict',
  },
  themes: {
    ...themes,
    ...avistarTheme,
  },
  tokens,
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
})

// for the compiler to find it
export default config
