import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'SchemeIndia Privacy Policy — how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="py-16">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-neutral max-w-none">
                <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
                <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

                <h2>1. Information We Collect</h2>
                <p>We collect information that you voluntarily provide when creating an account and filling out the questionnaire, including:</p>
                <ul>
                    <li>Personal details (name, email, phone number, date of birth, gender)</li>
                    <li>Location information (state, district, PIN code)</li>
                    <li>Socioeconomic details (income, occupation, education, category)</li>
                    <li>Family details (dependents, children, marital status)</li>
                    <li>Payment information (processed securely via Razorpay — we do not store card details)</li>
                </ul>

                <h2>2. How We Use Your Information</h2>
                <p>Your information is used solely for:</p>
                <ul>
                    <li>Matching you with eligible government schemes</li>
                    <li>Generating your personalised scheme report</li>
                    <li>Processing payments and sending receipts</li>
                    <li>Sending notifications about new matching schemes (Premium plan)</li>
                    <li>Improving our matching algorithms</li>
                </ul>

                <h2>3. Data Security</h2>
                <p>We implement industry-standard security measures including 256-bit SSL encryption, secure cloud infrastructure via Supabase, and PCI DSS compliant payment processing via Razorpay. Access to personal data is restricted to authorised personnel only.</p>

                <h2>4. Data Sharing</h2>
                <p>We do NOT sell, trade, or share your personal information with any third party. We may share anonymised, aggregate data for analytical purposes only.</p>

                <h2>5. Data Retention</h2>
                <p>We retain your data for as long as your account is active. You may request deletion of your account and all associated data at any time by contacting support@schemeindia.in.</p>

                <h2>6. Cookies</h2>
                <p>We use essential cookies for authentication and session management. We also use Google Translate cookies when you use the language translation feature.</p>

                <h2>7. Your Rights</h2>
                <p>You have the right to access, update, or delete your personal data. Contact us at support@schemeindia.in for any privacy-related requests.</p>

                <h2>8. Contact</h2>
                <p>For privacy concerns, contact us at: <strong>support@schemeindia.in</strong></p>
            </div>
        </div>
    );
}
