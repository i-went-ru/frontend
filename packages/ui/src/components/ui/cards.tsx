import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const CardsVariants = cva(

)

interface StatsItem {
    id: number
    name: string
    value: string
}

export interface CardsProps
    extends React.HtmlHTMLAttributes<HTMLElement>,
    VariantProps<typeof CardsVariants> {
    stats: StatsItem[]
    label: string
    description: string
}

const Cards = React.forwardRef<HTMLElement, CardsProps>(
    ({ stats, className, label, description, ...props }, ref) => {
        return (
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:max-w-none">
                        <div className="text-center font-custom">
                            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">{label}</h2>
                            <p className="mt-4 text-lg leading-8 text-primary">
                               {description}
                            </p>
                        </div>
                        <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                            {stats.map((stat) => (
                                <div key={stat.id} className="flex flex-col bg-white p-8">
                                    <dt className="text-sm leading-6 text-black">{stat.name}</dt>
                                    <dd className="order-first text-3xl font-semibold tracking-tight text-black">{stat.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        )
    }
)
Cards.displayName = "Cards"

export { Cards, CardsVariants }