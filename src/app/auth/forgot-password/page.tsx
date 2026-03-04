'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1000));
        setSent(true);
        setLoading(false);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
            <Card className="w-full max-w-md border-0 shadow-xl">
                <CardContent className="p-8">
                    <div className="text-center mb-8">
                        <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue mb-4">
                            <Mail className="h-6 w-6" />
                        </div>
                        <h1 className="text-2xl font-bold">Forgot Password?</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Enter your email and we will send you a reset link
                        </p>
                    </div>

                    {sent ? (
                        <div className="text-center">
                            <div className="bg-brand-green/10 rounded-lg p-6 mb-6">
                                <p className="text-sm text-brand-green font-medium">
                                    If an account exists with <strong>{email}</strong>, we have sent a password reset link.
                                    Please check your email inbox and spam folder.
                                </p>
                            </div>
                            <Link href="/auth/login">
                                <Button variant="outline" className="w-full">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Login
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1.5"
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-brand-saffron hover:bg-brand-saffron/90 text-white font-semibold"
                                size="lg"
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </Button>
                            <div className="text-center">
                                <Link href="/auth/login" className="text-sm text-brand-blue hover:underline">
                                    <ArrowLeft className="inline h-3 w-3 mr-1" />
                                    Back to Login
                                </Link>
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
