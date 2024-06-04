import UserFooter from "@/components/shared/user/user-footer";
import UserHeader from "@/components/shared/user/user-header";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <UserHeader />
      <main className="min-h-screen">
        <h1>Home</h1>
      </main>
      <UserFooter />
    </>
  );
}
