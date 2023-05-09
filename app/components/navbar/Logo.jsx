'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return ( 
   
    <Image
      onClick={() => router.push('/')}
      className="block cursor-pointer h-auto w-24 pl-5" 
      src="/images/Onion.png" 
      height={100}
      width={100}
      priority
      alt="Logo" 
    />
    
   );
}
 
export default Logo;
