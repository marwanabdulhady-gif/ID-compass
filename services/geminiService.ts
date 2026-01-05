import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PHASES_CONFIG } from '../constants';
import { ChatMessage, MessageRole, AnyPhaseData } from '../types';

// Initialize Gemini Client
// We assume process.env.API_KEY is available as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getModel = () => {
    // Using gemini-3-flash-preview for better reasoning capabilities required for ID tasks
    return 'gemini-3-flash-preview';
};

/**
 * Generates a response from Gemini based on the current phase, phase data, and chat history.
 */
export const generateCoPilotResponse = async (
    phaseId: number,
    phaseData: AnyPhaseData,
    history: ChatMessage[],
    userMessage: string
): Promise<string> => {
    
    const phaseConfig = PHASES_CONFIG.find(p => p.id === phaseId);
    if (!phaseConfig) throw new Error("Invalid Phase ID");

    // Construct the context based on current inputs
    const contextData = JSON.stringify(phaseData, null, 2);
    
    const systemPrompt = `
    ${phaseConfig.systemInstruction}
    
    CONTEXT DATA (Current User Inputs for this phase):
    ${contextData}
    
    GUIDELINES:
    1. Keep responses concise and actionable.
    2. Do not do the work for the user immediately; ask probing questions to stimulate critical thinking (Socratic method).
    3. If the user input in the data is weak (e.g., vague learning objectives), gently critique it using ID principles.
    4. Reference specific Instructional Design frameworks (Gagne, Mayer, Gilbert, Moore) where relevant.
    `;

    // Transform chat history to Gemini format
    // We limit history to last 10 turns to save tokens and keep context fresh
    const recentHistory = history.slice(-10).map(msg => ({
        role: msg.role === MessageRole.USER ? 'user' : 'model',
        parts: [{ text: msg.text }]
    }));

    // Add the user's new message
    const contents = [
        ...recentHistory,
        {
            role: 'user',
            parts: [{ text: userMessage }]
        }
    ];

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: getModel(),
            contents: contents,
            config: {
                systemInstruction: systemPrompt,
                temperature: 0.7, // Balance creativity and adherence to frameworks
            }
        });

        return response.text || "I'm sorry, I couldn't generate a response at this time.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "I encountered an error connecting to the AI service. Please check your API key or try again.";
    }
};

/**
 * Helper to generate a structured artifact (e.g., draft objectives) based on inputs.
 */
export const generateArtifact = async (
    phaseId: number, 
    phaseData: AnyPhaseData, 
    task: string
): Promise<string> => {
    const phaseConfig = PHASES_CONFIG.find(p => p.id === phaseId);
    
    const prompt = `
    Task: ${task}
    Phase: ${phaseConfig?.title}
    Data: ${JSON.stringify(phaseData)}
    
    Please generate a draft artifact. Use markdown formatting.
    `;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: getModel(),
            contents: { role: 'user', parts: [{ text: prompt }] }
        });
        return response.text || "";
    } catch (error) {
        console.error("Artifact Gen Error:", error);
        return "";
    }
};