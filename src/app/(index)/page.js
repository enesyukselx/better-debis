"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Home() {
    const router = useRouter();
    const [session, setSession] = useState(null);

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleClick = () => {
        if (!emailRef.current.value || !passwordRef.current.value) {
            alert("Lütfen tüm alanları doldurun.");
        }

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        fetch("/api/login?username=" + email + "&password=" + password, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setSession(data);
                Cookies.set("session", data.cookie.split("=")[1]);
                router.push("/panel");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <h1 className="font-bold text-center text-2xl mb-5">
                    Better debis.deu
                </h1>
                <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                    <div className="px-5 py-7">
                        <label className="font-semibold text-sm text-gray-600 pb-1 block">
                            E-mail (@ogr.deu.edu.tr hariç)
                        </label>
                        <input
                            type="text"
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            ref={emailRef}
                        />
                        <label className="font-semibold text-sm text-gray-600 pb-1 block">
                            Şifre
                        </label>
                        <input
                            type="password"
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            ref={passwordRef}
                        />
                        <button
                            type="button"
                            className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            onClick={handleClick}
                        >
                            <span className="inline-block mr-2">Giriş yap</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-4 h-4 inline-block"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
