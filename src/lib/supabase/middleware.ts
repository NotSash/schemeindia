// ============================================================
// SchemeIndia — Supabase Auth Middleware Helper
// ============================================================

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
    const supabaseResponse = NextResponse.next({ request });

    // Skip auth if Supabase env vars are not configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (
        !supabaseUrl ||
        !supabaseAnonKey ||
        supabaseUrl === 'https://your-project.supabase.co' ||
        supabaseAnonKey === 'your_supabase_anon_key'
    ) {
        // Dev mode: allow all routes without auth
        return supabaseResponse;
    }

    let response = supabaseResponse;

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) =>
                    request.cookies.set(name, value)
                );
                response = NextResponse.next({ request });
                cookiesToSet.forEach(({ name, value, options }) =>
                    response.cookies.set(name, value, options)
                );
            },
        },
    });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const pathname = request.nextUrl.pathname;

    // Protected routes that require authentication
    const protectedRoutes = ['/questionnaire', '/payment', '/results', '/dashboard'];
    const adminRoutes = ['/admin'];
    const authRoutes = ['/auth/login', '/auth/signup', '/auth/forgot-password'];

    // Redirect to login if accessing protected routes without auth
    if (!user && protectedRoutes.some((route) => pathname.startsWith(route))) {
        const url = request.nextUrl.clone();
        url.pathname = '/auth/login';
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
    }

    // Redirect to login if accessing admin routes without auth
    if (!user && adminRoutes.some((route) => pathname.startsWith(route))) {
        const url = request.nextUrl.clone();
        url.pathname = '/auth/login';
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
    }

    // Redirect logged-in users from homepage to dashboard
    if (user && pathname === '/') {
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }

    // Redirect to dashboard if authenticated user tries to access auth routes
    if (user && authRoutes.some((route) => pathname.startsWith(route))) {
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }

    return response;
}
