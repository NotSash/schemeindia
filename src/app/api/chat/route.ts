import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { message } = body;

        if (!message || typeof message !== 'string') {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const geminiApiKey = process.env.GEMINI_API_KEY;

        if (!geminiApiKey || geminiApiKey === 'your_gemini_api_key') {
            // Dev mode: return a helpful mock response
            const mockResponses: Record<string, string> = {
                'document': 'For most government schemes in India, you typically need:\n\n📄 **Mandatory Documents:**\n• Aadhaar Card\n• Bank Account (linked to Aadhaar)\n• Passport-size photographs\n• Income Certificate\n\n📋 **Category-specific:**\n• Caste Certificate (for SC/ST/OBC)\n• BPL Card (for poverty-related schemes)\n• Land Records (for farmer schemes)\n• Disability Certificate (for PwD schemes)\n\nWould you like to know about documents for a specific scheme?',
                'apply': 'Here\'s how to apply for most government schemes:\n\n1️⃣ **Check Eligibility** — Visit the scheme\'s official website\n2️⃣ **Gather Documents** — Keep Aadhaar, income certificate, bank details ready\n3️⃣ **Apply Online** — Most schemes accept applications at myscheme.gov.in\n4️⃣ **Visit Office** — Some schemes require visiting a local government office (BDO/SDM)\n5️⃣ **Track Status** — Use your application ID to track progress\n\nWhich specific scheme would you like to apply for?',
                'eligible': 'Based on your profile, here are key factors that determine eligibility:\n\n✅ **Income Level** — Many schemes target families below ₹2.5 lakh/year\n✅ **Social Category** — SC/ST/OBC/EWS specific schemes available\n✅ **Occupation** — Farmer, business owner, and student schemes\n✅ **Gender** — Women-specific schemes like Sukanya Samriddhi\n✅ **Location** — Rural vs Urban specific schemes\n\nI recommend filling out the SchemeIndia questionnaire for personalised matching!',
                'pmkisan': '🌾 **PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)**\n\n**Benefit:** ₹6,000/year in 3 installments of ₹2,000\n\n**Eligibility:**\n• All landholding farmer families\n• Must have cultivable land\n• Excludes institutional landholders, tax payers, professionals\n\n**Documents Required:**\n• Aadhaar Card\n• Land Records/Khasra\n• Bank Account (linked to Aadhaar)\n\n**How to Apply:**\nVisit pmkisan.gov.in → New Farmer Registration → Fill details → Submit\n\n**Helpline:** 155261',
            };

            const lowerMessage = message.toLowerCase();
            let reply = '';

            if (lowerMessage.includes('document')) reply = mockResponses['document'];
            else if (lowerMessage.includes('apply') || lowerMessage.includes('how')) reply = mockResponses['apply'];
            else if (lowerMessage.includes('eligible') || lowerMessage.includes('housing') || lowerMessage.includes('scholarship')) reply = mockResponses['eligible'];
            else if (lowerMessage.includes('kisan') || lowerMessage.includes('pm-kisan')) reply = mockResponses['pmkisan'];
            else {
                reply = `Thank you for your question about "${message}". \n\nI can help you with:\n• 📋 Document requirements for any scheme\n• ✅ Eligibility criteria\n• 📝 Application process\n• 💰 Benefit details\n• 🏛️ Information about specific schemes\n\nPlease ask a specific question and I\'ll provide detailed information!`;
            }

            return NextResponse.json({ reply });
        }

        // Production: Use Google Gemini API
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const prompt = `You are SchemeIndia AI, an expert assistant that helps Indian citizens understand government schemes. 
You have deep knowledge of central and state government schemes in India including PM-KISAN, PMJAY, PMAY, MUDRA, APY, PMSBY, PMJJBY, and thousands more.

User's question: ${message}

Provide a helpful, accurate, and detailed response. Format your response with:
- Use bullet points and numbered lists
- Use bold for key terms
- Include specific amounts, eligibility criteria, and application links where relevant
- Always mention official sources
- If unsure, say so and recommend checking the official website

Keep the response concise but comprehensive. Use emojis sparingly for readability.`;

        const result = await model.generateContent(prompt);
        const reply = result.response.text();

        return NextResponse.json({ reply });
    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json({
            reply: 'I apologize, but I\'m having trouble right now. Please try again in a moment or contact support@schemeindia.in for help.',
        });
    }
}
