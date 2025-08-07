import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const publicRoutes = ["/", "/login"] // сюда доступ без авторизации

export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const { pathname, search } = request.nextUrl

  const isPublicRoute = publicRoutes.includes(pathname)

  // Если не авторизован и путь не публичный → редирект на /login
  if (!session && !isPublicRoute) {
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", pathname + search)
    return NextResponse.redirect(url)
  }

  // Если уже авторизован и зашел на /login → редирект на callbackUrl или /
  if (session && pathname === "/login") {
    const callback = request.nextUrl.searchParams.get("callbackUrl") || "/"
    return NextResponse.redirect(new URL(callback, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|css|js|json|txt|woff2|woff|ttf|eot)).*)',
  ],
}

