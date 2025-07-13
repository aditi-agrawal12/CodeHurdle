import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import clsx from "clsx";
import "./globals.css";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import SmoothScrollerWrapper from "@/components/SmoothScrollerWrapper";
import { Toaster } from "sonner";

const dmSans = DM_Sans({
  variable: "--font-DM_Sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeHurdle",
  description: "Level-Up your Problem-Solving",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(dmSans.className, "antialiased")}>

          <ThemeContextProvider>
            <ThemeProvider>
              {children}
              <Toaster position="top-right" richColors />
            </ThemeProvider>
          </ThemeContextProvider>

      </body>
    </html>
  );
}
