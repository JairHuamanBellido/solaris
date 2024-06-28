"use client";
import { useFormState } from "react-dom";
import SubmitButton from "../button/submit-button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AuthenticationAction } from "@/app/action";
import { ParagraphMuted } from "../typography";

export default function AuthForm() {
  const [state, action] = useFormState<any, FormData>(AuthenticationAction, {});
  return (
    <form action={action} className="flex flex-col space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm">
          Username
        </Label>
        <Input
          name="username"
          placeholder="jhon.doe"
          className="bg-transparent h-[44px] rounded-lg "
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm">
          Password
        </Label>
        <Input
          name="password"
          placeholder="******"
          type="password"
          className="bg-transparent h-[44px] rounded-lg "
        />
      </div>
      {state.error && (
        <ParagraphMuted className="text-destructive">
          {state.errorMessage}
        </ParagraphMuted>
      )}
      <SubmitButton classNames="w-full">Log In</SubmitButton>
    </form>
  );
}
