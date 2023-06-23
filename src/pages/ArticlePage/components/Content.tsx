import { useQuery } from 'react-query'

import { getArticleQuery } from '../queries/getArticleQuery'

export const ArticleContent = ({ slug }: { slug: string }) => {
  const { data: article } = useQuery(['article', slug], () => getArticleQuery(slug || ''))

  if (!article) {
    return <></>
  }

  return (
    <div className="row article-content">
      <div className="col-md-12">
        <p>{article.body}</p>
      </div>
    </div>
  )
}
