import Navigation from "@/components/nav/navigation";
import ZustandWrapper from "@/components/zustand/wrapper";
import { UserService } from "@/domain/service/UserService";
import { ReactNode } from "react";

async function getProfile() {
  const res = await UserService.getProfile();

  return res;
}
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getProfile();

  return (
    <>
      <Navigation />
      <ZustandWrapper user={user} />
      {children}
    </>
  );
}
