import { Link } from 'react-router-dom'

import { ArticleObject } from '@/lib/client/objects'

import { useFavoriteArticle } from './hooks/useFavoriteArticles'

export function ArticlePreview({ article }: { article: ArticleObject }) {
  const {
    favoriteArticle,
    unfavoriteArticle,
    isLoading: isFavoriteArticleLoading,
  } = useFavoriteArticle(article.slug)

  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href="profile.html">
          <img src={'/yourssu_logo.png'} />
        </a>
        <div className="info">
          <Link
            to={`/@${article.author.username}`}
            className="author"
          >
            {article.author.username}
          </Link>
          <span className="date">{article.createdAt}</span>
        </div>
        {article.favorited ? (
          <button
            className="btn btn-primary btn-sm pull-xs-right ng-scope ng-isolate-scope"
            onClick={() => unfavoriteArticle()}
            disabled={isFavoriteArticleLoading}
          >
            <i className="ion-heart"></i>({article.favoritesCount})
          </button>
        ) : (
          <button
            className="btn btn-outline-primary btn-sm pull-xs-right"
            onClick={() => favoriteArticle()}
            disabled={isFavoriteArticleLoading}
          >
            <i className="ion-heart"></i> {article.favoritesCount}
          </button>
        )}
      </div>
      <Link
        to={`/article/${article.slug}`}
        className="preview-link"
      >
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag) => (
            <li
              key={tag}
              className="tag-default tag-pill tag-outline ng-binding ng-scope"
            >
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  )
}
