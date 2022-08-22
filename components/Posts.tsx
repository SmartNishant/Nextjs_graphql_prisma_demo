import { useQuery, gql } from '@apollo/client'
import { useSession } from 'next-auth/react'
import React from 'react'
import DisplayCard from './DisplayCard'

const FeedQuery = gql`query FeedQuery {
    feed {
      id
      createdAt
      title
      author {
        id
        name
      }
      content
      pablished
    }
  }`

export default function Post() {
  const { data: session, status } = useSession()
  const { data, error, loading } = useQuery(FeedQuery, {
    fetchPolicy: 'cache-and-network'
  })
  return (
    <DisplayCard
      data={data?.feed}
      error={error?.message}
      loading={loading}
      image={session?.user?.image}
      title={"Posts"}
    />
  )
}
