import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { Spin, Menu, Popover } from 'antd'
import Link from 'next/link'
import { MessageOutlined, EditOutlined, FileAddOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons'

export default function Navbar() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return loading ? (<Spin></Spin>) : (
    <Menu mode='horizontal'>
      <Menu.Item key='mail' icon={<MessageOutlined />}>
        <Link passHref href='/'>
          Posts
        </Link>
      </Menu.Item>
      <Menu.Item key='app' icon={<EditOutlined />}>
        <Link passHref href='/drafts'>
          Drafts
        </Link>
      </Menu.Item>
      <Menu.Item key='alipay' disabled={!session} icon={<FileAddOutlined />} style={{ marginLeft: 'auto' }}>
        {session ? (
          <Link passHref href='/create'>
            Create Post
          </Link>
        ) : (
          <Popover content='You must be logged in to create a post'>Create Post</Popover>
        )}
      </Menu.Item>
      {session ? (
        <Menu.Item key='signin' icon={<LogoutOutlined style={{ color: 'red' }} />} onClick={() => signOut()}>
          Logout
        </Menu.Item>
      ) : (
        <Menu.Item key='signin' icon={<LoginOutlined style={{ color: 'green' }} />}>
          <Link passHref href='/api/auth/signin'>
            Login
          </Link>
        </Menu.Item>
      )}
    </Menu>
  )
}
