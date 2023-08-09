import React from "react";
import Image from "next/image";
import Button from "../Button";
import Link from "next/link";
const SubHero = () => {
  return (
    <div className="background_2 max-w-screen flex flex-col lg:flex-row items-center justify-around p-8">
      <div className="flex flex-row items-center justify-evenly animate-fade-up animate-once animate-duration-1000 animate-delay-500 animate-ease-in-out animate-fill-both">
        <Image
          src="/images/old_man_2.png"
          height="500"
          width="500"
          alt="Hero-Image-Old-Man"
          className="object-contain w-[200px] md:w-[300px]"
        />
        <div className="center px-5">
          <h1 className="text-2xl md:text-5xl font-semibold text-[azure]">
            Join the community
          </h1>
          <p className="mt-2.5 text-base md:text-xl font-base text-[azure]">
            “Connect with others who share your health interests”
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:w-3/12	items-center p-4 animate-fade-up animate-once animate-duration-1000 animate-delay-500 animate-ease-in-out animate-fill-both">
        <h1 className="text-xl md:text-2xl font-semibold text-[azure]">
          Take Control of Your Health
        </h1>
        <p className="mt-2.5 text-base md:text-md font-base text-[azure]">
          Ready to join our community and start your health journey? Sign up
          today and gain access to expert resources, personalized tracking
          tools, and engaging forums where you can connect with others who share
          your goals
        </p>
        <div className="mt-3">
        <Link href="/auth">
          <Button rounded width={"w-[150px]"} text={"md"}>
            Sign Up
          </Button>
         </Link>
        </div>
      </div>
    </div>
  );
};

export default SubHero;
