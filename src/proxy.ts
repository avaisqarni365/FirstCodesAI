import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  // TODO: Re-enable auth when database is connected
  // const token = await getToken({ req: request });
  // const isAuthPage = request.nextUrl.pathname.startsWith("/login");
  // const isApiAuth = request.nextUrl.pathname.startsWith("/api/auth");

  // if (isApiAuth) return NextResponse.next();
  // if (isAuthPage && token) return NextResponse.redirect(new URL("/dashboard", request.url));
  // if (!isAuthPage && !token) return NextResponse.redirect(new URL("/login", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth).*)",
  ],
};
