import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'

import { ArticleActions } from './components/Actions'
import { ArticleBanner } from './components/Banner'
import { Comment } from './components/Comment'
import { ArticleContent } from './components/Content'
import { getArticleQuery } from './queries/getArticleQuery'

const ArticlePage = () => {
  const { slug: _slug } = useParams<{ slug: string }>()
  const slug = _slug || ''

  const { data: article } = useQuery(['article', slug], () => getArticleQuery(slug || ''))

  return (
    <>
      <Navbar />
      {article ? <ArticleBanner slug={slug} /> : <></>}

      <div className="article-page">
        <div className="container page">
          <ArticleContent slug={slug} />

          <hr />
          <ArticleActions slug={slug} />
          <Comment slug={slug} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ArticlePage
