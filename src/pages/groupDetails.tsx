import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CenteredContent from "@/components/ui/CenteredContent";
import CustomButton from "@/components/ui/customButton";
import { RequestToJoinForm } from "@/components/ui/requestToJoinGroup";
import Spinner from "@/components/ui/spinner";
import useGroupDetails from "@/hooks/useGroupDetails";
import Links from "@/routes/Links";
import { ArrowLeft, MapPin, Phone, Share2, Users } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function GroupDetails() {
    const { groupId } = useParams<{ groupId: string }>();
    const { group: groupDetails, isLoading, isError } = useGroupDetails(groupId);
    return (
        <CenteredContent>
            {isLoading && (
                <section className="flex items-center justify-center h-screen">
                    <Spinner />
                </section>
            )}
            {!isLoading && isError && (
                <section className="flex items-center justify-center h-screen">
                    <p className="text-red-500">Error loading group details.</p>
                </section>
            )}
            {!isLoading && !isError && groupDetails && (
                <>
                    {/* THe Hero section */}
                    <div className="relative h-64 bg-gradient-to-r from-secondary-400 to-secondary-800 overflow-hidden">
                        <div
                            className={`absolute inset-0 bg-cover bg-center opacity-20 bg-[url(${groupDetails.coverImage})]`} // Currently not showing
                        />
                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                            <div className="text-white">
                                <Link to={Links.protected.Groups} className="inline-flex items-center text-primary-50 hover:text-white mb-4">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Support Groups
                                </Link>
                                <h1 className="text-4xl md:text-5xl font-bold mb-2">{groupDetails?.name}</h1>
                                <div className="flex items-center space-x-4 text-primary-50">
                                    <span className="flex items-center">
                                        <Users className="w-4 h-4 mr-1" />
                                        {groupDetails?.members} members
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid  bg-secondary-50 justify-around items-start px-4  py-8 gap-6">
                        {/* The main content section */}
                        <div className="space-y-6">
                            <Card className="bg-white shadow-md  border-primary-200">
                                <CardHeader>
                                    <CardTitle>About This Group</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 leading-relaxed">{groupDetails.description}</p>
                                </CardContent>
                            </Card>
                            {/* Quick Info Card */}
                            <Card className="bg-white shadow-md border-primary-200 ">
                                <CardHeader>
                                    <CardTitle>Group Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center text-sm">
                                        <MapPin className="w-4 h-4 mr-3 text-primary-500" />
                                        <div>
                                            <p className="font-medium">Location</p>
                                            <address className="text-gray-600">{groupDetails.district || 'No location provided'}</address>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Phone className="w-4 h-4 mr-3 text-primary-500" />
                                        <span>{groupDetails.assistantContact}</span>
                                    </div>

                                    <div className="pt-4 border-t">
                                        <div className="text-sm text-gray-600 mb-2">
                                            <span className="font-medium">Founded:</span> {new Date(groupDetails.createdAt || '').toLocaleDateString()}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <span className="font-medium">Active Members:</span> {groupDetails.members || 0}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-white shadow-md  border-primary-200">
                                <CardContent className="p-6 space-y-3 flex flex-col w-full ">
                                    <RequestToJoinForm
                                        groupId={groupId || ''}
                                    />
                                    <CustomButton variant="outline" >
                                        <Share2 className="w-4 h-4 mr-2" />
                                        Share Group
                                    </CustomButton>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </>
            )}

        </CenteredContent>
    );
}