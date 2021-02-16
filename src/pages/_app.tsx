/* Core */
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import { AppProps } from 'next/app';
import { ThemeProvider as StyledComponentsProvider } from 'styled-components';

/* Instruments */
import '@/theme/index.css';

const App: React.FC<AppProps> = props => {
    return (
        <StyledComponentsProvider theme = {{}}>
            <Head>
                <link href = '/favicon.ico' rel = 'icon' />
                <title>Next Experimental</title>
                <link href = '/nprogress.css' rel = 'stylesheet' type = 'text/css' />
            </Head>
            <props.Component { ...props.pageProps } />
        </StyledComponentsProvider>
    );
};

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default App;
