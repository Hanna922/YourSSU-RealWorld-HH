import { Endpoint } from 'endpoint-client'

import { ProfileObject } from '../objects'

// GET /api/profiles/:username
export type GetProfileRequest = {
  username: string
}
export type GetProfileResponse = {
  profile: ProfileObject
}
export const GetProfile: Endpoint<GetProfileRequest, GetProfileResponse> = {
  method: 'GET',
  path: (p) => `/api/profiles/${p.username}`,
  pathParams: ['username'],
}

// POST /api/profiles/:username/follow
export type PostProfileFollowRequest = {
  username: string
}
export type PostProfileFollowResponse = {
  profile: ProfileObject
}
export const PostProfileFollow: Endpoint<PostProfileFollowRequest, PostProfileFollowResponse> = {
  method: 'POST',
  path: (p) => `/api/profiles/${p.username}/follow`,
  pathParams: ['username'],
}

// DELETE /api/profiles/:username/follow
export type DeleteProfileFollowRequest = {
  username: string
}
export type DeleteProfileFollowResponse = {
  profile: ProfileObject
}
export const DeleteProfileFollow: Endpoint<
  DeleteProfileFollowRequest,
  DeleteProfileFollowResponse
> = {
  method: 'DELETE',
  path: (p) => `/api/profiles/${p.username}/follow`,
  pathParams: ['username'],
}
