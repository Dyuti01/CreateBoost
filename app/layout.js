import { Inter } from "next/font/google";
import "./globals.css";
import UserDataProvider from "@/store/dataStore";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CreateBoost - Fund your creativity !",
  description: "This website is a crowdfunding website for creators.",
};

import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="fixed inset-0 -z-10 h-full w-screen dark:bg-slate-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        </div>

        <div className="absolute inset-0 -z-10 h-full w-full dark:bg-slate-800 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
    
        <UserDataProvider>
          <Navbar />
          <div className="min-h-[700px] overflow-x-hidden">
            {children}
          </div>
          <Footer/>
        </UserDataProvider>

      </body>
    </html>
  );
}
