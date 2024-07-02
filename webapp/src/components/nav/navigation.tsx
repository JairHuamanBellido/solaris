"use client";
import { useProfileStore } from "@/store";
import SolarisLogo from "../icon/logo";
import { Paragraph, ParagraphMuted } from "../typography";

export default function Navigation() {
  const { user } = useProfileStore();
  return (
    <nav className="h-16 px-8 w-full flex items-center justify-between">
      <SolarisLogo />
      <div className="mr-8">
        <div className="flex flex-col space-y-0">
          <Paragraph>{user.name}</Paragraph>
          <ParagraphMuted className="text-xs">{user.username}</ParagraphMuted>
        </div>
      </div>
    </nav>
  );
}
