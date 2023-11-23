"use client";
import Link from "next/link";
import useSWR from "swr";
import { SketchPicker } from 'react-color';
import { useRouter } from 'next/navigation'
import { Button, CardResident1, Footer, Header, Input, SearchIcon, Select } from "ui";
import { fetcher, fetcherSWR } from "../../../../../utils/fetch";
import { toast } from "react-toastify";
import { FormEvent, useState } from "react";
import SVGDrawing from "../../../../../components/SVGDrawing";


export default function Page() {
    const { push } = useRouter();
    const [name, setName] = useState("")
    const [cabinet_number, setCabinetNumber] = useState("")
    const [color, setColor] = useState("#000")
    const [path, setPath] = useState([])
    const handleColorChange = ({ hex }) => {setColor(hex)}

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await fetcher("/cabinets/", 'POST', {
                resident: {
                },
                cabinet_number: cabinet_number,
                color: color,
                path: path[0],
            },)
            push("/residents")
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
            <Header links={[{ name: 'Предстоящие экскурсии', href: '#' },
            { name: 'Резиденты', href: '/residents' },
            { name: 'Обратная связь', href: '#' },]} LinkComponent={Link}>
                <>
                    <Button variant="secondary" asChild={true}><Link href={"/auth/login"}>Вход</Link></Button>
                    <Button variant="default" asChild={true}><Link href={"/auth/register"}>Регистрация</Link></Button>
                </>
            </Header>
            <div className="container ">
                <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 my-12 rounded-3xl">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-black font-custom">
                            Создание резидента
                        </h2>
                    </div>

                    <div className="my-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                        <div className="bg-second px-6 py-12 shadow sm:rounded-lg sm:px-12">
                            <form className="space-y-6" method="POST" onSubmit={onSubmit}>
                                <Input variant="default" value={name} label="Резидент" placeholder="" onChange={(e) => { setName(e.target.value) }} />
                                <Input variant="default" value={cabinet_number} label="Номер кабинета" placeholder="" onChange={(e) => { setCabinetNumber(e.target.value) }} />
                                <SketchPicker  onChangeComplete={ handleColorChange }  color={color}/>
                                <SVGDrawing paths={path} setPaths={setPath} floor={7} color={color} text={cabinet_number}/>
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
            <Footer LinkComponent={Link} links={[
                { name: 'Предстоящие экскурсии', href: '#' },
                { name: 'Резиденты', href: '/residents' },
                { name: 'Обратная связь', href: '#' },
            ]} />
        </div>
    );
}
