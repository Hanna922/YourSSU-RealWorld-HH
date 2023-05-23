import { ProfileObject } from './profile.object'
import { TagObject } from './tag.object'

export type ArticleObject = {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: TagObject[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: ProfileObject;
}