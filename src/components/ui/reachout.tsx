import CustomButton from "./customButton"

export default function ReachOut() {
    return (
        <div className="flex items-center justify-between  text-secondary-50 bg-primary-800 max-w-full mx-auto p-8">
            <div>
                <h1 className="text-4xl font-bold mb-4">EmpowerHer</h1>
                <p className="text-lg mb-8">Supporting women through community and connection.</p>
            </div>
            <div className="flex flex-col items-start">
                <strong className="text-sm mb-2">Subscribe to our newsletter for the latest updates.</strong>
                <div className=" flex gap-3 justify-center">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="border border-secondary-50 rounded px-4 py-2"
                    />
                    <CustomButton>
                        Subscribe
                    </CustomButton>
                </div>
            </div>
        </div>
    )
}