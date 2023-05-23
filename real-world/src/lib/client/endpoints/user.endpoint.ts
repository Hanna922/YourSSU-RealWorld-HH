import { Endpoint } from 'endpoint-client'

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
export const PostUserLogin: Endpoint<PostUserLoginRequest, PostUserLoginResponse> = {
  method: 'POST',
  path: '/api/user/login',
  bodyParams: ['user'],
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
export const PostUser: Endpoint<PostUserRequest, PostUserResponse> = {
  method: 'POST',
  path: '/api/user',
  bodyParams: ['user'],
}

// GET /api/user
export type GetUserRequest = {}
export type GetUserResponse = {
  user: UserObject
}
export const GetUser: Endpoint<GetUserRequest, GetUserResponse> = {
  method: 'GET',
  path: '/api/user',
}

// PUT /api/user
export type PutUserRequest = {
  user: {
    email?: string
    password?: string
    image?: string
  }
}
export type PutUserResponse = {
  user: UserObject
}
export const PutUser: Endpoint<PutUserRequest, PutUserResponse> = {
  method: 'PUT',
  path: '/api/user',
  bodyParams: ['user'],
}
