import { getArticle } from '@/lib/client/endpoints/article.endpoint'

export const getArticleQuery = async (slug: string) => {
  const res = await getArticle({
    slug,
  })
  return res.article
}
