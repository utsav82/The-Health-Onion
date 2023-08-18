'use client'
import { buttonVariants } from "app/components/ui/button"
import { cn } from "app/libs/utils"
export default function GlobalError({ error, reset }) {
  return (
    <html className="h-screen">
      <body className="text-black flex items-center justify-center h-screen flex-col">
        <h2 className="font-bold  mb-5">Uh! Something went wrong!</h2>
        <button className={cn(
            buttonVariants(),
          )} onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}