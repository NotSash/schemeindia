import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { plan_type, user_id } = body;

        // Validate plan type
        const plans: Record<string, { amount: number; name: string }> = {
            basic: { amount: 9900, name: 'Basic Plan' },
            detailed: { amount: 29900, name: 'Detailed Plan' },
            premium: { amount: 59900, name: 'Premium Plan' },
        };

        const plan = plans[plan_type];
        if (!plan) {
            return NextResponse.json({ error: 'Invalid plan type' }, { status: 400 });
        }

        const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
        const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

        if (!razorpayKeyId || !razorpayKeySecret || razorpayKeyId === 'rzp_test_your_key_id') {
            // Dev mode: return mock order
            return NextResponse.json({
                id: `order_demo_${Date.now()}`,
                amount: plan.amount,
                currency: 'INR',
                plan_type,
                key_id: 'rzp_test_demo',
                demo: true,
            });
        }

        // Production: Create Razorpay order
        const Razorpay = (await import('razorpay')).default;
        const razorpay = new Razorpay({
            key_id: razorpayKeyId,
            key_secret: razorpayKeySecret,
        });

        const order = await razorpay.orders.create({
            amount: plan.amount,
            currency: 'INR',
            receipt: `receipt_${user_id}_${Date.now()}`,
            notes: {
                plan_type,
                user_id: user_id || 'anonymous',
                plan_name: plan.name,
            },
        });

        return NextResponse.json({
            id: order.id,
            amount: order.amount,
            currency: order.currency,
            plan_type,
            key_id: razorpayKeyId,
        });
    } catch (error) {
        console.error('Order creation error:', error);
        return NextResponse.json(
            { error: 'Failed to create order' },
            { status: 500 }
        );
    }
}
