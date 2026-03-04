'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

// Pages where Navbar and Footer should NOT appear
const MINIMAL_LAYOUT_ROUTES = [
    '/auth/',
    '/questionnaire',
    '/admin',
];

export default function LayoutShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isMinimalLayout = MINIMAL_LAYOUT_ROUTES.some((route) =>
        pathname.startsWith(route)
    );

    return (
        <div className="flex min-h-screen flex-col">
            <ScrollToTop />
            {!isMinimalLayout && <Navbar />}
            <main className="flex-1">{children}</main>
            {!isMinimalLayout && <Footer />}
        </div>
    );
}
