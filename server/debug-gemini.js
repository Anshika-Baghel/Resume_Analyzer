const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function diagnose() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        console.error("❌ Error: GEMINI_API_KEY is missing from .env");
        return;
    }

    console.log(`🔑 Loaded Key: ${key.substring(0, 5)}...${key.substring(key.length - 5)} (Length: ${key.length})`);

    const genAI = new GoogleGenerativeAI(key);

    try {
        console.log("📡 Attempting to list available models...");
        // Note: listModels is not directly on genAI instance in all versions, but let's try the model directly first.
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        console.log("⚡ Trying gemini-1.5-flash generation...");
        const result = await model.generateContent("Test");
        console.log("✅ Success! Response:", await result.response.text());

    } catch (error) {
        console.error("❌ Generation Failed:", error.message);

        // Detailed error info
        if (error.message.includes("404")) {
            console.log("\n⚠️  DIAGNOSIS: 404 Not Found");
            console.log("   - This usually means the API Key is valid, but the MODEL is not enabled.");
            console.log("   - OR the API Key is for 'Vertex AI' (Cloud) instead of 'AI Studio'.");
            console.log("   - OR the API Key has not propagated yet (can take 2-5 mins).");
        }
    }
}

diagnose();
