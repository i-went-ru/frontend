"use client";
import Link from "next/link";
import { SketchPicker } from 'react-color';
import { useRouter } from 'next/navigation'
import { Button, Footer, Header, Input, Select } from "ui";
import { fetcher } from "../../../../../utils/fetch";
import { toast } from "react-toastify";
import { FormEvent, useState } from "react";
import SVGDrawing from "../../../../../components/SVGDrawing";


export default function Page() {
    const { push } = useRouter();
    const [responsible, setResponsible] = useState(1)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [direction, setDirection] = useState("")
    const [floor, setFloor] = useState(7)
    const [tags, setTags] = useState(["test"])
    const [busy_days, setBusyDays] = useState([{ "date": "2023-11-23" }])
    const [free_days, setFreeDays] = useState([{ "date": "2023-11-23" }])

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await fetcher("/residents/", 'POST', {
                responsible: responsible,
                name: name,
                description: description,
                direction: direction,
                floor: floor,
                tags: tags,
                // busy_days: busy_days,
                // free_days: free_days
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
                                <Input variant="default" value={name} label="Название" placeholder="" onChange={(e) => { setName(e.target.value) }} />
                                <Input variant="default" value={description} label="Описание" placeholder="" onChange={(e) => { setDescription(e.target.value) }} />
                                <Input variant="default" value={direction} label="Направление" placeholder="" onChange={(e) => { setDirection(e.target.value) }} />
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
