import { useQuery } from 'react-query'

import { GetTagsResponse, getTags } from '@/lib/client/endpoints/tag.endpoint'

export const useGetTags = () => {
  const { data } = useQuery<GetTagsResponse>(['tags'], getTags, {
    onSuccess: (data) => {},
    onError: (error) => {},
  })
  return {
    tags: data?.tags || [],
  }
}
