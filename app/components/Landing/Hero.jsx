import React from "react";
import Image from "next/image";
import { Button } from "../ui/button"

import Link from "next/link";
const Hero = () => {
  return (
    <div className="background_1 h-auto sm:h-screen mx-auto flex flex-col md:flex-row items-center justify-around p-10 sm:p-6 ">
      <div className="md:mt-5">
        <h1 className="text-3xl md:text-7xl font-bold  animate-fade-right animate-duration-1000 animate-delay-100 animate-ease-in-out ">
          What is
        </h1>
        <h1 className="text-3xl md:text-7xl font-bold animate-fade-right animate-duration-1000 animate-delay-100 animate-ease-in-out mt-1" >
          The Health Onion?
        </h1>
        <p className="my-8 text-base md:text-2xl font-semibold md:w-[500px] animate-fade-right animate-duration-1000 animate-delay-500 animate-ease-in-out">
          Our platform is dedicated to fostering a community of individuals who
          share a common interest in promoting health and wellness. By joining
          our community, you will gain access to expert resources, engaging
          forums, and opportunities to connect with others who share your health
          goals
        </p>
        <div className="inline-block my-5 animate-fade-right animate-once animate-duration-1000 animate-delay-500 animate-ease-in-out animate-fill-both">
          <Button asChild>
            <Link href="/auth">Register Now</Link>
          </Button>
        </div>
      </div>
      <div>
        <Image
        unoptimized={true}
          src="/images/doctor-team.png"
          height="600"
          width="600"
          alt="background"
          className="object-cover h-auto animate-fade-left animate-once animate-duration-1000 animate-delay-100 animate-ease-in-out animate-fill-both"></Image>
      </div>
    </div>
  );
};

export default Hero;
