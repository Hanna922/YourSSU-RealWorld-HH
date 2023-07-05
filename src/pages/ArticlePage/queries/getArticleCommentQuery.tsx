import { getArticleComments } from '@/lib/client/endpoints/article.comment.endpoint'

export const getArticleCommentQuery = async (slug: string) => {
  const res = await getArticleComments({
    slug,
  })
  return res.comments
}
