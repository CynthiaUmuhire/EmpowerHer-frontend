import { Card, CardContent } from "@/components/ui/card";
import CenteredContent from "@/components/ui/CenteredContent";
import CustomButton from "@/components/ui/customButton";
import Spinner from "@/components/ui/spinner";
import TypeBadge from "@/components/ui/typeBadge";
import useUserInfo from "@/hooks/useUserInfo";
import Links from "@/routes/Links";
import { RegistrationStatus } from "@/types";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const { user, isLoading } = useUserInfo();
    const navigate = useNavigate();
    console.log('Use==========', (!isLoading && user));
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        navigate(Links.auth.Login, { replace: true });
    }
    const getBadgeColors = (status: RegistrationStatus) => {
        switch (status) {
            case RegistrationStatus.PENDING:
                return 'info';
            case RegistrationStatus.APPROVED:
                return 'success';
            case RegistrationStatus.REJECTED:
                return 'destructive';
            default:
                return null;
        }
    };
    return (
        <section className="flex flex-col gap-20 py-20">
            {isLoading && (<section>
                <CenteredContent>
                    <Spinner />
                </CenteredContent>
            </section>)}
            {!isLoading && user && (
                <>
                    <section>
                        <CenteredContent>
                            <h2 className="text-2xl font-semibold mb-4">About Me</h2>

                            <Card className="mb-8 border-primary-100  bg-secondary-50 flex flex-col md:flex-row items-center justify-around gap-6">
                                <CardContent>
                                    {user.profilePicture ? (
                                        <img
                                            src={user.profilePicture}
                                            alt={user.username}
                                            className="object-cover w-24 h-24 rounded-full " />) :
                                        (
                                            <div className="text-3xl min-w-24 h-24 flex justify-center items-center rounded-full font-semibold border-2 border-primary-400 ">
                                                <p>{user.username.split(' ').map(n => n[0]).join('')}</p>
                                            </div>)}
                                </CardContent>
                                <CardContent className="flex flex-col gap-4 text-primary-400">
                                    <p className="text-2xl font-semibold">Names: {user.firstName} {user.lastName}</p>
                                    <p>Email: {user.email}</p>
                                    <p>Phone number: {user.phoneNumber}</p>

                                </CardContent>
                            </Card>
                        </CenteredContent>
                    </section>
                    <section>
                        <CenteredContent>
                            <h2 className="text-2xl font-semibold mb-4">Current Registrations</h2>
                            <Card className="border-primary-100  bg-secondary-50 ">
                                <CardContent>
                                    {user.registrations && user.registrations.length > 0 ? (
                                        <ul className="space-y-4">
                                            {user.registrations.map((registration) => (
                                                <li key={registration.id} className="p-4 flex flex-col gap-2 border rounded-md bg-white shadow-sm text-primary-400">
                                                    <span> Status:  <TypeBadge type={registration.registrationStatus} variant={getBadgeColors(registration.registrationStatus)} /></span>
                                                    <p>Notes: {registration.notes || 'No notes provided'}</p>
                                                    <p>Requested on: {new Date(registration.createdAt).toLocaleDateString()}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-primary-400">You have no current registrations.</p>
                                    )}
                                </CardContent>
                            </Card>
                        </CenteredContent>
                    </section>
                </>
            )}
            <section>
                <CenteredContent>
                    <h2 className="text-2xl font-semibold mb-4">Settings</h2>
                    <Card className="border-primary-100  bg-secondary-50 ">
                        <CardContent>
                            <div className="flex flex-col gap-4">
                                <p className="text-primary-400">Manage your account settings, including password changes and log out.</p>
                                <CustomButton variant='destructive' onClick={handleLogout}>
                                    Log out
                                </CustomButton>
                                <CustomButton variant='secondary'>
                                    Change Password
                                </CustomButton>
                            </div>
                        </CardContent>
                    </Card>
                </CenteredContent>
            </section>
        </section>
    );
}