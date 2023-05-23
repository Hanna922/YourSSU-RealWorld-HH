import { EndpointClient } from 'endpoint-client'
import {
  GetUser,
  PostUser,
  PostUserLogin,
  PutUser,
  GetProfile,
  PostProfileFollow,
  DeleteProfileFollow,
  GetArticles,
  GetArticle,
  GetArticleFeed,
  PostArticle,
  PutArticle,
  DeleteArticle,
  GetArticleComments,
  PostArticleComment,
  DeleteArticleComment,
  PostArticleFavorite,
  DeleteArticleFavorite,
  GetTags,
} from './endpoints'
export * from './endpoints'

export class Client extends EndpointClient {
  readonly user = {
    get: this.endpointBuilder(GetUser),
    login: this.endpointBuilder(PostUserLogin),
    post: this.endpointBuilder(PostUser),
    put: this.endpointBuilder(PutUser),
  }
  readonly profile = {
    get: this.endpointBuilder(GetProfile),
    follow: this.endpointBuilder(PostProfileFollow),
    unfollow: this.endpointBuilder(DeleteProfileFollow),
  }
  readonly article = {
    get: this.endpointBuilder(GetArticle),
    list: this.endpointBuilder(GetArticles),
    feed: this.endpointBuilder(GetArticleFeed),
    post: this.endpointBuilder(PostArticle),
    put: this.endpointBuilder(PutArticle),
    delete: this.endpointBuilder(DeleteArticle),
    commnet: {
      list: this.endpointBuilder(GetArticleComments),
      post: this.endpointBuilder(PostArticleComment),
      delete: this.endpointBuilder(DeleteArticleComment),
    },
    favorite: {
      post: this.endpointBuilder(PostArticleFavorite),
      delete: this.endpointBuilder(DeleteArticleFavorite),
    },
  }
  readonly tag = {
    list: this.endpointBuilder(GetTags),
  }
}

export const client = new Client({
  baseUrl: import.meta.env.VITE_API_SERVER,
})
