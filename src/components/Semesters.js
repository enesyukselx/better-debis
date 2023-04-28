"use client";
import Link from "next/link";

const Semesters = ({ data }) => {
    const semesters = data.semesters;
    return (
        <div>
            <ul className="flex gap-1 md:block flex-wrap w-full mb-2 md:mb-0">
                {semesters.map((semester) => (
                    <li
                        className="w-full grid grid-cols-1"
                        key={semester.value}
                    >
                        <Link
                            className="flex md:text-sm md:w-full bg-gray-200 justify-center mb-[1px] md:mb-1 hover:bg-gray-300 px-1 py-1 text-xs rounded-md"
                            href={"/panel/notlar/" + semester.value}
                        >
                            {semester.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Semesters;
