import type { Metadata } from 'next';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Frequently Asked Questions',
    description: 'Answers to common questions about SchemeIndia — how it works, data sources, pricing, security, and more.',
};

const faqs = [
    {
        category: 'General',
        questions: [
            {
                q: 'What is SchemeIndia?',
                a: 'SchemeIndia is an AI-powered platform that helps Indian citizens discover central and state government schemes they are eligible for. We analyse your profile against thousands of schemes from official government sources and provide a personalised report.',
            },
            {
                q: 'How does SchemeIndia work?',
                a: 'You answer a simple questionnaire about your personal details, family, income, occupation, and needs. Our AI matching engine then scans thousands of government schemes and identifies all schemes you are potentially eligible for. You receive a detailed report with scheme names, benefits, eligibility criteria, required documents, and direct application links.',
            },
            {
                q: 'Is SchemeIndia affiliated with the Government of India?',
                a: 'No. SchemeIndia is an independent platform. We are not affiliated with, endorsed by, or connected to the Government of India or any state government. We aggregate publicly available information from official government websites.',
            },
            {
                q: 'How accurate is the scheme matching?',
                a: 'Our matching engine uses both rule-based matching and AI analysis to provide accurate results. However, eligibility shown is indicative and not guaranteed. We recommend verifying all details from official government websites before applying.',
            },
        ],
    },
    {
        category: 'Data & Privacy',
        questions: [
            {
                q: 'Where does SchemeIndia get its scheme data?',
                a: 'All data is sourced from official government websites including MyScheme.gov.in, India.gov.in, National Scholarship Portal (scholarships.gov.in), PM India, and individual state government portals. We update our data regularly.',
            },
            {
                q: 'Is my personal information safe?',
                a: 'Yes. We use industry-standard encryption (256-bit SSL), secure payment processing via Razorpay (PCI DSS compliant), and strict data protection policies. Your personal information is used only for scheme matching and is never sold to third parties.',
            },
            {
                q: 'Can I delete my data?',
                a: 'Yes. You can request deletion of your account and all associated data at any time by contacting our support team. We will process your request within 7 business days.',
            },
        ],
    },
    {
        category: 'Payments & Refunds',
        questions: [
            {
                q: 'Why is SchemeIndia a paid service?',
                a: 'Maintaining real-time government data, running AI matching algorithms, and operating this platform requires significant resources. Our prices (starting at ₹99) are a fraction of what intermediaries and touts charge (₹500-5,000) for similar services. We provide verified, comprehensive, and accurate information.',
            },
            {
                q: 'What payment methods are accepted?',
                a: 'We accept UPI (Google Pay, PhonePe, Paytm, etc.), credit/debit cards, net banking, and mobile wallets through Razorpay — India\'s most trusted payment gateway.',
            },
            {
                q: 'Can I get a refund?',
                a: 'Yes. If you are not satisfied with our service, you can request a full refund within 7 days of purchase. Please contact our support team with your payment ID and reason for dissatisfaction.',
            },
            {
                q: 'What if my payment fails?',
                a: 'If your payment fails, no amount is deducted from your account. You can retry the payment. If any amount is debited for a failed transaction, it will be automatically refunded to your account within 5-7 business days.',
            },
        ],
    },
    {
        category: 'Plans & Features',
        questions: [
            {
                q: 'What is the difference between Basic, Detailed, and Premium plans?',
                a: 'The Basic plan (₹99) shows matched scheme names, brief descriptions, and match scores. The Detailed plan (₹299) adds full eligibility details, document checklists, application processes, and a downloadable PDF report. The Premium plan (₹599) adds an AI chat assistant, new scheme alerts, and unlimited profile updates.',
            },
            {
                q: 'How long is my report valid?',
                a: 'Basic plan: 30 days. Detailed plan: 90 days. Premium plan: 365 days. During the validity period, you can access your report anytime.',
            },
            {
                q: 'Can I upgrade my plan later?',
                a: 'Yes. You can purchase a higher plan at any time to unlock additional features and extend your access period.',
            },
        ],
    },
];

export default function FAQPage() {
    return (
        <div className="py-16">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4">
                        Frequently Asked <span className="text-brand-saffron">Questions</span>
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Everything you need to know about SchemeIndia.
                    </p>
                </div>

                {faqs.map((section) => (
                    <div key={section.category} className="mb-10">
                        <h2 className="text-xl font-bold mb-4 text-brand-blue">{section.category}</h2>
                        <Accordion type="single" collapsible className="space-y-2">
                            {section.questions.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`${section.category}-${index}`}
                                    className="bg-card border rounded-lg px-6"
                                >
                                    <AccordionTrigger className="text-left font-semibold text-sm hover:no-underline">
                                        {faq.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                                        {faq.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                ))}
            </div>
        </div>
    );
}
