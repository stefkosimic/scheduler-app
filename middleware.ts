import { NextRequest, NextResponse } from "next/server";
import { i18nRouter } from "next-i18n-router";

import i18nConfig from "./i18nConfig";

export function middleware(request: NextRequest) {
  // For non-admin routes, handle internationalization routing
  return i18nRouter(request, i18nConfig);
}

// Middleware Configuration
// This tells Next.js which routes should trigger the middleware
export const config = {
  // Match all routes EXCEPT:
  // - API routes (/api/*)
  // - Static files (/static/*)
  // - Files with extensions (*.jpg, *.png, etc.)
  // - Next.js internal routes (/_next/*)
  // - Favicon
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico).*)"],
};
