import { Salad, SquareActivity, Truck } from "lucide-react"

const FeatureSection = () => (
    <section className="w-full h-screen text-[#2D4F2B] flex flex-col items-center justify-evenly">
        <h1 className="font-bold text-5xl xl:text-7xl text-center">Our Services</h1>
        {/* grid view for displaying key features */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-3.5 px-20">
            <div className="border-2 border-[#2D4F2B] h-fit min-h-[200px] flex flex-col items-center justify-center gap-3.5 rounded-xl p-5 text-center">
                {/* icon */}
                <Salad size={100} />
                {/* title card */}
                <h1 className="text-2xl font-bold">Meal Customization</h1>
            </div>
            <div className="border-2 border-[#2D4F2B] h-fit min-h-[200px] flex flex-col items-center justify-center gap-3.5 rounded-xl p-5 text-center">
                {/* icon */}
                <Truck size={100} />
                {/* title card */}
                <h1 className="text-2xl font-bold">Delivery To Major Cities</h1>
            </div>
            <div className="border-2 border-[#2D4F2B] h-fit min-h-[200px] flex flex-col items-center justify-center gap-3.5 rounded-xl p-5 text-center">
                {/* icon */}
                <SquareActivity size={100} />
                {/* title card */}
                <h1 className="text-2xl font-bold">Detailed Nutrition Information</h1>
            </div>
        </div>
    </section>
)

export default FeatureSection