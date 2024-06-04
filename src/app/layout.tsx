import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import UserHeader from "@/components/shared/user/user-header";
import UserFooter from "@/components/shared/user/user-footer";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cửa hàng sữa - Next.js App",
  description: "Cửa hàng sữa - Next.js App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <main>
          <UserHeader />
          {children}
          <UserFooter />
        </main>
      </body>
    </html>
  );
}
