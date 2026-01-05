import { PhaseConfig, PhaseStatus, Phase, Project } from './types';

export const PHASES_CONFIG: PhaseConfig[] = [
    {
        id: 1,
        title: "1. Kickoff Meeting",
        shortTitle: "Kickoff",
        purpose: "Define the business problem, not the training solution. Align stakeholders on the 'Why'.",
        systemInstruction: "You are a Senior Instructional Designer conducting a Kickoff Meeting. Your goal is to move the user from 'We need a course' to a clear business problem definition. Ask probing questions about the true business goal and constraints. Do not accept 'Training' as a goal; the goal must be a business metric. Reference: Consulting skills.",
        initialPrompts: [
            "Help me refine my business goal.",
            "What questions should I ask the stakeholders?",
            "Critique my audience analysis."
        ]
    },
    {
        id: 2,
        title: "2. Needs Analysis",
        shortTitle: "Analysis",
        purpose: "Determine the root cause of the performance gap. Is it lack of skill, or environment/motivation?",
        systemInstruction: "You are a Performance Analyst. Use the Gilbert Behavior Engineering Model. If the user suggests training for a motivation or environment problem, push back gently. Help them distinguish between 'Know-How' gaps and 'Want-To' gaps.",
        initialPrompts: [
            "Is this a training problem?",
            "Help me identify the root cause.",
            "Suggest data collection methods."
        ]
    },
    {
        id: 3,
        title: "3. Action Mapping",
        shortTitle: "Action Map",
        purpose: "Map business goals to observable behaviors and practice activities. Avoid 'information dump'.",
        systemInstruction: "You are an expert in Cathy Moore's Action Mapping. Strictly enforce that 'Actions' must be observable behaviors, not 'Understand' or 'Know'. If a user types 'Understand', correct them. Focus on what people need to DO.",
        initialPrompts: [
            "Convert this topic into a behavior.",
            "Brainstorm practice activities for this action.",
            "Is this goal measurable?"
        ]
    },
    {
        id: 4,
        title: "4. Learning Content (SME)",
        shortTitle: "Content",
        purpose: "Curate essential information needed to perform the actions. Reduce Cognitive Load.",
        systemInstruction: "You are a Learning Scientist specializing in Cognitive Load Theory and Mayer's Multimedia Principles. Help the user strip away 'nice to have' content and keep only the 'need to have'. Flag dense text. Suggest structuring content around the actions defined in Phase 3.",
        initialPrompts: [
            "Identify extraneous cognitive load.",
            "Generate questions for the Subject Matter Expert.",
            "Summarize this raw content for a novice."
        ]
    },
    // Stubs for future phases
    { id: 5, title: "5. Learning Objectives", shortTitle: "Objectives", purpose: "Draft Bloom's Taxonomy aligned objectives.", systemInstruction: "Act as an ID expert.", initialPrompts: [] },
    { id: 6, title: "6. Design Document", shortTitle: "Design Doc", purpose: "Blueprint the learning experience.", systemInstruction: "Act as an ID expert.", initialPrompts: [] },
    { id: 7, title: "7. Project Plan", shortTitle: "Plan", purpose: "Timeline and resource allocation.", systemInstruction: "Act as a Project Manager.", initialPrompts: [] },
    { id: 8, title: "8. Storyboarding", shortTitle: "Storyboard", purpose: "Visual and text layout of screens.", systemInstruction: "Act as a UX Designer.", initialPrompts: [] },
    { id: 9, title: "9. Branching Scenarios", shortTitle: "Scenarios", purpose: "Design decision-making paths.", systemInstruction: "Act as a Game Designer.", initialPrompts: [] },
    { id: 10, title: "10. MVP Build", shortTitle: "MVP", purpose: "Rapid prototype development.", systemInstruction: "Act as a Developer.", initialPrompts: [] },
    { id: 11, title: "11. Final Build", shortTitle: "Final", purpose: "Polishing and QA.", systemInstruction: "Act as a QA Specialist.", initialPrompts: [] },
    { id: 12, title: "12. Evaluation", shortTitle: "Eval", purpose: "Kirkpatrick Levels 1-4.", systemInstruction: "Act as a Data Analyst.", initialPrompts: [] },
];

export const INITIAL_PHASE_DATA: Record<number, any> = {
    1: { projectName: "", stakeholders: "", businessGoal: "", targetAudience: "", constraints: "" },
    2: { currentPerformance: "", desiredPerformance: "", gapAnalysis: "", rootCause: "", evidence: "" },
    3: { measurableGoal: "", actions: [] },
    4: { smeQuestions: "", rawContent: "", curatedContent: "", cognitiveLoadCheck: "" }
};

export const createNewProject = (name: string): Project => {
    const phases: Phase[] = PHASES_CONFIG.map(config => ({
        id: config.id,
        title: config.title,
        description: config.purpose,
        status: PhaseStatus.NOT_STARTED,
        data: INITIAL_PHASE_DATA[config.id] || {},
        chatHistory: []
    }));

    return {
        id: crypto.randomUUID(),
        name,
        createdAt: new Date().toISOString(),
        currentPhaseId: 1,
        phases
    };
};