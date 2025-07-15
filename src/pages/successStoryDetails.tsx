import { useLocation } from "react-router-dom";
import CenteredContent from "@/components/ui/CenteredContent";
import { Card } from "@/components/ui/card";
import { SuccessStory } from "@/components/ui/successStories";

export default function SuccessStoryDetails() {
    const location = useLocation();
    const story = location.state as SuccessStory | undefined;

    if (!story) {
        return (
            <CenteredContent>
                <div className="max-w-2xl mx-auto py-10">
                    <Card className="bg-secondary-50 shadow-md p-8">
                        <div className="text-center text-lg font-light">No story data provided.</div>
                    </Card>
                </div>
            </CenteredContent>
        );
    }

    return (
        <CenteredContent>
            <div className="max-w-2xl mx-auto py-10">
                <Card className="bg-secondary-50 shadow-md p-8">
                    <div className="flex gap-4 items-center mb-6">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                            <img src={story.image} alt="profile" className="object-cover w-full h-full" />
                        </div>
                        <div>
                            <h2 className="font-bold text-2xl mb-1">{story.title}</h2>
                            <p className="font-semibold">{story.author}</p>
                            <p className="text-sm font-light">{story.role}</p>
                        </div>
                    </div>
                    <div className="text-lg font-light">
                        {/* For demo, just repeat the excerpt as full content */}
                        {story.excerpt}
                    </div>
                </Card>
            </div>
        </CenteredContent>
    );
} 