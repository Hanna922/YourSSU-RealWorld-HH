import Client from '@/lib/client/Client'

import { UserObject } from '../objects'

// POST /api/users/login
export type PostUserLoginRequest = {
  user: {
    email: string
    password: string
  }
}
export type PostUserLoginResponse = {
  user: UserObject
}
export function postUserLogin({ user }: PostUserLoginRequest) {
  return Client.post<PostUserLoginResponse>('/api/users/login', { user })
}

// POST /api/users
export type PostUserRequest = {
  user: {
    username: string
    email: string
    password: string
  }
}
export type PostUserResponse = {
  user: UserObject
}
export function postUser({ user }: PostUserRequest) {
  return Client.post<PostUserResponse>('/api/users', { user })
}

// GET /api/user
export type GetUserRequest = Record<string, never>
export type GetUserResponse = {
  user: UserObject
}
export function getUser() {
  return Client.get<GetUserResponse>('/api/user')
}

// PUT /api/user
export type PutUserRequest = {
  user: {
    email?: string
    password?: string
    image?: string
    username?: string
    bio?: string
  }
}
export type PutUserResponse = {
  user: UserObject
}
export function putUser({ user }: PutUserRequest) {
  return Client.put<PutUserResponse>('/api/user', { user })
}
