import React, { FunctionComponent } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import Router from 'next/router';
import { SubmitPost } from '../../redux/types';

const Form = styled.form`
    width: 100%;
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
`;
const Title = styled(TextArea)`
    font-size: 2.5rem;
    outline: none;
`;
const Body = styled(TextArea)`
    font-size: 2rem;
    outline: none;
`;

const Submit = styled.button`
    padding: 1rem;
    background-color: salmon;
    color: white;
    font-size: 1.5rem;
    border-style: none;
    align-self: center;
    border-radius: 1rem;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
        background-color: #ff7369;
    }
`;

const PageBody = createGlobalStyle`
  body {
    background: white;
  }
`;

const handleSubmit: SubmitPost = async (event) => {
    event.preventDefault();

    const title = event.currentTarget.elements.namedItem('title') as HTMLTextAreaElement;
    const body = event.currentTarget.elements.namedItem('body') as HTMLTextAreaElement;

    const newPost = {
        title: title.value,
        body: body.value,
    };

    const response = await axios({
        method: 'post',
        url: 'https://simple-blog-api.crew.red/posts',
        headers: {
            'Content-Type': 'application/json',
        },
        data: newPost,
    });

    Router.push(`/post/${response.data.id}`);
};

const newPost: FunctionComponent = () => {
    return (
        <>
            <PageBody />
            <Form onSubmit={(event): Promise<void> => handleSubmit(event)}>
                <Title placeholder="Title" name="title" required />
                <Body rows={10} placeholder="Body" name="body" required />
                <Submit type="submit">Submit</Submit>
            </Form>
        </>
    );
};

export default newPost;
