import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const CardResident1Variants = cva(

)

export interface CardResident1Props
    extends React.HtmlHTMLAttributes<HTMLElement>,
    VariantProps<typeof CardResident1Variants> {
    name: string
    image: string
    labels: string[]
    description?: string
}

const CardResident1 = React.forwardRef<HTMLElement, CardResident1Props>(
    ({ className, name, image, labels, description, ...props }, ref) => {
        return (
            <div className="max-w-3xl mx-auto font-custom">
                <div className="flex flex-wrap bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="w-full lg:w-1/2 p-5 flex flex-col">
                        <div className="flex">
                            <img className='w-14 h-14 object-cover rounded-full' src={image} />
                            <h3 className="text-2xl font-medium text-gray-700 ml-4 mt-4">{name}</h3>
                        </div>
                        <p className="text-gray-600 mt-4">{description}</p>
                        <div className="mt-auto">
                            <div className="flex justify-between items-center mt-4">
                                {labels.map((label, index) => (
                                    <div className="text-xs text-blue-500 bg-blue-100 px-2 py-1 rounded" key={index}>
                                        {label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="h-24 w-full lg:h-auto lg:w-1/2">
                        <img src="https://placehold.co/600x400" alt="Placeholder image for content" className="h-full w-full object-cover" />
                    </div>
                </div>
            </div>
        )
    }
)
CardResident1.displayName = "CardResident1"

export { CardResident1, CardResident1Variants }