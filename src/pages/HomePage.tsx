import { useRecoilState } from 'recoil'

import { ArticlePreview } from '@/components/ArticlePreview'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
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
  // const { data, isLoading } = useGetArticles()

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

              <ArticlePreview
                article={{
                  title: '{data.title}',
                  slug: '제목',
                  body: '내용',
                  author: {
                    bio: '123',
                    following: false,
                    image: '123',
                    username: '123',
                  },
                  createdAt: '123',
                  description: '123123123',
                  favorited: false,
                  favoritesCount: 123,
                  tagList: ['123'],
                  updatedAt: '123',
                }}
              />
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
