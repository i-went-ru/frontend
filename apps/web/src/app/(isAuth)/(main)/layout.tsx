"use client";

import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useContext, useState } from "react";
import { Button, Footer, Header } from "ui";
import { AuthContext } from "../AuthContext";
import {UserIcon1} from "ui";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const {isAuthenticated, currentUser} = useContext(AuthContext)
    const { push } = useRouter();
    return (
        <>
            <Header links={[{ name: 'Предстоящие экскурсии', href: '#' },
            { name: 'Резиденты', href: '/residents' },
            { name: 'Обратная связь', href: '#' },]} LinkComponent={Link}>
{               !isAuthenticated ? <>
                    <Button variant="secondary" asChild={true}><Link href={"/auth/login"}>Вход</Link></Button>
                    <Button variant="default" asChild={true}><Link href={"/auth/register"}>Регистрация</Link></Button>
                </>
                :  <Button size="icon" onClick={() => {
                    if(currentUser.user_type === "guest"){
                        push("/guest/")
                    }else if(currentUser.user_type === "resident" || currentUser.user_type === "org"){
                        push("/admin/")
                    }
                }}><UserIcon1/></Button>}
            </Header>
            {children}

            <Footer LinkComponent={Link} links={[
                { name: 'Предстоящие экскурсии', href: '#' },
                { name: 'Резиденты', href: '/residents' },
                { name: 'Обратная связь', href: '#' },
            ]} />
        </>
    );
}
