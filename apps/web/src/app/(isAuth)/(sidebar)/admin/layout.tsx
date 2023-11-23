"use client";

import { useContext, useEffect } from "react";
import { NavigationContext } from "../NavigationContext";
import { ArrowsRightLeftIcon, ChartBarIcon, ChartPieIcon, UserGroupIcon, UserIcon, UsersIcon } from "@heroicons/react/20/solid";
import { EyeIcon } from "@heroicons/react/24/outline";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { setNavigation } = useContext(NavigationContext)
    useEffect(() => {
        setNavigation([
            { name: "Статистика", href: "/admin", current: true, icon: ChartBarIcon },
            { name: "Резиденты", href: "/admin/residents", current: true, icon: ChartPieIcon },
            { name: "Посетители", href: "/admin/residents", current: true, icon: UserGroupIcon },
            { name: "Интерактивная карта", href: "/admin/floor", current: true, icon: EyeIcon },
            { name: "Экскурсии", href: "/admin/tour", current: true, icon: ArrowsRightLeftIcon }])
    }, [])
    return (
        <>
            {children}
        </>
    );
}
