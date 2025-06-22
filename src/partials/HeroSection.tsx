import { Button } from "@/components/ui/button"

const HeroSection = () => {
    return (
        <section className="w-full h-screen flex flex-col items-center justify-center gap-10 bg-[#FFE3BB] text-[#2D4F2B]">
            <h1 className="text-5xl xl:text-8xl font-bold max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-5xl text-center">Healthy Meals, Anytime, Anywhere</h1>
            {/* description */}
            <span className="font-light text-3xl text-center">customizable healthy meal service with delivery all across Indonesia.</span>
            {/* cta */}
            <Button size={"lg"} className="bg-[#2D4F2B] hover:bg-[#708A58] text-2xl font-light">See Menu!</Button>
        </section>
    )
}

export default HeroSection