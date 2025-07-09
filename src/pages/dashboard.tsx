import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CenteredContent from "@/components/ui/CenteredContent";
import Spinner from "@/components/ui/spinner";
import useDashboard from "@/hooks/useDashboard";
import { Users, MapPin, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Links from "@/routes/Links";
import { toast } from "sonner";
import CustomButton from "@/components/ui/customButton";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function Dashboard() {
    const { stats, isLoading, isError } = useDashboard();
    const navigate = useNavigate();
    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        if (userRole !== 'admin') {
            toast.info('You need to be an admin for you to visualise the analytics')
            navigate(Links.auth.Login, { replace: true });
        }
    }, [navigate]);

    if (isLoading) {
        return (
            <section className="flex items-center justify-center h-screen bg-secondary-50">
                <Spinner />
            </section>
        );
    }

    if (isError) {
        return (
            <section className="flex items-center justify-center h-screen bg-secondary-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Dashboard</h2>
                    <p className="text-gray-600">Failed to load dashboard statistics. Please try again later.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-secondary-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-secondary-400 to-secondary-200 text-secondary-50 py-8">
                <CenteredContent>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
                        <p className="text-lg opacity-90">Monitor mothers and groups across Rwanda</p>
                    </div>
                </CenteredContent>
            </div>

            <CenteredContent>
                <div className="py-8 space-y-8">
                    {/* Quick Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="bg-white shadow-lg border-0">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">Total Mothers</CardTitle>
                                <Users className="h-4 w-4 text-secondary-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">{stats?.totalMothers || 0}</div>
                                <p className="text-xs text-gray-500">Registered mothers</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white shadow-lg border-0">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">Total Groups</CardTitle>
                                <MapPin className="h-4 w-4 text-secondary-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">{stats?.totalGroups || 0}</div>
                                <p className="text-xs text-gray-500">Active support groups</p>
                            </CardContent>
                        </Card>

                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* District Distribution Chart */}
                        <Card className="bg-white shadow-lg border-0">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-secondary-400" />
                                    Mothers by District
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {stats?.districtDistribution && stats.districtDistribution.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={stats.districtDistribution}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis
                                                dataKey="district"
                                                angle={-45}
                                                textAnchor="end"
                                                height={80}
                                                fontSize={12}
                                            />
                                            <YAxis fontSize={12} />
                                            <Tooltip />
                                            <Bar dataKey="count" fill="#8884d8" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="flex items-center justify-center h-64 text-gray-500">
                                        No district data available
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Group Membership Chart */}
                        <Card className="bg-white shadow-lg border-0">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-secondary-400" />
                                    Group Membership
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {stats?.groupMembership && stats.groupMembership.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={stats.groupMembership}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis
                                                dataKey="groupName"
                                                angle={-45}
                                                textAnchor="end"
                                                height={80}
                                                fontSize={10}
                                            />
                                            <YAxis fontSize={12} />
                                            <Tooltip />
                                            <Bar dataKey="memberCount" fill="#82ca9d" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="flex items-center justify-center h-64 text-gray-500">
                                        No group data available
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Detailed Tables */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* District Distribution Table */}
                        <Card className="bg-white shadow-lg border-0">
                            <CardHeader>
                                <CardTitle>District Distribution (Top 10)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {stats?.districtDistribution?.slice(0, 10).map((item, index) => (
                                        <div key={item.district} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-4 h-4 rounded-full"
                                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                                />
                                                <span className="font-medium">{item.district}</span>
                                            </div>
                                            <span className="font-bold text-primary">{item.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Group Membership Table */}
                        <Card className="bg-white shadow-lg border-0">
                            <CardHeader>
                                <CardTitle>Group Membership (Top 10)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {stats?.groupMembership?.slice(0, 10).map((item, index) => (
                                        <div key={item.groupId} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-4 h-4 rounded-full"
                                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                                />
                                                <div>
                                                    <span className="font-medium">{item.groupName}</span>
                                                    <p className="text-xs text-gray-500">{item.district}</p>
                                                </div>
                                            </div>
                                            <span className="font-bold text-primary">{item.memberCount}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="self-end">
                        <CustomButton variant='secondary'>
                            Export data
                        </CustomButton>
                    </div>
                </div>
            </CenteredContent>
        </section>
    );
} 