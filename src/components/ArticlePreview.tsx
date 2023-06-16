import { Link } from 'react-router-dom'

import { ArticleObject } from '@/lib/client/objects'

export function ArticlePreview({ article }: { article: ArticleObject }) {
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
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> {article.favoritesCount}
        </button>
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
