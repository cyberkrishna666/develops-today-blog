import { setPost } from '../../redux/actions';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import Comment from '../../components/Comment';
import AddComment from '../../components/AddComment';
import fp from 'lodash/fp';
import { NextPage } from 'next';
import { RootState } from '../../redux/store';
import { MapComments, PostComment } from '../../redux/types';
import { Store, Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

const FullPost = styled.article`
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const Title = styled.header`
    font-size: 2.5rem;
    font-weight: bold;
    background: white;
    padding: 1rem;
    margin: 0.5rem;
    justify-self: center;
    align-self: center;
    max-width: 80%;
    overflow-wrap: break-word;
    word-wrap: break-word;
`;

export const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    margin: 1rem;
    border-style: none;
    background-color: LightBlue;
    padding: 1rem;
    border-radius: 50%;
    color: white;
    font-size: 1.5rem;
    box-shadow: 0 0 1rem darkgrey;
    transition: all 0.1s ease-in-out;
    outline: none;
    cursor: pointer;

    &:hover {
        background-color: #9cc8d6;
    }
`;

const PostBody = styled.section`
    font-size: 1.2rem;
    padding: 1rem;
    margin: 1rem;
    background-color: white;
    box-shadow: 0 0 1rem #e5e5e5;
    border-radius: 1rem;
    width: 800px;
    overflow-wrap: break-word;
    word-wrap: break-word;
`;
const Comments = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const mapComments: MapComments = (comments) => {
    return fp.map((comment: PostComment) => <Comment key={comment.id} body={comment.body} />)(comments);
};

const Post: NextPage = () => {
    const { title, body, comments } = useSelector((state: RootState) => state.singlePost);

    return (
        <>
            <Link href="/">
                <Button>
                    <FaArrowLeft />
                </Button>
            </Link>
            <FullPost>
                <Title> {title} </Title>
                <PostBody>{body}</PostBody>
                <AddComment />
                {!!comments.length && <Comments> {mapComments(comments)} </Comments>}
            </FullPost>
        </>
    );
};

Post.getInitialProps = async ({ store, query }): Promise<void> => {
    const dispatch: ThunkDispatch<RootState, unknown, Action<string>> = store.dispatch
    
    await dispatch(setPost(query.postId));
};

export default Post;
