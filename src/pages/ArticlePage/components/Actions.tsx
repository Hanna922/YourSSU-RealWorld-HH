import { useQuery } from 'react-query'

import { useFavoriteArticle } from '../hooks/useFavoriteArticle'
import { useFollowUser } from '../hooks/useFollowUser'
import { getArticleQuery } from '../queries/getArticleQuery'

export const ArticleActions = ({ slug }: { slug: string }) => {
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
    <div className="article-actions">
      <div className="article-meta">
        <a href="profile.html">
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
      </div>
    </div>
  )
}
