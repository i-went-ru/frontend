import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons"

const inputVariables = cva(
    "block w-full rounded-md border-0 py-2.5 font-custom text-gray-900 shadow-sm ring-1 focus:ring-2 focus:ring-inset ring-inset sm:text-sm sm:leading-6",
    {
        variants: {
            variant: {
                default:
                    "ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600",
                error:
                    "ring-red-300 placeholder:text-red-300 focus:ring-red-500",
                iconleft:
                    "ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 pl-10",
                iconright:
                    "ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 pr-10",  
            }
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

const positionVariables = cva(
    "absolute inset-y-0 right-0 flex items-center",
    {
        variants: {
            position: {
                left:
                    "left-0 pl-3",
                right:
                    "right-0 pr-3",
            },
        }
    },
)

interface Icon {
    element: React.ReactElement
    position: "left" | "right"
}

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariables> {
    placeholder?: string
    icon?: Icon
    errorMessage?: string
    label: string
    password?: boolean
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className,value, onChange, label = "Test", variant, password = false, errorMessage, placeholder = "team@i-went.ru", type, name, icon, id, ...props }, ref) => {
        const [visible,setVisible] = React.useState(false); //TODO optimize?
        return (
            <div ref={ref}>
                <label htmlFor={id} className="block text-sm font-medium font-custom leading-6 text-black">
                    {label}
                </label>
                <div className="relative mt-2">
                    <input
                        type={password ? (visible ? "text" : "password") : type}
                        name={name}
                        id={id}
                        value={value}
                        onChange={onChange}
                        className={cn(inputVariables({ className, variant }))}
                        placeholder={placeholder}
                    />
                    {password ? <div data-testid="eye-icon"
                    className={positionVariables({ position: "right", className: "hover:cursor-pointer" })}
                    onMouseDown={() => setVisible(true)}
                    onMouseUp={() => setVisible(false)}
                    onMouseLeave={() => setVisible(false)} 
                    >
                        {visible ? <EyeOpenIcon href="h-full"/>  :<EyeClosedIcon href="h-full"/> }
                    </div> : <></>}
                    {icon ? <div className={positionVariables({ position: icon?.position })}>
                        {icon.element}
                    </div> : <></>
                    }
                </div>
                {variant === "error" ? <p className="mt-2 text-sm font-custom text-red-600" id="email-error">
                   {errorMessage}
                </p> : <></>}
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input, inputVariables }