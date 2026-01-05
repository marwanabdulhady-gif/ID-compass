import React from 'react';
import { Phase, Phase1Data, Phase2Data, Phase3Data, Phase4Data, Phase5Data, Phase6Data, Phase8Data, Phase12Data, ActionMapItem, StoryboardScreen, ScreenType, ObjectiveItem, BloomsLevel } from '../types';
import { Plus, Trash2, HelpCircle, LayoutTemplate, Lightbulb, ExternalLink, FileType, CheckSquare, PlayCircle, Monitor, Menu as MenuIcon, BookOpen, Target, BarChart3 } from 'lucide-react';

interface PhaseInputsProps {
    phase: Phase;
    onChange: (data: any) => void;
}

// Reusable Components
const Label = ({ children, tooltip }: { children?: React.ReactNode, tooltip?: string }) => (
    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
        {children}
        {tooltip && <HelpCircle size={12} className="text-slate-300 cursor-help" title={tooltip} />}
    </label>
);

interface InputProps {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
    rows?: number;
    suggestions?: string[];
}

const TextArea = ({ value, onChange, placeholder, rows = 4, suggestions }: InputProps) => (
    <div className="mb-4">
        <textarea
            className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
            rows={rows}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
        />
        {suggestions && suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
                <div className="flex items-center gap-1 text-[10px] text-amber-600 font-bold uppercase"><Lightbulb size={10} /> Ideas:</div>
                {suggestions.map((s, i) => (
                    <button 
                        key={i}
                        onClick={() => onChange(s)}
                        className="text-[10px] px-2 py-1 bg-amber-50 text-amber-800 border border-amber-100 rounded-full hover:bg-amber-100 transition-colors truncate max-w-[200px]"
                        title={s}
                    >
                        {s}
                    </button>
                ))}
            </div>
        )}
    </div>
);

const Input = ({ value, onChange, placeholder, suggestions }: InputProps) => (
    <div className="mb-4">
        <input
            type="text"
            className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
        />
         {suggestions && suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
                <div className="flex items-center gap-1 text-[10px] text-amber-600 font-bold uppercase"><Lightbulb size={10} /> Ideas:</div>
                {suggestions.map((s, i) => (
                    <button 
                        key={i}
                        onClick={() => onChange(s)}
                        className="text-[10px] px-2 py-1 bg-amber-50 text-amber-800 border border-amber-100 rounded-full hover:bg-amber-100 transition-colors"
                    >
                        {s}
                    </button>
                ))}
            </div>
        )}
    </div>
);

// --- Phase 1: Kickoff ---
const Phase1Inputs: React.FC<{ data: Phase1Data, onChange: (d: Phase1Data) => void }> = ({ data, onChange }) => (
    <div>
        <Label tooltip="Who is paying for this project? Who will sign off?">Stakeholders & SMEs</Label>
        <Input 
            value={data.stakeholders} 
            onChange={(v) => onChange({ ...data, stakeholders: v })} 
            placeholder="e.g., VP of Sales, Product Owner..."
            suggestions={["Sales Director", "HR Business Partner", "Customer Support Lead", "Product Manager"]}
        />

        <Label tooltip="What is the actual business problem? Not 'Need training'.">Business Goal (The "Why")</Label>
        <TextArea 
            value={data.businessGoal} 
            onChange={(v) => onChange({ ...data, businessGoal: v })} 
            placeholder="e.g., Reduce customer churn by 5% in Q3..."
            suggestions={[
                "Reduce handling time by 10%",
                "Increase software adoption by 20%",
                "Decrease safety incidents by 50%",
                "Improve customer satisfaction (CSAT) score to 4.5"
            ]}
        />

        <Label tooltip="Who are they? What do they already know?">Target Audience</Label>
        <TextArea 
            value={data.targetAudience} 
            onChange={(v) => onChange({ ...data, targetAudience: v })} 
            placeholder="e.g., Junior Sales Reps, < 1 year experience, highly motivated..."
        />

        <Label tooltip="Budget, Deadline, LMS restrictions, Mobile-first?">Constraints</Label>
        <TextArea 
            value={data.constraints} 
            onChange={(v) => onChange({ ...data, constraints: v })} 
            placeholder="e.g., Must act on mobile, due in 2 weeks, no budget for video..."
            suggestions={["Mobile-first", "No audio allowed", "Strict 2-week deadline", "Scorm 1.2 only"]}
        />
    </div>
);

