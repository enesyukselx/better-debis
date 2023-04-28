import "../globals.css";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const metadata = {
    title: "Better Debis",
    description: "Better Debis",
};

export default async function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-slate-900">{children}</body>
        </html>
    );
}
