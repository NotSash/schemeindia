import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'SchemeIndia Terms of Service — rules and guidelines for using our platform.',
};

export default function TermsOfServicePage() {
    return (
        <div className="py-16">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-neutral max-w-none">
                <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
                <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

                <h2>1. Acceptance of Terms</h2>
                <p>By accessing and using SchemeIndia, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>

                <h2>2. Description of Service</h2>
                <p>SchemeIndia is an information platform that helps Indian citizens discover government schemes they may be eligible for. We aggregate publicly available information from official government websites and use AI to match it with user profiles.</p>

                <h2>3. Disclaimer</h2>
                <p><strong>SchemeIndia does NOT guarantee eligibility for or approval of any government scheme.</strong> The information provided is indicative and based on publicly available data. Users must verify all details from official government websites before applying. SchemeIndia is not affiliated with or endorsed by the Government of India.</p>

                <h2>4. User Responsibilities</h2>
                <ul>
                    <li>Provide accurate and truthful information in the questionnaire</li>
                    <li>Do not use the platform for any unlawful or fraudulent purpose</li>
                    <li>Do not share your account credentials with others</li>
                    <li>Do not attempt to scrape, hack, or overload the platform</li>
                </ul>

                <h2>5. Payment Terms</h2>
                <ul>
                    <li>All payments are processed securely via Razorpay</li>
                    <li>Prices are in Indian Rupees (INR) and include applicable taxes</li>
                    <li>Payment grants access to the selected plan for the specified validity period</li>
                    <li>Plans are non-transferable</li>
                </ul>

                <h2>6. Intellectual Property</h2>
                <p>All content, design, and technology on SchemeIndia is proprietary. You may not reproduce, distribute, or create derivative works without written permission.</p>

                <h2>7. Limitation of Liability</h2>
                <p>SchemeIndia shall not be liable for any indirect, incidental, or consequential damages arising from the use of our service. Our total liability shall not exceed the amount paid by you for the service.</p>

                <h2>8. Changes to Terms</h2>
                <p>We reserve the right to update these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.</p>

                <h2>9. Governing Law</h2>
                <p>These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of the courts of New Delhi.</p>

                <h2>10. Contact</h2>
                <p>For questions about these terms, contact us at: <strong>support@schemeindia.in</strong></p>
            </div>
        </div>
    );
}