// --- Phase 2: Needs Analysis ---
const Phase2Inputs: React.FC<{ data: Phase2Data, onChange: (d: Phase2Data) => void }> = ({ data, onChange }) => (
    <div>
        <Label>Current Performance (Status Quo)</Label>
        <TextArea 
            value={data.currentPerformance} 
            onChange={(v) => onChange({ ...data, currentPerformance: v })} 
            placeholder="What are they doing now that is wrong/insufficient?"
        />

        <Label>Desired Performance</Label>
        <TextArea 
            value={data.desiredPerformance} 
            onChange={(v) => onChange({ ...data, desiredPerformance: v })} 
            placeholder="What does 'Good' look like specifically?"
        />

        <div className="bg-orange-50 p-3 border border-orange-100 rounded-lg mb-4">
            <Label tooltip="Summarize the difference between Current and Desired">The Gap</Label>
            <TextArea 
                value={data.gapAnalysis} 
                onChange={(v) => onChange({ ...data, gapAnalysis: v })} 
                placeholder="The specific gap to be bridged..."
                rows={2}
            />
        </div>

        <Label tooltip="Is this lack of skill, lack of motivation, or lack of tools?">Root Cause Analysis</Label>
        <TextArea 
            value={data.rootCause} 
            onChange={(v) => onChange({ ...data, rootCause: v })} 
            placeholder="e.g., They know how, but the software is too slow (Environment gap)."
            suggestions={["Knowledge Gap", "Skill Gap", "Motivation Gap", "Environment/Tooling Gap"]}
        />

        <Label>Evidence / Data Source</Label>
        <Input 
            value={data.evidence} 
            onChange={(v) => onChange({ ...data, evidence: v })} 
            placeholder="e.g., Interviews, Observation, Ticket Analysis"
        />
    </div>
);

