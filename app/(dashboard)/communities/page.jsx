import { DashboardHeader } from "app/components/header";
import CommunityCreateButton from "./components/community-create-button";
import CommunitiesList from "./components/CommunitiesList";
import DialogDemo from "./components/create-community-form";
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
        <CommunityCreateButton />
        <DialogDemo></DialogDemo>
      </div>
      <div className="mt-4">
        <CommunitiesList />
      </div>
    </div>
  );
}
