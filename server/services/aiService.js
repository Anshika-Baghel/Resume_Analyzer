const { GoogleGenerativeAI } = require("@google/generative-ai");
const OpenAI = require("openai");

// Groq Setup (Via OpenAI SDK)
const getGroqClient = () => {
    return new OpenAI({
        apiKey: process.env.GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1"
    });
};

// OpenAI Setup
const getOpenAIModel = () => {
    return new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
};

// Gemini Setup
const getGeminiModel = (modelName) => {
    const apiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : "";
    if (!apiKey) return null;
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({ model: modelName });
};

async function analyzeResume(resumeText, jobDescription) {
    console.log("Analyzing resume...");

    const promptConfig = `
    Act as an expert ATS (Applicant Tracking System) and HR Manager. 
    Analyze the following resume text against the provided job description.
    
    Resume Text:
    ${resumeText.substring(0, 15000)} 
    
    Job Description:
    ${jobDescription.substring(0, 5000)}
    
    Provide the output in valid JSON format ONLY, with the following structure:
    {
        "score": <number 0-100>,
        "summary": "<short professional summary of the candidate's fit>",
        "strengths": ["<strength 1>", "<strength 2>", ...],
        "weaknesses": ["<weakness 1>", ...],
        "missingSkills": ["<skill 1>", ...],
        "improvements": ["<suggestion 1>", ...]
    }
    IMPORTANT: Return ONLY the raw JSON string. Do not include markdown code blocks (like \`\`\`json).
    `;

    // 1. Try GROQ (Llama 3) First - FAST & FREE
    if (process.env.GROQ_API_KEY) {
        try {
            console.log("Attempting analysis with GROQ (Llama-3)...");
            const groq = getGroqClient();

            const completion = await groq.chat.completions.create({
                messages: [{ role: "user", content: promptConfig }],
                model: "llama-3.3-70b-versatile", // Free, fast model
                temperature: 0.1,
            });

            const text = completion.choices[0].message.content;
            const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanedText);

        } catch (error) {
            console.error("Groq Analysis Failed:", error.message);
        }
    }

    // 2. Try OpenAI (if key exists)
    if (process.env.OPENAI_API_KEY) {
        try {
            console.log("Attempting analysis with OpenAI...");
            const openai = getOpenAIModel();

            const completion = await openai.chat.completions.create({
                messages: [{ role: "user", content: promptConfig }],
                model: "gpt-3.5-turbo",
            });

            const text = completion.choices[0].message.content;
            const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanedText);

        } catch (error) {
            console.error("OpenAI failed:", error.message);
        }
    }

    // 3. Try Gemini Models
    if (process.env.GEMINI_API_KEY) {
        const geminiModels = ["gemini-1.5-flash", "gemini-pro"];
        for (const modelName of geminiModels) {
            try {
                console.log(`Attempting analysis with Gemini model: ${modelName}`);
                const model = getGeminiModel(modelName);
                if (!model) continue;

                const result = await model.generateContent(promptConfig);
                const response = await result.response;
                const text = response.text();

                const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
                return JSON.parse(cleanedText);

            } catch (error) {
                console.error(`Gemini Model ${modelName} failed:`, error.message);
            }
        }
    }

    // 4. FALLBACK: MOCK MODE
    console.warn("All AI services failed (or no keys found). Switching to MOCK MODE.");
    return mockAnalyzeResume(resumeText, jobDescription);
}

function mockAnalyzeResume(resumeText, jobDescription) {
    const score = Math.floor(Math.random() * (95 - 60) + 60);

    return {
        score: score,
        summary: "This is a simulated analysis (Mock Mode) because the AI API was unreachable. The candidate appears to have experience relevant to the job based on keyword matching.",
        strengths: [
            "Good resume structure and formatting",
            "Clear timeline of professional experience",
            "Relevant educational background detected",
            "Action verbs used effectively in descriptions"
        ],
        weaknesses: [
            "Could provide more quantifiable metrics (e.g., 'increased sales by 20%')",
            "Some technical skills from the job description are not explicitly listed"
        ],
        missingSkills: ["Specific Industry Certification", "Cloud Platform Experience (e.g. AWS/Azure)"],
        improvements: [
            "Add a 'Skills' section at the top for better ATS parsing",
            "Quantify your achievements with data",
            "Tailor the objective statement to this specific role"
        ]
    };
}

module.exports = { analyzeResume };
