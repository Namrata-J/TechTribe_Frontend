import "./globals.css";
import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import { ThemeRegistery } from "@/app/_theme/ThemeRegistery";

const montserrat = Montserrat({
  variable: "--font-montserrat",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["500"],    
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
        <ThemeRegistery>
        {children}
        </ThemeRegistery>
      </body>
    </html>
  );
}
