import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"

const carouselVariants = cva(
)

export interface CarouselProps
    extends React.HtmlHTMLAttributes<HTMLElement>,
    VariantProps<typeof carouselVariants> {
    slides: React.ReactElement[]
}

const Carousel = React.forwardRef<HTMLElement, CarouselProps>(
    ({ slides, className, ...props }, ref) => {
        const [curr, setCurr] = React.useState(0)
        const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))

        const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))


        return (
            <div className='overflow-hidden relative rounded-xl'>
                <div className='flex transition-transform ease-out duration-500' style={{ transform: `translateX(-${curr * 100}%)` }}>
                    {slides}
                </div>
                <div className="absolute inset-0 flex items-center justify-between p-4">
                    <button onClick={prev} className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'>
                        <ArrowLeftIcon />
                    </button>
                    <button onClick={next} className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'>
                        <ArrowRightIcon />
                    </button>
                </div>
                <div className='absolute bottom-4 right-0 left-0'>
                    <div className='flex items-center justify-center gap-2'>
                        {slides.map((s, i) => (
                            <div key={i} className={`transition-all w-1.5 h-1.5 bg-white rounded-full  ${curr === i ? "p-0.5" : "bg-opacity-50"}`} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
)
Carousel.displayName = "Button"

export { Carousel, carouselVariants }