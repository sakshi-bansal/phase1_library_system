"use client";

import {HttpLink} from "@apollo/client";
import {ApolloClient, ApolloNextAppProvider, InMemoryCache,} from "@apollo/client-integration-nextjs";

function makeClient() {
    const httpLink = new HttpLink({
        uri: "/api/graphql",
        fetchOptions: {},
    });

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: httpLink,
    });
}

export function ApolloWrapper({children}) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}
