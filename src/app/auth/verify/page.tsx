import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Mail } from 'lucide-react';

export const metadata: Metadata = { title: 'Verify Your Account' };

export default function VerifyPage() {
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
                    <p className="text-xs text-muted-foreground mt-4">
                        Did not receive the email? Check your spam folder or contact support@schemeindia.in
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
