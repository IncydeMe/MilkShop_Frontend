"use client"

import { animatePageIn } from "@/lib/page-animation"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    animatePageIn()
  }, []);
  return (
    <div>
      <div
        id="banner-1"
        className="min-h-screen bg-neutral-900 fixed top-0 left-0 w-1/4 z-[100]"
      />
      <div
        id="banner-2"
        className="min-h-screen bg-neutral-900 fixed top-0 left-1/4 w-1/4 z-[100]"
      />
      <div
        id="banner-3"
        className="min-h-screen bg-neutral-900 fixed top-0 left-2/4 w-1/4 z-[100]"
      />
      <div
        id="banner-4"
        className="min-h-screen bg-neutral-900 fixed top-0 left-3/4 w-1/4 z-[100]"
      />
      {children}
    </div>
  )
}