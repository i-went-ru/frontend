import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { ContextMenuCabinet } from "./contextMenu"

const cabinetVariants = cva(
)

interface Paths {
    d: string
    text?: string
    color: string
}

export interface CabinetProps
    extends React.HtmlHTMLAttributes<HTMLElement>,
    VariantProps<typeof cabinetVariants> {
    index: number
    path: Paths
    x: number
    y: number
    menu: React.ReactNode
    idCabinet: number
    click: () => void
}

const Cabinet = React.forwardRef<HTMLElement, CabinetProps>(
    ({ index, path, x, y, menu, idCabinet, click,...props }, ref) => {
        return (
            <React.Fragment>
                <ContextMenuCabinet idCabinet={idCabinet} menu={menu}>
                    <path id={`path-${index}`} d={path.d} fill={path.color} onClick={() => click()} className="hover:fill-blue-500 transition duration-150 ease-in-out" />
                </ContextMenuCabinet>
                <text x={x} y={y} fontSize="6" textAnchor="middle" dominantBaseline="central">
                    {path.text}
                </text>
            </React.Fragment>

        )
    }
)
Cabinet.displayName = "Cabinet"

export { Cabinet, cabinetVariants }
