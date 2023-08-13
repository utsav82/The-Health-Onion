import { redirect } from "next/navigation"
import { getCurrentUser } from "app/libs/session"
export default async function CommunitiesLayout({
  children,
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth")
  }

  return (

    <main className="flex w-full flex-1 flex-col overflow-hidden">
      {children}
    </main>


  )
}
