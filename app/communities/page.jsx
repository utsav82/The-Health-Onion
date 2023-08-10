import { redirect } from "next/navigation"
import { getCurrentUser } from "app/libs/session"

export const metadata = {
  title: "Communities",
}

export default async function CommunitiesPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth")
  }

  return (
    <div>
      hello ji
    </div>
  )
}
