import { createStore, applyMiddleware, combineReducers, Store, Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { MakeStore } from 'next-redux-wrapper';
import { feedReducer, postReducer } from './reducers';

const rootReducer = combineReducers({ feed: feedReducer, singlePost: postReducer });

export const makeStore: MakeStore = (initialState) => {
    const store: Store<{}, Action<string>> & { dispatch: ThunkDispatch<{}, unknown, Action<string>> } = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk),
    );
    return store;
};

export type RootState = ReturnType<typeof rootReducer>;
