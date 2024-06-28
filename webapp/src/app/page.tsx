import AuthForm from "@/components/form/auth-form";
import SolarisLogo from "@/components/icon/logo";
import { Heading2, ParagraphMuted } from "@/components/typography";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col items-stat justify-center ">
      <div className="w-[320px] mx-auto space-y-8">
        <SolarisLogo />
        <div>
          <Heading2 className="text-4xl font-normal border-none">
            Solaris
          </Heading2>
          <ParagraphMuted className="text-base">
            Welcome to Math Game
          </ParagraphMuted>
        </div>
        <AuthForm />
      </div>
    </main>
  );
}
