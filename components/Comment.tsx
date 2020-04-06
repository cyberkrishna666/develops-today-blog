import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { CommentProps } from '../redux/types';

const Wrapper = styled.div`
    font-size: 1.2rem;
    padding: 1rem;
    margin: 1rem;
    background-color: white;
    box-shadow: 0 0 2rem lightgray;
    border-radius: 1rem;
    position: relative;
    overflow-wrap: break-word;
    word-wrap: break-word;
    max-width: 80%;

    &:after {
        top: 90%;
        left: 17%;
        border: solid transparent;
        content: ' ';
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-color: rgba(255, 255, 255, 0);
        border-top-color: white;
        border-width: 0.8rem;
    }
`;

const Comment: FunctionComponent<CommentProps> = ({ body }) => {
    return <Wrapper>{body}</Wrapper>;
};

export default Comment;
