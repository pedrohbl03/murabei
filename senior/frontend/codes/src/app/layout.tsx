import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { Container } from "@/components/Container";

// Change it to Google Fonts.
const geistSans = localFont({
  src: "../styles/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../styles/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Busca Livros",
  description: "Encontre livros facilmente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Container>
          {children}
        </Container>
      </body>
    </html>
  );
}
