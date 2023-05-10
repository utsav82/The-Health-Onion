
import React from 'react'
import Image from 'next/image'
import AuthForm from './components/AuthForm'
function Auth() {
  return (
    <div
      className="
         
          md:pt-36
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
      <div className='z-0 fixed bottom-0 left-0'>
        <Image unoptimized={true} alt="design" src="/images/bg-left.png" className='w-64 h-auto' width="100" height="100" ></Image>
      </div>
      <div className='z-0 fixed top-0 right-0 pt-10'>
        <Image unoptimized={true} alt="design" src="/images/bg-right.png" className='w-64 h-auto' width="100" height="100" ></Image>
      </div>
      <AuthForm></AuthForm>
      <div className='z-50 lg:absolute relative bottom-0 right-0 pt-5'>
        <Image unoptimized={true} alt="yoga auth bg" src="/images/yoga.png" className='w-64 lg:w-64 xl:w-96 h-auto' width="100" height="100" ></Image>
      </div>
    </div>
  );
}

export default Auth;
