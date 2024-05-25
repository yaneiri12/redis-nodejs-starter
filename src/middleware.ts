import { NextRequest } from "next/server";
import { updateSession } from "@/lib/session";

export async function middleware(request: NextRequest) {
  if (request.method !== "GET") {
    return;
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public/ (public files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
