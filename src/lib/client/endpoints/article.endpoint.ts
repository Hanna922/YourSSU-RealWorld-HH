import { Endpoint } from 'endpoint-client'

import Client from '@/services/Client'

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
export const GetArticleFeed: Endpoint<GetArticleFeedRequest, GetArticleFeedResponse> = {
  method: 'GET',
  path: '/api/articles/feed',
  queryParams: ['limit', 'offset'],
}

// GET /api/articles/:slug
export type GetArticleRequest = {
  slug: string
}
export type GetArticleResponse = {
  article: ArticleObject
}
export const GetArticle: Endpoint<GetArticleRequest, GetArticleResponse> = {
  method: 'GET',
  path: '/api/articles/:slug',
  pathParams: ['slug'],
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
export const PostArticle: Endpoint<PostArticleRequest, PostArticleResponse> = {
  method: 'POST',
  path: '/api/articles',
  bodyParams: ['article'],
}

// PUT /api/articles/:slug
export type PutArticleRequest = {
  slug: string
  article: {
    title?: string
    description?: string
    body?: string
  }
}
export type PutArticleResponse = {
  article: ArticleObject
}
export const PutArticle: Endpoint<PutArticleRequest, PutArticleResponse> = {
  method: 'PUT',
  path: (e) => `/api/articles/${e.slug}`,
  pathParams: ['slug'],
  bodyParams: ['article'],
}

// DELETE /api/articles/:slug
export type DeleteArticleRequest = {
  slug: string
}
export type DeleteArticleResponse = {}
export const DeleteArticle: Endpoint<DeleteArticleRequest, DeleteArticleResponse> = {
  method: 'DELETE',
  path: (e) => `/api/articles/${e.slug}`,
  pathParams: ['slug'],
}
