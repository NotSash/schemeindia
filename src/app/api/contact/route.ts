import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, subject, message } = body;

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Name, email, subject, and message are required' },
                { status: 400 }
            );
        }

        const resendApiKey = process.env.RESEND_API_KEY;

        if (!resendApiKey || resendApiKey === 're_your_resend_api_key') {
            // Dev mode: just log and return success
            console.log('Contact form submission:', { name, email, phone, subject, message });
            return NextResponse.json({ success: true, demo: true });
        }

        // Production: Send email via Resend
        const { Resend } = await import('resend');
        const resend = new Resend(resendApiKey);

        await resend.emails.send({
            from: 'SchemeIndia <contact@schemeindia.in>',
            to: ['support@schemeindia.in'],
            replyTo: email,
            subject: `[Contact] ${subject}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
        });

        // TODO: Also save to database
        // const supabase = createAdminClient();
        // await supabase.from('contact_submissions').insert({ name, email, phone, subject, message });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact API error:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}
