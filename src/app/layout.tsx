import type { Metadata } from "next";
import { spaceGrotesk, spaceMono } from "@/styles/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Redis Node Starter",
  description: "Get started with Redis and Node.js in seconds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
