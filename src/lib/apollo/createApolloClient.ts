/* Core */
import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/link-error';
import { concatPagination } from '@apollo/client/utilities';
import debug from 'debug';

/* Instruments */
import { loggerLink } from './apollo-link-logger';

const logGql = debug('[GraphQL error]');

export const createApolloClient = () => {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link:    from([
            loggerLink,
            onError(net => {
                logGql('Operation:', net.operation);
                logGql('Response:', net.response);
                logGql(`Errors quantity: ${net.graphQLErrors?.length}`);

                if (net.graphQLErrors) {
                    for (const error of net.graphQLErrors) {
                        logGql(
                            `Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`,
                        );
                    }
                }

                if (net.networkError) {
                    logGql(`Network error: ${net.networkError}`);
                }
            }),

            new HttpLink({
                uri:         'https://nextjs-graphql-with-prisma-simple.vercel.app/api',
                credentials: 'same-origin',
            }),
        ]),
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: { allPosts: concatPagination() },
                },
            },
        }),
    });
};
