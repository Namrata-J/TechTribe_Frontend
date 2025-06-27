import "./globals.css";
import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import { ReduxHydrator } from "@/components/ReduxHydrator";
import { CombinedProvider } from "@/providers/CombinedProvider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["500", "600", "700"],
  preload: true,
  subsets: ['latin']
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["500", "400", "300"],
  preload: true,
  subsets: ['latin']
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
          <ReduxHydrator />
          {children}
        </CombinedProvider>
      </body>
    </html>
  );
}
