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
        setNavigation([{ name: "Статистика", href: "/admin", current: true, icon: UserIcon }, { name: "Резиденты", href: "/admin/residents", current: true, icon: UserIcon }, { name: "Интерактивная карта", href: "/admin/floor", current: true, icon: UserIcon }])
    }, [])
    return (
        <>
            {children}
        </>
    );
}
