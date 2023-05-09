"use client";
import Logo from "./Logo";
import Button from "../Button";

const Navbar = () => {
  return (
    <div className="md:absolute w-full bg-black z-10 shadow-sm">
      <Logo></Logo>
    </div>
  );
};

export default Navbar;
