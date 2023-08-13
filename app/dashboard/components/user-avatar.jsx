"use client"

import { Avatar, AvatarFallback, AvatarImage } from "app/components/ui/avatar"

export function UserAvatar({ user, ...props }) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
       
        </AvatarFallback>
      )}
    </Avatar>
  )
}
