import React from 'react'
import { Button, ButtonProps } from '@/components/ui/button'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils';

interface SidebarButtonProps extends ButtonProps {
    icon?: LucideIcon;
}

function SidebarButton({ 
    icon: Icon,
    className,
    children,
    ...props 
}: SidebarButtonProps) {
  return (
    <Button
        variant={'ghost'}
        className={cn('gap-4 justify-start hover:bg-pink-500 hover:text-white rounded-[36px] px-4 py-2', className)}
        {...props}
    >
        {Icon && <Icon />}
        <div>{children}</div>
    </Button>
  )
}

export default SidebarButton
