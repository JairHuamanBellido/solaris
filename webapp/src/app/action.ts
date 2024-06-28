"use server";

import { AuthenticationService } from "@/domain/service/AuthenticationService";
import { redirect } from "next/navigation";

export async function AuthenticationAction(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const auth = await AuthenticationService.auth({ username, password });

  if (auth.error) {
    return {
      error: true,
      errorMessage: "Invalid Credentials!",
    };
  }

  return redirect("/rooms");
}
