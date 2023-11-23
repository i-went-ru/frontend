"use client";
import Link from "next/link";
import useSWR from "swr";
import { Button, CardResident1, Footer, Header, Input, SearchIcon, Select } from "ui";
import { fetcherSWR } from "../../utils/fetch";

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
    const { data, error, isLoading } = useSWR<Resident[]>('/residents/', fetcherSWR)

    return (
        <div>
            <Header links={[{ name: 'Предстоящие экскурсии', href: '#' },
            { name: 'Резиденты', href: '#' },
            { name: 'Обратная связь', href: '#' },]} LinkComponent={Link}>
                <>
                    <Button variant="secondary" asChild={true}><Link href={"/auth/login"}>Вход</Link></Button>
                    <Button variant="default" asChild={true}><Link href={"/auth/register"}>Регистрация</Link></Button>
                </>
            </Header>
            <div className="bg-[#EEEFF3] py-6">
                <div className="container ">
                    <div className="mx-auto py-6 font-custom">
                        <h2 className="text-xl tracking-tight text-black">Главная {'>'} резиденты</h2>
                        <h1 className="text-3xl font-bold tracking-tight text-black">Резиденты</h1>
                    </div>
                </div>
            </div>
            <div className="container">
                <section aria-labelledby="filter-heading" className="border-t border-gray-200 pt-6">
                    <div className="flex items-center items-between">
                        <div className="relative inline-block text-left">
                            <div className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                <div className="flex items-end">
                                    <Input className="py-3" variant="iconleft" icon={{ position: "left", element: <SearchIcon /> }} value="" onChange={() => { }} label="" placeholder="Текст" />
                                    <Button className="ml-4 py-6" size="lg">Найти</Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-1 items-center justify-end gap-x-6">
                            <Select lists={[{ id: 0, value: "14:00" }, { id: 1, value: "15:00" }, { id: 2, value: "15:00" }]}
                                label={""}
                                valueSelect={{ id: 0, value: "14:00" }}
                                onChangeSelect={() => { }}
                            />
                        </div>
                    </div>
                </section>
                <div className="mt-8 grid grid-cols-4 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-2 lg:gap-x-8">
                    {isLoading ? "loading" : ""}
                    {!isLoading && data ? 
                    data.map((resident, index) => (
                        <CardResident1 name={resident.name} key={index}
                        image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                        labels={resident.tags} />
                    ))
                :""
                }
                </div>
            </div>
            <Footer LinkComponent={Link} links={[
                { name: 'Предстоящие экскурсии', href: '#' },
                { name: 'Резиденты', href: '#' },
                { name: 'Обратная связь', href: '#' },
            ]} />
        </div>
    );
}
