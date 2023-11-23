"use client";
import Link from "next/link";
import useSWR from "swr";
import { Button, Floor } from "ui";
import React, { useState } from 'react';

interface Cabinet {
    id: number
    resident: number
    cabinet_number: number
    color: number
    path: number
}

export default function Page() {
    const [paths, setPaths] = useState([])
    const [markers, setMarkers] = useState([])
    return (
        <div>
            <div>
                <Button >
                    Добавить кабинет
                </Button>
                <Button className="ml-2">
                    Добавить маркер
                </Button>
            </div>
            <div>
            </div>
        </div>
    );
}
