import { genProVision } from "../prompts/genAIPrompt";
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

const apiKeyLink = process.env.REACT_APP_GEN_AI_KEY;

const genAI = new GoogleGenerativeAI(apiKeyLink);
const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

const generationConfig = {
    temperature: 1,
    topK: 32,
    topP: 1,
    maxOutputTokens: 4096,
};

const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

const GenVis = async (text,extension,file,setGeneratedText) => {
    const parts = genProVision(text, extension, file);
    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig,
            safetySettings,
        });
        const response = result.response;
        console.log(response.text());
        setGeneratedText(response.text());
    } catch (error) {
        console.error(error);
        setGeneratedText('none');
    }
}

export default GenVis;

