import React from 'react'
import Login from '@/components/pagecomponents/user/Auth/Login'
import { Metadata } from 'next'

export const metadata : Metadata = {
  title: "Meet Grid | User Login",
  description: "Connecting You to Events, and Events to Connections",
}

function page() {
  return (
    <Login/>
  )
}

export default page