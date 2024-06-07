import UserHeader from "@/components/shared/user/user-header";
import UserFooter from "@/components/shared/user/user-footer";

export default function ProductsLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <UserHeader />
            {children}
            <UserFooter />
        </main>
    );
}