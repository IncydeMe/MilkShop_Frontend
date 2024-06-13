"use client"
import { usePathname, useRouter } from "next/navigation"
import { animatePageOut } from "@/lib/page-animation"
import { Button, type ButtonProps } from "./ui/button"
import { cn } from "@/lib/utils"

interface Props extends ButtonProps{
  href: string
  label?: string,
  className?: string
  children?: React.ReactNode
}

const TransitionLink = ({ href, label, className, ...props}: Props) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = () => {
    if (pathname !== href) {
      animatePageOut(href, router)
    }
  }

  return (
    <Button
      className={cn("text-md" , className)}
      onClick={handleClick}
      {...props}
    >
      {label || props.children}
    </Button>
  )
}

export default TransitionLink