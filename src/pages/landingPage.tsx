import CustomButton from "@/components/ui/customButton";
import SupportGroupSummaryCard from "@/components/ui/supportGroupSummaryCard";
import CenteredContent from "@/components/ui/CenteredContent";
import WomenTogether from "@/icons/WomenTogether";
import SuccessStories, { SuccessStory } from "@/components/ui/successStories";
import { NavLink, useNavigate } from "react-router-dom";
import Links from "@/routes/Links";
import useGroups from "@/hooks/useGroups";
import Spinner from "@/components/ui/spinner";

export default function Landing() {
    const { groups, isLoading } = useGroups()
    const navigation = useNavigate()
    const handleGetStarted = () => {
        navigation(Links.auth.Register)
    }

    const successStories: SuccessStory[] = [
        {
            id: "1",
            title: "How EmpowerHer Changed My Life",
            author: "Sarah Johnson",
            role: "Tech Women Rise member",
            image: "/simbalike.jpg",
            excerpt: '"Finding this community changed my life. I gained confidence, skills, and lifelong friends who support my journey."',
        },
        {
            id: "2",
            title: "A Journey of Growth",
            author: "Jane Doe",
            role: "Support Group Member",
            image: "/simbalike.jpg",
            excerpt: '"I never thought I would find such a supportive community. EmpowerHer has helped me grow in so many ways."',
        },
        {
            id: "3",
            title: "Building Confidence",
            author: "Mary Smith",
            role: "Community Leader",
            image: "/simbalike.jpg",
            excerpt: '"The workshops and events have been life-changing. I am more confident and empowered than ever."',
        },
    ];
    return (
        <>
            {/* Intro section*/}
            <CenteredContent>
                <section className=" flex gap-10 items-center">
                    <div className=" flex flex-col gap-14 ">
                        <h1 className="text-3xl font-extrabold sm:text-5xl">
                            EmpowerHer
                        </h1>
                        <p className="sm:text-xl/relaxed">
                            Connect with like-minded women, share experiences, and grow together in a safe and supportive environment.
                        </p>
                        <div className="flex gap-4">
                            <NavLink to={Links.auth.Login} className="rounded-md h-10 w-32 md:h-12 md:w-40 font-light text-center inline-flex items-center justify-center bg-secondary-400 text-accent-50 hover:bg-secondary-100" >Get Started</NavLink>
                        </div>
                    </div>
                    <div className=" w-1/2  shrink grow-0 hidden md:block">
                        <WomenTogether />
                    </div>
                </section>
            </CenteredContent>
            {/* Support groups  section*/}
            <section className=" bg-white py-7">
                <CenteredContent>
                    <h2 className="text-2xl font-bold mt-10 text-center w-full mb-10">Popular support groups</h2>
                    <div className="flex gap-6 overflow-x-scroll">
                        {isLoading && <div>
                            <Spinner />
                        </div>}
                        {groups && groups.length === 0 && <span>There are no supporrt groups available now </span>}
                        {groups && groups.map(group =>
                            <SupportGroupSummaryCard title={group.name} members={group.members} description={group.description} type={group.district || 'N/A'} />
                        )}

                    </div>
                </CenteredContent>
            </section>
            {/* Succees Stories section*/}
            <section className=" bg-white my-20 py-7">
                <CenteredContent>
                    <h2 className="text-2xl font-bold mt-10 text-center w-full mb-10">Success Stories</h2>
                    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {successStories.map(story => (
                            <SuccessStories key={story.id} successStory={story} />
                        ))}
                    </div>
                </CenteredContent>
            </section>

            <section className="bg-secondary-400 mt-20 py-7 text-secondary-50 font-light">
                <CenteredContent>
                    <div className="mx-auto flex flex-col gap-6 items-center justify-center text-center">
                        <h2 className="font-bold text-xl">Ready to join our community ?</h2>
                        <p>Connect supportive women who understands your journey</p>
                        <CustomButton variant={'outline'} onClick={handleGetStarted}>
                            Get Started Today
                        </CustomButton>
                    </div>
                </CenteredContent>
            </section>
        </>
    )
}