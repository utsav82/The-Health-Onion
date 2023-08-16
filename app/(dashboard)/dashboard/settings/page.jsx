import { redirect } from "next/navigation"

import { authOptions } from "app/libs/authOptions"
import { getCurrentUser } from "app/libs/session"
import { DashboardHeader } from "app/components/header"
import { DashboardShell } from "app/components/shell"


export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
       
      </div>
    </DashboardShell>
  )
}