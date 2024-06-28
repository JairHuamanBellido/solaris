import type { Metadata } from "next";
import { Play } from "next/font/google";
import "./globals.css";
import Providers from "@/components/provider";

const font = Play({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} filter-bg`}>
        <div className="w-screen h-screen relative bg-background/80 backdrop-blur-3xl">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
