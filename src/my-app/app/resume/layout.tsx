import type { Metadata } from "next";
import "./main.css";
import "./print.css";
import "./resume.css";
import { ResumeStoreProvider } from "./ResumeStoreProvider";

export const metadata: Metadata = {
    title: "履歴書 V5",
    description: "Written by ggrtn",
};

export default function RedumeLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <ResumeStoreProvider>
                <div className="relative min-h-full antialiased">
                    <div className="bg-white">
                        <main>
                            {children}
                        </main>
                    </div>
                </div >
            </ResumeStoreProvider>
        </>
    );
}
