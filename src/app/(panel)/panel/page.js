import Schedule from "@/components/Schedule";

import { cookies } from "next/headers";

async function getData() {
    const cookieStore = cookies();

    const res = await fetch(
        process.env.API_URL +
            "schedule?session=" +
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

const Page = async () => {
    const data = await getData();
    return (
        <div className="mt-5 rounded-md font-bold text-sm pb-4">
            <div className="bg-gray-100 px-4 py-4 rounded-md">
                <Schedule data={data.courses} />
            </div>
        </div>
    );
};

export default Page;
