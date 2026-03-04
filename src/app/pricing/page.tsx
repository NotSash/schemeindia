import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { PRICING_PLANS } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

export const metadata: Metadata = {
    title: 'Pricing',
    description: 'Choose a SchemeIndia plan to unlock your personalised government scheme report. Plans start at just ₹99.',
};

export default function PricingPage() {
    return (
        <div className="py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4">
                        Simple, Transparent <span className="text-brand-saffron">Pricing</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        One-time payment. No subscriptions. No hidden charges. Choose the plan that suits your needs.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
                    {PRICING_PLANS.map((plan) => (
                        <Card
                            key={plan.type}
                            className={`relative border-2 transition-all hover:shadow-xl ${plan.highlighted
                                    ? 'border-brand-saffron shadow-lg scale-105 z-10'
                                    : 'border-border hover:-translate-y-1'
                                }`}
                        >
                            {plan.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="bg-brand-saffron text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                                        {plan.badge}
                                    </span>
                                </div>
                            )}
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                                <p className="text-sm text-muted-foreground mb-6">{plan.validity} access • {plan.searches}</p>
                                <div className="flex items-baseline gap-1 mb-8">
                                    <span className="text-5xl font-bold">{formatCurrency(plan.price)}</span>
                                    <span className="text-sm text-muted-foreground">one-time</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-2 text-sm">
                                            <CheckCircle2 className="h-4 w-4 text-brand-green shrink-0 mt-0.5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/auth/signup">
                                    <Button
                                        className={`w-full ${plan.highlighted
                                                ? 'bg-brand-saffron hover:bg-brand-saffron/90 text-white'
                                                : ''
                                            }`}
                                        variant={plan.highlighted ? 'default' : 'outline'}
                                        size="lg"
                                    >
                                        Get Started
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Comparison Table */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-8">Plan Comparison</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4 font-semibold">Feature</th>
                                    <th className="text-center py-3 px-4 font-semibold">Basic</th>
                                    <th className="text-center py-3 px-4 font-semibold text-brand-saffron">Detailed</th>
                                    <th className="text-center py-3 px-4 font-semibold">Premium</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ['Matched scheme names', '✅', '✅', '✅'],
                                    ['Match score', '✅', '✅', '✅'],
                                    ['Total benefit amount', '✅', '✅', '✅'],
                                    ['Full eligibility details', '❌', '✅', '✅'],
                                    ['Required documents', '❌', '✅', '✅'],
                                    ['Application process', '❌', '✅', '✅'],
                                    ['Direct application links', '❌', '✅', '✅'],
                                    ['PDF report download', '❌', '✅', '✅'],
                                    ['Profile re-matches', '1', '3', 'Unlimited'],
                                    ['AI chat assistant', '❌', '❌', '✅'],
                                    ['New scheme alerts', '❌', '❌', '✅'],
                                    ['Priority support', '❌', '❌', '✅'],
                                    ['Validity', '30 days', '90 days', '365 days'],
                                    ['Price', '₹99', '₹299', '₹599'],
                                ].map(([feature, basic, detailed, premium]) => (
                                    <tr key={feature} className="border-b hover:bg-muted/30">
                                        <td className="py-2.5 px-4">{feature}</td>
                                        <td className="py-2.5 px-4 text-center">{basic}</td>
                                        <td className="py-2.5 px-4 text-center bg-brand-saffron/5">{detailed}</td>
                                        <td className="py-2.5 px-4 text-center">{premium}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
