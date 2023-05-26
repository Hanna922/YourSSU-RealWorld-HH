import Client from '@/lib/client/Client'

import { ArticleObject } from '../objects'

// POST /api/articles/:slug/favorite
export type PostArticleFavoriteRequest = {
  slug: string
}
export type PostArticleFavoriteResponse = {
  article: ArticleObject
}
export function postArticleFavorite({ slug }: PostArticleFavoriteRequest) {
  return Client.post<PostArticleFavoriteResponse>(`/api/articles/${slug}/favorite`)
}

// DELETE /api/articles/:slug/favorite
export type DeleteArticleFavoriteRequest = {
  slug: string
}
export type DeleteArticleFavoriteResponse = {
  article: ArticleObject
}
export function deleteArticleFavorite({ slug }: DeleteArticleFavoriteRequest) {
  return Client.delete<DeleteArticleFavoriteResponse>(`/api/articles/${slug}/favorite`)
}
