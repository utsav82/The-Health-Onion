import Image from "next/image";
import old_man from "../app/assets/old_man.png";
export default function Home() {
  return (
    <div className="background h-screen max-w-screen mx-auto  ">
      <div className="flex flex-col md:flex-row items-center justify-around">
        <div>
          <h1 className="text-4xl md:text-7xl font-bold text-[azure]">
            What is
          </h1>
          <h1 className="text-4xl md:text-7xl font-bold text-[azure]">
            The Health Onion?
          </h1>
          <p className="mt-2.5 text-base md:text-2xl font-semibold text-[azure] md:w-[500px]">
            Our platform is dedicated to fostering a community of individuals
            who share a common interest in promoting health and wellness. By
            joining our community, you will gain access to expert resources,
            engaging forums, and opportunities to connect with others who share
            your health goals
          </p>
          <div>
            {/* {<Button
              backgroundColor={"#5ABC72"}
              px="10px"
              py="20px"
              color={"#fff"}
              borderRadius={"20px"}
              width={"150px"}>
              Register Now
            </Button>} */}
          </div>
        </div>
        <div>
          <Image
            src={old_man}
            height="600"
            width="600"
            alt="Logo"
            className="object-cover h-auto"></Image>
        </div>
      </div>
    </div>
  );
}
