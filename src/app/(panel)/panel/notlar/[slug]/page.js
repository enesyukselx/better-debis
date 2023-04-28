import Courses from "@/components/Courses";
import getSemesterName from "@/helpers/getSemesterName";
import { cookies } from "next/headers";

async function getData(slug) {
    const cookieStore = cookies();

    const res = await fetch(
        process.env.API_URL +
            "courses?session=" +
            cookieStore.get("session").value +
            "&semester=" +
            slug,
        {
            cache: "no-store",
        }
    );
    if (!res.ok) {
        throw new Error(`Could not fetch, received ${res.status}`);
    }
    return res.json();
}

const Page = async ({ params }) => {
    const data = await getData(params.slug);
    const courses = data.courses;

    const errMessage = "Dönem bulunamadı!";

    return (
        <div>
            {courses.length > 0 ? (
                <>
                    <h1 className="mb-2 text-xl">
                        {getSemesterName(params.slug)}
                    </h1>
                    <Courses data={courses} semester={params.slug} />
                </>
            ) : (
                <p>{errMessage}</p>
            )}
        </div>
    );
};

export default Page;
