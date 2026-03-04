'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Lock,
    CheckCircle2,
    ArrowRight,
    Shield,
    CreditCard,
    Smartphone,
    Sparkles,
    TrendingUp,
    Banknote,
    GraduationCap,
    Home,
    Heart,
} from 'lucide-react';
import { PRICING_PLANS } from '@/lib/constants';
import { formatCurrency, blurSchemeName } from '@/lib/utils';
import type { PlanType } from '@/lib/types';

// Mock teaser data (in production this comes from matching engine preview)
const MOCK_TEASER = {
    totalSchemes: 14,
    totalBenefit: 840000,
    categories: [
        { name: 'Financial Assistance', count: 5, icon: Banknote },
        { name: 'Education', count: 3, icon: GraduationCap },
        { name: 'Housing', count: 2, icon: Home },
        { name: 'Health & Insurance', count: 4, icon: Heart },
    ],
    blurredSchemes: [
        { name: 'PM-KISAN Samman Nidhi', score: 95 },
        { name: 'Ayushman Bharat Health Insurance', score: 92 },
        { name: 'National Family Benefit Scheme', score: 88 },
        { name: 'Pradhan Mantri Awas Yojana', score: 85 },
        { name: 'Sukanya Samriddhi Yojana', score: 82 },
        { name: 'PM Ujjwala Yojana', score: 78 },
    ],
};

