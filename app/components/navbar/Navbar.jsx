'use client';
import Logo from "./Logo";
import Button from "../Button"
import { useRouter } from "next/navigation";
const Navbar = () => {
  return ( 
    <div className="relative w-full bg-black z-10 shadow-sm">
       <Logo></Logo>
     </div>
  );
};

export default Navbar;
