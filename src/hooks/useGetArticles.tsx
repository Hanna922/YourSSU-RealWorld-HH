import { useQuery } from 'react-query'

import { GetArticlesResponse, getArticles } from '@/lib/client/endpoints/article.endpoint'

export const useGetArticles = (params: {
  tag?: string
  author?: string
  favorited?: string
  limit?: number
  offset?: number
}) => {
  const { data } = useQuery<GetArticlesResponse>(
    ['article', params.author, params.tag, params.favorited, params.limit, params.offset],
    () => getArticles(params),
    {
      onSuccess: (data) => {},
      onError: (error) => {},
    }
  )

  return {
    articles: data?.articles,
    articlesCount: data?.articlesCount,
  }
}
