import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { Button } from "./button"
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon } from "@heroicons/react/24/outline"

const streetView2DVariants = cva(
)


export interface streetView2DProps
    extends React.HtmlHTMLAttributes<HTMLElement>,
    VariantProps<typeof streetView2DVariants> {
    leftClick: () => void
    rightClick: () => void
    forwardClick: () => void
    backClick: () => void
    // leftLabel: string
    // rightLabel: string
}

const StreetView2D = React.forwardRef<HTMLElement, streetView2DProps>(
    ({ className, color, leftClick, forwardClick, backClick, rightClick, ...props }, ref) => {
        return (
            <div className='overflow-hidden relative rounded-xl max-w-xs'>
                <div className='flex justify-center relative'>
                    {props.children}
                </div>
                <div className="absolute inset-0 flex  items-center justify-between p-4">
                    <div className="flex items-center justify-between">
                        <button onClick={() => { }} className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'>
                            <ArrowLeftIcon className="h-4" onClick={leftClick} />
                        </button>
                        <button onClick={() => { }} className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'>
                            <ArrowRightIcon className="h-4" onClick={rightClick} />
                        </button>
                    </div>
                    <div className="flex flex-col justify-between items-center">
                        <button onClick={forwardClick} className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'>
                            <ArrowUpIcon className="h-4" />
                        </button>
                        <button onClick={backClick} className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'>
                            <ArrowDownIcon className="h-4" />
                        </button>
                    </div>

                </div>

            </div>
        )
    }
)
StreetView2D.displayName = "StreetView2D"

export { StreetView2D, streetView2DVariants }