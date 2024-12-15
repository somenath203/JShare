import { Rubik } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

import "./globals.css";
import Navbar from "./_components/Navbar";


const rubik = Rubik({subsets: ['latin']});


export const metadata = {
  title: "JShare",
  description: "JShare: A platform for sharing and managing JSON data effortlessly.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>

      <html lang="en" suppressHydrationWarning>

        <body
          className={rubik.className}
        >
          
          <Navbar />

          <div className="max-w-4xl mx-auto px-4">

            {children}
          
          </div>

          <Toaster 
            richColors 
            position='bottom-center' 
            duration={6000}
          />

        </body>

      </html>

    </ClerkProvider>
  );
}
