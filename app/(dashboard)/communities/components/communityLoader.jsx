'use client';

import { PuffLoader } from "react-spinners";

const Loader = () => {
  return ( 
    <div
    className="
      h-[50vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      <PuffLoader
        size={50}
        color="#36d7b7"
      />
    </div>
   );
}
 
export default Loader;