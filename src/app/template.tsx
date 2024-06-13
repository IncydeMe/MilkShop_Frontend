"use client"

import { animatePageIn } from "@/lib/page-animation"
import { useEffect } from "react"

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    animatePageIn()
  }, [])
  return (
    <div className="overflow-x-hidden">
      <div
        id="banner-1"
        className="min-h-screen overflow-x-hidden bg-neutral-950 fixed top-0 left-0 w-[25%] z-[100]"
      />
      <div
        id="banner-2"
        className="min-h-screen overflow-x-hidden bg-neutral-950 fixed top-0 left-1/4 w-[25%] z-[100]"
      />
      <div
        id="banner-3"
        className="min-h-screen overflow-x-hidden bg-neutral-950 fixed top-0 left-2/4 w-[25%] z-[100]"
      />
      <div
        id="banner-4"
        className="min-h-screen overflow-x-hidden bg-neutral-950 fixed top-0 left-3/4 w-[25%] z-[100]"
      />
      {children}
    </div>
  )
}