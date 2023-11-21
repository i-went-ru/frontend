import { useState } from 'react'
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import logo from "../../../style/icons/logo.svg";
import { cn } from "../../lib/utils"

const headerVariables = cva(
  "mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8",
)

interface NavigationLink {
  name: string
  href: string
}

export interface HeaderProps
  extends React.HtmlHTMLAttributes<HTMLElement>,
  VariantProps<typeof headerVariables> {
  links: NavigationLink[]
  LinkComponent?: React.ElementType
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, LinkComponent = 'a', links, ...props }, ref) => {
    // const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
      <header className="bg-white" ref={ref}>
        <nav className={cn(headerVariables({ className }))} aria-label="Global">
          <div className="flex lg:flex-1">
            <LinkComponent href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">IWent</span>
              <img className="h-8 w-auto" src={LinkComponent === 'a' ? logo : logo.src} />
            </LinkComponent>
          </div>
          <div className="lg:flex lg:gap-x-12">
            {links.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-custom leading-6 text-black">
                {item.name}
              </a>
            ))}
          </div>
          <div className="flex flex-1 items-center justify-end gap-x-6">
            {props.children}
          </div>
        </nav>
      </header>
    )
  }
)
Header.displayName = "Header"

export { Header, headerVariables }