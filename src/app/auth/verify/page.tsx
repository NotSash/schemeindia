'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, ArrowLeft, RefreshCw } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function VerifyPage() {
    const supabase = createClient();
    const [resending, setResending] = useState(false);
    const [resent, setResent] = useState(false);
    const [error, setError] = useState('');

    const handleResend = async () => {
        setResending(true);
        setError('');
        try {
            // Get the email from localStorage
            const userStr = localStorage.getItem('schemeindia_user');
            const email = userStr ? JSON.parse(userStr).email : null;

            if (!email) {
                setError('No email found. Please sign up again.');
                return;
            }

            const { error: resendError } = await supabase.auth.resend({
                type: 'signup',
                email,
            });

            if (resendError) {
                setError(resendError.message);
            } else {
                setResent(true);
                setTimeout(() => setResent(false), 5000);
            }
        } catch {
            setError('Failed to resend. Please try again.');
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
            <Card className="w-full max-w-md border-0 shadow-xl">
                <CardContent className="p-8 text-center">
                    <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue mb-6">
                        <Mail className="h-8 w-8" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Check Your Email</h1>
                    <p className="text-muted-foreground leading-relaxed">
                        We have sent a verification link to your email address. Please click the link in
                        the email to verify your account and get started.
                    </p>

                    {error && (
                        <div className="bg-destructive/10 text-destructive text-sm rounded-md p-3 mt-4">
                            {error}
                        </div>
                    )}

                    {resent && (
                        <div className="bg-brand-green/10 text-brand-green text-sm rounded-md p-3 mt-4">
                            ✓ Verification email resent! Please check your inbox.
                        </div>
                    )}

                    <div className="mt-6 flex flex-col gap-3">
                        <Button
                            variant="outline"
                            onClick={handleResend}
                            disabled={resending}
                        >
                            <RefreshCw className={`mr-2 h-4 w-4 ${resending ? 'animate-spin' : ''}`} />
                            {resending ? 'Resending...' : 'Resend Verification Email'}
                        </Button>
                        <Link href="/auth/login">
                            <Button variant="ghost" className="w-full">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Login
                            </Button>
                        </Link>
                    </div>

                    <p className="text-xs text-muted-foreground mt-4">
                        Did not receive the email? Check your spam folder or contact support@schemeindia.in
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
