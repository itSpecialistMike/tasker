// tasker/src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundBlur from "../components/BackgroundBlur";
import Header from "../components/Header";
import { DashboardProvider } from "@/context/DashboardContext";
import Footer from "@/components/Footer";
import { ModalProvider } from "@/context/ModalContext";
import { UserProvider } from "@/context/UserContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Tasker",
    description: "Manage your tasks efficiently with Tasker",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        {/* Добавляем классы flex, flex-col и min-h-screen, чтобы body стал flex-контейнером, растягивающимся на всю высоту */}
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <BackgroundBlur />
        <ModalProvider>
            <UserProvider>
            <DashboardProvider>
                <Header />
                <main className="flex-grow">
                    {children}
                </main>
            <Footer />
            </DashboardProvider>
            </UserProvider>
        </ModalProvider>
        </body>
        </html>
    );
}
