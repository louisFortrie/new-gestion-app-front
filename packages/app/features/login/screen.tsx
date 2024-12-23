'use client'

import { XStack, YStack, H2, H5, Form, Label, Input, Checkbox, Text, Stack, Spinner } from 'tamagui'
import { Check as CheckIcon } from '@tamagui/lucide-icons'
import { CustomButton, useToastController } from '@my/ui'
import { useState } from 'react'
import useAuth from 'app/hooks/useAuth'

const Login = () => {
  const toast = useToastController()
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')

  const { login, loading } = useAuth()

  return (
    <XStack alignItems="center" width={'100%'} justifyContent="space-between">
      <Stack width={'50%'}>
        <YStack alignItems="center" gap={'$4'} width={'40%'} margin={'auto'}>
          <XStack>
            <H2
              color={'black'}
              style={{
                letterSpacing: '0.05em',
              }}
            >
              GStar
            </H2>
            <H2 color={'#CDF463'}>.</H2>
          </XStack>
          <H5>Content de vous retrouver 👋</H5>
          <Text color={'$gray10Light'} textAlign="center">
            Améliorez l'expérience de vos clients en toute simplicité.
          </Text>
          <Form width={'100%'}>
            <Label htmlFor="emailInput">Nom d'utilisateur</Label>
            <Input
              id="emailInput"
              placeholder="Entrer le nom d'utilisateur"
              onChangeText={(text) => setUserName(text)}
            ></Input>
            <Label htmlFor="passwordInput">Mot de passe</Label>
            <Input
              id="passwordInput"
              placeholder="*******"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            ></Input>
          </Form>
          <XStack justifyContent="space-between" alignItems="center" width={'100%'}>
            <XStack alignItems="center" gap={'$2'}>
              <Checkbox id="checkBox">
                <Checkbox.Indicator>
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox>
              <Label htmlFor="checkBox">Se souvenir de moi</Label>
            </XStack>
            <Text color={'#98b548'} fontWeight={'$4'}>
              Mot de passe oublié ?
            </Text>
          </XStack>
          <CustomButton
            width={'100%'}
            onPress={() => {
              login(userName, password)
            }}
            icon={loading && <Spinner color={'black'} />}
          >
            Se connecter
          </CustomButton>
          <Text>
            Vous n'avez pas de compte ?{' '}
            <Text color={'#98b548'} fontWeight={'$4'}>
              S'inscrire
            </Text>
          </Text>
        </YStack>
      </Stack>
      <Stack
        width={'50%'}
        backgroundImage='url("/login_guy.jpg")'
        backgroundPosition={'center'}
        backgroundSize={'cover'}
        backgroundRepeat={'no-repeat'}
        height={'100vh'}
      ></Stack>
    </XStack>
  )
}

export default Login
