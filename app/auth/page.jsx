
import React from 'react'
import Image from 'next/image'
import AuthForm from './components/AuthForm'
function Auth() {
  return (
    <div
      className="
          justify-center 
          items-center 
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
      
    </div>
  );
}

export default Auth;
