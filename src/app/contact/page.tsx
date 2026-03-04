'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const formData = new FormData(e.currentTarget);
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    subject: formData.get('subject'),
                    message: formData.get('message'),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            setSubmitted(true);
        } catch {
            setError('Failed to send message. Please try again or email us directly.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-16">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4">
                        Contact <span className="text-brand-saffron">Us</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Have a question, suggestion, or need help? We are here to assist you.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        {[
                            { icon: Mail, title: 'Email', value: 'support@schemeindia.in', href: 'mailto:support@schemeindia.in' },
                            { icon: Phone, title: 'Phone', value: '+91 98XX XXXXXX', href: 'tel:+919800000000' },
                            { icon: MapPin, title: 'Location', value: 'New Delhi, India', href: '#' },
                        ].map((item) => (
                            <Card key={item.title} className="border-0 shadow-sm">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue shrink-0">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">{item.title}</p>
                                        <a href={item.href} className="text-sm text-muted-foreground hover:text-brand-blue">
                                            {item.value}
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="md:col-span-2">
                        <Card className="border-0 shadow-md">
                            <CardContent className="p-8">
                                {submitted ? (
                                    <div className="text-center py-12">
                                        <CheckCircle2 className="h-16 w-16 text-brand-green mx-auto mb-4" />
                                        <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
                                        <p className="text-muted-foreground">
                                            Thank you for contacting us. We will get back to you within 24 hours.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {error && (
                                            <div className="bg-destructive/10 text-destructive text-sm rounded-md p-3">
                                                {error}
                                            </div>
                                        )}
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="name">Full Name *</Label>
                                                <Input id="name" name="name" required placeholder="Your full name" className="mt-1.5" />
                                            </div>
                                            <div>
                                                <Label htmlFor="email">Email Address *</Label>
                                                <Input id="email" name="email" type="email" required placeholder="you@example.com" className="mt-1.5" />
                                            </div>
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="phone">Phone Number</Label>
                                                <Input id="phone" name="phone" placeholder="+91 98XX XXXXXX" className="mt-1.5" />
                                            </div>
                                            <div>
                                                <Label htmlFor="subject">Subject *</Label>
                                                <Input id="subject" name="subject" required placeholder="How can we help?" className="mt-1.5" />
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="message">Message *</Label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                required
                                                placeholder="Tell us more about your query..."
                                                className="mt-1.5 min-h-[120px]"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="bg-brand-saffron hover:bg-brand-saffron/90 text-white"
                                        >
                                            {loading ? 'Sending...' : 'Send Message'}
                                            <Send className="ml-2 h-4 w-4" />
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
