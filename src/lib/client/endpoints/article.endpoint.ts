import Client from '@/lib/client/Client'

import { ArticleObject } from '../objects'

// GET /api/articles
export type GetArticlesRequestPayload = {
  tag?: string
  author?: string
  favorited?: string
  limit?: number
  offset?: number
}
export type GetArticlesResponse = {
  articles: ArticleObject[]
  articlesCount: number
}

export function getArticles(params: GetArticlesRequestPayload) {
  return Client.get<GetArticlesResponse>('/api/articles', { params })
}

// GET /api/articles/feed
export type GetArticleFeedRequest = {
  limit?: number
  offset?: number
}
export type GetArticleFeedResponse = {
  articles: ArticleObject[]
  articlesCount: number
}

export function getArticleFeed(params: GetArticleFeedRequest) {
  return Client.get<GetArticleFeedResponse>('/api/articles/feed', { params })
}

// GET /api/articles/:slug
export type GetArticleRequest = {
  slug: string
}
export type GetArticleResponse = {
  article: ArticleObject
}

export function getArticle({ slug }: GetArticleRequest) {
  return Client.get<GetArticleResponse>(`/api/articles/${slug}`)
}

// POST /api/articles
export type PostArticleRequest = {
  article: {
    title: string
    description: string
    body: string
    tagList?: string[]
  }
}
export type PostArticleResponse = {
  article: ArticleObject
}

export function postArticle({ article }: PostArticleRequest) {
  return Client.post<PostArticleResponse>('/api/articles', { article })
}

// PUT /api/articles/:slug
export type PutArticleRequest = {
  slug: string
  article: {
    title?: string
    description?: string
    body?: string
    tagList?: string[]
  }
}
export type PutArticleResponse = {
  article: ArticleObject
}

export function putArticle({ slug, article }: PutArticleRequest) {
  return Client.put<PutArticleResponse>(`/api/articles/${slug}`, { article })
}

// DELETE /api/articles/:slug
export type DeleteArticleRequest = {
  slug: string
}
export type DeleteArticleResponse = Record<string, never>

export function deleteArticle({ slug }: DeleteArticleRequest) {
  return Client.delete<DeleteArticleResponse>(`/api/articles/${slug}`)
}
