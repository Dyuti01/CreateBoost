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
        {/* <div className="fixed top-0 z-[-2] h-screen w-screen dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-50 blur-[100px]"></div>
          </div> */}

        <div className="fixed inset-0 -z-10 h-full w-screen dark:bg-slate-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full dark:bg-violet-500 opacity-40 blur-[100px]"></div></div>

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
