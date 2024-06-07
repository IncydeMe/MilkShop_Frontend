import React from 'react'
import { Montserrat } from "next/font/google";
import UserHeader from '@/components/shared/user/user-header'
import UserFooter from '@/components/shared/user/user-footer'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Cửa hàng sữa - Người dùng",
    description: "Cửa hàng sữa - Người dùng",
  };

const montserrat = Montserrat({ subsets: ["latin"] });

export default function UserLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <body className={montserrat.className}>
            <UserHeader />
            <main className='min-h-screen'>{children}</main>
            <UserFooter />
        </body>
    );
}