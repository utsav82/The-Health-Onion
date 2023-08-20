import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Kreon } from "next/font/google";
import UserAccountNav from "app/components/user-account-nav";
import { redirect } from "next/navigation";
import { getCurrentUser } from "app/libs/session";
import LogOutBtn from "./log-out-btn";

const kreon = Kreon({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-kreon",
});

export default async function MainNav() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth");
  }

  return (
    <div className="flex mr-5 md:mx-5 items-center justify-between">
      <div>
        <Link href="/" className="items-center flex">
          <Image
            src="/images/Onion.png"
            alt="logo"
            priority
            className="w-10 md:w-10 mx-2 h-auto"
            width="100"
            height="100"
          />
          <span className="font-extrabold text-xl ">The Health Onion</span>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-3">
        <nav className="hidden gap-6 sm:flex">
          <Link
            href={"/dashboard"}
            className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm">
            Dashboard
          </Link>
          <Link
            href={"/communities"}
            className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm">
            Communities
          </Link>
        </nav>
        <div className="flex items-center justify-evenly space-x-3">
          <UserAccountNav
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          />
        </div>
      </div>
    </div>
  );
}