// --- Phase 3: Action Map ---
const Phase3Inputs: React.FC<{ data: Phase3Data, onChange: (d: Phase3Data) => void }> = ({ data, onChange }) => {
    const addAction = () => {
        const newItem: ActionMapItem = {
            id: crypto.randomUUID(),
            behavior: "",
            activity: "",
            info: ""
        };
        onChange({ ...data, actions: [...data.actions, newItem] });
    };

    const updateAction = (id: string, field: keyof ActionMapItem, val: string) => {
        const newActions = data.actions.map(a => a.id === id ? { ...a, [field]: val } : a);
        onChange({ ...data, actions: newActions });
    };

    const removeAction = (id: string) => {
        onChange({ ...data, actions: data.actions.filter(a => a.id !== id) });
    };

    return (
        <div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                <Label tooltip="This should match the goal from Phase 1, but refined.">Measurable Business Goal</Label>
                <Input 
                    value={data.measurableGoal} 
                    onChange={(v) => onChange({ ...data, measurableGoal: v })} 
                    placeholder="e.g., Decrease handling time by 30s"
                />
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-800">Key Behaviors (What must they DO?)</h4>
                    <button onClick={addAction} className="flex items-center gap-1 text-xs text-blue-600 font-medium hover:text-blue-800">
                        <Plus size={14} /> Add Behavior
                    </button>
                </div>

                {data.actions.length === 0 && (
                    <div className="text-center p-6 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 text-sm">
                        No actions mapped yet. Click "Add Behavior" to start.
                    </div>
                )}

                {data.actions.map((action, idx) => (
                    <div key={action.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm relative group">
                        <button 
                            onClick={() => removeAction(action.id)}
                            className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 size={16} />
                        </button>
                        <div className="mb-1 text-xs text-blue-600 font-semibold">Action #{idx + 1}</div>
                        
                        <Label>Behavior (Observable)</Label>
                        <Input 
                            value={action.behavior} 
                            onChange={(v) => updateAction(action.id, 'behavior', v)} 
                            placeholder="e.g., Ask the customer for their policy number"
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label tooltip="How will they practice this?">Practice Activity</Label>
                                <textarea 
                                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-xs min-h-[60px]"
                                    value={action.activity}
                                    onChange={(e) => updateAction(action.id, 'activity', e.target.value)}
                                    placeholder="Simulated call scenario..."
                                />
                            </div>
                            <div>
                                <Label tooltip="Minimal info needed to succeed">Minimum Info</Label>
                                <textarea 
                                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-xs min-h-[60px]"
                                    value={action.info}
                                    onChange={(e) => updateAction(action.id, 'info', e.target.value)}
                                    placeholder="Policy retrieval steps..."
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Phase 4: Content w/ SME ---
const Phase4Inputs: React.FC<{ data: Phase4Data, onChange: (d: Phase4Data) => void }> = ({ data, onChange }) => (
    <div>
        <Label tooltip="Questions to extract tacit knowledge">Questions for SME</Label>
        <TextArea 
            value={data.smeQuestions} 
            onChange={(v) => onChange({ ...data, smeQuestions: v })} 
            placeholder="Draft interview questions here..."
        />

        <Label tooltip="Paste the raw info here">Raw Source Material</Label>
        <TextArea 
            value={data.rawContent} 
            onChange={(v) => onChange({ ...data, rawContent: v })} 
            placeholder="Paste raw text, links, or notes..."
            rows={8}
        />

        <div className="h-px bg-slate-200 my-4" />

        <Label tooltip="Refined content stripped of fluff">Curated / Simplified Content</Label>
        <TextArea 
            value={data.curatedContent} 
            onChange={(v) => onChange({ ...data, curatedContent: v })} 
            placeholder="The refined 'Need to Know' content goes here..."
            rows={8}
        />
    </div>
);

// --- Phase 5: Learning Objectives ---
const Phase5Inputs: React.FC<{ data: Phase5Data, onChange: (d: Phase5Data) => void }> = ({ data, onChange }) => {
    const addObjective = () => {
        const newItem: ObjectiveItem = {
            id: crypto.randomUUID(),
            text: "",
            level: 'Understand'
        };
        onChange({ ...data, objectives: [...(data.objectives || []), newItem] });
    };

    const updateObjective = (id: string, field: keyof ObjectiveItem, val: string) => {
        const newObjs = (data.objectives || []).map(o => o.id === id ? { ...o, [field]: val } : o);
        onChange({ ...data, objectives: newObjs });
    };

    const removeObjective = (id: string) => {
        onChange({ ...data, objectives: (data.objectives || []).filter(o => o.id !== id) });
    };

    const levels: BloomsLevel[] = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'];

    return (
        <div>
             <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-slate-800">Learning Objectives</h4>
                <button onClick={addObjective} className="flex items-center gap-1 text-xs text-indigo-600 font-medium hover:text-indigo-800">
                    <Plus size={14} /> Add Objective
                </button>
            </div>

            <div className="space-y-4">
                {(data.objectives || []).map((obj, idx) => (
                    <div key={obj.id} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm relative group">
                        <button 
                            onClick={() => removeObjective(obj.id)}
                            className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 size={16} />
                        </button>
                        
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-500 uppercase">Objective #{idx + 1}</span>
                                <select 
                                    value={obj.level}
                                    onChange={(e) => updateObjective(obj.id, 'level', e.target.value)}
                                    className="text-xs border-none bg-slate-100 rounded px-2 py-1 text-slate-700 font-medium focus:ring-0"
                                >
                                    {levels.map(l => <option key={l} value={l}>{l}</option>)}
                                </select>
                            </div>
                            <textarea
                                className="w-full text-sm border-slate-200 rounded p-2 focus:ring-indigo-500"
                                rows={2}
                                value={obj.text}
                                onChange={(e) => updateObjective(obj.id, 'text', e.target.value)}
                                placeholder="By the end of this course, learners will be able to..."
                            />
                        </div>
                    </div>
                ))}
                {(data.objectives || []).length === 0 && (
                    <div className="text-center text-slate-400 text-sm py-8 border-2 border-dashed border-slate-200 rounded-lg">
                        No objectives defined yet.
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Phase 6: Design Doc ---
const Phase6Inputs: React.FC<{ data: Phase6Data, onChange: (d: Phase6Data) => void }> = ({ data, onChange }) => (
    <div>
        <Label>Executive Overview</Label>
        <TextArea 
            value={data.overview} 
            onChange={(v) => onChange({ ...data, overview: v })} 
            placeholder="High-level summary of the training solution..."
            rows={3}
        />

        <Label>Learning Strategy</Label>
        <TextArea 
            value={data.learningStrategy} 
            onChange={(v) => onChange({ ...data, learningStrategy: v })} 
            placeholder="e.g., Scenario-based learning with branched decision paths..."
            suggestions={["Scenario-Based Learning", "Gamification", "Microlearning Series", "Simulation", "Guided Discovery"]}
        />

        <Label>Structure / Flow</Label>
        <TextArea 
            value={data.structure} 
            onChange={(v) => onChange({ ...data, structure: v })} 
            placeholder="Module 1 -> Quiz -> Module 2..."
        />

        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 my-4">
            <div className="flex items-center gap-2 mb-2 text-indigo-700 font-bold text-xs uppercase">
                <ExternalLink size={12} /> Articulate Storyline Implementation
            </div>
            <Label tooltip="Specific dev notes: Triggers, Layers, Variables">Dev Notes</Label>
            <TextArea 
                value={data.storylineNotes} 
                onChange={(v) => onChange({ ...data, storylineNotes: v })} 
                placeholder="e.g., Use 'visited' state for menu completion. Use a T/F variable 'CourseComplete' for LMS reporting..."
                rows={6}
                suggestions={[
                    "Use Object States for hover/visited effects",
                    "Use Layers for feedback popups",
                    "Use Variables for gamified scoring",
                    "Use Sliders for interactive data exploration",
                    "Use Lightbox for glossary terms"
                ]}
            />
        </div>

        <Label>Technical Requirements</Label>
        <Input 
            value={data.technicalRequirements} 
            onChange={(v) => onChange({ ...data, technicalRequirements: v })} 
            placeholder="LMS Standard (SCORM 1.2/2004, xAPI), Browser support..."
            suggestions={["SCORM 1.2", "SCORM 2004 4th Ed", "xAPI / TinCan", "HTML5 Only", "WCAG 2.1 AA Compliant"]}
        />
    </div>
);

// --- Phase 8: Storyboarding ---
const Phase8Inputs: React.FC<{ data: Phase8Data, onChange: (d: Phase8Data) => void }> = ({ data, onChange }) => {
    const addScreen = () => {
        const newScreen: StoryboardScreen = {
            id: crypto.randomUUID(),
            title: `Screen ${data.screens ? data.screens.length + 1 : 1}`,
            type: 'Content',
            visualDescription: "",
            audioScript: "",
            interactionNote: ""
        };
        const screens = data.screens || [];
        onChange({ ...data, screens: [...screens, newScreen] });
    };

    const updateScreen = (id: string, field: keyof StoryboardScreen, val: string) => {
        const screens = data.screens || [];
        const newScreens = screens.map(s => s.id === id ? { ...s, [field]: val } : s);
        onChange({ ...data, screens: newScreens });
    };

    const removeScreen = (id: string) => {
        const screens = data.screens || [];
        onChange({ ...data, screens: screens.filter(s => s.id !== id) });
    };

    const screens = data.screens || [];

    const screenTypes: {type: ScreenType, icon: React.ReactNode, label: string}[] = [
        { type: 'Title', icon: <BookOpen size={14} />, label: 'Title' },
        { type: 'Menu', icon: <MenuIcon size={14} />, label: 'Menu' },
        { type: 'Content', icon: <Monitor size={14} />, label: 'Content' },
        { type: 'Interaction', icon: <LayoutTemplate size={14} />, label: 'Interact' },
        { type: 'Quiz', icon: <CheckSquare size={14} />, label: 'Quiz' },
        { type: 'Video', icon: <PlayCircle size={14} />, label: 'Video' },
    ];

    return (
        <div>
             <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-slate-800">Storyboard Screens</h4>
                <button onClick={addScreen} className="flex items-center gap-1 text-xs text-indigo-600 font-medium hover:text-indigo-800">
                    <Plus size={14} /> Add Screen
                </button>
            </div>

            {screens.length === 0 && (
                <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 text-sm">
                    No screens yet. <br/>Start visualizing the course flow.
                </div>
            )}

            <div className="space-y-8">
                {screens.map((screen, idx) => (
                    <div key={screen.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm relative group">
                         <button 
                            onClick={() => removeScreen(screen.id)}
                            className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 size={16} />
                        </button>
                        
                        <div className="mb-3">
                             <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-slate-500 uppercase">Screen #{idx + 1}</span>
                                <div className="flex bg-slate-100 rounded p-0.5">
                                    {screenTypes.map(t => (
                                        <button
                                            key={t.type}
                                            onClick={() => updateScreen(screen.id, 'type', t.type)}
                                            className={`p-1.5 rounded text-xs transition-all ${screen.type === t.type ? 'bg-white shadow text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                                            title={t.label}
                                        >
                                            {t.icon}
                                        </button>
                                    ))}
                                </div>
                             </div>
                             <input 
                                className="font-semibold text-sm text-slate-800 border-none p-0 focus:ring-0 w-full placeholder-slate-400"
                                value={screen.title}
                                onChange={(e) => updateScreen(screen.id, 'title', e.target.value)}
                                placeholder="Screen Title..."
                            />
                        </div>

                        <Label>Visual Description</Label>
                        <TextArea 
                            value={screen.visualDescription} 
                            onChange={(v) => updateScreen(screen.id, 'visualDescription', v)} 
                            placeholder="What is on screen? Images, layout..."
                            rows={3}
                        />

                        <Label>Audio / Text Script</Label>
                        <TextArea 
                            value={screen.audioScript} 
                            onChange={(v) => updateScreen(screen.id, 'audioScript', v)} 
                            placeholder="Narration or on-screen text..."
                            rows={3}
                        />

                        <Label>Interaction Notes</Label>
                        <Input 
                            value={screen.interactionNote} 
                            onChange={(v) => updateScreen(screen.id, 'interactionNote', v)} 
                            placeholder="User clicks Next, User drags item..."
                            suggestions={["User clicks Next", "User hovers over icon", "User drags item to dropzone", "Timeline ends"]}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Phase 12: Evaluation ---
const Phase12Inputs: React.FC<{ data: Phase12Data, onChange: (d: Phase12Data) => void }> = ({ data, onChange }) => (
    <div>
        <div className="bg-indigo-50 border border-indigo-100 p-3 rounded mb-4">
            <h4 className="text-xs font-bold text-indigo-800 uppercase mb-1">Kirkpatrick Model</h4>
            <p className="text-xs text-indigo-600">Define how you will measure success at all 4 levels.</p>
        </div>

        <Label tooltip="Level 1: Did they like it?">Reaction</Label>
        <TextArea 
            value={data.l1_reaction} 
            onChange={(v) => onChange({ ...data, l1_reaction: v })} 
            placeholder="e.g., Post-course survey (Smile sheet), CSAT score..."
            suggestions={["NPS Score", "Course Rating (1-5)", "Relevance rating"]}
            rows={3}
        />

        <Label tooltip="Level 2: Did they learn it?">Learning</Label>
        <TextArea 
            value={data.l2_learning} 
            onChange={(v) => onChange({ ...data, l2_learning: v })} 
            placeholder="e.g., Pre/Post test, Simulation score, Skill demonstration..."
            suggestions={["Pre/Post Quiz", "Final Assessment > 80%", "Simulation Pass/Fail"]}
            rows={3}
        />

        <Label tooltip="Level 3: Did they do it?">Behavior</Label>
        <TextArea 
            value={data.l3_behavior} 
            onChange={(v) => onChange({ ...data, l3_behavior: v })} 
            placeholder="e.g., Observation checklist 30 days later, QA score improvement..."
            rows={3}
        />

        <Label tooltip="Level 4: Did it matter?">Results</Label>
        <TextArea 
            value={data.l4_results} 
            onChange={(v) => onChange({ ...data, l4_results: v })} 
            placeholder="e.g., ROI, Reduced churn, Increased sales volume..."
            rows={3}
        />
    </div>
);

// Main Switcher
const PhaseInputs: React.FC<PhaseInputsProps> = ({ phase, onChange }) => {
    switch (phase.id) {
        case 1: return <Phase1Inputs data={phase.data as Phase1Data} onChange={onChange} />;
        case 2: return <Phase2Inputs data={phase.data as Phase2Data} onChange={onChange} />;
        case 3: return <Phase3Inputs data={phase.data as Phase3Data} onChange={onChange} />;
        case 4: return <Phase4Inputs data={phase.data as Phase4Data} onChange={onChange} />;
        case 5: return <Phase5Inputs data={phase.data as Phase5Data} onChange={onChange} />;
        case 6: return <Phase6Inputs data={phase.data as Phase6Data} onChange={onChange} />;
        case 8: return <Phase8Inputs data={phase.data as Phase8Data} onChange={onChange} />;
        case 12: return <Phase12Inputs data={phase.data as Phase12Data} onChange={onChange} />;
        default: return (
            <div className="text-center p-10 text-slate-400">
                Phase {phase.id} inputs under construction <br/> (Generic view active)
            </div>
        );
    }
};

export default PhaseInputs;