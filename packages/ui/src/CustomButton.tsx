import { Button, Theme, ButtonProps } from 'tamagui'

interface CustomButtonProps {
  children: React.ReactNode
}

export const CustomButton = ({ children, ...rest }: CustomButtonProps & ButtonProps) => {
  return (
    <Theme name={'primary'}>
      <Button {...rest}>{children}</Button>
    </Theme>
  )
}
