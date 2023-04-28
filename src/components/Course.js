import { cookies } from "next/headers";

async function getData(course, semester) {
    const cookieStore = cookies();
    //127.0.0.1:3000/api/course?session=ufg2boc0nvldru7hoinkh8h9fq&semester=284&course=B_DC _1_9563_18_1_

    const res = await fetch(
        process.env.API_URL +
            "course?session=" +
            cookieStore.get("session").value +
            "&semester=" +
            semester +
            "&course=" +
            course,
        {
            cache: "no-store",
        }
    );
    if (!res.ok) {
        throw new Error(`Could not fetch, received ${res.status}`);
    }
    return res.json();
}

const Course = async ({ value, text, semester }) => {
    const data = await getData(value, semester);
    const course = data.courseArr;
    console.log(data);

    return (
        <li
            className="py-2 px-2 font-light rounded-md mb-1 bg-gray-200 flex flex-wrap gap-1 text-xs"
            key={value}
        >
            <div className="w-full font-bold text-base mb-1">
                {text}
                {course.results.find(
                    (result) =>
                        result.name == "Yarıyıl Sonu Başarı Notu" ||
                        result.name == "Başarı Notu"
                ) && (
                    <span className={`inline-block ml-1 text-black font-light`}>
                        {
                            course.results.find(
                                (result) =>
                                    result.name == "Yarıyıl Sonu Başarı Notu" ||
                                    result.name == "Başarı Notu"
                            ).result
                        }
                    </span>
                )}
            </div>
            <div className="bg-slate-800 text-white px-1 py-2 rounded-md">
                <span className="font-bold">Öğretim görevlisi:</span>{" "}
                {course.professor}
            </div>
            <div className="bg-slate-800 text-white px-1 py-2 rounded-md">
                <span className="font-bold">Kredi:</span> {course.credit}
            </div>
            <div className="bg-slate-800 text-white px-1 py-2 rounded-md">
                <span className="font-bold">Ders Türü:</span> {course.type}
            </div>
            <div className="bg-slate-800 text-white px-1 py-2 rounded-md">
                <span className="font-bold">Devam Durumu:</span> {course.status}
            </div>
            {course.results.map((result) => {
                return (
                    <>
                        {result.name == "Vize" ||
                        result.name == "Final" ||
                        result.name == "Ödev" ||
                        result.name == "Quiz" ||
                        result.name == "Vize / Ödev" ? (
                            <>
                                {result.result !== "" && (
                                    <>
                                        <div className="bg-slate-800 text-white px-1 py-2 rounded-md">
                                            <span className=" font-bold">
                                                {result.name}
                                            </span>{" "}
                                            <span className="font-bold">
                                                Notunuz:{" "}
                                            </span>
                                            {result.result}{" "}
                                        </div>
                                        <div className="bg-slate-800 text-white px-1 py-2 rounded-md">
                                            <span className="font-bold">
                                                {result.name} Sınıf ortalaması:{" "}
                                            </span>
                                            {result.avarage}{" "}
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                {result.result !== "" && (
                                    <div className="bg-slate-800 text-white px-1 py-2 rounded-md">
                                        <span className="font-bold">
                                            {result.name}:{" "}
                                        </span>
                                        {result.result}
                                    </div>
                                )}
                            </>
                        )}
                    </>
                );
            })}
        </li>
    );
};

export default Course;
