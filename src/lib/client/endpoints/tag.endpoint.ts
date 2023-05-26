import Client from '@/lib/client/Client'

import { TagObject } from '../objects'

// GET /api/tags
export type GetTagsRequest = Record<string, never>
export type GetTagsResponse = {
  tags: TagObject[]
}
export function getTags() {
  return Client.get<GetTagsResponse>('/api/tags')
}
