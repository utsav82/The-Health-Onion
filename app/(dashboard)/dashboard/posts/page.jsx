
import { DashboardHeader } from "app/components/header"
import { DashboardShell } from "app/components/shell"


export const metadata = {
  title: "Posts",
  description: "See the posts you made",
}

export default async function PostsPage() {
 

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Posts"
        text="See the posts you made"
      />
      <div className="grid gap-10">
       
      </div>
    </DashboardShell>
  )
}
