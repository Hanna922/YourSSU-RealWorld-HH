import { Endpoint } from 'endpoint-client'

import Client from '@/services/Client'

import { CommentObject } from '../objects'

export type PostArticleCommentPayload = {
  slug: string
  comment: {
    body: string
  }
}
export type PostArticleCommentResponse = {
  comment: CommentObject
}

export function postArticleComment({ slug, comment }: PostArticleCommentPayload) {
  return Client.post<PostArticleCommentResponse>(`/api/articles/${slug}/comments`, {
    comment,
  })
}

// GET /api/articles/:slug/comments
export type GetArticleCommentsRequest = {
  slug: string
}
export type GetArticleCommentsResponse = {
  comments: CommentObject[]
}
export const GetArticleComments: Endpoint<GetArticleCommentsRequest, GetArticleCommentsResponse> = {
  method: 'GET',
  path: (e) => `/api/articles/${e.slug}/comments`,
  pathParams: ['slug'],
}

// DELETE /api/articles/:slug/comments/:id
export type DeleteArticleCommentRequest = {
  slug: string
  id: number
}
export type DeleteArticleCommentResponse = {}
export const DeleteArticleComment: Endpoint<
  DeleteArticleCommentRequest,
  DeleteArticleCommentResponse
> = {
  method: 'DELETE',
  path: (e) => `/api/articles/${e.slug}/comments/${e.id}`,
  pathParams: ['slug', 'id'],
}
