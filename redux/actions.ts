import axios from 'axios';
import {
    SET_FEED,
    SET_POST,
    SetPost,
    PostComment,
    CommentAction,
    SetFeedAction,
    SetPostAction,
    SetFeed,
    Post,
    FullPost,
} from './types';
import { Dispatch } from 'react';

const apiUrl = 'https://simple-blog-api.crew.red';

export const setPosts: SetFeedAction = () => {
    return async (dispatch: Dispatch<SetFeed>): Promise<void> => {
        const response = await axios.get(`${apiUrl}/posts`);

        dispatch({
            type: SET_FEED,
            payload: response.data,
        });
    };
};

export const setPost: SetPostAction = (postId: string) => {
    return async (dispatch: Dispatch<SetPost>): Promise<void> => {
        const response = await axios.get(`${apiUrl}/posts/${postId}?_embed=comments`);

        dispatch({
            type: SET_POST,
            payload: response.data,
        });
    };
};

export function addComment(comment: PostComment): CommentAction {
    return {
        type: 'ADD_COMMENT',
        payload: comment,
    };
}
