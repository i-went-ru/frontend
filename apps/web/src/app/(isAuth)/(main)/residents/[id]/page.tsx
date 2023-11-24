"use client";
import Link from "next/link";
import useSWR from "swr";
import { Button, CardResident1, Footer, Header, Input, SearchIcon, Select, Spinner } from "ui";
import { fetcherSWR } from "../../../../../utils/fetch";
import Image from "next/image";

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
    responsible_info: ResponsibleInfo
}

interface ResponsibleInfo {
    full_name: string
    organization: string
    phone: string
}

export default function Page({ params: { id } }: any) {
    const { data, error, isLoading } = useSWR<Resident>('/residents/' + id, fetcherSWR)
    if (isLoading) {
        return <Spinner />
    }
    return (
        <div>
            <div className="bg-[#EEEFF3] py-6 font-custom">
                <div className="container ">
                    <main className="pb-8">
                        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                            <h1 className="sr-only">Page title</h1>
                            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
                                <div className="grid grid-cols-1 gap-4">
                                    <section aria-labelledby="section-2-title">
                                        <h2 className="sr-only" id="section-2-title">Section title</h2>
                                        <div className="overflow-hidden rounded-lg bg-white shadow">
                                            <div className="p-6">
                                                <Image src="/it-blank.png" width={400} height={400} alt="logo" />
                                                <div className="mt-6 border-t border-gray-100">
                                                    <dl className="divide-y divide-gray-100">
                                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className="text-sm font-medium leading-6 text-gray-900">Номер телефона</dt>
                                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data && data.responsible_info.phone}</dd>
                                                        </div>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                                    <section aria-labelledby="section-1-title">
                                        <div className="overflow-hidden rounded-lg bg-white shadow">
                                            <div className="p-6">
                                                <div className="px-4 sm:px-0">
                                                    <h3 className="text-base font-semibold leading-7 text-gray-900">О резиденте</h3>
                                                </div>
                                                <div className="mt-6 border-t border-gray-100">
                                                    <dl className="divide-y divide-gray-100">
                                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className="text-sm font-medium leading-6 text-gray-900">Название</dt>
                                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data && data.name}</dd>
                                                        </div>
                                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className="text-sm font-medium leading-6 text-gray-900">Этаж</dt>
                                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data && data.floor}</dd>
                                                        </div>
                                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className="text-sm font-medium leading-6 text-gray-900">Направление</dt>
                                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data && data.direction}</dd>
                                                        </div>
                                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className="text-sm font-medium leading-6 text-gray-900">Описание</dt>
                                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                {data && data.description}
                                                            </dd>
                                                        </div>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <div className="container sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
            </div>
        </div>
    );
}
