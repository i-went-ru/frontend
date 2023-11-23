"use client";
import { SketchPicker } from 'react-color';
import { useRouter } from 'next/navigation'
import { Button, Floor, Input, ListItem, Select, } from "ui";
import { toast } from "react-toastify";
import { FormEvent, useEffect, useState } from "react";
import * as ContextMenu from '@radix-ui/react-context-menu';
import { fetcher } from "../../../../../../../utils/fetch";

interface Resident {
    id: number
    responsible: number
    name: string
    description: string
    direction: string
    floor: number
    photos: string[]
    tags: string[]
    busy_days: string[]
    free_days: string[]
}

export default function Page({ params: { id } }: any) {
    const { push } = useRouter();
    const [cabinet_number, setCabinetNumber] = useState("")
    const [color, setColor] = useState("#000")
    const [path, setPath] = useState([])
    
    const handleColorChange = ({ hex }) => { setColor(hex) }



    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await fetcher(`/cabinets/${id}/`, 'PATCH', {
                cabinet_number: cabinet_number,
                color: color,
                path: path[0].d,
            },)
            push("/admin/floor")
        } catch (error: any) {
            toast.error('Ошибка создания резидента', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }
    }
    return (
        <div>
            <div className="container ">
                <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 my-12 rounded-3xl">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-black font-custom">
                           Изменение кабинета
                        </h2>
                    </div>

                    <div className="my-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                        <div className="bg-second px-6 py-12 shadow sm:rounded-lg sm:px-12">
                            <form className="space-y-6" method="POST" onSubmit={onSubmit}>
                                <Input variant="default" value={cabinet_number} label="Номер кабинета" placeholder="" onChange={(e) => { setCabinetNumber(e.target.value) }} />
                                <SketchPicker onChangeComplete={handleColorChange} color={color} />
                                <Floor markers={[]}
                                    paths={path}
                                    color={color}
                                    text={cabinet_number}
                                    markerRadius={2}
                                    isEditMarker={false}
                                    isEditResident={true}
                                    setPaths={setPath}
                                    className="w-full h-[500px]"
                                    menu={
                                        <>
                                         <ContextMenu.Label className="pl-[25px] text-xs leading-[25px] text-mauve11">
                            People
                        </ContextMenu.Label>
                        <ContextMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                            Удалить{' '}
                        </ContextMenu.Item>
                        <ContextMenu.Item
                            className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                        >
                            Редактировать{' '}
                        </ContextMenu.Item> 
                                        </>
                                    }
                                >
                                    <image href={"/floor7.svg"} x="0" y="0" width="400" height="400" />
                                </Floor>
                                <div>
                                    <Button
                                        type="submit"
                                        variant="default"
                                        size="wfull"
                                    >Изменить</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
