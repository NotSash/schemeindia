import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LayoutShell from '@/components/LayoutShell';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'SchemeIndia — Discover Government Schemes You\'re Entitled To',
    template: '%s | SchemeIndia',
  },
  description:
    'India has over 3,000 government schemes worth lakhs of rupees. SchemeIndia uses AI to find every scheme that matches your profile. Discover central and state government schemes for education, health, housing, agriculture, and more.',
  keywords: [
    'government schemes India',
    'sarkari yojana',
    'scheme eligibility',
    'PM schemes 2025',
    'central government schemes',
    'state government schemes',
    'scholarship India',
    'government benefits',
  ],
  authors: [{ name: 'SchemeIndia' }],
  openGraph: {
    title: 'SchemeIndia — Discover Government Schemes You\'re Entitled To',
    description:
      'Find every government scheme you are eligible for. AI-powered matching across 3,000+ central and state schemes.',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    siteName: 'SchemeIndia',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SchemeIndia — Government Scheme Finder',
    description:
      'Find every government scheme you are eligible for. AI-powered matching across 3,000+ schemes.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'SchemeIndia',
              url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
              description:
                'AI-powered platform to discover government schemes Indian citizens are eligible for.',
              foundingDate: '2025',
              areaServed: 'India',
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
