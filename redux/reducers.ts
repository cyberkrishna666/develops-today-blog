import { PostActionTypes, SET_POST, ADD_COMMENT, SetFeed, SET_FEED, Feed, FullPost } from './types';

const feedInitialState: Feed = {
    posts: [],
};

const postInitialState: FullPost = {
    id: NaN,
    title: '',
    body: '',
    comments: [],
};

export function feedReducer(state = feedInitialState, action: SetFeed): Feed {
    switch (action.type) {
        case SET_FEED:
            return {
                ...state,
                posts: action.payload.reverse(),
            };
        default:
            return state;
    }
}

export function postReducer(state = postInitialState, action: PostActionTypes): FullPost {
    switch (action.type) {
        case SET_POST:
            return {
                id: action.payload.id,
                title: action.payload.title,
                body: action.payload.body,
                comments: action.payload.comments,
            };
        case ADD_COMMENT:
            return {
                ...state,
                comments: state.comments.concat(action.payload),
            };
        default:
            return state;
    }
}
