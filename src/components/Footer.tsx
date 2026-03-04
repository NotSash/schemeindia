import Link from 'next/link';
import { Heart } from 'lucide-react';

const footerLinks = {
    product: [
        { href: '/', label: 'Home' },
        { href: '/pricing', label: 'Pricing' },
        { href: '/faq', label: 'FAQ' },
        { href: '/about', label: 'About Us' },
        { href: '/contact', label: 'Contact' },
    ],
    legal: [
        { href: '/privacy-policy', label: 'Privacy Policy' },
        { href: '/terms-of-service', label: 'Terms of Service' },
        { href: '/refund-policy', label: 'Refund Policy' },
    ],
    resources: [
        { href: 'https://www.myscheme.gov.in', label: 'MyScheme.gov.in', external: true },
        { href: 'https://www.india.gov.in', label: 'India.gov.in', external: true },
        { href: 'https://scholarships.gov.in', label: 'National Scholarships', external: true },
    ],
};

export default function Footer() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue text-white font-bold text-sm">
                                S
                            </div>
                            <span className="text-lg font-bold text-brand-blue">
                                Scheme<span className="text-brand-saffron">India</span>
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Helping Indian citizens discover government schemes they are entitled to.
                            Powered by AI and official government data sources.
                        </p>
                        <p className="text-xs text-muted-foreground mt-4">
                            🇮🇳 Made in India with <Heart className="inline h-3 w-3 text-red-500" />
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="text-sm font-semibold mb-4 text-foreground">Product</h3>
                        <ul className="space-y-2.5">
                            {footerLinks.product.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-sm font-semibold mb-4 text-foreground">Legal</h3>
                        <ul className="space-y-2.5">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Government Resources */}
                    <div>
                        <h3 className="text-sm font-semibold mb-4 text-foreground">Government Resources</h3>
                        <ul className="space-y-2.5">
                            {footerLinks.resources.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label} ↗
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-10 pt-6 border-t">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-muted-foreground">
                            © {new Date().getFullYear()} SchemeIndia. All rights reserved.
                        </p>
                        <p className="text-xs text-muted-foreground text-center">
                            <strong>Disclaimer:</strong> SchemeIndia is not affiliated with or endorsed by the Government of India.
                            All information is sourced from publicly available government websites.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
