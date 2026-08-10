import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Carlos Daniel Pérego | Desarrollador Web",
  description:
    "Desarrollador Web en Paso de los Libres, Corrientes. Diseño y desarrollo de aplicaciones web, e-commerce y soluciones digitales.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-full flex flex-col font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
