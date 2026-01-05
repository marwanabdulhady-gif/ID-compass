import React from 'react';
import { Phase, Phase3Data, ActionMapItem } from '../types';
import { Layout, ArrowRight, Target, Brain, FileText } from 'lucide-react';

interface CanvasProps {
    phase: Phase;
}

const Canvas: React.FC<CanvasProps> = ({ phase }) => {
    // --- Phase 3 Visualization: Action Map Tree ---
    if (phase.id === 3) {
        const data = phase.data as Phase3Data;
        return (
            <div className="h-full overflow-y-auto p-8 bg-slate-100">
                <div className="max-w-3xl mx-auto space-y-8">
                    {/* Goal Node */}
                    <div className="flex justify-center">
                        <div className="bg-indigo-600 text-white p-6 rounded-xl shadow-lg w-64 text-center relative">
                            <Target className="mx-auto mb-2 opacity-80" size={24} />
                            <h3 className="font-bold text-sm uppercase tracking-wider mb-1">Business Goal</h3>
                            <p className="text-sm font-medium">{data.measurableGoal || "Define a goal..."}</p>
                            {/* Connector Line */}
                            {data.actions.length > 0 && (
                                <div className="absolute left-1/2 bottom-0 w-0.5 h-8 bg-slate-300 translate-y-full translate-x-[-50%]" />
                            )}
                        </div>
                    </div>

                    {/* Actions Layer */}
                    <div className="pt-8">
                        <div className="flex flex-wrap justify-center gap-6">
                            {data.actions.map((action: ActionMapItem, idx) => (
                                <div key={action.id} className="flex flex-col items-center">
                                    <div className="bg-white p-5 rounded-lg border-2 border-indigo-100 shadow-sm w-56 relative">
                                        {/* Connector from top */}
                                        <div className="absolute left-1/2 top-0 w-0.5 h-4 bg-slate-300 -translate-y-full -translate-x-1/2" />
                                        
                                        <div className="flex items-center gap-2 mb-2 text-indigo-600">
                                            <Layout size={16} />
                                            <span className="text-xs font-bold uppercase">Action {idx + 1}</span>
                                        </div>
                                        <p className="text-sm text-slate-800 font-medium">{action.behavior || "Define behavior..."}</p>

                                        {/* Branches for Activity & Info */}
                                        <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                                            <div className="bg-emerald-50 p-2 rounded border border-emerald-100">
                                                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 uppercase mb-1">
                                                    <Brain size={10} /> Practice
                                                </div>
                                                <p className="text-xs text-slate-600">{action.activity || "..."}</p>
                                            </div>
                                            <div className="bg-amber-50 p-2 rounded border border-amber-100">
                                                <div className="flex items-center gap-1 text-[10px] font-bold text-amber-700 uppercase mb-1">
                                                    <FileText size={10} /> Info
                                                </div>
                                                <p className="text-xs text-slate-600">{action.info || "..."}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- Generic Visualization for other phases (Document View) ---
    return (
        <div className="h-full overflow-y-auto p-8 bg-slate-100 flex justify-center">
            <div className="bg-white w-full max-w-[210mm] min-h-[297mm] shadow-lg p-10 text-slate-800">
                <div className="border-b border-slate-100 pb-4 mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-slate-900">{phase.title}</h1>
                    <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${
                        phase.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                        {phase.status.replace('_', ' ')}
                    </span>
                </div>

                <div className="prose prose-sm max-w-none text-slate-600 space-y-6">
                    {Object.entries(phase.data).map(([key, value]) => {
                        if (key === 'actions') return null; // Handle Action Map separately above
                        return (
                            <div key={key}>
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-1 border-l-4 border-indigo-500 pl-2">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </h3>
                                <div className="bg-slate-50 p-4 rounded border border-slate-100 whitespace-pre-wrap">
                                    {String(value) || <span className="text-slate-300 italic">Empty...</span>}
                                </div>
                            </div>
                        )
                    })}
                </div>
                
                <div className="mt-10 pt-10 border-t border-slate-100 text-center text-xs text-slate-400">
                    ID Compass Artifact - Generated {new Date().toLocaleDateString()}
                </div>
            </div>
        </div>
    );
};

export default Canvas;