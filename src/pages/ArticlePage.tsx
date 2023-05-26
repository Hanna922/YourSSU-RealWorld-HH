import { useQuery } from 'react-query'

import { client } from '@/lib/client'

const ArticlePage = () => {
  const { data } = useQuery(
    ['articles'],
    client.article.list({
      tag: 'string',
      author: 'string',
      favorited: 'string',
      limit: 3,
      offset: 3,
    })
  )

  return (
    <>
      {data?.articles.map((article) => (
        <div key={article.slug}>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
        </div>
      ))}
    </>
  )
}

export default ArticlePage
