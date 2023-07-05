import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import { useUser } from '@/hooks/useUser'

import { useFavoriteArticle } from '../hooks/useFavoriteArticle'
import { useFollowUser } from '../hooks/useFollowUser'
import { getArticleQuery } from '../queries/getArticleQuery'

export const ArticleBanner = ({ slug }: { slug: string }) => {
  const user = useUser()

  const { data: article } = useQuery(['article', slug], () => getArticleQuery(slug || ''))
  const {
    favoriteArticle,
    unfavoriteArticle,
    isLoading: isFavoriteArticleLoading,
  } = useFavoriteArticle(slug)
  const { followUser, unFollowUser, isLoading: isFollowUserLoading } = useFollowUser(slug)

  if (!article) {
    return <></>
  }

  return (
    <div className="banner">
      <div className="container">
        <h1>{article?.title}</h1>
        <div className="article-meta">
          <a href="">
            <img src={article.author.image} />
          </a>
          <div className="info">
            <a
              href=""
              className="author"
            >
              {article.author.username}
            </a>
            <span className="date">{new Date(article.updatedAt).toDateString()}</span>
          </div>
          {user.user?.username === article.author.username ? (
            <>
              <span className="ng-scope">
                <Link
                  to={`/editor/${article.slug}`}
                  className="btn btn-outline-secondary btn-sm"
                >
                  <i className="ion-edit"></i> Edit Article
                </Link>
                <button className="btn btn-outline-danger btn-sm">
                  <i className="ion-trash-a"></i> Delete Article
                </button>
              </span>
            </>
          ) : (
            <>
              {article.author.following ? (
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => unFollowUser()}
                  disabled={isFollowUserLoading}
                >
                  <i className="ion-plus-round"></i>
                  &nbsp; UnFollow {article.author.username} <span className="counter"></span>
                </button>
              ) : (
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => followUser()}
                  disabled={isFollowUserLoading}
                >
                  <i className="ion-plus-round"></i>
                  &nbsp; Follow {article.author.username}
                </button>
              )}
              &nbsp;&nbsp;
              {article.favorited ? (
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => unfavoriteArticle()}
                  disabled={isFavoriteArticleLoading}
                >
                  <i className="ion-heart"></i>
                  &nbsp; UnFavorite Post <span className="counter">({article.favoritesCount})</span>
                </button>
              ) : (
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => favoriteArticle()}
                  disabled={isFavoriteArticleLoading}
                >
                  <i className="ion-heart"></i>
                  &nbsp; Favorite Post <span className="counter">({article.favoritesCount})</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
