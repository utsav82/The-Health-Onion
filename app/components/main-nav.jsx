"use client"
import * as React from "react"
import Link from "next/link"
import Image from 'next/image'

export default function MainNav() {
 
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="items-center space-x-2 flex">
        <Image src="/images/Onion.png" className='w-20 md:w-28 h-auto' width="100" height="100"/>
        <span className="font-bold inline-block">
        The Health Onion
        </span>
      </Link>
        <nav className="hidden gap-6 sm:flex">
        <Link
              href={"/dashboard"}
              className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm">
              Dashboard
            </Link>
            <Link
              href={"/communities"}
              className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm">
              Communities
            </Link>
           
        </nav>
    </div>
  )
}
