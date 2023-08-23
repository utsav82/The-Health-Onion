
import { DashboardNav } from "../../components/nav"
export default async function CommunitiesLayout({
  children,
}) {



  return (

    <div className="md:container w-full pr-6 md:pr-auto flex">
      <aside className="hidden w-[200px] flex-col md:flex sticky top-24 h-min">
        <DashboardNav items={[
          {
            title: "Home feed",
            href: "/dashboard",
            icon: "laptop",
          },
          {
            title: "Posts",
            href: "/dashboard/posts",
            icon: "post",
          },
          {
            title: "Settings",
            href: "/dashboard/settings",
            icon: "settings",
          },
        ]} />
      </aside>
      <main className="flex w-full flex-1 flex-col overflow-hidden text-black ml-8 ">
        {children}
      </main>
    </div>



  )
}
