import React from "react";
import Image from "next/image";
import Button from "../Button";
import old_man_2 from "../../assets/old_man_2.png";
const SubHero = () => {
  return (
    <div className="background_2 flex flex-col md:flex-row items-center justify-around">
      <div className="flex felx-row items-center justify-evenly gap-6 animate-fade-up animate-once animate-duration-1000 animate-delay-500 animate-ease-in-out animate-fill-both">
        <Image
          src={old_man_2}
          height="500"
          width="500"
          alt="Hero-Image-Old-Man"
          className="object-cover w-[200px] md:w-[300px]"
        />
        <div className="center">
          <h1 className="text-2xl md:text-5xl font-semibold text-[azure]">
            Join the community
          </h1>
          <p className="mt-2.5 text-base md:text-xl font-base text-[azure]">
            “Connect with others who share your health interests”
          </p>
        </div>
      </div>
      <div className="flex flex-col md:w-3/12	items-center p-4 animate-fade-up animate-once animate-duration-1000 animate-delay-500 animate-ease-in-out animate-fill-both">
        <h1 className="text-xl md:text-2xl font-semibold text-[azure]">
          Take Control of Your Health
        </h1>
        <p className="mt-2.5 text-base md:text-md font-base text-[azure]">
          Ready to join our community and start your health journey? Sign up
          today and gain access to expert resources, personalized tracking
          tools, and engaging forums where you can connect with others who share
          your goals
        </p>
        <div className="mt-1.5">
          <Button
            backgroundColor={"bg-[#21B9C4]"}
            px="5"
            py="2"
            color={"#fff"}
            rounded={"20px"}
            width={"w-[100px]"}>
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubHero;
