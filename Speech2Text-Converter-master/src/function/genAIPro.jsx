import {GenAiPro} from "../prompts/genAIPrompt";
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

const apiKeyLink = process.env.REACT_APP_GEN_AI_KEY;

const genAI = new GoogleGenerativeAI(apiKeyLink);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

const generationConfig = {
    temperature: 1,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
};

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];

const GenPro = async (text,setGeneratedText) => {
    const parts = GenAiPro(text);
    console.log(parts);
    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig,
            safetySettings,
        });
        const response = result.response;
        setGeneratedText(response.text());
    } catch (error) {
        console.error(error);
        setGeneratedText('none');
    } 
}

export default GenPro;