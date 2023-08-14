import React from 'react'
import Image from 'next/image'
import AuthForm from './components/AuthForm'
import { buttonVariants } from "app/components/ui/button"
import Link from 'next/link'
import { cn } from "app/libs/utils"
import { ArrowLeft } from "lucide-react/dist/esm/lucide-react"
export const metadata = {
  title: "Login/Signup",
  description: "Create/Login to your account",
}
function Auth() {
  return (

      <div
        className="
          pt-36
          lg:pt-0
          justify-center 
          items-center 
          flex-col
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          h-full
          w-full
          z-5
          bg-[#B4D7B1]
        
        "
      >
         <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      ><ArrowLeft></ArrowLeft></Link>
        <div className='z-0 fixed bottom-0 left-0'>
          <Image alt="design" src="/images/bg-left.png" className='w-64 h-auto' width="100" height="100" ></Image>
        </div>
        <div className='z-0 fixed top-0 right-0 pt-10'>
          <Image alt="design" src="/images/bg-right.png" className='w-64 h-auto' width="100" height="100" ></Image>
        </div>
        <AuthForm></AuthForm>
        <div className='z-50 lg:absolute relative bottom-0 right-0 pt-5'>
          <Image unoptimized={true} alt="yoga auth bg" src="/images/yoga.png" className='w-64 lg:w-64 xl:w-96 h-auto' width="100" height="100" ></Image>
        </div>
      </div>

  );
}

export default Auth;
