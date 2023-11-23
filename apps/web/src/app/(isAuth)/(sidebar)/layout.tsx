"use client";

import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useContext, useState } from "react";
import { Button, Footer, Header, Sidebar, Spinner } from "ui";
import { AuthContext } from "../AuthContext";
import { UserIcon1 } from "ui";
import { NavigationProvider } from "./NavigationContext";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { push } = useRouter();
    const { isAuthenticated, isLoading, setReset } = useContext(AuthContext);
    const [navigation, setNavigation] = useState([])
    if (isLoading) {
        return <Spinner/>
    }
    if (isAuthenticated === false) {
        push("/")
    }
    return (
        <NavigationProvider navigation={navigation} setNavigation={setNavigation}>
            <Sidebar navigations={navigation} logout={() => {
                localStorage.removeItem("token")
                setReset(true)
            }} LinkComponent={Link}>
                {children}
            </Sidebar>
        </NavigationProvider>
    );
}
