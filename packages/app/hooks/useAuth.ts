import { useState, useEffect } from 'react'
import axios from 'axios'
import { useToastController } from '@my/ui'
import { useRouter } from 'solito/navigation'

const apiUrl = process.env.NEXT_PUBLIC_API_URL
// Hook d'authentification
const useAuth = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const toast = useToastController()
  const router = useRouter()

  // Vérifier si l'utilisateur est authentifié lors du chargement du composant
  useEffect(() => {
    const localUser = localStorage.getItem('user')
    if (localUser && !user) {
      setUser(JSON.parse(localUser))
    }
  }, [])

  // Fonction pour se connecter
  const login = async (userName: string, password: string) => {
    setLoading(true)
    try {
      const response = await axios.post(
        apiUrl + '/api/login',
        { name: userName, password },
        {
          withCredentials: true,
        }
      )

      // Mettre à jour l'état de l'utilisateur
      setUser(response.data.user)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      console.log('Utilisateur connecté:', response.data.user)
      setLoading(false)
      router.push('/stores-list')
    } catch (error) {
      console.error('Erreur lors de la connexion:', error)
      toast.show('Erreur lors de la connexion', {
        type: 'error',
        message: "Nom d'utilisateur ou mot de passe incorrect",
        customData: { theme: 'red' },
      })
      setError(error)
      setLoading(false)
    }
  }

  // Fonction pour se déconnecter
  const logout = () => {
    // Supprimer le token des cookies
    localStorage.removeItem('user')
    localStorage.clear()
    // Réinitialiser l'état de l'utilisateur
    setUser(null)
    axios.get(apiUrl + '/api/logout', {
      withCredentials: true,
    })
    router.push('/login')
  }

  return {
    user,
    setUser,
    loading,
    error,
    login,
    logout,
  }
}

export default useAuth
