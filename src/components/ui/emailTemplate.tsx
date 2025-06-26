export default function EmailTemplate({ name, email }: { name: string, email: string }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Hello dear sir/madam</h1>
            <p className="text-gray-700 mb-4">An adolescent mother with the names {name} wants to interact with you!</p>
            <p className="text-gray-700 mb-4">This is their email you can continue conversation with them <strong>{email}</strong></p>
        </div>
    )
}