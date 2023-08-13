"use client"
import * as React from "react"
import Link from "next/link"
import Image from 'next/image'

export default function MainNav() {
 
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Image src="/images/Onion.png" className='w-30 h-auto' width="100" height="100"/>
        <span className="hidden font-bold sm:inline-block">
        The Health Onion
        </span>
      </Link>
        <nav className="hidden gap-6 md:flex">
            <Link
              href={"communities"}
              className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm">
              Communities
            </Link>
            <Link
              href={"support"}
              className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm">
              Support
            </Link>
        </nav>
    </div>
  )
}
