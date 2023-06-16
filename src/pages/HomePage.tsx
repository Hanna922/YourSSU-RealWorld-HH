import { useState } from 'react'

import { useRecoilState } from 'recoil'

import { ArticlePreview } from '@/components/ArticlePreview'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import Pagination from '@/components/pagination/Pagination'
import { useGetArticles } from '@/hooks/useGetArticles'
import { useUser } from '@/hooks/useUser'
import { TagObject } from '@/lib/client/objects'
import { homePageTagState } from '@/state/homePageTag.state'

function PopularTags({ tags }: { tags: TagObject[] }) {
  const [, setHomePageTag] = useRecoilState(homePageTagState)

  const tagClickHandler = (e: React.MouseEvent<HTMLAnchorElement>, tag: string) => {
    e.preventDefault()
    setHomePageTag(tag)
  }

  return (
    <div className="col-md-3">
      <div className="sidebar">
        <p>Popular Tags</p>

        <div className="tag-list">
          {tags.map((tag) => {
            return (
              <a
                href=""
                className="tag-pill tag-default"
                key={tag}
                onClick={(e) => tagClickHandler(e, tag)}
              >
                {tag}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const HomePage = () => {
  const { user, isLogin } = useUser()
  const [page, setPage] = useState(1)
  const { articles, articlesCount } = useGetArticles({ limit: 10, offset: (page - 1) * 10 })

  return (
    <>
      <Navbar />
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  {isLogin ? (
                    <li className="nav-item">
                      <a
                        className="nav-link disabled"
                        href=""
                      >
                        Your Feed
                      </a>
                    </li>
                  ) : (
                    <></>
                  )}
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      href=""
                    >
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>
              {articles &&
                articles.map((article) => (
                  <ArticlePreview
                    key={article.slug}
                    article={{
                      title: article.title,
                      slug: article.slug,
                      body: article.body,
                      author: {
                        bio: article.author.bio,
                        following: article.author.following,
                        image: article.author.image,
                        username: article.author.username,
                      },
                      createdAt: article.createdAt,
                      description: article.description,
                      favorited: article.favorited,
                      favoritesCount: article.favoritesCount,
                      tagList: article.tagList,
                      updatedAt: article.updatedAt,
                    }}
                  />
                ))}
              {articlesCount && (
                <Pagination
                  totalPages={articlesCount}
                  limit={10}
                  currentPage={page}
                  setPage={setPage}
                />
              )}
            </div>
            <PopularTags tags={['1', '2', '3']} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default HomePage
