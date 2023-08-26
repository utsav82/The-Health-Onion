import MainNav from "app/components/main-nav";

export default async function CommunitiesLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-accent text-black">
        <div className="h-min">
          <MainNav />
        </div>
      </header>
      <main>{children}</main>
      <footer className="h-10"></footer>
    </div>
  );
}
