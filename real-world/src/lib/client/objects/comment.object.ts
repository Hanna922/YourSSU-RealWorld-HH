import { ProfileObject } from './profile.object'

export type CommentObject = {
    id: number;
    body: string;
    createdAt: string;
    updatedAt: string;
    author: ProfileObject;
}