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

export interface ChatMessage {
    role: MessageRole;
    text: string;
    timestamp: number;
}

// Specific Phase Data Interfaces (MVP 1-4)
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

// Union type for all phase data
export type AnyPhaseData = Phase1Data | Phase2Data | Phase3Data | Phase4Data | Record<string, any>;

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