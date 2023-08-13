import { redirect } from "next/navigation"
import { getCurrentUser } from "app/libs/session"
import UserAccountNav from "./components/user-account-nav"
import MainNav from "./components/main-nav"

export default async function CommunitiesLayout({
  children,
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth")
  }


  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-[#1E9FD2]">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <UserAccountNav
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]"></div>
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>


  )
}
