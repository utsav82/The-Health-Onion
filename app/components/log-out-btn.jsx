"use client";
import React from "react";
import { Button } from "app/components/ui/button.jsx";
import { signOut } from "next-auth/react";

const LogOutBtn = () => {
  return (
    <Button
      variant="destructive"
      className="hidden md:block w-fit h-fit p-2"
      onClick={(event) => {
        event.preventDefault();
        signOut({
          callbackUrl: `${window.location.origin}/auth`,
        });
      }}>
      Log Out
    </Button>
  );
};

export default LogOutBtn;
