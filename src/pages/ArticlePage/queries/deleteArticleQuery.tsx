import { deleteArticle } from '@/lib/client/endpoints/article.endpoint'

export const deleteArticleQuery = async (slug: string) => {
  const res = await deleteArticle({
    slug,
  })
  return res.article
}
