import { useQuery } from 'react-query'

import { getUser } from '@/lib/client/endpoints/user.endpoint'
import tokenService from '@/services/TokenService'

export const useUser = () => {
  const { data, isLoading } = useQuery(['user'], getUser, {
    onSuccess: (data) => {},
    onError: (error) => {},
    enabled: tokenService.get() !== null,
  })

  return {
    user: data?.user,
    isLoading,
    isLogin: tokenService.get() !== null,
    logout: () => tokenService.remove(),
  }
}
