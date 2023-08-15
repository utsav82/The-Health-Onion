import { redirect } from "next/navigation"
import { getCurrentUser } from "app/libs/session"
import UserAccountNav from "app/components/user-account-nav"
import MainNav from "app/components/main-nav"

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
      <main>
        {children}
      </main>
    </div>


  )
}
