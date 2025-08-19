import "./globals.css";
import ModalProvider from "@/components/ModalProvider";


export const metadata =  {
    title: "Lessn: Plan in minutes. Teach with focus.",
    description: "Learn faster. Teach better."
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
        <body className="font-nikkei bg-white text-gray-900">
        <ModalProvider>{children}</ModalProvider></body>
        </html>
    );
}
