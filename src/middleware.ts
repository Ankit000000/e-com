import { NextRequest, NextResponse } from "next/server";
import dotenv from "dotenv";



export async function middleware(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    });
  }
}

function isAuthenticated(req: NextRequest) {
  const authHeader =
    req.headers.get("authorization") || req.headers.get("Authorization");

  if (authHeader == null) return false;

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  return (
    username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD
  );
}

export const config = {
  matcher: "/admin/:path*",
};
