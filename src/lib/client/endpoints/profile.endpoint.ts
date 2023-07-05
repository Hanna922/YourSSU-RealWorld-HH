import Client from '@/lib/client/Client'

import { ProfileObject } from '../objects'

// GET /api/profiles/:username
export type GetProfileRequest = {
  username: string
}
export type GetProfileResponse = {
  profile: ProfileObject
}

export function getProfile({ username }: GetProfileRequest) {
  return Client.get<GetProfileResponse>(`/api/profiles/${username}`)
}

// POST /api/profiles/:username/follow
export type PostProfileFollowRequest = {
  username: string
}
export type PostProfileFollowResponse = {
  profile: ProfileObject
}

export function postProfileFollow({ username }: PostProfileFollowRequest) {
  return Client.post<PostProfileFollowResponse>(`/api/profiles/${username}/follow`)
}

// DELETE /api/profiles/:username/follow
export type DeleteProfileFollowRequest = {
  username: string
}
export type DeleteProfileFollowResponse = {
  profile: ProfileObject
}

export function deleteProfileFollow({ username }: DeleteProfileFollowRequest) {
  return Client.delete<DeleteProfileFollowResponse>(`/api/profiles/${username}/follow`)
}
