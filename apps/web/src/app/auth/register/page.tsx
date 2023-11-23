"use client";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Button, Footer, Header, Input } from "ui";
import { fetcher } from "../../../utils/fetch";

enum Type {
    guest = "guest",
    org = "org",
    school = "school",
    not = "not"
}
export default function Page() {
    const { push } = useRouter();
    const [type, setType] = useState<Type>(Type.not)
    const [username, setUsername] = useState("")
    const [fio, setFio] = useState("")
    const [org, setOrganization] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (type === Type.not) {
            toast.error('Вы не выбрили тип', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }
        if (password !== confirmPassword) {
            toast.error('Пароли не совпадают', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }
        try {
            await fetcher("/auth/users/", 'POST', {
                user_type: type,
                full_name: fio,
                organization: org,
                username: username,
                password: password,
                phone: phone,
            },)
            push("/auth/login")
        } catch (error: any) {
            toast.error('Ошибка создания пользователя', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }
    }

    return (
        <div>
            <Header links={[{ name: 'Предстоящие экскурсии', href: '#' },
            { name: 'Резиденты', href: '/residents' },
            { name: 'Обратная связь', href: '#' },]} LinkComponent={Link}>
                <>
                    <Button variant="secondary" asChild={true}><Link href={"/auth/login"}>Вход</Link></Button>
                    <Button variant="default" asChild={true}><Link href={"/auth/register"}>Регистрация</Link></Button>
                </>
            </Header>
            <div className="container ">
                <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 my-12 rounded-3xl">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-black font-custom">
                            Регистрация
                        </h2>
                    </div>

                    <div className="my-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                        <div className="bg-second px-6 py-12 shadow sm:rounded-lg sm:px-12">
                            <form className="space-y-6" method="POST" onSubmit={onSubmit}>
                                <Input variant="default" value={username} label="Никнейм" placeholder="" onChange={(e) => { setUsername(e.target.value) }} />
                                <Input variant="default" value={fio} label="ФИО" placeholder="" onChange={(e) => { setFio(e.target.value) }} />
                                <Input variant="default" value={org} label="Организация" placeholder="" onChange={(e) => { setOrganization(e.target.value) }} />
                                <Input variant="default" value={phone} label="Номер телефона" placeholder="" onChange={(e) => { setPhone(e.target.value) }} />
                                <Input variant="default" password={true} value={password} label="Пароль" placeholder="" onChange={(e) => { setPassword(e.target.value) }} />
                                <Input variant="default" password={true} value={confirmPassword} label="Повтор пароля" placeholder="" onChange={(e) => { setConfirmPassword(e.target.value) }} />
                                <div className="flex justify-center">
                                    <div className="flex [&>*]:mr-1">
                                        <Button
                                            variant="secondary"
                                            size="default"
                                            type="button"
                                            onClick={() => setType(Type.guest)}
                                        >Посетитель</Button>
                                        <Button
                                            variant="secondary"
                                            size="default"
                                            type="button"
                                            onClick={() => setType(Type.org)}
                                        >Организация</Button>
                                        <Button
                                            variant="secondary"
                                            size="default"
                                            type="button"
                                            onClick={() => setType(Type.school)}
                                        >Делегация</Button>
                                    </div>
                                </div>
                                {/* {data ? <p className="mt-2 text-sm font-custom text-red-600" id="email-error">
                                  ОШИБКА
                                </p> : <></>} */}
                                <div>
                                    <Button
                                        type="submit"
                                        variant="default"
                                        size="wfull"
                                    >Регистрация</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer LinkComponent={Link} links={[
                { name: 'Предстоящие экскурсии', href: '#' },
                { name: 'Резиденты', href: '/residents' },
                { name: 'Обратная связь', href: '#' },
            ]} />
        </div>
    );
}
