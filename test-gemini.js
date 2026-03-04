const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
    try {
        const genAI = new GoogleGenerativeAI('AIzaSyAMa8tc_yLfoZA5nYZFvIusiK8V27gUpYc');
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const result = await model.generateContent("Test");
        console.log("SUCCESS:", result.response.text());
    } catch (e) {
        console.error("ERROR:", e.message);
    }
}
test();
