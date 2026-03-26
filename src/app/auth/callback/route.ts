import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const redirectTo = requestUrl.searchParams.get('redirect') || '/dashboard';

    if (code) {
        const cookieStore = await cookies();
        const response = NextResponse.redirect(new URL(redirectTo, requestUrl.origin));
        
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll();
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            // Set on the cookieStore in case of server-side operations
                            try {
                                cookieStore.set(name, value, options);
                            } catch (error) {
                                // Ignored
                            }
                            // Crucially, set on the response object to ensure it reaches the browser
                            response.cookies.set(name, value, options);
                        });
                    },
                },
            }
        );

        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            // Successfully exchanged code for session
            return response;
        }
    }

    // If something went wrong, redirect to login with error
    return NextResponse.redirect(new URL('/auth/login?error=auth_failed', requestUrl.origin));
}
