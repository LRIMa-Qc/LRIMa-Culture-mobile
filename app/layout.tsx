import type { Metadata } from "next";
import "./globals.css";
import { Poppins as Font } from 'next/font/google';

const font = Font({
  weight: ['400', '500'],
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "AliveCulture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
