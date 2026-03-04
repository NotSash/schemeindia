import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

export default function PaymentFailurePage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
            <Card className="w-full max-w-lg border-0 shadow-xl text-center">
                <CardContent className="p-10">
                    <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-destructive/10 mb-6">
                        <XCircle className="h-10 w-10 text-destructive" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Payment Failed</h1>
                    <p className="text-muted-foreground mb-6">
                        We could not process your payment. Don&apos;t worry — your questionnaire data is saved and no amount has been deducted.
                    </p>

                    <div className="bg-muted/50 rounded-lg p-4 mb-6 text-sm text-left">
                        <p className="font-medium mb-2">Possible reasons:</p>
                        <ul className="space-y-1 text-muted-foreground">
                            <li>• Insufficient balance in your account</li>
                            <li>• Bank declined the transaction</li>
                            <li>• Network timeout during payment</li>
                            <li>• UPI app was not responding</li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link href="/payment">
                            <Button
                                size="lg"
                                className="w-full bg-brand-saffron hover:bg-brand-saffron/90 text-white font-semibold"
                            >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Try Again
                            </Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button variant="outline" className="w-full">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Go to Dashboard
                            </Button>
                        </Link>
                    </div>

                    <p className="text-xs text-muted-foreground mt-6">
                        If any amount was debited, it will be automatically refunded within 5-7 business days.
                        Need help? Contact <span className="font-medium">support@schemeindia.in</span>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
