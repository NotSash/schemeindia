import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Refund Policy',
    description: 'SchemeIndia Refund Policy — our commitment to customer satisfaction with a 7-day refund guarantee.',
};

export default function RefundPolicyPage() {
    return (
        <div className="py-16">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-neutral max-w-none">
                <h1 className="text-4xl font-bold mb-2">Refund Policy</h1>
                <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

                <h2>1. Refund Eligibility</h2>
                <p>We offer a <strong>7-day refund guarantee</strong> from the date of purchase. You are eligible for a full refund if:</p>
                <ul>
                    <li>You are not satisfied with the quality of the scheme report</li>
                    <li>The report contains significant inaccuracies</li>
                    <li>Technical issues prevented you from accessing the report</li>
                    <li>You were charged multiple times for the same service</li>
                </ul>

                <h2>2. How to Request a Refund</h2>
                <p>To request a refund, contact us at <strong>support@schemeindia.in</strong> within 7 days of purchase with:</p>
                <ul>
                    <li>Your registered email address</li>
                    <li>Payment ID / Order ID (from your payment receipt)</li>
                    <li>Reason for requesting the refund</li>
                </ul>

                <h2>3. Refund Processing</h2>
                <ul>
                    <li>Refund requests are reviewed within 2 business days</li>
                    <li>Approved refunds are processed within 5-7 business days</li>
                    <li>Refunds are credited to the original payment method</li>
                </ul>

                <h2>4. Non-Refundable Scenarios</h2>
                <p>Refunds will not be provided if:</p>
                <ul>
                    <li>The 7-day refund window has passed</li>
                    <li>The user provided false or inaccurate information in the questionnaire</li>
                    <li>The user applied for schemes and was rejected (we do not guarantee approval)</li>
                    <li>The request is deemed fraudulent or abusive</li>
                </ul>

                <h2>5. Failed Payments</h2>
                <p>If your payment fails and the amount is debited, it will be automatically refunded by your bank or payment provider within 5-7 business days. If not, contact us with the transaction details.</p>

                <h2>6. Contact</h2>
                <p>For refund requests or payment-related queries: <strong>support@schemeindia.in</strong></p>
            </div>
        </div>
    );
}
