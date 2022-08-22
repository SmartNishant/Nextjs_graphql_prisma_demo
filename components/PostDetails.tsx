import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { Typography, Modal, PageHeader, Button, Tag } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import moment from 'moment'
const PublishMutation = gql`mutation Publish($postId: String) {
    publish(postId: $postId) {
      id
      title
      content
      pablished
      author {
        id
        name
      }
    }
  }`

const DeleteMutation = gql`mutation DeletePost($postId: String) {
    deletePost(postId: $postId) {
      id
      title
      pablished
      content
      author {
        id
        name
      }
    }
  }`
const { Paragraph } = Typography;
const { confirm } = Modal;

const PostDetail = ({ data }: any) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [publish] = useMutation(PublishMutation);
    const [deletePost] = useMutation(DeleteMutation);

    const showPromiseConfirm = () => {
        confirm({
            title: 'Do you want to publish this post?',
            icon: <ExclamationCircleOutlined />,
            content: 'If you click OK, you cannot rollback this action',
            async onOk() {
                await publish({
                    variables: {
                        postId: String(data.post.id)
                    }
                });
                await router.push('/');
            },
            onCancel() { }
        });
    };

    const showDeleteConfirm = () => {
        confirm({
            title: 'Do you really want to delete this post?',
            icon: <ExclamationCircleOutlined />,
            content: 'If you click OK, you cannot rollback this action',
            async onOk() {
                await deletePost({
                    variables: {
                        postId: String(data.post.id)
                    }
                });
                await router.push('/');
            },
            onCancel() { }
        });
    };

    const content = (
        <>
            <Paragraph>{data.post.content}</Paragraph>
        </>
    );

    return (
        <PageHeader
            title={data.post.title}
            className='site-page-header'
            subTitle={<span>{moment(data.post.createdAt).format('Do MMMM YYYY')}</span>}
            tags={<Tag color={data.post.published ? 'green' : 'orange'}>{data.post.published ? 'Published' : 'Draft'}</Tag>}
            extra={[
                <>
                    {!data.post.published && (
                        <Button key='1' type='primary' onClick={showPromiseConfirm}>
                            Publish
                        </Button>
                    )}
                    {session && (
                        <Button key='2' onClick={showDeleteConfirm} type='dashed'>
                            Delete
                        </Button>
                    )}
                </>
            ]}
            avatar={{ src: `${session?.user?.image}` }}
            footer={content}
        />
    );
};

export default PostDetail;