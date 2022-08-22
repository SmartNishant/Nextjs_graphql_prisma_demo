import { useRouter } from 'next/router'
import React from 'react'
import {gql, useQuery} from '@apollo/client'
import PostDetails from '../../components/PostDetails'
const PostQuery = gql`query PostQuery($postId: String!) {
    post(postId: $postId) {
      id
      createdAt
      title
      content
      pablished
      author {
        id
        name
      }
    }
  }`

export default function Details() {
    const postId= useRouter().query.id
    console.log({postId})
    const { loading, error, data } = useQuery(PostQuery, {
        variables: { postId }
      });
    if (loading) {
        return <div>Loading..........</div>
    }
    if (error?.message) {
        return <div>{error.message}</div>
    }

  return (
  <PostDetails data={data} />
  )
}
