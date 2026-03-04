'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    LayoutDashboard,
    FileText,
    User,
    Clock,
    ArrowRight,
    RefreshCw,
    MessageSquare,
    Settings,
    LogOut,
    CreditCard,
    CheckCircle2,
    AlertCircle,
    Edit,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface DashboardData {
    name: string;
    email: string;
    plan: string;
    schemesFound: number;
    lastMatch: string;
    paymentId: string;
    profileComplete: boolean;
}

export default function DashboardPage() {
    const router = useRouter();
    const supabase = createClient();
    const [data, setData] = useState<DashboardData>({
        name: '',
        email: '',
        plan: 'Detailed',
        schemesFound: 0,
        lastMatch: new Date().toLocaleDateString('en-IN'),
        paymentId: 'pay_demo_123456',
        profileComplete: false,
    });

    useEffect(() => {
        // Load user info from Supabase auth (primary source)
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) {
                setData((prev) => ({
                    ...prev,
                    name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
                    email: user.email || '',
                }));
            }
        });

        // Load questionnaire data from localStorage (secondary source)
        const saved = localStorage.getItem('schemeindia_questionnaire');
        if (saved) {
            try {
                const profile = JSON.parse(saved);
                setData((prev) => ({
                    ...prev,
                    // Only override name if questionnaire has a name and auth didn't provide one
                    name: prev.name || profile.full_name || 'User',
                    profileComplete: profile.isComplete || false,
                    schemesFound: 14, // Mock
                }));
            } catch { /* ignore */ }
        }
    }, [supabase.auth]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem('schemeindia_user');
        localStorage.removeItem('schemeindia_questionnaire');
        router.push('/');
        router.refresh();
    };

    const menuItems = [
        { href: '/results', icon: FileText, label: 'View Results', desc: 'See your matched schemes' },
        { href: '/questionnaire', icon: Edit, label: 'Edit Profile', desc: 'Update your questionnaire' },
        { href: '/dashboard/chat', icon: MessageSquare, label: 'AI Chat', desc: 'Ask about schemes', badge: 'Premium' },
        { href: '/pricing', icon: CreditCard, label: 'Upgrade Plan', desc: 'Get more features' },
    ];

    return (
        <div className="min-h-screen bg-muted/30">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <LayoutDashboard className="h-6 w-6 text-brand-blue" />
                            Dashboard
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Welcome back, {data.name || 'User'}!
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={handleSignOut}>
                            <LogOut className="mr-2 h-4 w-4" /> Sign Out
                        </Button>
                    </div>
                </div>

                {/* Profile Status Banner */}
                {!data.profileComplete && (
                    <Card className="border-brand-saffron/30 bg-brand-saffron/5 mb-6">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <AlertCircle className="h-5 w-5 text-brand-saffron" />
                                <div>
                                    <p className="text-sm font-semibold">Complete Your Profile</p>
                                    <p className="text-xs text-muted-foreground">Fill the questionnaire to get your scheme matches.</p>
                                </div>
                            </div>
                            <Link href="/questionnaire">
                                <Button size="sm" className="bg-brand-saffron hover:bg-brand-saffron/90 text-white">
                                    Complete Now <ArrowRight className="ml-1 h-3 w-3" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
                    <Card className="border-0 shadow-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{data.schemesFound}</p>
                                    <p className="text-xs text-muted-foreground">Schemes Found</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{data.plan}</p>
                                    <p className="text-xs text-muted-foreground">Current Plan</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-saffron/10 text-brand-saffron">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{data.lastMatch}</p>
                                    <p className="text-xs text-muted-foreground">Last Updated</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                                    <User className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{data.profileComplete ? '✓' : '...'}</p>
                                    <p className="text-xs text-muted-foreground">Profile</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {menuItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <Card className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group hover:-translate-y-0.5">
                                <CardContent className="p-5 flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/5 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                                        <item.icon className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-sm">{item.label}</p>
                                            {item.badge && (
                                                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{item.badge}</Badge>
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-blue transition-colors" />
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Re-match Button */}
                <Card className="border-0 shadow-sm">
                    <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                            <h3 className="font-semibold">Re-run Match</h3>
                            <p className="text-sm text-muted-foreground">Updated your profile? Re-run the matching engine to find new schemes.</p>
                        </div>
                        <Link href="/results">
                            <Button variant="outline">
                                <RefreshCw className="mr-2 h-4 w-4" /> Re-match
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Payment History */}
                <h2 className="text-lg font-bold mt-8 mb-4">Payment History</h2>
                <Card className="border-0 shadow-sm">
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b bg-muted/30">
                                        <th className="text-left py-2.5 px-4 font-medium text-muted-foreground">Date</th>
                                        <th className="text-left py-2.5 px-4 font-medium text-muted-foreground">Plan</th>
                                        <th className="text-left py-2.5 px-4 font-medium text-muted-foreground">Amount</th>
                                        <th className="text-left py-2.5 px-4 font-medium text-muted-foreground">Payment ID</th>
                                        <th className="text-left py-2.5 px-4 font-medium text-muted-foreground">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="py-2.5 px-4">{data.lastMatch}</td>
                                        <td className="py-2.5 px-4">{data.plan}</td>
                                        <td className="py-2.5 px-4 font-medium">₹299</td>
                                        <td className="py-2.5 px-4 font-mono text-xs">{data.paymentId}</td>
                                        <td className="py-2.5 px-4">
                                            <Badge className="bg-brand-green/10 text-brand-green border-0 text-xs">Paid</Badge>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Settings */}
                <h2 className="text-lg font-bold mt-8 mb-4">Account</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-5 flex items-center gap-4">
                            <Settings className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="font-semibold text-sm">Account Settings</p>
                                <p className="text-xs text-muted-foreground">Update email, password, notifications</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-5 flex items-center gap-4">
                            <CreditCard className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="font-semibold text-sm">Billing</p>
                                <p className="text-xs text-muted-foreground">View invoices and payment methods</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
