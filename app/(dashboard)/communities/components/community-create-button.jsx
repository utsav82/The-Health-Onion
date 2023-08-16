"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { cn } from "app/libs/utils"
import { ButtonProps, buttonVariants } from "app/components/ui/button"
import { Icons } from "app/components/icons"

export default function CommunityCreateButton({
    className,
    variant,
    ...props
}) {
    const [isLoading, setIsLoading] = React.useState(false)
    return (
        <button
            // onClick={onClick}
            className={cn(
                buttonVariants({ variant }),
                {
                    "cursor-not-allowed opacity-60": isLoading,
                },
                className
            )}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Icons.add className="mr-2 h-4 w-4" />
            )}
            Create
        </button>
    )
}