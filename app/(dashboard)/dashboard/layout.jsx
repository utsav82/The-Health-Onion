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
      <aside className="hidden w-[250px] md:flex-col md:flex md:top-16 md:h-[90vh] md:sticky bg-[#3C6470] p-5">
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
      <div className="flex flex-col w-full gap-10">
        <div className=" flex items-center justify-center lg:justify-between h-64  bg-[linear-gradient(90deg,#315D50_0%,#599068_52.60%,#8CBC95_84.38%,#D4EDC8_100%)]">
          {qoute && (
            <p
              className={`p-10 ${kreon.className} hidden md:block font-bold text-2xl`}>
              "{qoute}"
            </p>
          )}
          <Image
            src="/images/Banner_img_dashboard.png"
            alt="banner"
            height={300}
            width={500}
            className="block h-full object-cover"></Image>
        </div>
        <main className="flex flex-col overflow-hidden text-black ">
          {children}
        </main>
      </div>
    </div>
  );
}
