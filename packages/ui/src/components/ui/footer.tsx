import * as React from "react"
import { FileIcon, FilePlusIcon } from "@radix-ui/react-icons";
import logo from "../../../style/icons/logo.svg";
import { DocumentIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { cn } from "../../lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const footerVariables = cva(
)

interface NavigationLink {
    name: string
    href: string
}

export interface FooterProps
    extends React.HtmlHTMLAttributes<HTMLElement>,
    VariantProps<typeof footerVariables> {
    links: NavigationLink[]
    LinkComponent?: React.ElementType
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
    ({ className, LinkComponent = 'a', links, ...props }, ref) => {
        return (
            <footer className="bg-white">
                <div className="mx-auto w-full p-4 sm:p-6">
                    <div className="flex justify-between items-center">
                        <div className="mb-6 md:mb-0">
                            <LinkComponent href="/" className="flex items-center">
                                <img src={LinkComponent === 'a' ? logo : logo.src} className="h-12 mr-3"
                                    alt="Logo" />
                            </LinkComponent>
                        </div>
                        <div className="md:flex [&>*]:mr-4 mt-4">
                            {links.map((item) => (
                                <LinkComponent key={item.name} href={item.href} className="text-sm font-custom leading-6 text-black">
                                    {item.name}
                                </LinkComponent>
                            ))}
                        </div>
                        <div className="md:flex text-sm">
                            <div className="flex items-center mr-2 font-custom">
                                <DocumentIcon className="text-primary h-5 mr-2"/>
                                <LinkComponent href={"/"}>info@i-went.ru</LinkComponent>
                            </div>
                            <div className="flex items-center font-custom">
                                <PhoneIcon className="text-primary h-5 mr-2"/>
                                <LinkComponent href={"/"}>+7 (812) 804-21-23</LinkComponent>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <span className="text-sm text-gray-700 sm:text-center mt-8">Все права защищены. <LinkComponent href="/"
                            className="hover:underline">© 2023 iwent</LinkComponent>
                        </span>
                    </div>
                </div>
            </footer>
        )
    }
)
Footer.displayName = "Footer"

export { Footer, footerVariables }
