"use client";

import { useContext, useEffect } from "react";
import { NavigationContext } from "../NavigationContext";
import { UserIcon } from "@heroicons/react/20/solid";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { setNavigation } = useContext(NavigationContext)
    useEffect(() => {
        setNavigation([{ name: "Экскурсия", href: "/guest/tour", current: true, icon: UserIcon }, { name: "Интерактивная карта", href: "/guest/floor", current: true, icon: UserIcon }, { name: "Программы", href: "/guest/program", current: true, icon: UserIcon }])
    }, [])
    return (
        <>
            {children}
        </>
    );
}
