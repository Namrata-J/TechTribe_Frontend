import "./globals.css";
import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import { CombinedProvider } from "@/providers/CombinedProvider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["500", "600", "700"], 
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["500", "400", "300"],    
});

export const metadata: Metadata = {
  title: "TechTribe - a social app",
  description: "A place where deveopers can connect",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${poppins.variable}`}>
        <CombinedProvider>
        {children}
        </CombinedProvider>
      </body>
    </html>
  );
}
