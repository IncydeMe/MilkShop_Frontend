import { link } from 'fs'
import { Bell, Gift, LayoutTemplate, MessageCircleMore, Newspaper, Package, Package2, TicketPercent } from 'lucide-react'
import { title } from 'process'
import React from 'react'
import Sidebar from '../sidebar'

const StaffSidebar = () => {
  return (
    <Sidebar 
        sections={[
            {
                links: [
                    {
                        icon: LayoutTemplate,
                        link: '/staff',
                        label: 'Dashboard',
                        isExpanded: true,
                    }
                ]
            },
            {
                title: 'Tin tức',
                links: [
                    {
                        icon: Bell,
                        link: '/staff/notifications',
                        label: 'Thông báo',
                        isExpanded: true,
                    },
                    {
                        icon: MessageCircleMore,
                        link: '/staff/messages',
                        label: 'Tin nhắn',
                        isExpanded: true,
                    }
                ]
            },
            {
                title: 'Quản lý',
                links: [
                    {
                        icon: Package,
                        link: '/staff/products',
                        label: 'Sản phẩm',
                        isExpanded: true,
                    },
                    {
                        icon: Gift,
                        link: '/staff/gifts',
                        label: 'Phần quà',
                        isExpanded: true,
                    },
                    {
                        icon: TicketPercent,
                        link: '/staff/vouchers',
                        label: 'Phiếu giảm giá',
                        isExpanded: true,
                    },
                    {
                        icon: Package2,
                        link: '/staff/product-categories',
                        label: 'Danh mục sản phẩm',
                        isExpanded: true,
                    },
                    {
                        icon: Newspaper,
                        link: '/staff/blogs',
                        label: 'Bài viết',
                        isExpanded: true,
                    }
                ]
            },
        ]}

    
    />
  )
}

export default StaffSidebar
