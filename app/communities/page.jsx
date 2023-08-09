'use client' 
import {signOut} from "next-auth/react"
const page = () => {
  return (
    <div className='text-card-foreground'>
     <button onClick={()=>signOut()}>logout</button> 
    </div>
  )
}

export default page;
