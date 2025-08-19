import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // For Vercel Edge Functions, we'll use a simpler approach
  // that doesn't require the supabase middleware import
  
  // Get the pathname from the request
  const { pathname } = request.nextUrl
  
  // Allow all requests to pass through
  // This maintains the same behavior as the original middleware
  // but without the problematic supabase import
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/proxy (proxy API route)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|api/proxy|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}