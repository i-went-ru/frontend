"use client";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Button, Footer, Header, Input } from "ui";
import { fetcher } from "../../../utils/fetch";

interface Token {
  auth_token: string
}
export default function Page() {
  const { push } = useRouter();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetcher<Token>("/auth/token/login/", 'POST', {
        username: username,
        password: password,
      },)
      localStorage.setItem("token", response.auth_token)
      push("/")
    } catch (error: any) {
      toast.error('Пароль или логин не правильные', {
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
      { name: 'Резиденты', href: '#' },
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
              Вход
            </h2>
          </div>

          <div className="my-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-second px-6 py-12 shadow sm:rounded-lg sm:px-12">
              <form className="space-y-6" method="POST" onSubmit={onSubmit}>
                <Input variant="default" value={username} label="Никнейм" placeholder="" onChange={(e) => { setUsername(e.target.value) }} />
                <Input variant="default" password={true} value={password} label="Пароль" placeholder="" onChange={(e) => { setPassword(e.target.value) }} />
                {/* {data ? <p className="mt-2 text-sm font-custom text-red-600" id="email-error">
                                  ОШИБКА
                                </p> : <></>} */}
                <div>
                  <Button
                    type="submit"
                    variant="default"
                    size="wfull"
                  >Войти</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer LinkComponent={Link} links={[
        { name: 'Предстоящие экскурсии', href: '#' },
        { name: 'Резиденты', href: '#' },
        { name: 'Обратная связь', href: '#' },
      ]} />
    </div>
  );
}
