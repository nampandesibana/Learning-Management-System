import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const dmSans =DM_Sans({
  subsets:["latin"],
  display:"swap",
  variable:"--font-dm-sans"
})

export const metadata: Metadata = {
  title: "Learning Management",
  description: "LMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html
      lang="en"
      className={cn(dmSans.className, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <div className="rootlayout"> {children}</div>
            <Toaster richColors closeButton />
        </Providers>
        </body>
    </html>
    </ClerkProvider>
  );
}
