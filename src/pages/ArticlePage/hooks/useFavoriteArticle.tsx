import { useState } from 'react'

import { useMutation, useQueryClient } from 'react-query'

import {
  deleteArticleFavorite,
  postArticleFavorite,
} from '@/lib/client/endpoints/article.favorite.endpoint'

export const useFavoriteArticle = (slug: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  const { mutate: favoriteArticle } = useMutation(() => postArticleFavorite({ slug }), {
    onSuccess: (data) => {
      queryClient.setQueryData(['article', slug], () => data.article)
    },
    onMutate: () => {
      setIsLoading(true)
    },
    onSettled: async () => {
      setIsLoading(false)
    },
  })
  const { mutate: unfavoriteArticle } = useMutation(() => deleteArticleFavorite({ slug }), {
    onSuccess: (data) => {
      queryClient.setQueryData(['article', slug], () => data.article)
    },
    onMutate: () => {
      setIsLoading(true)
    },
    onSettled: async () => {
      setIsLoading(false)
    },
  })

  return {
    favoriteArticle,
    unfavoriteArticle,
    isLoading: isLoading,
  }
}
