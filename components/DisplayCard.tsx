import React from 'react'
import { Avatar, Card } from 'antd'
import Link from 'next/link'

export interface FeedType {
    id: number
    createdAt: string
    title: string
    author: {
        id: string
        name: string
    }
    content: string
    pablished?: boolean
}
const { Meta } = Card
interface DisplayCardProps {
    error: String | undefined
    loading: boolean
    data: FeedType[]
    image: string | undefined | null
    title: String

}
export default function DisplayCard({ error, loading, data, image, title }: DisplayCardProps) {

    if (loading) {
        return <div>Loading..........</div>
    }
    if (error) {
        return <div>{error}</div>
    }
    return (
        <Card title={title}>
            {
                data?.map(({ id, title, content }: FeedType) => (
                    <div key={id} className="post">
                        <Link passHref href={"/p/[id]"} as={`/p/${id}`} >
                            <Card hoverable style={{ marginTop: 16, width: '100%', margin: 'auto 0 50px' }} type='inner'>
                                <Meta
                                    avatar={<Avatar src={`${image}`} />}
                                    title={title}
                                    description={content}
                                />
                            </Card>
                        </Link>
                    </div>
                ))
            }
        </Card>
    )
}
