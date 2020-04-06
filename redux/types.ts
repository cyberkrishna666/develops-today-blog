import { ReactNode, FormEvent, Dispatch } from 'react';
import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';

export const SET_POST = 'SET_POST';
export const SET_FEED = 'SET_FEED';
export const ADD_COMMENT = 'ADD_COMMENT';

export interface Post {
    id: number | string;
    title: string;
    body: string;
}

export interface SetFeed {
    type: typeof SET_FEED;
    payload: Array<Post>;
}

export interface CommentAction {
    type: typeof ADD_COMMENT;
    payload: PostComment;
}

export interface PostComment {
    id: number;
    body: string;
    postId: number;
}

export interface FullPost {
    id: number;
    title: string;
    body: string;
    comments: Array<PostComment>;
}

export interface SetPost {
    type: typeof SET_POST;
    payload: FullPost;
}

export interface MapComments {
    (comments: Array<PostComment>): Array<ReactNode>;
}

export interface MapPosts {
    (posts: Array<Post>): Array<ReactNode>;
}

export interface SubmitComment {
  (event: FormEvent<HTMLFormElement>, postId: number, dispatch: Dispatch<CommentAction>): Promise<void>;
}

export interface Feed {
    posts: Array<Post>;
}

export interface FullPost {
    id: number;
    title: string;
    body: string;
    comments: Array<PostComment>;
}

export interface CommentProps {
    key: number;
    body: string;
}

export interface SubmitPost {
    (event: FormEvent<HTMLFormElement>): Promise<void>;
}

export type SetFeedAction = ActionCreator<ThunkAction<Promise<void>, RootState, unknown, SetFeed>>;

export type SetPostAction = ActionCreator<ThunkAction<Promise<void>, RootState, unknown, SetPost>>;

export type PostActionTypes = SetPost | CommentAction;

export type Actions = SetFeed | SetPost | CommentAction;
