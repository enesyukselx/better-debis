import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

async function getData(request) {
    const session = request.cookies.get("session")?.value || "s";

    const res = await fetch(process.env.API_URL + "info?session=" + session, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error(`Could not fetch, received ${res.status}`);
    }
    return res.json();
}

export async function middleware(request) {
    const url = request.nextUrl.clone();

    if (
        url.pathname === "/panel" ||
        url.pathname === "/panel/notlar" ||
        url.pathname.match(/^\/panel\/notlar\/\w+$/)
    ) {
        const data = await getData(request);
        const student = data.student;

        if (student.name === "") {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    if (url.pathname === "/") {
        const session = request.cookies.get("session")?.value || "s";

        if (session !== "s") {
            const data = await getData(request);
            const student = data.student;

            if (student.name !== "") {
                return NextResponse.redirect(new URL("/panel", request.url));
            }
        }
    }
    return NextResponse.next();
}
