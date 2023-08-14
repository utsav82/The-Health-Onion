import Link from "next/link"
import { cn } from "app/libs/utils"
import { buttonVariants } from "app/components/ui/button"

export default async function IndexPage() {
  return (
    <>
      <section className="background_0 space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 ">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            The Health Onion !!<br></br><span className="hidden md:block">  Your Source for Health Conversations</span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Empowering Your Journey to Better Health Through Knowledge Sharing and Supportive Connections
          </p>
          <div className="hidden md:block space-x-4">
            <Link href="/auth" className={cn(buttonVariants({ size: "default" }))}>
              Get Started
            </Link>
            <Link
              href={"twitter.com"}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "secondary", size: "default" }))}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>


    </>
  )
}
