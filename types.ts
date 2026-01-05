// Global Types

export enum PhaseStatus {
    NOT_STARTED = 'NOT_STARTED',
    DRAFT = 'DRAFT',
    NEEDS_REVIEW = 'NEEDS_REVIEW',
    APPROVED = 'APPROVED'
}

export enum MessageRole {
    USER = 'user',
    MODEL = 'model'
}

export type ProjectModality = 'eLearning' | 'ILT' | 'VILT' | 'Hybrid' | 'Microlearning' | 'Video';

export interface ChatMessage {
    role: MessageRole;
    text: string;
    timestamp: number;
}

// Specific Phase Data Interfaces (MVP 1-4 + 6 + 8)
export interface Phase1Data { // Kickoff
    projectName: string;
    stakeholders: string;
    businessGoal: string; // The "Why"
    targetAudience: string;
    constraints: string; // Time, budget, tech
}

export interface Phase2Data { // Needs Analysis
    currentPerformance: string;
    desiredPerformance: string;
    gapAnalysis: string;
    rootCause: string; // Knowledge vs Environment
    evidence: string;
}

export interface ActionMapItem {
    id: string;
    behavior: string; // Observable action
    activity: string; // Practice activity
    info: string; // Minimum info needed
}

export interface Phase3Data { // Action Map
    measurableGoal: string; // Refined from Phase 1
    actions: ActionMapItem[];
}

export interface Phase4Data { // Content w/ SME
    smeQuestions: string;
    rawContent: string;
    curatedContent: string;
    cognitiveLoadCheck: string;
}

export type BloomsLevel = 'Remember' | 'Understand' | 'Apply' | 'Analyze' | 'Evaluate' | 'Create';

export interface ObjectiveItem {
    id: string;
    text: string;
    level: BloomsLevel;
}

export interface Phase5Data { // Learning Objectives
    objectives: ObjectiveItem[];
}

export interface Phase6Data { // Design Doc
    overview: string;
    learningStrategy: string; // e.g., Scenario-based, Game-based
    technicalRequirements: string;
    storylineNotes: string; // Specific implementation details
    structure: string; // Module flow
}

export type ScreenType = 'Title' | 'Menu' | 'Content' | 'Interaction' | 'Quiz' | 'Video' | 'Summary';

export interface StoryboardScreen {
    id: string;
    title: string;
    type: ScreenType;
    visualDescription: string;
    audioScript: string;
    interactionNote: string;
}

export interface Phase8Data { // Storyboarding
    screens: StoryboardScreen[];
}

export interface Phase12Data { // Evaluation
    l1_reaction: string; // Smile sheets
    l2_learning: string; // Assessments
    l3_behavior: string; // On the job
    l4_results: string; // Business impact
}

// Union type for all phase data
export type AnyPhaseData = Phase1Data | Phase2Data | Phase3Data | Phase4Data | Phase5Data | Phase6Data | Phase8Data | Phase12Data | Record<string, any>;

export interface Phase {
    id: number;
    title: string;
    description: string;
    status: PhaseStatus;
    data: AnyPhaseData;
    chatHistory: ChatMessage[];
}

export interface Project {
    id: string;
    name: string;
    description: string;
    modality: ProjectModality;
    dueDate: string;
    createdAt: string;
    currentPhaseId: number;
    phases: Phase[];
}

export interface PhaseConfig {
    id: number;
    title: string;
    shortTitle: string;
    purpose: string;
    systemInstruction: string;
    initialPrompts: string[];
}