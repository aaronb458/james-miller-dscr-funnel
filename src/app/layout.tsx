import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Jessen Cabinets | Premium Kitchen & Bath Design",
  description:
    "Transform your kitchen with solid wood cabinets and expert design consultation. Free design consultation included.",
  openGraph: {
    title: "Jessen Cabinets | Premium Kitchen & Bath Design",
    description:
      "Transform your kitchen with solid wood cabinets and expert design consultation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
