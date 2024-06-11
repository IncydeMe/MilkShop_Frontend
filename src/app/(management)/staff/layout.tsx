"use client";

import StaffSidebar from "@/components/shared/management/staff/staff-sidebar";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";


const montserrat = Montserrat({ subsets: ["latin"] });

export default function StaffLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body className={montserrat.className}>
            <main className="flex bg-[#FEFEFE]">
                <StaffSidebar />
                <section className="p-12">{children}</section>
            </main>
        </body>
      </html>
    );
  }