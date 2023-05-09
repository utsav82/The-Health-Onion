'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return ( 
    <Image
      onClick={() => router.push('/')}
      className="block cursor-pointer " 
      src="/images/Onion.png" 
      height="80" 
      width="80" 
      alt="Logo" 
    />
   );
}
 
export default Logo;
