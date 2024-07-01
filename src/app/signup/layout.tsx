import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Đăng ký",
  description: "Đăng ký tài khoản",
}

function SignupLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
        {children}
    </main>
  )
}

export default SignupLayout
