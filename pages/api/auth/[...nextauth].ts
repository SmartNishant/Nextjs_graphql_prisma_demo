import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma  from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github' 

export default async function auth(req: NextApiRequest, res: NextApiResponse) {

    return await NextAuth(req,res,{
        adapter: PrismaAdapter(prisma),
        providers:[
            GithubProvider({
                clientId: process.env.GIT_CLIENT_ID || '',
                clientSecret: process.env.GIT_SECRET_KEY || '',
            })
        ],
        secret: process.env.GIT_SECRET,
        session:{
            strategy: 'database'
        },
        theme:{
            colorScheme: 'auto'
        }
    })
    
}