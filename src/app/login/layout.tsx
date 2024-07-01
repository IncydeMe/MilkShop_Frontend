import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập tài khoản",
}

function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
        {children}
    </main>
  )
}

export default LoginLayout
