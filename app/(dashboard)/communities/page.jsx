import { DashboardHeader } from "app/components/header";
import CommunitiesList from "./components/CommunitiesList";
import Create from "./components/create-community-form";


export const metadata = {
  title: "Communities",
};

export default async function Community() {

  return (
    <div className="container">
      <div className="text-black flex justify-between">
        <DashboardHeader
          heading="Communities"
          text="Follow communities that suit you"
        />
        <Create></Create>
      </div>
      <div className="mt-4">
        <CommunitiesList />
      </div>
    </div>
  );
}
