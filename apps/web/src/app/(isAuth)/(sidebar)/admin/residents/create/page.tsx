"use client";
import { useRouter } from 'next/navigation'
import { Button, Input, Select, } from "ui";
import { toast } from "react-toastify";
import { FormEvent, useState } from "react";
import { fetcher } from "../../../../../../utils/fetch";
import { XMarkIcon } from '@heroicons/react/20/solid';

const DirectionType = [
    { value: "ИТ", id: 0, key: "it" },
    { value: "Производство", id: 1, key: "production" },
    { value: "Энергоэффективность", id: 2, key: "energy_efficiency" },
    { value: "Биотехнологии", id: 3, key: "bio_technologies" },
    { value: "Строительство", id: 4, key: "building" },
]

export default function Page() {
    const { push } = useRouter();
    const [responsible, setResponsible] = useState(1)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [direction, setDirection] = useState(DirectionType[0])
    const [floor, setFloor] = useState(7)
    const [tags, setTags] = useState([])
    const [tag, setTag] = useState("")
    const [busy_days, setBusyDays] = useState([])
    const [free_days, setFreeDays] = useState([])

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await fetcher("/residents/", 'POST', {
                responsible: responsible,
                name: name,
                description: description,
                direction: direction.key,
                floor: floor,
                tags: tags,
                // busy_days: busy_days,
                // free_days: free_days
            },)
            push("/admin/residents")
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
                            Создание резидента
                        </h2>
                    </div>

                    <div className="my-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                        <div className="bg-second px-6 py-12 shadow sm:rounded-lg sm:px-12">
                            <form className="space-y-6" method="POST" onSubmit={onSubmit}>
                                <Input variant="default" value={name} label="Название" placeholder="" onChange={(e) => { setName(e.target.value) }} />
                                <Input variant="default" value={description} label="Описание" placeholder="" onChange={(e) => { setDescription(e.target.value) }} />
                                <Select lists={DirectionType} onChangeSelect={(direction) => {
                                    //@ts-ignore
                                    setDirection(direction)
                                }} valueSelect={direction} label='Направление' />
                                <div className='flex items-end'>
                                    <Input variant="default" value={tag} label="Теги" placeholder="" onChange={(e) => { setTag(e.target.value) }} />
                                    <Button className='mb-1.5 ml-1' type="button" onClick={() => {
                                        setTags([...tags, tag])
                                    }}>Добавить</Button>
                                </div>
                                <div className='px-2 pt-2 pb-11 mb-3 flex flex-wrap rounded-lg border-primary border-2 font-custom'>
                                    {tags.map((tag, index) => (
                                        <span key={index}
                                            className="flex flex-wrap pl-4 pr-2 py-2 m-1 justify-between items-center text-sm font-medium rounded-xl cursor-pointer  bg-secondary text-primary">
                                            {tag}
                                            <XMarkIcon className="h-5 w-5 ml-3" onClick={(e) => {
                                                e.preventDefault();
                                                console.log(tags.filter((tag1, index1) => index1 !== index))
                                                setTags(tags.filter((tag1, index1) => index1 !== index))
                                            }} />
                                        </span>
                                    ))}
                                </div>
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
