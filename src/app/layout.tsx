import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundBlur from "../components/BackgroundBlur";
import Header from "../components/Header";
import { DashboardProvider } from "@/context/DashboardContext";
import Footer from "@/components/Footer";
import { ModalProvider } from "@/context/ModalContext";
import { UserProvider } from "@/context/UserContext";
import { ReactQueryProvider } from "@/lib/react-query-provider"; // 👈 добавили

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
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <BackgroundBlur />
        <ReactQueryProvider>
            <ModalProvider>
                <UserProvider>
                    <DashboardProvider>
                        <Header />
                        <main className="flex-grow">{children}</main>
                        <Footer />
                    </DashboardProvider>
                </UserProvider>
            </ModalProvider>
        </ReactQueryProvider>
        </body>
        </html>
    );
}
