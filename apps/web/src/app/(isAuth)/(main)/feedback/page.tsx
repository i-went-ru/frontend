"use client";
import Image from "next/image";
import Link from "next/link";
import { Button, CardResident, Cards, Carousel, Footer, Header, Input } from "ui";

export default function Page() {
    return (
        <div>
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
        </div >
    );
}
