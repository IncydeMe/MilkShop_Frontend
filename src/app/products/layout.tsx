import UserHeader from "@/components/shared/user/user-header";
import UserFooter from "@/components/shared/user/user-footer";
import { Montserrat } from "next/font/google";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Cửa hàng sữa - Sản phẩm",
    description: "Cửa hàng sữa - Sản phẩm",
  };

const montserrat = Montserrat({ subsets: ["latin"] });

export default function ProductsLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <body className={montserrat.className}>
            <UserHeader />
            <main>{children}</main>
            <UserFooter />
        </body>
    );
}