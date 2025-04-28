export default function TypeBadge({ type }: { type: string }) {
    const colorGenerator = () => {
        const colors = [
            "bg-blue-100 text-blue-800",
            "bg-green-100 text-green-800",
            "bg-red-100 text-red-800",
            "bg-yellow-100 text-yellow-800",
            "bg-purple-100 text-purple-800",
            "bg-pink-100 text-pink-800",
        ]
        return colors[Math.floor(Math.random() * colors.length)]
    }
    const colorClass = colorGenerator()
    return (
        <span className={`px-3 py-2  max-w-40 text-center rounded-full text-xs md:text-sm font-medium ${colorClass}`}>
            {type}
        </span>
    )
}