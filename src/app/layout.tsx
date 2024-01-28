import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/Providers";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "readifyAI",
  description:
    "ReadifyAI - My AI-powered PDF sidekick. Make PDFs smarter with me: summarizing, annotating, and more. Just a fun project to make reading easier!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en" suppressHydrationWarning>
          <body className={inter.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </body>
          <Toaster position="bottom-center" />
        </html>
      </Providers>
    </ClerkProvider>
  );
}
