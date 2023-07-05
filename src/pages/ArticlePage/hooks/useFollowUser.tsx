import { useState } from 'react'

import { useMutation, useQuery } from 'react-query'

import { deleteProfileFollow, postProfileFollow } from '@/lib/client/endpoints/profile.endpoint'

import { getArticleQuery } from '../queries/getArticleQuery'

export const useFollowUser = (slug: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: article, refetch: articleRefetch } = useQuery(['article', slug], () =>
    getArticleQuery(slug || '')
  )

  const { mutate: followUser } = useMutation(
    () => postProfileFollow({ username: article?.author.username || '' }),

    {
      onSuccess: async () => {
        await articleRefetch()
      },
      onMutate: () => {
        setIsLoading(true)
      },
      onSettled: () => {
        setIsLoading(false)
      },
    }
  )
  const { mutate: unFollowUser } = useMutation(
    () => deleteProfileFollow({ username: article?.author.username || '' }),
    {
      onSuccess: async () => {
        await articleRefetch()
      },
      onMutate: () => {
        setIsLoading(true)
      },
      onSettled: () => {
        setIsLoading(false)
      },
    }
  )

  return {
    followUser,
    unFollowUser,
    isLoading,
  }
}
