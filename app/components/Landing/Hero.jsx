import React from "react";
import Image from "next/image";
import old_man from "../../assets/old_man.png";
import Button from "../Button";
const Hero = () => {
  return (
    <div className="background_1 h-screen max-w-screen mx-auto flex flex-col md:flex-row items-center justify-around p-4">
      <div>
        <h1 className="text-4xl md:text-7xl font-bold text-[azure] animate-fade-right animate-duration-1000 animate-delay-100 animate-ease-in-out ">
          What is
        </h1>
        <h1 className="text-4xl md:text-7xl font-bold text-[azure] animate-fade-right animate-duration-1000 animate-delay-100 animate-ease-in-out">
          The Health Onion?
        </h1>
        <p className="mt-2.5 text-base md:text-2xl font-semibold text-[azure] md:w-[500px] animate-fade-right animate-duration-1000 animate-delay-500 animate-ease-in-out">
          Our platform is dedicated to fostering a community of individuals who
          share a common interest in promoting health and wellness. By joining
          our community, you will gain access to expert resources, engaging
          forums, and opportunities to connect with others who share your health
          goals
        </p>
        <div className="hidden md:block mt-5 animate-fade-right animate-once animate-duration-1000 animate-delay-500 animate-ease-in-out animate-fill-both">
          <Button
            backgroundColor={"bg-[#5ABC72]"}
            px={"5"}
            py={"2"}
            text={"md"}
            color={"#fff"}
            rounded={"20px"}
            width={"150px"}>
            Register Now
          </Button>
        </div>
      </div>
      <div>
        <Image
          src={old_man}
          height="600"
          width="600"
          alt="Hero-Image-Old-Man"
          className="object-cover h-auto animate-fade-left animate-once animate-duration-1000 animate-delay-100 animate-ease-in-out animate-fill-both"></Image>
      </div>
    </div>
  );
};

export default Hero;
