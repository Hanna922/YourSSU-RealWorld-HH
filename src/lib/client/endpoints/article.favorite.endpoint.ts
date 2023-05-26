import { Endpoint } from 'endpoint-client'

import { ArticleObject } from '../objects'

// POST /api/articles/:slug/favorite
export type PostArticleFavoriteRequest = {
  slug: string
}
export type PostArticleFavoriteResponse = {
  article: ArticleObject
}
export const PostArticleFavorite: Endpoint<
  PostArticleFavoriteRequest,
  PostArticleFavoriteResponse
> = {
  method: 'POST',
  path: (p) => `/api/articles/${p.slug}/favorite`,
  pathParams: ['slug'],
}

// DELETE /api/articles/:slug/favorite
export type DeleteArticleFavoriteRequest = {
  slug: string
}
export type DeleteArticleFavoriteResponse = {
  article: ArticleObject
}
export const DeleteArticleFavorite: Endpoint<
  DeleteArticleFavoriteRequest,
  DeleteArticleFavoriteResponse
> = {
  method: 'DELETE',
  path: (p) => `/api/articles/${p.slug}/favorite`,
  pathParams: ['slug'],
}
