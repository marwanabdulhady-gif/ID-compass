import React from 'react';
import { Phase, Phase1Data, Phase2Data, Phase3Data, Phase4Data, ActionMapItem } from '../types';
import { Plus, Trash2, HelpCircle } from 'lucide-react';

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

const TextArea = ({ value, onChange, placeholder, rows = 4 }: { value: string, onChange: (val: string) => void, placeholder?: string, rows?: number }) => (
    <textarea
        className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm mb-4"
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
    />
);

const Input = ({ value, onChange, placeholder }: { value: string, onChange: (val: string) => void, placeholder?: string }) => (
    <input
        type="text"
        className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm mb-4"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
    />
);

// --- Phase 1: Kickoff ---
const Phase1Inputs: React.FC<{ data: Phase1Data, onChange: (d: Phase1Data) => void }> = ({ data, onChange }) => (
    <div>
        <Label tooltip="Who is paying for this project? Who will sign off?">Stakeholders & SMEs</Label>
        <Input 
            value={data.stakeholders} 
            onChange={(v) => onChange({ ...data, stakeholders: v })} 
            placeholder="e.g., VP of Sales, Product Owner..."
        />

        <Label tooltip="What is the actual business problem? Not 'Need training'.">Business Goal (The "Why")</Label>
        <TextArea 
            value={data.businessGoal} 
            onChange={(v) => onChange({ ...data, businessGoal: v })} 
            placeholder="e.g., Reduce customer churn by 5% in Q3..."
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

        <Label tooltip="Is this lack of skill, lack of motivation, or lack of tools?">Root Cause Analysis</Label>
        <TextArea 
            value={data.rootCause} 
            onChange={(v) => onChange({ ...data, rootCause: v })} 
            placeholder="e.g., They know how, but the software is too slow (Environment gap)."
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

// Main Switcher
const PhaseInputs: React.FC<PhaseInputsProps> = ({ phase, onChange }) => {
    switch (phase.id) {
        case 1: return <Phase1Inputs data={phase.data as Phase1Data} onChange={onChange} />;
        case 2: return <Phase2Inputs data={phase.data as Phase2Data} onChange={onChange} />;
        case 3: return <Phase3Inputs data={phase.data as Phase3Data} onChange={onChange} />;
        case 4: return <Phase4Inputs data={phase.data as Phase4Data} onChange={onChange} />;
        default: return (
            <div className="text-center p-10 text-slate-400">
                Phase {phase.id} inputs under construction (MVP Scope: 1-4)
            </div>
        );
    }
};

export default PhaseInputs;