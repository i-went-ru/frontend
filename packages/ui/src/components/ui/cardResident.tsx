import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const CardResidentVariants = cva(

)

export interface CardResidentProps
    extends React.HtmlHTMLAttributes<HTMLElement>,
    VariantProps<typeof CardResidentVariants> {
    name: string
    image: string
    labels: string[]
}

const CardResident = React.forwardRef<HTMLElement, CardResidentProps>(
    ({ className, name, image, labels, ...props }, ref) => {
        return (
            <div className='rounded-md border border-slate-200 bg-white w-full max-w-lg h-36'>
                <div className='flex items-center px-5 py-3'>
                    <img className='w-14 h-14 object-cover rounded-full' src={image} />
                    <div className='mx-3'>
                        <p className='text-black  text-xl'>{name}</p>
                    </div>
                </div>
                <div className='px-5'>
                    <div className='my-2 flex flex-wrap -m-1'>
                        {labels.map((label, index) => (
                            <span key={index} className="m-1 bg-[#E8EDFF] hover:bg-gray-300 rounded-lg px-2 font-custom text-sm leading-loose cursor-pointer" >{label}</span>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
)
CardResident.displayName = "Card"

export { CardResident, CardResidentVariants }