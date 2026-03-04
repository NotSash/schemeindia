import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            plan_type,
            user_id,
        } = body;

        const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

        if (!razorpayKeySecret || razorpayKeySecret === 'your_razorpay_key_secret') {
            // Dev mode: accept any payment
            return NextResponse.json({
                success: true,
                payment_id: razorpay_payment_id || `pay_demo_${Date.now()}`,
                order_id: razorpay_order_id || `order_demo_${Date.now()}`,
                plan_type,
                demo: true,
            });
        }

        // Verify signature
        const expectedSignature = crypto
            .createHmac('sha256', razorpayKeySecret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            return NextResponse.json(
                { error: 'Payment verification failed. Invalid signature.' },
                { status: 400 }
            );
        }

        // TODO: Save payment to database via Supabase
        // const supabase = createAdminClient();
        // await supabase.from('payments').insert({
        //   user_id,
        //   plan_type,
        //   amount: ...,
        //   razorpay_order_id,
        //   razorpay_payment_id,
        //   razorpay_signature,
        //   status: 'captured',
        // });

        return NextResponse.json({
            success: true,
            payment_id: razorpay_payment_id,
            order_id: razorpay_order_id,
            plan_type,
        });
    } catch (error) {
        console.error('Payment verification error:', error);
        return NextResponse.json(
            { error: 'Payment verification failed' },
            { status: 500 }
        );
    }
}
