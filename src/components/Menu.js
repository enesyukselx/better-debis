"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Menu = () => {
    const [selected, setSelected] = useState(-1);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setSelected(window.location.pathname === "/panel" ? 0 : 1);
        }
    }, []);

    return (
        <div className="grid grid-cols-2 gap-2 mt-4 font-bold">
            <Link
                href="/panel"
                className={`${
                    selected === 0 ? "bg-indigo-200" : "bg-gray-100"
                } p-2 rounded-md flex column justify-center text-xs md:text-md lg:text-sm`}
                onClick={() => setSelected(0)}
            >
                Ders Programı
            </Link>
            <Link
                href="/panel/notlar"
                className={`${
                    selected === 1 ? "bg-indigo-200" : "bg-gray-100"
                } p-2 rounded-md flex column justify-center text-xs md:text-md lg:text-sm`}
                onClick={() => setSelected(1)}
            >
                Notlarım
            </Link>
        </div>
    );
};

export default Menu;
