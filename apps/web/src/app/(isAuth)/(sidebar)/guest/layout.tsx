"use client";

import { useContext, useEffect } from "react";
import { NavigationContext } from "../NavigationContext";
import { ArrowsRightLeftIcon, EyeIcon, UserIcon } from "@heroicons/react/20/solid";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { setNavigation } = useContext(NavigationContext)
    useEffect(() => {
        setNavigation([
            { name: "Интерактивная карта", href: "/guest/floor", current: true, icon: EyeIcon },
            { name: "Экскурсии", href: "/guest/tour", current: true, icon: ArrowsRightLeftIcon }])
    }, [])
    return (
        <>
            {children}
        </>
    );
}
