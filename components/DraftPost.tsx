import { useQuery, gql } from '@apollo/client'
import { useSession } from 'next-auth/react'
import React from 'react'
import DisplayCard from './DisplayCard'

const DraftQuery = gql`query Query {
    draft {
      id
      title
      content
      author {
        id
        name
      }
    }
  }`
export default function DraftPost() {
    const { data: session, status } = useSession()
    const { data, error, loading } = useQuery(DraftQuery, {
        fetchPolicy: 'cache-and-network'
    })
    return (
        <DisplayCard
            data={data?.draft}
            error={error?.message}
            loading={loading}
            image={session?.user?.image}
            title={"Drafts"}
        />
    )
}
