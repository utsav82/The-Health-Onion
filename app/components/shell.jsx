import * as React from "react"

import { cn } from "app/libs/utils"


export function DashboardShell({
  children,
  className,
  ...props
}) {
  return (
    <div className={cn("grid items-start gap-8 mt-8", className)} {...props}>
      {children}
    </div>
  )
}
