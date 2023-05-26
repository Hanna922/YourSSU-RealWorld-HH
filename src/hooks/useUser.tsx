import { useQuery } from 'react-query'

import { getUser } from '@/lib/client/endpoints/user.endpoint'
import tokenService from '@/services/TokenService'

export function useUser() {
  const { data, isLoading } = useQuery(['user'], getUser, {
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
    },
    enabled: tokenService.get() !== null,
  })

  return {
    user: data,
    isLoading,
    isLogin: tokenService.get() !== null,
    logout: () => tokenService.remove(),
  }
}
