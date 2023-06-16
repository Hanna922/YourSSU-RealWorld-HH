import { useState } from 'react'

import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'

import { ArticlePreview } from '@/components/ArticlePreview'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { Pagination } from '@/components/pagination/Pagination'
import { useGetArticles } from '@/hooks/useGetArticles'
import { useUser } from '@/hooks/useUser'
import { getProfile } from '@/lib/client/endpoints/profile.endpoint'
import { ProfileObject } from '@/lib/client/objects'

const getProfileQuery = async (username: string) => {
  const res = await getProfile({
    username,
  })
  return res.profile
}

const UserInfo = ({ profile }: { profile: ProfileObject }) => {
  const { user } = useUser({ needLogin: false })

  return (
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <img
              src={profile.image}
              className="user-img"
            />
            <h4>{profile.username}</h4>
            <p>{profile.bio}</p>
            {user?.username === profile.username ? (
              <Link
                className="btn btn-sm btn-outline-secondary action-btn"
                to="/settings"
              >
                <i className="ion-plus-round"></i>
                &nbsp; Edit Profile Settings
              </Link>
            ) : (
              <a className="btn btn-sm btn-outline-secondary action-btn">
                <i className="ion-plus-round"></i>
                &nbsp; Follow {profile.username}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const ProfilePage = () => {
  const { userName: _userName } = useParams()
  const userName = (_userName as string).replace('@', '')
  const { data: profile } = useQuery(['profile', userName], () => getProfileQuery(userName), {
    initialData: {
      username: '',
      bio: '',
      image: 'https://api.realworld.io/images/smiley-cyrus.jpeg',
      following: false,
    },
  })

  const [articleMode, setArticleMode] = useState<'my' | 'favorited'>('my')
  const switchArticleMode = (e: React.MouseEvent<HTMLAnchorElement>, mode: 'my' | 'favorited') => {
    e.preventDefault()
    setArticleMode(mode)
  }

  const [page, setPage] = useState(1)
  const { articles, articlesCount } = useGetArticles({
    author: articleMode === 'my' ? userName : undefined,
    favorited: articleMode === 'favorited' ? userName : undefined,
    limit: 5,
    offset: (page - 1) * 5,
  })

  return (
    <>
      <Navbar />
      <div className="profile-page">
        {profile ? <UserInfo profile={profile} /> : <></>}

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a
                      className={`nav-link ${articleMode === 'my' ? 'active' : ''}`}
                      href=""
                      onClick={(e) => switchArticleMode(e, 'my')}
                    >
                      My Articles
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${articleMode === 'favorited' ? 'active' : ''}`}
                      href=""
                      onClick={(e) => switchArticleMode(e, 'favorited')}
                    >
                      Favorited Articles
                    </a>
                  </li>
                </ul>
              </div>

              {articles &&
                articles.map((article) => (
                  <ArticlePreview
                    key={article.slug}
                    article={article}
                  />
                ))}

              <Pagination
                currentPage={page}
                totalPages={Math.floor(articlesCount || 0 / 5) + 1}
                setPage={setPage}
                limit={5}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProfilePage
