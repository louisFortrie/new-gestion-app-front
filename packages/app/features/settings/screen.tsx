'use client'

import { CustomButton, useToastController } from '@my/ui'
import { YStack, Text, styled, XStack, Image, Stack, Popover, Button } from 'tamagui'
import { MoreVertical, Plus, Trash } from '@tamagui/lucide-icons'
import axios from 'axios'
import { useEffect, useState } from 'react'
import useAuth from 'app/hooks/useAuth'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

const Card = styled(XStack, {
  gap: 16,
  padding: '$4',
  backgroundColor: 'white',
  borderRadius: '$4',
  borderWidth: 1,
  borderColor: '#F1F5F9',
  justifyContent: 'flex-start',
  alignItems: 'center',
  display: 'flex',
  width: 'calc(50% - 8px)',
})

export const SettingsScreen = () => {
  // TODO make a type for accounts
  const [accounts, setAccounts] = useState<any[]>([])
  const [prevUser, setPrevUser] = useState(null)
  const { user, setUser, loading } = useAuth()
  const toast = useToastController()

  const getGoogleAccounts = async () => {
    axios.get(apiUrl + '/api/gestion/accounts/' + user.id).then((res) => {
      console.log(res.data)
      setAccounts(res.data)
      setUser({ ...user, googleAccounts: res.data })
      localStorage.setItem('user', JSON.stringify({ ...user, googleAccounts: res.data }))
    })
  }

  const handleAddAccount = async () => {
    window.location.href = process.env.NEXT_PUBLIC_API_URL + '/api/gestion/google'
  }

  const handleDeleteAccount = async (id: string) => {
    axios.delete(apiUrl + '/api/gestion/accounts/' + id).then((res) => {
      console.log(res.data)
      getGoogleAccounts()
    })
    toast.show('Compte supprimé')
  }

  useEffect(() => {
    if (user && prevUser === null) {
      getGoogleAccounts()
    }
    setPrevUser(user)
  }, [user])

  const handleReAuth = async (email: string) => {
    window.location.href =
      process.env.NEXT_PUBLIC_API_URL +
      '/api/gestion/google/reconnect/' +
      email +
      '?redirectUrl=' +
      window.location.href
  }

  return (
    <YStack gap={8}>
      <XStack justifyContent="space-between" alignItems="center" gap={16}>
        <Text>Gestion des comptes google associés</Text>
        <CustomButton icon={<Plus />} onPress={() => handleAddAccount()}>
          Ajouter un compte
        </CustomButton>
      </XStack>
      <XStack gap={16} f={1} flexWrap="wrap">
        {accounts.map((account) => {
          return (
            <Card key={account.id}>
              <Image
                source={{
                  uri: account.profilePic,
                }}
                width={50}
                height={50}
                borderRadius={1000}
              ></Image>
              <YStack gap={8}>
                <Text color={'#1E293B'} fontWeight={600}>
                  {account.displayName}
                </Text>
                <Text color={'#475569'}>{account.email}</Text>
                {account.needsRefresh && (
                  <Text
                    paddingVertical={'$2'}
                    paddingHorizontal={'$3'}
                    backgroundColor={'rgba(255, 199, 0, 0.4)'}
                    color={'orange'}
                    borderRadius={'$4'}
                  >
                    Besoin de se reconnecter
                  </Text>
                )}
              </YStack>
              <Stack f={1}></Stack>
              <Popover>
                <Popover.Trigger>
                  <MoreVertical size={'$1'}></MoreVertical>
                </Popover.Trigger>

                <Popover.Content
                  borderWidth={1}
                  borderColor="$borderColor"
                  enterStyle={{ y: -10, opacity: 0 }}
                  exitStyle={{ y: -10, opacity: 0 }}
                  gap={8}
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
                  <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
                  {account.needsRefresh && (
                    <CustomButton onPress={() => handleReAuth(account.email)}>
                      Se reconnecter
                    </CustomButton>
                  )}
                  <Button
                    theme={'red'}
                    onPress={() => handleDeleteAccount(account.id)}
                    icon={<Trash></Trash>}
                  >
                    Supprimer
                  </Button>
                </Popover.Content>
              </Popover>
            </Card>
          )
        })}
        {/* <Card>
          <Text>Compte 1</Text>
        </Card> */}
      </XStack>
    </YStack>
  )
}
