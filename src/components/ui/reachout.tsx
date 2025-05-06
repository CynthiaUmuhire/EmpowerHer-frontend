import CustomButton from "./customButton"

export default function ReachOut() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between text-secondary-50 bg-primary-800 max-w-full mx-auto p-4 md:p-8">
            <div className="">
                <h1 className="font-bold mb-4">EmpowerHer</h1>
                <p className="text-lg mb-8">Supporting women through community and connection.</p>
            </div>
            <div className="flex flex-col gap-2 items-start ">
                <strong className="text-sm">Subscribe to our newsletter for the latest updates.</strong>
                <div className="flex gap-1 md:gap-3 justify-between items-center">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="border border-secondary-50 rounded px-4 py-2  focus:outline-none"
                        autoComplete="email"
                    />
                    <CustomButton variant={'secondary'} >
                        Subscribe
                    </CustomButton>
                </div>
            </div>
        </div>
    )
}