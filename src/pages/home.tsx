import { } from "sonner"
import { buttonVariants } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <section className="">
      <div className="mx-auto max-w-screen-xl px-4 py-32">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Welcome!
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Taking care of your mental health is a priority.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {/* <Button variant='destructive' onClick={() => toast.success('Boilerplate toast!')}>
              Toast Example
            </Button> */}
            <Link className={buttonVariants({ variant: "link" })} to="/404">Redirect 404</Link>
          </div>
        </div>
      </div>
    </section>

  )
}
