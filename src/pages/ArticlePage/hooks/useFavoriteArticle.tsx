import { useState } from 'react'

import { useMutation, useQueryClient } from 'react-query'

import {
  deleteArticleFavorite,
  postArticleFavorite,
} from '@/lib/client/endpoints/article.favorite.endpoint'
import { ArticleObject } from '@/lib/client/objects'

export const useFavoriteArticle = (slug: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  const { mutate: favoriteArticle } = useMutation(() => postArticleFavorite({ slug }), {
    onSuccess: (data) => {
      queryClient.setQueryData(['article', slug], () => data.article)
    },
    onMutate: () => {
      setIsLoading(true)

      const oldData = queryClient.getQueryData<ArticleObject>(['article', slug])
      if (!oldData) return

      queryClient.setQueryData(['article', slug], () => ({
        ...oldData,
        favorited: true,
        favoritesCount: oldData.favoritesCount + 1,
      }))
      return {
        rollback: () => {
          queryClient.setQueryData(['article', slug], () => ({
            ...oldData,
            favorited: false,
            favoritesCount: oldData.favoritesCount,
          }))
        },
      }
    },
    onSettled: async () => {
      setIsLoading(false)
    },
    onError(err, value, context) {
      context?.rollback()
    },
  })
  const { mutate: unfavoriteArticle } = useMutation(() => deleteArticleFavorite({ slug }), {
    onSuccess: (data) => {
      queryClient.setQueryData(['article', slug], () => data.article)
    },
    onMutate: () => {
      setIsLoading(true)

      const oldData = queryClient.getQueryData<ArticleObject>(['article', slug])
      if (!oldData) return

      queryClient.setQueryData(['article', slug], () => ({
        ...oldData,
        favorited: false,
        favoritesCount: oldData.favoritesCount - 1,
      }))
      return {
        rollback: () => {
          queryClient.setQueryData(['article', slug], () => ({
            ...oldData,
            favorited: true,
            favoritesCount: oldData.favoritesCount,
          }))
        },
      }
    },
    onSettled: async () => {
      setIsLoading(false)
    },
    onError(err, value, context) {
      context?.rollback()
    },
  })

  return {
    favoriteArticle,
    unfavoriteArticle,
    isLoading: isLoading,
  }
}
