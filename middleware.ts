import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verificar se é uma rota de médico
  if (pathname.startsWith("/doctor/")) {
    const doctorId = pathname.split("/")[2];

    // Se não há doctorId na URL, redirecionar para login
    if (!doctorId || doctorId === "login") {
      return NextResponse.next();
    }

    // Verificar se há token de sessão
    const sessionToken = request.cookies.get("session-token")?.value;

    if (!sessionToken) {
      const loginUrl = new URL("/doctor/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/doctor/:path*"],
};
