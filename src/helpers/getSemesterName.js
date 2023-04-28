import { cookies } from "next/headers";

async function getSemesters(slug) {
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

const getSemesterName = async (slug) => {
    const semestersData = await getSemesters(slug);
    const semesters = semestersData.semesters;
    const semester = semesters.find((semester) => semester.value === slug);

    return semester?.text + " Dönemi";
};

export default getSemesterName;
