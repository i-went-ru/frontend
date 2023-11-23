"use client";
import Link from "next/link";
import useSWR from "swr";
import Image from "next/image";
import { SketchPicker } from 'react-color';
import { useRouter } from 'next/navigation'
import { Button, Floor, Input, ListItem, Marker, Select, } from "ui";
import { toast } from "react-toastify";
import { FormEvent, useEffect, useState } from "react";
import { fetcher, fetcherSWR } from "../../../../../../utils/fetch";
import * as ContextMenu from '@radix-ui/react-context-menu';

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

export default function Page() {
    const { push } = useRouter();
    const [color, setColor] = useState("#000")
    const [image, setImage] = useState("")
    const [markers, setMarkers] = useState<Marker[]>([])
    const handleColorChange = ({ hex }) => { setColor(hex) }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await fetcher("/map_photos/", 'POST', {
                x: markers[0].point.x,
                y: markers[0].point.y,
                color: color,
                image: image,
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
                            Добавить интерактив фото
                        </h2>
                    </div>
                    <div className="my-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                        <div className="bg-second px-6 py-12 shadow sm:rounded-lg sm:px-12">
                            <form className="space-y-6" method="POST" onSubmit={onSubmit}>
                                <Input variant="default" value={image} label="Изображение" placeholder="" onChange={(e) => { setImage(e.target.value) }} />
                                <SketchPicker onChangeComplete={handleColorChange} color={color} />
                                <Floor markers={markers}
                                    paths={[]}
                                    color={color}
                                    text={""}
                                    markerRadius={4}
                                    isEditMarker={true}
                                    isEditResident={false}
                                    setMarkers={setMarkers}
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
                                    >Создать</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
