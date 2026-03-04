import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    // TODO: Handle OAuth callback with Supabase when configured
    return NextResponse.redirect(new URL('/dashboard', requestUrl.origin));
}
