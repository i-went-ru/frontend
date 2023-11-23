"use client";
import Link from "next/link";
import useSWR from "swr";
import { Button, CardResident1, Floor, Footer, Header, Input, SearchIcon, Select } from "ui";
import { fetcherSWR } from "../../../../utils/fetch";
import React, { useState } from 'react';

interface Cabinet {
    id: number
    resident: number
    cabinet_number: number
    color: number
    path: number
}

export default function Page() {
    const { data, error, isLoading } = useSWR<Cabinet[]>('/cabinets/', fetcherSWR)
    const [paths, setPaths] = useState([])
    const [markers, setMarkers] = useState([])
    return (
        <div>
            <div className="bg-[#EEEFF3] py-6">
                <div className="container ">
                    <div className="mx-auto py-6 font-custom">
                    <h2 className="text-xl tracking-tight text-black">Главная {'>'} этажи</h2>
                        <h1 className="text-3xl font-bold tracking-tight text-black">7 Этаж</h1>
                    </div>
                </div>
            </div>
            <div>
                <Floor markers={markers}
                    paths={paths}
                    markerRadius={2}
                    isEditMarker={false}
                    isEditResident={false}
                    className="w-full h-[1024px]" 
                >
                    <image href={"./floor7.svg"} x="0" y="0" width="400" height="400"/>
                </Floor>
            </div>
        </div>
    );
}
