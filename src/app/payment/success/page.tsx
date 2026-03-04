'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, ArrowRight, Download, Mail, LayoutDashboard } from 'lucide-react';

export default function PaymentSuccessPage() {
    const [emailSent, setEmailSent] = useState(false);

    const handleDownloadPDF = () => {
        window.print();
    };

    const handleEmailReceipt = () => {
        setEmailSent(true);
        setTimeout(() => setEmailSent(false), 3000);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
            <Card className="w-full max-w-lg border-0 shadow-xl text-center">
                <CardContent className="p-10">
                    <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-brand-green/10 mb-6">
                        <CheckCircle2 className="h-10 w-10 text-brand-green" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
                    <p className="text-muted-foreground mb-6">
                        Thank you for your payment. Your personalised scheme report is now ready.
                    </p>

                    <div className="bg-muted/50 rounded-lg p-4 mb-6 text-sm">
                        <div className="flex justify-between mb-2">
                            <span className="text-muted-foreground">Payment ID</span>
                            <span className="font-mono font-medium">pay_demo_123456</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-muted-foreground">Plan</span>
                            <span className="font-medium">Detailed</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Amount</span>
                            <span className="font-medium">₹299</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link href="/results">
                            <Button
                                size="lg"
                                className="w-full bg-brand-saffron hover:bg-brand-saffron/90 text-white font-semibold"
                            >
                                View My Scheme Report
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full"
                            >
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                Go to Dashboard
                            </Button>
                        </Link>
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1" size="sm" onClick={handleDownloadPDF}>
                                <Download className="mr-2 h-4 w-4" /> Download PDF
                            </Button>
                            <Button variant="outline" className="flex-1" size="sm" onClick={handleEmailReceipt}>
                                <Mail className="mr-2 h-4 w-4" /> {emailSent ? '✓ Sent!' : 'Email Receipt'}
                            </Button>
                        </div>
                    </div>

                    {emailSent && (
                        <div className="mt-3 text-sm text-brand-green font-medium animate-in fade-in">
                            ✓ Receipt has been sent to your registered email address!
                        </div>
                    )}

                    <p className="text-xs text-muted-foreground mt-6">
                        A receipt has been sent to your email. You can access your report anytime from the{' '}
                        <Link href="/dashboard" className="text-brand-blue hover:underline">dashboard</Link>.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
