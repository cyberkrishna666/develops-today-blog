import React, { ReactNode } from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import withRedux, { ReduxWrapperAppProps } from 'next-redux-wrapper';
import { makeStore } from '../redux/store';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    min-height: 90vh;
    background-image: radial-gradient(#ddd 1px,transparent 0),radial-gradient(#ddd 1px,transparent 0);
    background-position: 0 0,25px 25px;
    background-attachment: fixed;
    background-size: 50px 50px;
    overflow-x: hidden;
  }
  div#__next {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
`;

function MyApp({ Component, pageProps, store }: ReduxWrapperAppProps): ReactNode {
    return (
        <>
            <GlobalStyle />
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </>
    );
}

MyApp.getInitialProps = async ({ Component, ctx }: AppContext): Promise<AppInitialProps> => {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return { pageProps };
};

export default withRedux(makeStore)(MyApp);
