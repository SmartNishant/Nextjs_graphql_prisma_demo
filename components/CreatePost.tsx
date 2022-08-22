import React, { useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Form, Input, Button } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
const CreatdDraftQuery = gql`
mutation CreateDraft($title: String!, $content: String, $authorEmail: String) {
    createDraft(title: $title, content: $content, authorEmail: $authorEmail) {
      id
      title
      content
      author {
        id
        name
      }
    }
  }`
export default function CreatePost() {
    const { data: session, status } = useSession()
    const [createDraft, { error, loading, data }] = useMutation(CreatdDraftQuery)
    const router = useRouter()
    const [form] = Form.useForm()

    const [inputValues, setInputValues] = useState({
        title: '',
        content: ''
    })

    useEffect(() => {
        session ? null : router.push('/')
    }, [router, session])

    const onFinish = async () => {
        const { content, title } = inputValues
        await createDraft({
            variables: {
                title,
                content,
                authorEmail: session?.user?.email
            }
        }).then(() => {
            router.push('/drafts')
        })
    }
    const handleChange = (field: string, val: string) => {
        setInputValues((prevInputValues) => {
            return {
                ...prevInputValues,
                [field]: val
            }
        })
    }
    return (
        <Form style={{ maxWidth: 500, margin: '30px auto' }} form={form} layout='vertical' onFinish={onFinish}>
            <Form.Item name='title' label='Title' required tooltip='This is a required field'>
                <Input placeholder='type some fancy title' onChange={e => handleChange('title', e.target.value)} />
            </Form.Item>
            <Form.Item
                name='body'
                required
                label='Content'
                tooltip={{
                    title: 'This is a required field',
                    icon: <InfoCircleOutlined />
                }}
            >
                <Input.TextArea placeholder='type fun content' onChange={e => handleChange('content', e.target.value)} />
            </Form.Item>
            <Form.Item>
                <Button loading={loading} disabled={!inputValues?.content || !inputValues?.title} htmlType='submit' type='primary'>
                    Save
                </Button>
            </Form.Item>
        </Form>

    )
}
