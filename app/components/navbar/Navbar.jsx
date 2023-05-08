'use client';
import Logo from "./Logo";
import Button from "../Button"
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router=useRouter();
  return (
    <div className="relative w-full bg-white z-10 shadow-sm rounded-sm">

      <div className="flex justify-between mx-10 items-center "> 
      <Logo></Logo>
      <Button rounded onClick={() => router.push('/auth')} >Register</Button>
      </div>

    </div>
  );
}


export default Navbar;