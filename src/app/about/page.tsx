import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Globe, Heart, Target, Eye } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Learn about SchemeIndia — our mission to help every Indian citizen discover government schemes they are entitled to.',
};

export default function AboutPage() {
    return (
        <div className="py-16">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4">
                        About <span className="text-brand-saffron">SchemeIndia</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        SchemeIndia is on a mission to bridge the information gap between Indian citizens and the government
                        welfare schemes they are entitled to. We use artificial intelligence and real-time data from official
                        government sources to provide accurate, personalised scheme recommendations.
                    </p>
                </div>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <Card className="border-0 shadow-md">
                        <CardContent className="p-8">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue mb-4">
                                <Target className="h-6 w-6" />
                            </div>
                            <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                To ensure that every Indian citizen, regardless of their education or access to information,
                                can discover and benefit from the government schemes they are eligible for. We believe that
                                lack of awareness should never be a barrier to accessing rightful benefits.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-md">
                        <CardContent className="p-8">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-saffron/10 text-brand-saffron mb-4">
                                <Eye className="h-6 w-6" />
                            </div>
                            <h2 className="text-2xl font-bold mb-3">Our Vision</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                A future where every Indian citizen is fully aware of all government benefits available to them,
                                and can access these benefits with ease and dignity — without depending on middlemen,
                                touts, or paying bribes.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Values */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">What We Stand For</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {[
                        { icon: Shield, title: 'Trust & Accuracy', desc: 'Data exclusively from official government sources.' },
                        { icon: Users, title: 'Inclusivity', desc: 'Designed for all citizens, including those on mobile.' },
                        { icon: Globe, title: 'Transparency', desc: 'Clear pricing, no hidden charges, refund guarantee.' },
                        { icon: Heart, title: 'Impact', desc: 'Helping families access benefits worth lakhs of rupees.' },
                    ].map((v) => (
                        <Card key={v.title} className="border-0 shadow-sm text-center">
                            <CardContent className="p-6">
                                <div className="flex h-10 w-10 mx-auto items-center justify-center rounded-lg bg-brand-green/10 text-brand-green mb-3">
                                    <v.icon className="h-5 w-5" />
                                </div>
                                <h3 className="font-semibold mb-1">{v.title}</h3>
                                <p className="text-sm text-muted-foreground">{v.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Disclaimer */}
                <Card className="border-brand-blue/20 bg-brand-blue/5">
                    <CardContent className="p-6">
                        <h3 className="font-semibold mb-2">Important Disclaimer</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            SchemeIndia is not affiliated with, endorsed by, or connected to the Government of India or any
                            state government in any way. We are an independent platform that aggregates publicly available
                            information from official government websites. All scheme details, eligibility criteria, and
                            application processes should be verified from the respective official sources before applying.
                            SchemeIndia does not guarantee eligibility or approval for any government scheme.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
