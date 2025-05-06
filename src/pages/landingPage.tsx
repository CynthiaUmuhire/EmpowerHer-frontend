import CustomButton from "@/components/ui/customButton";
import SupportGroupSummaryCard from "@/components/ui/supportGroupSummaryCard";
import CenteredContent from "@/components/ui/CenteredContent";
import WomenTogether from "@/icons/WomenTogether";
import SuccessStories from "@/components/ui/successStories";

export default function Landing() {
    const handleGetStarted = () => {
        console.log("Get Started clicked");
    }
    return (
        <>
            {/* Intro section*/}
            <CenteredContent>
                <section className=" flex gap-10 items-center">
                    <div className=" flex flex-col gap-14 ">
                        <h1 className="text-3xl font-extrabold sm:text-5xl">
                            Find your support community
                        </h1>
                        <p className="sm:text-xl/relaxed">
                            Connect with like-minded women, share experiences, and grow together in a safe and supportive environment.
                        </p>
                        <div className="flex gap-4">
                            <CustomButton onClick={handleGetStarted} variant={'secondary'}>
                                Get Started
                            </CustomButton>
                            <CustomButton variant={'outline'}>
                                Read Stories
                            </CustomButton>
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
                        <SupportGroupSummaryCard title="Wonderful Warriors" members={123} description="Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum" type="Support group" />
                        <SupportGroupSummaryCard title="Wonderful Warriors" members={123} description="Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum" type="Support group" />
                        <SupportGroupSummaryCard title="Wonderful Warriors" members={123} description="Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum" type="Support group" />
                        <SupportGroupSummaryCard title="Wonderful Warriors" members={123} description="Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum" type="Support group" />
                        <SupportGroupSummaryCard title="Wonderful Warriors" members={123} description="Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum" type="Support group" />
                        <SupportGroupSummaryCard title="Wonderful Warriors" members={123} description="Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum" type="Support group" />
                        <SupportGroupSummaryCard title="Wonderful Warriors" members={123} description="Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum" type="Support group" />
                        <SupportGroupSummaryCard title="Wonderful Warriors" members={123} description="Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum" type="Support group" />
                        <SupportGroupSummaryCard title="Wonderful Warriors" members={123} description="Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum" type="Support group" />
                        <SupportGroupSummaryCard title="Wonderful Warriors" members={123} description="Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum" type="Support group" />
                    </div>
                </CenteredContent>
            </section>
            {/* Succees Stories section*/}
            <section className=" bg-white my-20 py-7">
                <CenteredContent>
                    <h2 className="text-2xl font-bold mt-10 text-center w-full mb-10">Success Stories</h2>
                    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <SuccessStories />
                        <SuccessStories />
                        <SuccessStories />
                        <SuccessStories />
                        <SuccessStories />

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