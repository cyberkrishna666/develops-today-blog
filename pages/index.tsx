import React, { ReactNode } from 'react';
import { setPosts } from '../redux/actions';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import styled from 'styled-components';
import { Button } from './post/[postId]';
import { FaPlus } from 'react-icons/fa';
import fp from 'lodash/fp';
import _ from 'lodash';
import { NextPage } from 'next';
import { Post } from '../redux/types';
import { RootState } from '../redux/store';
import { Store, Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

const PostPreview = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    padding: 1rem;
    margin: 1rem;
    background-color: white;
    box-shadow: 0 0 1rem #e5e5e5;
    border-radius: 1rem;
    width: 800px;
    overflow-wrap: break-word;
    word-wrap: break-word;
    transition: all 0.2s ease-in-out;

    &:hover {
        box-shadow: 0 0 1rem #d1d0d0;
    }
`;

const Title = styled.a`
    font-size: 1.5rem;
    font-weight: bold;
    padding: 1rem;
    justify-self: center;
    align-self: center;
    text-decoration: none;
    color: black;
    overflow-wrap: break-word;
    word-wrap: break-word;
    max-width: 100%;
    &:hover {
        cursor: pointer;
    }
`;

const AddButton = styled(Button)`
    left: unset;
    top: unset;
    right: 0;
    bottom: 0;
    background-color: LightGreen;
    &:hover {
        background-color: #8ae68a;
    }
`;

function mapPosts(posts: Array<Post>): ReactNode {
    const legitPosts = fp.filter((post: Post) => !_.isEmpty(post.title))(posts);
    return fp.map(function (post: Post) {
        return (
            <PostPreview key={post.id}>
                <Link href={`/post/${post.id}`} passHref>
                    <Title>{post.title}</Title>
                </Link>
                <p>{ post.body.length > 250 ? post.body.slice(0, 250) + '...' : post.body }</p>
            </PostPreview>
        );
    })(legitPosts);
}

const IndexPage: NextPage = () => {
    const feed = useSelector((state: RootState) => state.feed);
    return (
        <>
            <Link href="/post/new">
                <AddButton>
                    <FaPlus />
                </AddButton>
            </Link>
            {!!feed.posts.length ? mapPosts(feed.posts) : 'No posts yet'}
        </>
    );
};

IndexPage.getInitialProps = async ({ store }): Promise<void> => {
    const dispatch: ThunkDispatch<RootState, unknown, Action<string>> = store.dispatch
    await dispatch(setPosts());
};

export default IndexPage;
