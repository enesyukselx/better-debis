import Semesters from "@/components/Semesters";
import { cookies } from "next/headers";

async function getData() {
    const cookieStore = cookies();

    const res = await fetch(
        process.env.API_URL +
            "semesters?session=" +
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
    return (
        <div className="mt-5 rounded-md font-bold text-sm pb-4">
            <div className="bg-gray-100 px-4 py-4 rounded-md grid md:grid-cols-4 grid-cols-1 md:gap-3">
                <div className="col-span-1">
                    <Semesters data={data} />
                </div>
                <div className="col-span-3">{children}</div>
            </div>
        </div>
    );
}
