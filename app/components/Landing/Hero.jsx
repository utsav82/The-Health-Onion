import React from "react";
import Image from "next/image";
import old_man from "../../assets/old_man.png";
import Button from "../Button";
import Link from "next/link";
const Hero = () => {
  return (
    <div className="background_1 h-auto sm:h-screen mx-auto flex flex-col md:flex-row items-center justify-around p-10 sm:p-6 ">
      <div className="md:mt-5">
        <h1 className="text-3xl md:text-7xl font-bold text-[azure] animate-fade-right animate-duration-1000 animate-delay-100 animate-ease-in-out ">
          What is
        </h1>
        <h1 className="text-3xl md:text-7xl font-bold text-[azure] animate-fade-right animate-duration-1000 animate-delay-100 animate-ease-in-out mt-1" >
          The Health Onion?
        </h1>
        <p className="my-2.5 text-base md:text-2xl font-semibold text-[azure] md:w-[500px] animate-fade-right animate-duration-1000 animate-delay-500 animate-ease-in-out">
          Our platform is dedicated to fostering a community of individuals who
          share a common interest in promoting health and wellness. By joining
          our community, you will gain access to expert resources, engaging
          forums, and opportunities to connect with others who share your health
          goals
        </p>
        <div className="block my-5 animate-fade-right animate-once animate-duration-1000 animate-delay-500 animate-ease-in-out animate-fill-both">
          <Link href="/auth">
            <Button
              width={"w-[200px]"}
              backgroundColor={"bg-[#5ABC72]"}
              rounded
              text={"lg"}>
              Register Now
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <Image
          src={old_man}
          height="500"
          width="500"
          alt="Hero-Image-Old-Man"
          
          className="object-cover h-auto animate-fade-left animate-once animate-duration-1000 animate-delay-100 animate-ease-in-out animate-fill-both"></Image>
      </div>
    </div>
  );
};

export default Hero;