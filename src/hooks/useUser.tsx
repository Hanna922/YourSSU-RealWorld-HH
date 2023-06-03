import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { getUser } from '@/lib/client/endpoints/user.endpoint'
import tokenService from '@/services/TokenService'

export const useUser = (options?: { needLogin: boolean }) => {
  const navigate = useNavigate()

  const { data, isLoading } = useQuery(['user'], getUser, {
    onSuccess: (data) => {},
    onError: (error) => {},
    enabled: tokenService.get() !== null,
  })

  if (!options?.needLogin && tokenService.get() === null) {
    navigate('/login')
    return {
      user: undefined,
      isLoading,
      isLogin: false,
      logout: () => tokenService.remove(),
    }
  }

  return {
    user: data?.user,
    isLoading,
    isLogin: tokenService.get() !== null,
    logout: () => tokenService.remove(),
  }
}
