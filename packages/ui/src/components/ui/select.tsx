import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

const selectVariables = cva(
)

interface ListItem {
    id: number
    value: string
}

export interface SelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariables> {
        lists: ListItem[]
        defaultId?: number
        label: string
        onChangeSelect: (value: ListItem) => void;
        valueSelect: ListItem
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, valueSelect, onChangeSelect, label, id, defaultId = 0, lists, ...props }, ref) => {
        return (
            <Listbox value={valueSelect} onChange={onChangeSelect}>
            {({ open }) => (
              <>
                <Listbox.Label className="block text-sm font-medium font-custom leading-6 text-gray-900">{label}</Listbox.Label>
                <div className="relative mt-2">
                  <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <span className="block truncate">{valueSelect.value}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Listbox.Button>
      
                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {lists.map((item) => (
                        <Listbox.Option
                          key={item.id}
                          className={({ active }) =>
                        [active ? 'bg-indigo-600 text-white' : 'text-gray-900','relative cursor-default select-none py-2 pl-3 pr-9'].join(" ")
                          }
                          value={item}
                        >
                          {({ selected, active }) => (
                            <>
                              <span className={[selected ? 'font-semibold' : 'font-normal', 'block truncate'].join(" ")}>
                                {item.value}
                              </span>
      
                              {selected ? (
                                <span
                                  className={[
                                    active ? 'text-white' : 'text-indigo-600',
                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                  ].join(" ")}
                                >
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        )
    }
)
Select.displayName = "Select"

export { Select, selectVariables }