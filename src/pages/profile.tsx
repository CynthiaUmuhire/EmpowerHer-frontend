import { Card, CardContent } from "@/components/ui/card";
import CenteredContent from "@/components/ui/CenteredContent";
import useUserInfo from "@/hooks/useUserInfo";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export default function Profile() {
    const { user, isLoading } = useUserInfo();
    console.log('User Info:', user);
    return (
        <CenteredContent >
            <div>
                {isLoading && (
                    <div>Loading...</div>)}

                {!isLoading && user && (<Card className="mb-8 border-primary-100 bg-secondary-50">
                    <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            <Avatar className="">
                                <AvatarImage
                                    src={user.profilePicture ? user.profilePicture : 'https://www.google.com/imgres?q=mother&imgurl=https%3A%2F%2Fi0.wp.com%2Fapeejay.news%2Fwp-content%2Fuploads%2F2024%2F05%2F03052024_Mother-and-child.png%3Fresize%3D740%252C740%26ssl%3D1&imgrefurl=https%3A%2F%2Fapeejay.news%2Fthe-bond-between-a-mother-and-a-child%2F&docid=Z-G07owABYlbhM&tbnid=5vMK1yfr_LU2eM&vet=12ahUKEwj5iqSz2_-NAxXdW0EAHQXhG2IQM3oECBkQAA..i&w=740&h=740&hcb=2&ved=2ahUKEwj5iqSz2_-NAxXdW0EAHQXhG2IQM3oECBkQAA'}
                                    alt={user.username}
                                    className="object-cover w-24 h-24"
                                />
                                {/* <AvatarFallback className=" text-2xl font-semibold">
                                    {user.username.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback> */}
                            </Avatar>
                        </div>
                    </CardContent>
                </Card>)}
            </div>
        </CenteredContent>
    );
}