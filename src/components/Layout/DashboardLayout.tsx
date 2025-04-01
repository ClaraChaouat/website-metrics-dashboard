import { ReactNode } from "react";

interface DashboardLayoutProps {
    children: ReactNode;
    title: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
    return (
        <>
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:p-4"
            >
                Skip to main content
            </a>

            <main className="min-h-screen bg-gray-100 p-6 font-sans" id="main-content">
                <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-32 max-w-none">
                    <h1 className="text-4xl font-bold leading-tight mb-6 text-center">
                        {title}
                    </h1>
                    {children}
                </div>
            </main>
        </>
    );
}
