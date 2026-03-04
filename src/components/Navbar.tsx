'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Shield, LogOut, LayoutDashboard } from 'lucide-react';
import GoogleTranslate from './GoogleTranslate';
import { createClient } from '@/lib/supabase/client';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#how-it-works', label: 'How It Works' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/faq', label: 'FAQ' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<{ email?: string; name?: string } | null>(null);
    const [authLoading, setAuthLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        // Check initial auth state
        supabase.auth.getUser().then(({ data: { user: authUser } }) => {
            if (authUser) {
                setUser({
                    email: authUser.email,
                    name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || '',
                });
            }
            setAuthLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUser({
                    email: session.user.email,
                    name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || '',
                });
            } else {
                setUser(null);
            }
        });

        return () => subscription.unsubscribe();
    }, [supabase.auth]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem('schemeindia_user');
        localStorage.removeItem('schemeindia_questionnaire');
        setUser(null);
        setOpen(false);
        router.push('/');
        router.refresh();
    };

    const isLoggedIn = !authLoading && user !== null;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href={isLoggedIn ? '/dashboard' : '/'} className="flex items-center gap-2 group">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blue text-white font-bold text-lg shadow-md group-hover:shadow-lg transition-shadow">
                        S
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-brand-blue leading-none">
                            Scheme<span className="text-brand-saffron">India</span>
                        </span>
                        <span className="text-[10px] text-muted-foreground leading-none hidden sm:block">
                            🇮🇳 Government Scheme Finder
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
                        >
                            {link.label}
                        </Link>
                    ))}
                    {isLoggedIn && (
                        <Link
                            href="/dashboard"
                            className="px-3 py-2 text-sm font-medium text-brand-blue hover:text-foreground transition-colors rounded-md hover:bg-muted"
                        >
                            Dashboard
                        </Link>
                    )}
                </nav>

                {/* Desktop Right Side */}
                <div className="hidden lg:flex items-center gap-3">
                    <GoogleTranslate />
                    <div className="h-6 w-px bg-border" />
                    {authLoading ? (
                        <div className="w-20 h-8 bg-muted rounded animate-pulse" />
                    ) : isLoggedIn ? (
                        <>
                            <Link href="/dashboard">
                                <Button variant="ghost" size="sm">
                                    <LayoutDashboard className="mr-1.5 h-4 w-4" />
                                    Dashboard
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleSignOut}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <LogOut className="mr-1.5 h-4 w-4" />
                                Sign Out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login">
                                <Button variant="ghost" size="sm">
                                    Log In
                                </Button>
                            </Link>
                            <Link href="/auth/signup">
                                <Button
                                    size="sm"
                                    className="bg-brand-saffron hover:bg-brand-saffron/90 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                                >
                                    <Shield className="mr-1.5 h-4 w-4" />
                                    Get Started
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu */}
                <div className="flex lg:hidden items-center gap-2">
                    <GoogleTranslate />
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-72 p-0">
                            <div className="flex flex-col h-full">
                                <div className="flex items-center justify-between p-4 border-b">
                                    <Link href={isLoggedIn ? '/dashboard' : '/'} className="flex items-center gap-2" onClick={() => setOpen(false)}>
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue text-white font-bold">
                                            S
                                        </div>
                                        <span className="font-bold text-brand-blue">
                                            Scheme<span className="text-brand-saffron">India</span>
                                        </span>
                                    </Link>
                                </div>
                                <nav className="flex flex-col p-4 gap-1">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                                            onClick={() => setOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                    {isLoggedIn && (
                                        <Link
                                            href="/dashboard"
                                            className="px-3 py-2.5 text-sm font-medium text-brand-blue hover:text-foreground hover:bg-muted rounded-md transition-colors"
                                            onClick={() => setOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                    )}
                                </nav>
                                <div className="mt-auto p-4 border-t flex flex-col gap-2">
                                    {isLoggedIn ? (
                                        <>
                                            <Link href="/dashboard" onClick={() => setOpen(false)}>
                                                <Button variant="outline" className="w-full">
                                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                                    Dashboard
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                className="w-full text-muted-foreground"
                                                onClick={handleSignOut}
                                            >
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Sign Out
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Link href="/auth/login" onClick={() => setOpen(false)}>
                                                <Button variant="outline" className="w-full">
                                                    Log In
                                                </Button>
                                            </Link>
                                            <Link href="/auth/signup" onClick={() => setOpen(false)}>
                                                <Button className="w-full bg-brand-saffron hover:bg-brand-saffron/90 text-white">
                                                    Get Started
                                                </Button>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
