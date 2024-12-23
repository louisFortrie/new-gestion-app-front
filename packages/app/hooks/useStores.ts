import { useState, useEffect } from 'react'
import useAuth from './useAuth'
import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

const useStores = () => {
  const [stores, setStores] = useState<any[]>([])
  const [selectedStore, setSelectedStore] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { user } = useAuth()

  const refreshToken = async () => {
    try {
      await axios.post(
        apiUrl + '/api/gestion/refresh_token/' + user.id,
        {},
        {
          withCredentials: true,
        }
      )
    } catch (error) {
      console.error('Erreur lors de la récupération des magasins:', error)
    }
  }

  useEffect(() => {
    if (!user || !user.googleAccounts || user.googleAccounts.length === 0) return
    const fetchStores = async () => {
      setLoading(true)
      try {
        await refreshToken()

        const response = await axios.get(apiUrl + '/api/gestion/locations/' + user.id, {
          withCredentials: true,
        })
        setStores(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Erreur lors de la récupération des magasins:', error)
        setError(error)
        setLoading(false)
      }
    }

    fetchStores()
  }, [user])

  useEffect(() => {
    const localStore = localStorage.getItem('selectedStore')
    if (localStore) {
      setSelectedStore(JSON.parse(localStore))
    }
  }, [])

  return { stores, loading, error, selectedStore, setSelectedStore }
}

export default useStores
