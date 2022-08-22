import 'antd/dist/antd.css'
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import type { AppProps } from "next/app";
import { SessionProvider } from 'next-auth/react'
import Layout from "../components/Layout";

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache()
})


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>

    </ApolloProvider>
  );
}

export default MyApp;
