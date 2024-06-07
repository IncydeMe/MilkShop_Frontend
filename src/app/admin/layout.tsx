import { Nunito } from "next/font/google";

import AdminHeader from "@/components/shared/admin/admin-header";
import AdminFooter from "@/components/shared/admin/admin-footer";
import Sidebar from "@/components/shared/admin/Sidebar";

const nunito = Nunito({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminHeader>
        <main className={`w-full p-4 ${nunito.className}`}>
          {children}
        </main>
      </AdminHeader>
      <AdminFooter />
    </>
  );
}
