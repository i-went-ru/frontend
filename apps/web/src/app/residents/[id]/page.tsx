"use client";
import Link from "next/link";
import useSWR from "swr";
import { Button, CardResident1, Footer, Header, Input, SearchIcon, Select } from "ui";
import { fetcherSWR } from "../../../utils/fetch";

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
    const { data, error, isLoading } = useSWR<Resident>('/residents/' + id, fetcherSWR)
    if (isLoading) {
        return "Loading..."
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
            <div className="bg-[#EEEFF3] py-6">
                <div className="container ">
                    <div className="mx-auto py-6 font-custom">
                        <h2 className="text-xl tracking-tight text-black">Главная {'>'} резиденты {'>'} {data.name}</h2>
                        <h1 className="text-3xl font-bold tracking-tight text-black">{data.name}</h1>
                    </div>
                </div>
            </div>
            <div className="container sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
            </div>
            <Footer LinkComponent={Link} links={[
                { name: 'Предстоящие экскурсии', href: '#' },
                { name: 'Резиденты', href: '/residents' },
                { name: 'Обратная связь', href: '#' },
            ]} />
        </div>
    );
}
