import Client from '@/lib/client/Client'

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
export function getArticleComments({ slug }: GetArticleCommentsRequest) {
  return Client.get<GetArticleCommentsResponse>(`/api/articles/${slug}/comments`)
}

// DELETE /api/articles/:slug/comments/:id
export type DeleteArticleCommentRequest = {
  slug: string
  id: number
}
export type DeleteArticleCommentResponse = Record<string, never>
export function deleteArticleComment({ slug, id }: DeleteArticleCommentRequest) {
  return Client.delete<DeleteArticleCommentResponse>(`/api/articles/${slug}/comments/${id}`)
}
