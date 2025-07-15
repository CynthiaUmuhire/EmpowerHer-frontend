import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import TypeBadge from "./typeBadge";

type SupportGroupSummaryCardProps = {
    title: string;
    description: string;
    members: number;
    type: string;
}
export default function SupportGroupSummaryCard({ title, description, members, type }: SupportGroupSummaryCardProps) {
    return (
        <Card className="w-sm shrink-0 bg-secondary-50 gap-2 border-0 shadow-md hover:shadow-lg">
            <div className="mb-2 ml-6">
                <TypeBadge type={type} />
            </div>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <p className="font-light italic ">{members} members</p>
            </CardFooter>
        </Card>
    )
}