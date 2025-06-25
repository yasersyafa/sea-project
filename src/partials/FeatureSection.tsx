import { Salad, SquareActivity, Truck } from "lucide-react"

const FeatureSection = () => (
    <section className="w-full min-h-screen text-[#2D4F2B] flex flex-col items-center gap-5 justify-evenly py-20">
        <div className="space-y-5">
            <h1 className="font-bold text-5xl xl:text-7xl text-center">Our Services</h1>
            <p className="text-muted-foreground text-2xl text-center max-w-7xl">we provide more than just meals — we offer a complete, personalized catering experience. Our services are designed to fit your goals, schedule, and preferences, making healthy eating easier than ever.</p>
        </div>
        {/* grid view for displaying key features */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-3.5 px-20">
            <div className="border-2 border-[#2D4F2B] h-full hover:scale-105 bg-white transition-all min-h-[200px] flex flex-col items-center justify-center gap-3.5 rounded-xl p-5 text-center">
                {/* icon */}
                <Salad size={100} />
                {/* title card */}
                <h1 className="text-2xl font-bold">Meal Customization</h1>
                <p className="text-muted-foreground text-xl text-center">Choose meals that suit your taste, dietary needs, and lifestyle. From calorie-specific plans to vegetarian or protein-rich options, you are in full control of your daily menu.</p>
            </div>
            <div className="border-2 border-[#2D4F2B] h-full hover:scale-105 bg-white transition-all min-h-[200px] flex flex-col items-center justify-center gap-3.5 rounded-xl p-5 text-center">
                {/* icon */}
                <Truck size={100} />
                {/* title card */}
                <h1 className="text-2xl font-bold">Delivery To Major Cities</h1>
                <p className="text-muted-foreground text-xl text-center">We deliver fresh, ready-to-eat meals straight to your doorstep — now available in major cities across the country. Reliable, on-time, and always fresh.</p>
            </div>
            <div className="border-2 border-[#2D4F2B] h-full hover:scale-105 bg-white transition-all min-h-[200px] flex flex-col items-center justify-center gap-3.5 rounded-xl p-5 text-center">
                {/* icon */}
                <SquareActivity size={100} />
                {/* title card */}
                <h1 className="text-2xl font-bold">Detailed Nutrition Information</h1>
                <p className="text-muted-foreground text-xl text-center">Stay informed and in control of your health. Every meal comes with complete nutrition facts, including calories, macros, and ingredients — so you know exactly what you're eating.</p>
            </div>
        </div>
    </section>
)

export default FeatureSection