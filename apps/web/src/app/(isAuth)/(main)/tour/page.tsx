"use client";
import Link from "next/link";
import useSWR from "swr";
import { Button, Spinner } from "ui";
import React, { Fragment, useState } from 'react';
import { fetcherSWR } from "../../../../utils/fetch";

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
    const { data: dataComing, isLoading: isLoadComing } = useSWR('/tours/upcoming/', fetcherSWR)
    function formatDate(date: any) {
        let day = ("0" + date.getDate()).slice(-2);
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let year = date.getFullYear();
        return `${year}-${month}-${day}`;
    }

    function formatTime(date: any) {
        let hours = ("0" + date.getHours()).slice(-2);
        let minutes = ("0" + date.getMinutes()).slice(-2);
        return `${hours}:${minutes}`;
    }

    function formatDateTimeRange(start: any, end: any) {
        if (formatDate(start) === formatDate(end)) {
            return `${formatDate(start)} ${formatTime(start)}-${formatTime(end)}`;
        }
        return `${formatDate(start)} ${formatTime(start)} - ${formatDate(end)} ${formatTime(end)}`;
    }
    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8 font-custom mt-4">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Предстоящие экскурсии</h1>
                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            {isLoadComing ? <Spinner /> : <>
                                <table className="min-w-full">
                                    <thead className="bg-white">
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                                Дата и время
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Организация
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Кол.
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Направление
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Комментарий
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Номер
                                            </th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                                                <span className="sr-only">Изменить</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        <Fragment>
                                            <tr className="border-t border-gray-200">
                                            </tr>
                                            {dataComing && dataComing.map((person, personIdx) => (
                                                <tr
                                                    key={personIdx}
                                                    className={[personIdx === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t'].join(" ")}
                                                >
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                        {formatDateTimeRange(new Date(person.begin_datetime), new Date(person.end_datetime))}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.residents_info[0].name}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.guest_count}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.format}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.comment}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.client_info.phone}</td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                                    </td>
                                                </tr>
                                            ))}
                                        </Fragment>
                                    </tbody>
                                </table>
                            </>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
