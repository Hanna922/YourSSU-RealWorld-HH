import { Endpoint } from 'endpoint-client'

import { TagObject } from '../objects'

// GET /api/tags
export type GetTagsRequest = Record<string, never>
export type GetTagsResponse = {
  tags: TagObject[]
}
export const GetTags: Endpoint<GetTagsRequest, GetTagsResponse> = {
  method: 'GET',
  path: '/api/tags',
}
