import { Space_Grotesk, Space_Mono } from "next/font/google";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: "normal",
  variable: "--font-space-mono",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: "normal",
  variable: "--font-space-grotesk",
});

export { spaceMono, spaceGrotesk };
