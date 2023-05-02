import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies.has('login');
  const isPathPasswordProtect = req.nextUrl.pathname.startsWith("/work");

  if (isLoggedIn && isPathPasswordProtect) {
    return NextResponse.redirect(new URL("/fullwork", req.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};