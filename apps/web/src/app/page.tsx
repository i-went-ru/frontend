"use client";
import Image from "next/image";
import Link from "next/link";
import { Button, CardResident, Cards, Carousel, Footer, Header, Input } from "ui";

export default function Page() {
  return (
    <div>
      <Header links={[{ name: 'Предстоящие экскурсии', href: '#' },
      { name: 'Резиденты', href: '#' },
      { name: 'Обратная связь', href: '#' },]} LinkComponent={Link}>
        <>
          <Button variant="secondary">Вход</Button>
          <Button variant="default">Регистрация</Button>
        </>
      </Header>
      <div className="bg-[#f8f8f8]">
        <div className="container pt-12">
          <Carousel slides={[
            <Image
              key={0}
              alt="image 1"
              src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
            />,
            <Image
              key={1}
              src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
              alt="image 2"
            />,
            <Image
              key={2}
              src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
              alt="image 3"
            />,
          ]} />
          <Cards label="Технопарк в цифрах"
            description="Информация про ИТпарк"
            stats={[
              { id: 0, name: "Резидентов", value: "159" },
              { id: 1, name: "Партнеров", value: ">100" },
              { id: 2, name: "Выручка резидентов", value: "2 млрд." },
              { id: 3, name: "Площадь технопарка", value: "20 816м2" },
            ]} />
        </div>
      </div>
      <div className="container my-10">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-custom font-bold leading-7 text-black sm:truncate sm:text-3xl sm:tracking-tight">
              Деятельность резидентов
            </h2>
            <p className="mt-4 text-lg leading-8 font-custom  text-primary">
              Информация про ИТпарк
            </p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CardResident name="Биотехнологии" image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
            labels={["exposkils", "rum", "Моя профессия IT", "altan school"]} />
          <CardResident name="Произоводство" image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
            labels={["exposkils", "rum", "Моя профессия IT", "altan school"]} />
          <CardResident name="Строительноство" image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
            labels={["exposkils", "rum", "Моя профессия IT", "altan school"]} />
          <CardResident name="Транспорт" image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
            labels={["exposkils", "rum", "Моя профессия IT", "altan school"]} />
          <CardResident name="Информационные технологии" image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
            labels={["exposkils", "rum", "Моя профессия IT", "altan school"]} />
          <CardResident name="Дополнительное образование" image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
            labels={["exposkils", "rum", "Моя профессия IT", "altan school"]} />
        </div>
      </div>
      <div className="bg-[#f8f8f8]">
        <div className="container py-12">
          <div className="flex items-center">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-custom text-center font-bold leading-7 text-black sm:truncate sm:text-3xl sm:tracking-tight">
                Как записаться на экскурсию
              </h2>
              <p className="mt-4 text-lg font-custom text-center leading-8 text-primary">
                Информация про ИТпарк
              </p>
            </div>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {[0, 1, 2].map((id) => (
              <article
                key={id}
                className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
              >
                <Image src={"https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80"} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                  <div className="-ml-4 flex items-center gap-x-4">
                    <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <div className="flex gap-x-2.5">
                      Максим Михайлов
                    </div>
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                  <a href="#">
                    <span className="absolute inset-0" />
                    SmartOM
                  </a>
                </h3>
              </article>
            ))}
          </div>
          <div>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-primary my-12 rounded-3xl">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-white font-custom">
                  Остались вопросы? Свяжись с нами!
                </h2>
              </div>

              <div className="my-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                  <form className="space-y-6" action="#" method="POST">
                    <Input variant="default" value="" label="Почта" placeholder="Напишите вашу почту" onChange={() => { }} />
                    <Input variant="default" value="" label="Почта" placeholder="Напишите вашу почту" onChange={() => { }} />
                    <Input variant="default" value="" label="Почта" placeholder="Напишите вашу почту" onChange={() => { }} />
                    <div>
                      <Button
                        type="submit"
                        variant="default"
                        size="wfull"
                      >Отправить</Button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer LinkComponent={Link} links={[
        { name: 'Предстоящие экскурсии', href: '#' },
        { name: 'Резиденты', href: '#' },
        { name: 'Обратная связь', href: '#' },
      ]} />
    </div >
  );
}
