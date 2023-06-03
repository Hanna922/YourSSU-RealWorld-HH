import { useQuery } from 'react-query'

import { GetArticlesResponse, getArticles } from '@/lib/client/endpoints/article.endpoint'

export const useGetArticles = (params: {
  tags?: string
  author?: string
  favorited?: string
  limit?: number
  offset?: number
}) => {
  return useQuery<GetArticlesResponse>(['article'], () => getArticles(params), {
    onSuccess: (data) => {},
    onError: (error) => {},
  })
}
