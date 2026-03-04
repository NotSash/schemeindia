import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, CreditCard, Receipt, Settings } from 'lucide-react';

export default function BillingPage() {
    return (
        <div className="min-h-screen bg-muted/30">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3 mb-8">
                    <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-2xl font-bold">Billing & Subscriptions</h1>
                </div>

                <div className="grid md:grid-cols-[250px_1fr] gap-8">
                    {/* Navigation Sidebar */}
                    <div className="space-y-2">
                        <Button variant="secondary" className="w-full justify-start">
                            <CreditCard className="mr-2 h-4 w-4" /> Plan Details
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <Receipt className="mr-2 h-4 w-4" /> Payment History
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <Settings className="mr-2 h-4 w-4" /> Payment Methods
                        </Button>
                    </div>

                    {/* Main Content Area */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Current Plan</CardTitle>
                                <CardDescription>Manage your subscription plan and billing cycle.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-4 bg-muted/50 rounded-lg border text-sm text-muted-foreground grid place-items-center min-h-[150px]">
                                    Billing and subscription management will be implemented here.
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
