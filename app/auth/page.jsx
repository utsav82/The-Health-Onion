
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
          bg-cover
          bg-center
          bg-no-repeat
          z-5 
          bg-auth-bg
          bg-[#B4D7B1]
        
        "
    >
      <AuthForm></AuthForm>
      <div className='z-50 lg:absolute relative bottom-0 right-0 pt-5'> 
      <Image unoptimized={true} alt="yoga auth bg" src="/images/yoga.png" className='w-64 lg:w-64 xl:w-96 h-auto' width="100" height="100" ></Image>
      </div>
    </div>
  );
}

export default Auth;
