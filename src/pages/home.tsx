import { } from "sonner"
import CenteredContent from "@/components/ui/CenteredContent"
import Spinner from "@/components/ui/spinner"
import { Link } from "react-router-dom"
import { ArrowRight, Users, Calendar, Award } from "lucide-react"
import Links from "@/routes/Links"
import useUserInfo from "@/hooks/useUserInfo"
import dayjs from "dayjs"
import { ComponentType } from "react"

export default function Home() {
  const { user, isLoading: userLoading } = useUserInfo()
  return (
    <section className="h-screen flex flex-col justify-center ">
      <section className=" bg-gradient-to-br bg-secondary-50 py-10  md:py-20">
        <CenteredContent>
          <div className="flex flex-col justify-center gap-4 md:gap-8">
            {userLoading && <div>
              <Spinner />
            </div>}
            {user && (
              <>
                <h1 className="text-lg md:text-4xl font-bold text-primary">
                  Welcome back,
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
                    {" "}{user.lastName} {user.firstName}
                  </span>
                </h1>
                <p className=" text-md md:text-xl text-gray-600 leading-relaxed text-justify">
                  We're so glad to see you again. Here's what's happening in your community.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 justify-items-start md:justify-items-center">
                  <Badge Icon={Users} count={user.approvedRegistrations?.length || 0} text="Groups Joined" />
                  <Badge Icon={Calendar} count={user.upComingEvents?.length || 0} text="Your Events" />
                  <Badge Icon={Award} count={`${dayjs(user.createdAt).month()} ${dayjs(user.createdAt).year()}`} text="Member Since" />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to={Links.protected.Groups} className="bg-gradient-to-r from-primary-800 to-secondary-800 hover:from-primary-400 hover:to-secondary-400 text-secondary-50 px-4 w-3xs md:w-sm md:px-8 py-2 md:py-3 text-sm md:text-lg flex items-center rounded-md">
                    View Support Groups
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                  <Link to={Links.protected.Events} className="bg-gradient-to-r from-primary-800 to-secondary-800 hover:from-primary-400 hover:to-secondary-400 text-secondary-50 px-4  w-3xs md:w-sm  md:px-8 py-2 md:py-3 text-sm md:text-lg flex items-center rounded-md">
                    Upcoming Events
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </CenteredContent>
      </section>
    </section>

  )
}

function Badge({ Icon, count, text
}: { Icon: ComponentType, count: number | string, text: string }) {
  return (
    <div className="bg-secondary-50/75 backdrop-blur-sm w-3xs rounded-2xl p-3 md:p-6 shadow-sm border border-seconday-400 text-center">
      <div className="flex text-secondary-50 items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-xl mx-auto mb-4">
        <Icon />
      </div>
      <p className="font-bold text-primary">{text}</p>
      <h3 className=" text-primary-400">{count}</h3>
    </div>
  )
}