export default function PaymentPage() {
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState<PlanType>('detailed');
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Get name from questionnaire data
        const saved = localStorage.getItem('schemeindia_questionnaire');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setUserName(parsed.full_name || 'there');
            } catch { /* ignore */ }
        }
    }, []);

    const handlePayment = async () => {
        setLoading(true);
        // Simulate payment flow — in production, create Razorpay order and open checkout
        await new Promise((r) => setTimeout(r, 2000));
        router.push('/payment/success?plan=' + selectedPlan);
    };

    return (
        <div className="py-8">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                {/* Teaser Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green rounded-full px-4 py-2 mb-4 text-sm font-medium">
                        <Sparkles className="h-4 w-4" />
                        Great News!
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                        🎉 Great News, {userName || 'there'}!
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Based on your profile, we found{' '}
                        <strong className="text-foreground">{MOCK_TEASER.totalSchemes} government schemes</strong>{' '}
                        you may be eligible for!
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                    <Card className="border-0 shadow-md text-center">
                        <CardContent className="p-4 sm:p-5">
                            <p className="text-3xl font-bold text-brand-blue">{MOCK_TEASER.totalSchemes}</p>
                            <p className="text-sm text-muted-foreground">Schemes Found</p>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-md text-center">
                        <CardContent className="p-5">
                            <p className="text-2xl sm:text-3xl font-bold text-brand-green">{formatCurrency(MOCK_TEASER.totalBenefit)}</p>
                            <p className="text-sm text-muted-foreground">Potential Benefits</p>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-md text-center">
                        <CardContent className="p-5">
                            <p className="text-3xl font-bold text-brand-saffron">{MOCK_TEASER.categories.length}</p>
                            <p className="text-sm text-muted-foreground">Categories</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Category Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                    {MOCK_TEASER.categories.map((cat) => (
                        <div key={cat.name} className="flex items-center gap-2 bg-card border rounded-lg p-3">
                            <cat.icon className="h-5 w-5 text-brand-blue shrink-0" />
                            <div>
                                <p className="text-sm font-medium">{cat.count} schemes</p>
                                <p className="text-xs text-muted-foreground">{cat.name}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Blurred Scheme List */}
                <Card className="border-0 shadow-lg mb-10 overflow-hidden">
                    <div className="bg-brand-blue/5 px-6 py-3 border-b">
                        <h2 className="font-semibold text-sm flex items-center gap-2">
                            <Lock className="h-4 w-4" /> Your Matched Schemes (Preview)
                        </h2>
                    </div>
                    <CardContent className="p-0 relative">
                        {MOCK_TEASER.blurredSchemes.map((scheme, i) => (
                            <div key={i} className="flex items-center justify-between px-6 py-3.5 border-b last:border-0">
                                <div className="flex items-center gap-3 flex-1">
                                    <span className="text-xs font-bold text-muted-foreground w-6">{i + 1}.</span>
                                    <span className={`text-sm font-medium ${i > 1 ? 'scheme-blur' : ''}`}>
                                        {i > 1 ? blurSchemeName(scheme.name) : scheme.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${scheme.score >= 80 ? 'bg-brand-green' : 'bg-yellow-400'}`}
                                            style={{ width: `${scheme.score}%` }}
                                        />
                                    </div>
                                    <span className={`text-xs font-bold ${i > 1 ? 'scheme-blur' : ''}`}>
                                        {scheme.score}%
                                    </span>
                                </div>
                            </div>
                        ))}
                        {/* Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-card to-transparent flex items-end justify-center pb-4">
                            <div className="flex items-center gap-2 text-sm text-brand-blue font-medium bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                                <Lock className="h-4 w-4" />
                                +{MOCK_TEASER.totalSchemes - 2} more schemes locked
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Unlock Section */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                        <Lock className="h-5 w-5" /> Unlock Your Complete Scheme Report
                    </h2>
                    <p className="text-muted-foreground">
                        Choose a plan to access detailed information, application links, and document checklists.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-5 mb-10">
                    {PRICING_PLANS.map((plan) => (
                        <Card
                            key={plan.type}
                            className={`relative border-2 cursor-pointer transition-all ${selectedPlan === plan.type
                                ? 'border-brand-saffron shadow-lg ring-2 ring-brand-saffron/20'
                                : 'border-border hover:border-brand-saffron/40'
                                } ${plan.highlighted ? 'md:scale-105 z-10' : ''}`}
                            onClick={() => setSelectedPlan(plan.type)}
                        >
                            {plan.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <Badge className="bg-brand-saffron text-white shadow-md">{plan.badge}</Badge>
                                </div>
                            )}
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-bold">{plan.name}</h3>
                                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === plan.type ? 'border-brand-saffron' : 'border-muted-foreground/40'
                                        }`}>
                                        {selectedPlan === plan.type && <div className="h-3 w-3 rounded-full bg-brand-saffron" />}
                                    </div>
                                </div>
                                <p className="text-2xl font-bold mb-1">{formatCurrency(plan.price)}</p>
                                <p className="text-xs text-muted-foreground mb-3">{plan.validity} • {plan.searches}</p>
                                <ul className="space-y-1.5">
                                    {plan.features.slice(0, 4).map((f) => (
                                        <li key={f} className="flex items-start gap-1.5 text-xs">
                                            <CheckCircle2 className="h-3 w-3 text-brand-green shrink-0 mt-0.5" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Pay Button */}
                <div className="text-center mb-8">
                    <Button
                        size="lg"
                        onClick={handlePayment}
                        disabled={loading}
                        className="w-full sm:w-auto bg-brand-saffron hover:bg-brand-saffron/90 text-white font-semibold text-base sm:text-lg px-8 sm:px-12 py-5 sm:py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all"
                    >
                        {loading ? 'Processing...' : `Pay ${formatCurrency(PRICING_PLANS.find((p) => p.type === selectedPlan)!.price)} & Unlock Report`}
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>

                {/* Trust Signals */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground mb-8">
                    <div className="flex items-center gap-1.5">
                        <Shield className="h-4 w-4" />
                        256-bit SSL Encryption
                    </div>
                    <div className="flex items-center gap-1.5">
                        <CreditCard className="h-4 w-4" />
                        Powered by Razorpay
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Smartphone className="h-4 w-4" />
                        UPI, Cards, Net Banking
                    </div>
                    <div className="flex items-center gap-1.5">
                        <TrendingUp className="h-4 w-4" />
                        7-day Refund Guarantee
                    </div>
                </div>

                {/* FAQ */}
                <Card className="border-0 shadow-sm bg-muted/30">
                    <CardContent className="p-6">
                        <h3 className="font-semibold mb-2">Why is this paid?</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Maintaining real-time government data, running AI matching algorithms, and operating this platform
                            requires significant resources. Our prices (starting at just ₹99) are a fraction of what touts at
                            government offices charge (₹500-5,000) for the same information. We provide verified, comprehensive,
                            and accurate data from official sources.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
