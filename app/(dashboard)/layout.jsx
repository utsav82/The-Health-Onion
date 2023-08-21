import MainNav from "app/components/main-nav";

export default async function CommunitiesLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-white text-black">
        <div className="h-min ">
          <MainNav />
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
