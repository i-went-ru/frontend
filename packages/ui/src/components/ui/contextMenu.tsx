import React, { ButtonHTMLAttributes, HtmlHTMLAttributes } from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { Http2SecureServer } from 'http2';
const contextMenuCabinetVariants = cva(
)

export interface ContextMenuCabinetProps
    extends React.HtmlHTMLAttributes<HTMLElement>,
    VariantProps<typeof contextMenuCabinetVariants> {
    //@ts-ignore
    menu: React.ReactHTMLElement
    idCabinet: number
}

const ContextMenuCabinet = React.forwardRef<HTMLElement, ContextMenuCabinetProps>(
    ({ menu, idCabinet, className, ...props }, ref) => {
        return (
            <ContextMenu.Root>
                <ContextMenu.Trigger asChild={true}>
                    {props.children}
                </ContextMenu.Trigger>
                <ContextMenu.Portal>
                    <ContextMenu.Content
                        className="min-w-[220px] bg-white rounded-md overflow-hidden p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                    >
                        {React.cloneElement(menu, { idCabinet })}
                    </ContextMenu.Content>
                </ContextMenu.Portal>
            </ContextMenu.Root>
        );
    }
)
ContextMenuCabinet.displayName = "ContextMenuCabinet"

export { ContextMenuCabinet, contextMenuCabinetVariants }



