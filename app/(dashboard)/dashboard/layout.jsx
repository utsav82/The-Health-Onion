import { DashboardNav } from "../../components/nav";
import Image from "next/image";
import Quote from "inspirational-quotes";
import { Kreon } from "next/font/google";

const kreon = Kreon({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-kreon",
});

export default async function CommunitiesLayout({ children }) {
  const qoute = Quote.getRandomQuote();
  console.log(qoute);
  return (
    <div className="flex ">
      <aside className="hidden min-w-[250px] md:flex-col md:flex md:top-24 md:h-min md:sticky  p-5">
        <DashboardNav
          items={[
            {
              title: "Home feed",
              href: "/dashboard",
              icon: "laptop",
            },
            {
              title: "Posts",
              href: "/dashboard/posts",
              icon: "post",
            },
            {
              title: "Settings",
              href: "/dashboard/settings",
              icon: "settings",
            },
          ]}
        />
      </aside>
      <div className="flex flex-col w-min">
        <div className=" flex items-center justify-center lg:justify-between h-64  bg-[linear-gradient(90deg,#9e6370_0%,#bf7b85_52.60%,#fae1dc_84.38%,#feece3_100%)]">
          {qoute && (
            <p
              className={`p-10 ${kreon.className} hidden w-1/2 md:block font-bold text-2xl`}>
              "{qoute}"
            </p>
          )}
          <img
            src="/images/Banner_dash_3.svg"
            alt="banner"
            className="block max-w-xl object-cover"></img>
        </div>
        <main className="flex flex-col overflow-hidden text-black ">
          {children}
        </main>
      </div>
    </div>
  );
}
