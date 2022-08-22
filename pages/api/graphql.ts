import {ApolloServer} from 'apollo-server-micro'

import type {NextApiRequest,NextApiResponse,PageConfig} from 'next'
import {createContext} from '../../graphql/context'
import {schema} from '../../graphql/schema'

const apolloServer=new ApolloServer({schema, context: createContext});
const startServer=apolloServer.start()

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method === "OPTIONS"){
        res.end()
        return false
    }
    res.setHeader('Access-Control-Allow-Credentails', 'true')
    res.setHeader('Access-Control-Allow-Origin', 'https://studio.apollographql.com')
    await startServer;
    await apolloServer.createHandler({
        path: '/api/graphql'
    })(req,res)
}

export const config: PageConfig={
api:{
    bodyParser: false
}
}

