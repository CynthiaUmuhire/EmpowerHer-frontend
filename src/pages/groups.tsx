import CenteredContent from "@/components/ui/CenteredContent";

export default function Groups() {
    return (
        <section >
            <CenteredContent>
                <div>
                    <h2 className="text-2xl font-bold text-center w-full mb-10">Your Current Groups</h2>
                    <p className="text-center text-sm md:text-base text-slate-500 p-2 my-6">
                            You are not a member of any group yet. Join a group to start connecting with others.
                        </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                       
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-center w-full mb-10">Discover Groups</h2>
                    <div>
                        <p className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {/* Add your group cards here */}
                            
                        </p>
                    </div>
                </div>
            </CenteredContent>
        </section>
    )
}