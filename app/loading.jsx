'use client';

import { CircleLoader } from "react-spinners";

const Loader = () => {
  return ( 
    <div
    className="
      h-[100vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      <CircleLoader
        size={100}
        color="#36d7b7"
      />
    </div>
   );
}
 
export default Loader;