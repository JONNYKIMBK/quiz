import Head from "next/head";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quiz - Kim",
  description: "Asking game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta name="google" content="notranslate" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
