import { DashboardHeader } from "app/components/header";
import CommunitiesList from "./components/CommunitiesList";
import dynamic from "next/dynamic";
const Create = dynamic(
  () => import("./components/create-community-form"),
);
import { Suspense } from 'react'
import Loader from "./components/communityLoader";
export const metadata = {
  title: "Communities",
};

export default async function Community() {

  return (
    <div className="container mt-5">
      <div className="text-black flex justify-between">
        <DashboardHeader
          heading="Communities"
          text="Follow communities that suit you"
        />
        <Create></Create>
      </div>
      <div className="mt-4">
        <Suspense fallback={<Loader />}>
          <CommunitiesList />
        </Suspense>
      </div>
    </div>
  );
}
