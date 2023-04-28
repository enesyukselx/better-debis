"use client";
import { useState } from "react";

const Schedule = ({ data }) => {
    const [selected, setSelected] = useState(0);

    const days = [
        { name: "Pazartesi", value: 0, path: "monday", count: 0 },
        { name: "Salı", value: 1, path: "tuesday", count: 0 },
        { name: "Çarşamba", value: 2, path: "wednesday", count: 0 },
        { name: "Perşembe", value: 3, path: "thursday", count: 0 },
        { name: "Cuma", value: 4, path: "friday", count: 0 },
    ];

    return (
        <div>
            {days.map((day, index) => {
                return (
                    <button
                        key={index}
                        className={`${
                            selected === day.value
                                ? "bg-indigo-200 text-gray-800"
                                : "text-gray-500"
                        } px-2 py-1 md:px-4 md:py-2 rounded-md text-xs md:text-sm`}
                        onClick={() => setSelected(day.value)}
                    >
                        {day.name}
                    </button>
                );
            })}
            <div className="grid grid-cols-1 gap-2 mt-4">
                {data.map((item, index) => {
                    const selectedDay = days[selected].path;
                    const ders = item[selectedDay].split("-")[1];

                    if (item[selectedDay].trim() !== "") {
                        days[selected].count++;
                    }

                    return item[selectedDay].trim() !== "" ? (
                        <div
                            key={index}
                            className="bg-gray-200 px-4 py-2 rounded-md"
                        >
                            <div className="text-xs mb-1 text-slate-600 md:text-sm font-bold">
                                {item.time}
                            </div>

                            <div className="text-xs md:text-sm">
                                {ders.split(".")[0].slice(0, -1)}
                            </div>
                        </div>
                    ) : (
                        ""
                    );
                })}

                {days[selected].count === 0 ? (
                    <div className="bg-gray-200 px-4 py-2 rounded-md">
                        <div className="text-xs md:text-sm font-bold">
                            {days[selected].name} günü için ders bulunamadı.
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default Schedule;
