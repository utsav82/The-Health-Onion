
import { DashboardHeader } from "app/components/header"
import { DashboardShell } from "app/components/shell"


export const metadata = {
  title: "Dashboard",
  
}

export default async function PostsPage() {
 

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Your feed"
        text="See the latest posts from communities you follow"
      />
      <div className="grid gap-10">
       
      </div>
    </DashboardShell>
  )
}
