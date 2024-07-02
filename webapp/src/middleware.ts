import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserService } from "./domain/service/UserService";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.cookies.has("token")) {
    const getProfile = await UserService.getProfile();

    if (getProfile instanceof Error) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/rooms/:path*",
};
