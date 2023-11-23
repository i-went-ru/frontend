"use client";
import { useRouter } from 'next/navigation'
import { Button, Input, ListItem, Select, } from "ui";
import { toast } from "react-toastify";
import { FormEvent, useEffect, useState } from "react";
import { fetcher, fetcherSWR } from "../../../../../../utils/fetch";
import useSWR from 'swr';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const FormatTour = [
    { value: "Обзорная экскурция", key: "overwiew", id: 0 },
    { value: "Образовательная экскурция", key: "education", id: 1 },
    { value: "Экспрозиционные мероприятия", key: "exhibition", id: 2 },
    { value: "Бизнес-тур для инвестеров", key: "buisiness", id: 3 },
    { value: "Профильные", key: "profile", id: 4 }
]

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
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const { data, isLoading } = useSWR<Resident[]>("/residents/", fetcherSWR)
    const [comment, setComment] = useState("")
    const [format, setFormnat] = useState(FormatTour[0])
    const [lists, setLists] = useState<ListItem[]>([])
    const [listCurrent, setListCurrent] = useState<ListItem>(null)
    useEffect(() => {
        if (data) {
            const newLists = data.map(resident => ({
                value: resident.name,
                id: resident.id
            }));
            setLists(newLists);
            if (newLists.length > 0) {
                setListCurrent(newLists[0]);
            }
        }
    }, [data]);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await fetcher("/tours/", 'POST', {
                begin_datetime: startDate.toISOString(),
                end_datetime: endDate.toISOString(),
                guest_count: 1,
                status: "sended",
                format: format.key,
                comment: comment,
                residents: [listCurrent.id],
                client: data.filter((r) => r.id === listCurrent.id)[0].responsible
            },)
            push("/admin/tour")
        } catch (error: any) {
            toast.error('Ошибка создания экскурсии', {
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
                            Создание экскурсии
                        </h2>
                    </div>

                    <div className="my-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                        <div className="bg-second px-6 py-12 shadow sm:rounded-lg sm:px-12">
                            <form className="space-y-6" method="POST" onSubmit={onSubmit}>
                                {data && listCurrent && <Select lists={lists} onChangeSelect={(item) => { setListCurrent(item) }} valueSelect={listCurrent} label="Резидент" placeholder="" />}
                                <Select lists={FormatTour} onChangeSelect={(format) => {
                                    //@ts-ignore
                                    setFormnat(format)
                                }} valueSelect={format} label='Формат' />
                                <div>
                                    <label className="block text-sm font-medium font-custom leading-6 text-black">
                                        Дата проведения
                                    </label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="time"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium font-custom leading-6 text-black">
                                        Дата окончания
                                    </label>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="time"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                    />
                                </div>
                                <Input variant="default" value={comment} label="Комментарий" placeholder="" onChange={(e) => { setComment(e.target.value) }} />
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
