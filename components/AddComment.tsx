import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { addComment } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitComment } from '../redux/types';
import { RootState } from '../redux/store';

const Form = styled.form`
    width: 800px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: column;
`;
const TextArea = styled.textarea`
    margin-bottom: 1rem;
    font-family: inherit;
    border: none;
    padding: 0.5rem;
    resize: vertical;
    outline: none;
`;

const Body = styled(TextArea)`
    font-size: 2rem;
`;

const Submit = styled.button`
    padding: 1rem;
    background-color: salmon;
    color: white;
    font-size: 1.5rem;
    border-style: none;
    align-self: center;
    border-radius: 1rem;
    &:hover {
        cursor: pointer;
        background-color: #ff7369;
    }
`;

const handleSubmit: SubmitComment = async (event, postId, dispatch) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const commentElement = event.currentTarget.elements.namedItem('body') as HTMLTextAreaElement;

    const newComment = {
        postId,
        body: commentElement.value,
    };

    try {
        const response = await axios({
            method: 'post',
            url: 'https://simple-blog-api.crew.red/comments',
            headers: {
                'Content-Type': 'application/json',
            },
            data: newComment,
        });

        dispatch(addComment(response.data));

        formElement.reset();
    } catch (error) {
        console.log('Error on attempt to add a comment: ', error.message);
    }
};

const AddComment: FunctionComponent = () => {
    const dispatch = useDispatch();
    const postId = useSelector((state: RootState) => state.singlePost.id);
    return (
        <Form onSubmit={(event): Promise<void> => handleSubmit(event, postId, dispatch)}>
            <Body placeholder="Add a comment" name="body" required />
            <Submit type="submit">Submit</Submit>
        </Form>
    );
};

export default AddComment;
