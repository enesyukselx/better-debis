import Menu from "@/components/Menu";
import "../globals.css";
import { cookies } from "next/headers";

export const metadata = {
    title: "Better Debis",
    description: "Better Debis",
};

async function getData() {
    const cookieStore = cookies();

    const res = await fetch(
        process.env.API_URL +
            "info?session=" +
            cookieStore.get("session").value,
        {
            cache: "no-store",
        }
    );
    if (!res.ok) {
        throw new Error(`Could not fetch, received ${res.status}`);
    }
    return res.json();
}

export default async function RootLayout({ children }) {
    const data = await getData();
    const student = data.student;

    return (
        <html lang="en">
            <body className="w-full px-4 md:w-4/5 lg:w-2/3 md:p-0 m-auto mt-2 md:mt-10 text-slate-900 bg-blue-950">
                <h1 className="text-3xl font-bold text-slate-100">
                    Better Debis
                </h1>
                <p className="text-sm text-slate-100">
                    better debis.deu.edu.tr
                </p>
                <div className="bg-gray-100 mt-5 px-4 py-4 rounded-md font-bold text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 justify-between gap-1 text-center">
                        <div className="bg-gray-200 p-2 rounded-md flex column justify-center text-xs md:text-md lg:text-sm">
                            {student.name}
                        </div>
                        <div className="bg-gray-200 p-2 rounded-md flex column justify-center text-xs md:text-md lg:text-sm">
                            {student.department}
                        </div>
                        <div className="bg-gray-200 p-2 rounded-md flex column justify-center text-xs md:text-md lg:text-sm">
                            {student.number}
                        </div>
                        <div className="bg-gray-200 p-2 rounded-md flex column justify-center text-xs md:text-md lg:text-sm">
                            {student.year}
                        </div>
                        <div className="bg-gray-200 p-2 rounded-md flex column justify-center col-span-2 text-xs md:text-md lg:text-sm">
                            Danışman: {student.advisor}
                        </div>
                    </div>
                </div>
                <Menu />
                {children}
            </body>
        </html>
    );
}
