import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "School Docs - GoogleWorkspace + File Managements",
  description: "A modern document management system for schools, seamlessly integrated with Google Workspace. Organize, share, and collaborate on school documents with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default  function RootLayout({
  children,
  landing, 
}: Readonly<{ children: React.ReactNode, landing: React.ReactNode }>) {


  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <body className=" bg-gray-600 text-white">
        {children}
        </body>
    </html>
  );
}
