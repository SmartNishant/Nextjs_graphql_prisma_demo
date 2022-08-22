import React from 'react'
import { ReactNode } from 'react'
import Navbar from './Navbar'

interface LayoutProps {
  children: ReactNode
}
export default function Layout(props: LayoutProps) {
  return (
    <div>
      <Navbar />
      <div>{props.children}</div>
    </div>
  )
}
