import { PhaseConfig, PhaseStatus, Phase, Project, ProjectModality } from './types';

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
    { 
        id: 5, 
        title: "5. Learning Objectives", 
        shortTitle: "Objectives", 
        purpose: "Draft Bloom's Taxonomy aligned objectives.", 
        systemInstruction: "You are an expert in Bloom's Taxonomy. Ensure every objective starts with an action verb (e.g., 'Identify', 'Analyze', 'Construct'). Flag vague words like 'Know', 'Understand', or 'Learn'. Ensure objectives are measurable.", 
        initialPrompts: [
            "Suggest Bloom's verbs for 'Analysis'.",
            "Rewrite this objective to be measurable.",
            "Are these objectives too complex for beginners?"
        ] 
    },
    { 
        id: 6, 
        title: "6. Design Document", 
        shortTitle: "Design Doc", 
        purpose: "Blueprint the learning experience and define technical implementation strategy.", 
        systemInstruction: "You are a Lead Instructional Designer and Articulate Storyline Developer. Help the user create a Design Document. When discussing interactivity, specifically explain how to implement it in Storyline (e.g., 'Use a Layer for the feedback', 'Use a T/F variable to track completion', 'Use States for hover effects'). Ensure the strategy aligns with the modality.", 
        initialPrompts: [
            "Suggest a learning strategy for this audience.",
            "How do I build this interaction in Storyline?",
            "Draft an executive summary."
        ] 
    },
    { id: 7, title: "7. Project Plan", shortTitle: "Plan", purpose: "Timeline and resource allocation.", systemInstruction: "Act as a Project Manager.", initialPrompts: [] },
    { 
        id: 8, 
        title: "8. Storyboarding", 
        shortTitle: "Storyboard", 
        purpose: "Visual and text layout of screens.", 
        systemInstruction: "You are a UX/UI Designer and Instructional Designer. Help the user create a storyboard that visualizes the learning experience. Focus on visual hierarchy, screen layout, and alignment with the script. Ensure the visuals support the learning, not distract from it.", 
        initialPrompts: [
            "Suggest a visual layout for this concept.",
            "How can I visualize this abstract concept?",
            "Critique my audio script for conversational tone."
        ] 
    },
    { id: 9, title: "9. Branching Scenarios", shortTitle: "Scenarios", purpose: "Design decision-making paths.", systemInstruction: "Act as a Game Designer.", initialPrompts: [] },
    { id: 10, title: "10. MVP Build", shortTitle: "MVP", purpose: "Rapid prototype development.", systemInstruction: "Act as a Developer.", initialPrompts: [] },
    { id: 11, title: "11. Final Build", shortTitle: "Final", purpose: "Polishing and QA.", systemInstruction: "Act as a QA Specialist.", initialPrompts: [] },
    { 
        id: 12, 
        title: "12. Evaluation", 
        shortTitle: "Evaluation", 
        purpose: "Kirkpatrick Levels 1-4.", 
        systemInstruction: "You are a Data Analyst specializing in the Kirkpatrick Model. Guide the user to define metrics for Reaction (Level 1), Learning (Level 2), Behavior (Level 3), and Results (Level 4). Push them to think beyond just 'smile sheets' and assessments.", 
        initialPrompts: [
            "How can I measure behavior change?",
            "Suggest Level 2 assessment questions.",
            "What business metrics apply here?"
        ] 
    },
];

export const INITIAL_PHASE_DATA: Record<number, any> = {
    1: { projectName: "", stakeholders: "", businessGoal: "", targetAudience: "", constraints: "" },
    2: { currentPerformance: "", desiredPerformance: "", gapAnalysis: "", rootCause: "", evidence: "" },
    3: { measurableGoal: "", actions: [] },
    4: { smeQuestions: "", rawContent: "", curatedContent: "", cognitiveLoadCheck: "" },
    5: { objectives: [] },
    6: { overview: "", learningStrategy: "", technicalRequirements: "", storylineNotes: "", structure: "" },
    8: { screens: [] },
    12: { l1_reaction: "", l2_learning: "", l3_behavior: "", l4_results: "" }
};

export const createNewProject = (name: string, description: string, modality: ProjectModality, dueDate: string): Project => {
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
        description,
        modality,
        dueDate,
        createdAt: new Date().toISOString(),
        currentPhaseId: 1,
        phases
    };
};