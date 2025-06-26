export default function TypeBadge({ type, variant }: { type: string, variant?: 'warning' | 'info' | 'success' | 'destructive' }) {
    const colorGenerator = () => {
        const colors = [
            "bg-blue-100 text-blue-800",
            "bg-green-100 text-green-800",
            "bg-orange-100 text-orange-800",
            "bg-yellow-100 text-yellow-800",
            "bg-purple-100 text-purple-800",
            "bg-pink-100 text-pink-800",
        ]
        if (variant) {
            switch (variant) {
                case 'warning':
                    return 'bg-yellow-100 text-yellow-800';
                case 'info':
                    return "bg-purple-100 text-purple-800";
                case 'success':
                    return 'bg-green-100 text-green-800';
                case 'destructive':
                    return 'bg-red-100 text-red-800';
                default:
                    return 'bg-gray-100 text-gray-800';
            }
        }

        return colors[Math.floor(Math.random() * colors.length)]
    }
    const colorClass = colorGenerator()
    return (
        <span className={`px-3 py-2  max-w-40 text-center rounded-full text-xs md:text-sm font-medium ${colorClass}`}>
            {type}
        </span>
    )
}