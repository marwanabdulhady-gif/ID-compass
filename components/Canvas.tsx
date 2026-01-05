import React from 'react';
import { Phase, Phase1Data, Phase2Data, Phase3Data, Phase4Data, Phase5Data, Phase6Data, Phase8Data, Phase12Data, ActionMapItem, StoryboardScreen, ScreenType, ObjectiveItem } from '../types';
import { 
    Layout, ArrowRight, Target, Brain, FileText, Activity, AlertTriangle, 
    Monitor, Volume2, MousePointer2, Layers, Cog, Menu, PlayCircle, 
    CheckSquare, BookOpen, LayoutTemplate, Users, Briefcase, Clock, 
    Filter, Scissors, ScrollText, BarChart3, TrendingUp, ThumbsUp, GraduationCap
} from 'lucide-react';

interface CanvasProps {
    phase: Phase;
}

const Canvas: React.FC<CanvasProps> = ({ phase }) => {

    // --- Phase 1: Kickoff Visualization (Project Charter) ---
    if (phase.id === 1) {
        const data = phase.data as Phase1Data;
        return (
            <div className="h-full overflow-y-auto p-4 md:p-8 bg-slate-100 custom-scrollbar">
                <div className="max-w-5xl mx-auto space-y-6">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-800">Project Charter</h2>
                        <p className="text-slate-500">Mission & Constraints</p>
                    </div>

                    {/* Business Goal - The North Star */}
                    <div className="bg-indigo-600 rounded-xl p-8 text-white shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                            <Target size={140} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2 text-indigo-200 uppercase text-xs font-bold tracking-wider">
                                <Briefcase size={14} /> Business Goal
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                                {data.businessGoal || "Define the business goal to see it here..."}
                            </h3>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Audience */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-2 mb-4 text-blue-600">
                                <Users size={20} />
                                <h4 className="font-bold text-lg">Target Audience</h4>
                            </div>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                                {data.targetAudience || "Who is this for?"}
                            </p>
                        </div>

                        {/* Stakeholders */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                             <div className="flex items-center gap-2 mb-4 text-emerald-600">
                                <Briefcase size={20} />
                                <h4 className="font-bold text-lg">Stakeholders</h4>
                            </div>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                                {data.stakeholders || "Who is signing off?"}
                            </p>
                        </div>
                    </div>

                    {/* Constraints */}
                    <div className="bg-amber-50 border border-amber-100 p-6 rounded-xl relative overflow-hidden">
                        <div className="absolute right-4 top-4 opacity-5 text-amber-900">
                            <Clock size={80} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3 text-amber-700">
                                <AlertTriangle size={20} />
                                <h4 className="font-bold text-lg">Constraints & Risks</h4>
                            </div>
                             <p className="text-slate-700 leading-relaxed whitespace-pre-wrap font-medium">
                                {data.constraints || "Timeline, budget, or technical limitations..."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    // --- Phase 2: Needs Analysis Visualization (The "Response") ---
    if (phase.id === 2) {
        const data = phase.data as Phase2Data;
        return (
            <div className="h-full overflow-y-auto p-4 md:p-8 bg-slate-100 custom-scrollbar">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8 text-center">
                        <h2 className="text-xl font-bold text-slate-800">Needs Analysis Report</h2>
                        <p className="text-slate-500 text-sm mt-1">Performance Gap & Root Cause</p>
                    </div>

                    {/* Visual Comparison */}
                    <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 mb-10">
                        {/* Current State */}
                        <div className="flex-1 bg-red-50 border border-red-100 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-3 text-red-700 font-bold uppercase text-xs tracking-wider">
                                <Activity size={16} /> Current State
                            </div>
                            <div className="text-slate-700 whitespace-pre-wrap min-h-[100px]">
                                {data.currentPerformance || "Describe what is happening now..."}
                            </div>
                        </div>

                        {/* Arrow */}
                        <div className="flex flex-col items-center justify-center text-slate-400">
                            <ArrowRight size={32} className="rotate-90 md:rotate-0 my-2 md:my-0" />
                            <div className="text-[10px] font-bold uppercase mt-1">The Gap</div>
                        </div>

                        {/* Desired State */}
                        <div className="flex-1 bg-green-50 border border-green-100 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-3 text-green-700 font-bold uppercase text-xs tracking-wider">
                                <Target size={16} /> Desired State
                            </div>
                            <div className="text-slate-700 whitespace-pre-wrap min-h-[100px]">
                                {data.desiredPerformance || "Describe what should be happening..."}
                            </div>
                        </div>
                    </div>

                    {/* Gap Statement */}
                    <div className="bg-white border-l-4 border-orange-400 shadow-md rounded-r-xl p-6 mb-8">
                        <h3 className="text-orange-600 font-bold text-sm uppercase mb-2 flex items-center gap-2">
                            <AlertTriangle size={16} /> Identified Gap
                        </h3>
                        <p className="text-lg text-slate-800 font-medium leading-relaxed">
                            {data.gapAnalysis || "Gap Analysis will appear here..."}
                        </p>
                    </div>

                    {/* Root Cause & Evidence */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h4 className="font-bold text-slate-900 mb-3 text-sm">Root Cause</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">{data.rootCause || "Defining root cause..."}</p>
                        </div>
                         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h4 className="font-bold text-slate-900 mb-3 text-sm">Evidence</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">{data.evidence || "Sources of data..."}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- Phase 3 Visualization: Action Map Tree ---
    if (phase.id === 3) {
        const data = phase.data as Phase3Data;
        return (
            <div className="h-full overflow-y-auto p-4 md:p-8 bg-slate-100 custom-scrollbar">
                <div className="max-w-3xl mx-auto space-y-8">
                    {/* Goal Node */}
                    <div className="flex justify-center">
                        <div className="bg-indigo-600 text-white p-6 rounded-xl shadow-lg w-full md:w-64 text-center relative">
                            <Target className="mx-auto mb-2 opacity-80" size={24} />
                            <h3 className="font-bold text-sm uppercase tracking-wider mb-1">Business Goal</h3>
                            <p className="text-sm font-medium">{data.measurableGoal || "Define a goal..."}</p>
                            {/* Connector Line (Desktop Only) */}
                            {data.actions.length > 0 && (
                                <div className="hidden md:block absolute left-1/2 bottom-0 w-0.5 h-8 bg-slate-300 translate-y-full translate-x-[-50%]" />
                            )}
                        </div>
                    </div>

                    {/* Actions Layer */}
                    <div className="pt-4 md:pt-8">
                        <div className="flex flex-wrap justify-center gap-6">
                            {data.actions.map((action: ActionMapItem, idx) => (
                                <div key={action.id} className="flex flex-col items-center w-full md:w-auto">
                                    <div className="bg-white p-5 rounded-lg border-2 border-indigo-100 shadow-sm w-full md:w-56 relative">
                                        {/* Connector from top (Desktop Only) */}
                                        <div className="hidden md:block absolute left-1/2 top-0 w-0.5 h-4 bg-slate-300 -translate-y-full -translate-x-1/2" />
                                        
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

    // --- Phase 4: Content Visualization (Distillation) ---
    if (phase.id === 4) {
        const data = phase.data as Phase4Data;
        return (
            <div className="h-full overflow-y-auto p-4 md:p-8 bg-slate-100 custom-scrollbar">
                 <div className="max-w-6xl mx-auto h-full flex flex-col">
                    <div className="text-center mb-6 shrink-0">
                        <h2 className="text-2xl font-bold text-slate-800">Content Distillation</h2>
                        <p className="text-slate-500">Separating "Nice to Know" from "Need to Know"</p>
                    </div>
    
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-start">
                        
                        {/* Raw Input */}
                        <div className="bg-slate-200 rounded-xl p-6 min-h-[400px] flex flex-col border border-slate-300 shadow-inner">
                             <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-300">
                                <div className="flex items-center gap-2 text-slate-600 font-bold">
                                    <ScrollText size={20} /> Raw Source
                                </div>
                                <span className="text-xs bg-slate-300 text-slate-600 px-2 py-1 rounded-full font-bold">High Load</span>
                            </div>
                            <div className="flex-1 whitespace-pre-wrap text-sm text-slate-600 font-mono opacity-80 leading-relaxed overflow-y-auto custom-scrollbar">
                                 {data.rawContent || "Paste source material in the inputs to see it here..."}
                            </div>
                        </div>
    
                        {/* Filter Visual */}
                        <div className="hidden md:flex flex-col items-center justify-center h-full gap-4 text-indigo-400 pt-20">
                            <div className="h-20 w-0.5 bg-gradient-to-b from-transparent via-slate-300 to-slate-300 dashed"></div>
                            <div className="bg-white p-4 rounded-full shadow-lg z-10 border border-slate-100">
                                <Filter size={24} className="text-indigo-600" />
                            </div>
                            <div className="bg-white p-3 rounded-full shadow-md z-10 border border-slate-100">
                                <Scissors size={20} className="text-pink-500" />
                            </div>
                             <div className="h-20 w-0.5 bg-gradient-to-b from-slate-300 via-slate-300 to-transparent dashed"></div>
                        </div>
    
                        {/* Curated Output */}
                        <div className="bg-white rounded-xl p-6 min-h-[400px] flex flex-col shadow-xl border-t-4 border-indigo-500">
                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                                <div className="flex items-center gap-2 text-indigo-700 font-bold">
                                    <Brain size={20} /> Curated Content
                                </div>
                                 <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full font-bold">Optimized</span>
                            </div>
                            <div className="flex-1 whitespace-pre-wrap text-base text-slate-800 leading-relaxed overflow-y-auto custom-scrollbar">
                                {data.curatedContent || "Refined, low-cognitive-load content will appear here..."}
                            </div>
                             {data.smeQuestions && (
                                <div className="mt-4 pt-4 border-t border-slate-100">
                                    <div className="text-xs font-bold text-amber-600 mb-2 uppercase flex items-center gap-1">
                                        <Briefcase size={12} /> Pending SME Questions
                                    </div>
                                    <div className="text-sm text-slate-600 italic bg-amber-50 p-3 rounded border border-amber-100">
                                        {data.smeQuestions}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // --- Phase 5: Learning Objectives (Bloom's Taxonomy Cards) ---
    if (phase.id === 5) {
        const data = phase.data as Phase5Data;
        const objectives = data.objectives || [];

        // Color coding for Bloom's Levels
        const getBloomColor = (level: string) => {
            switch(level) {
                case 'Remember': return 'bg-slate-100 text-slate-700 border-slate-200';
                case 'Understand': return 'bg-blue-50 text-blue-700 border-blue-200';
                case 'Apply': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
                case 'Analyze': return 'bg-amber-50 text-amber-700 border-amber-200';
                case 'Evaluate': return 'bg-orange-50 text-orange-700 border-orange-200';
                case 'Create': return 'bg-purple-50 text-purple-700 border-purple-200';
                default: return 'bg-slate-50 text-slate-600';
            }
        };

        return (
            <div className="h-full overflow-y-auto p-4 md:p-8 bg-slate-100 custom-scrollbar">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8 text-center">
                        <h2 className="text-xl font-bold text-slate-800">Learning Objectives</h2>
                        <p className="text-slate-500 text-sm mt-1">Bloom's Taxonomy Framework</p>
                    </div>

                    {objectives.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50">
                            <Target size={48} className="text-slate-300 mb-4" />
                            <p className="text-slate-500 font-medium">No objectives defined yet.</p>
                            <p className="text-xs text-slate-400 mt-1">Use the panel on the left to add specific, measurable objectives.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {objectives.map((obj, idx) => (
                                <div key={obj.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4 transition-transform hover:-translate-y-1">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Objective {idx + 1}</span>
                                            <span className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full border ${getBloomColor(obj.level)}`}>
                                                {obj.level}
                                            </span>
                                        </div>
                                        <p className="text-lg text-slate-800 font-medium leading-relaxed">
                                            {obj.text || <span className="text-slate-300 italic">...</span>}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )
    }

    // --- Phase 6: Design Doc Visualization ---
    if (phase.id === 6) {
        const data = phase.data as Phase6Data;
        return (
            <div className="h-full overflow-y-auto p-4 md:p-8 bg-slate-100 custom-scrollbar">
                <div className="max-w-4xl mx-auto bg-white shadow-lg min-h-screen md:min-h-[297mm]">
                     {/* Doc Header */}
                    <div className="bg-indigo-900 text-white p-6 md:p-10">
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">Design Blueprint</h1>
                        <p className="text-indigo-200">Instructional Strategy & Technical Specifications</p>
                    </div>
                    
                    <div className="p-6 md:p-10 space-y-8">
                        {/* Strategy */}
                        <section>
                            <h3 className="text-sm font-bold text-indigo-900 uppercase border-b border-indigo-100 pb-2 mb-4">Learning Strategy</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-slate-50 p-4 rounded border border-slate-100">
                                    <h4 className="font-semibold text-slate-700 text-sm mb-2">Overview</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">{data.overview || "Pending..."}</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded border border-slate-100">
                                    <h4 className="font-semibold text-slate-700 text-sm mb-2">Approach</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">{data.learningStrategy || "Pending..."}</p>
                                </div>
                            </div>
                        </section>

                        {/* Structure */}
                        <section>
                             <h3 className="text-sm font-bold text-indigo-900 uppercase border-b border-indigo-100 pb-2 mb-4">Course Structure</h3>
                             <div className="bg-white border border-slate-200 p-4 rounded text-sm text-slate-600 whitespace-pre-wrap font-mono">
                                {data.structure || "No structure defined yet."}
                             </div>
                        </section>

                        {/* Storyline Dev Notes */}
                        <section className="bg-indigo-50 border border-indigo-100 rounded-xl overflow-hidden">
                            <div className="bg-indigo-100 px-6 py-3 border-b border-indigo-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                                <h3 className="text-sm font-bold text-indigo-900 flex items-center gap-2">
                                    <Layers size={16} />
                                    Articulate Storyline Production Notes
                                </h3>
                                <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 bg-white px-2 py-1 rounded">
                                    For Developers
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                                    <div className="flex gap-2">
                                        <div className="w-1 bg-indigo-400 rounded-full"></div>
                                        <div>
                                            <div className="text-xs font-bold text-indigo-900 uppercase">Triggers</div>
                                            <p className="text-xs text-indigo-800 opacity-70">Interaction logic</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-1 bg-pink-400 rounded-full"></div>
                                        <div>
                                            <div className="text-xs font-bold text-indigo-900 uppercase">States</div>
                                            <p className="text-xs text-indigo-800 opacity-70">Visual feedback</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-1 bg-emerald-400 rounded-full"></div>
                                        <div>
                                            <div className="text-xs font-bold text-indigo-900 uppercase">Variables</div>
                                            <p className="text-xs text-indigo-800 opacity-70">Data tracking</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white border border-indigo-200 rounded p-4 text-sm text-slate-700 whitespace-pre-wrap font-mono leading-relaxed shadow-sm">
                                    {data.storylineNotes || "• Use a T/F variable to track section completion.\n• Use a 'Hover' state for all interactive buttons.\n• Use layers for additional content to keep the base layer clean."}
                                </div>
                            </div>
                        </section>
                        
                         {/* Tech Specs */}
                        <section>
                             <h3 className="text-sm font-bold text-indigo-900 uppercase border-b border-indigo-100 pb-2 mb-4">Technical Specs</h3>
                             <div className="flex items-center gap-3">
                                 <div className="bg-slate-100 px-4 py-2 rounded text-xs font-bold text-slate-600 uppercase flex items-center gap-2">
                                     <Cog size={14} /> {data.technicalRequirements || "SCORM 1.2"}
                                 </div>
                             </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }

    // --- Phase 8: Storyboard Visualization (Improved Grid) ---
    if (phase.id === 8) {
        const data = phase.data as Phase8Data;
        const screens = data.screens || [];
        
        // Helper to get icon for screen type
        const getScreenIcon = (type: ScreenType) => {
            switch(type) {
                case 'Title': return <BookOpen size={12} />;
                case 'Menu': return <Menu size={12} />;
                case 'Interaction': return <LayoutTemplate size={12} />;
                case 'Quiz': return <CheckSquare size={12} />;
                case 'Video': return <PlayCircle size={12} />;
                case 'Summary': return <FileText size={12} />;
                default: return <Monitor size={12} />;
            }
        };

        // Helper for color coding
        const getTypeColor = (type: ScreenType) => {
             switch(type) {
                case 'Title': return 'bg-slate-800 text-white';
                case 'Menu': return 'bg-indigo-700 text-white';
                case 'Interaction': return 'bg-amber-600 text-white';
                case 'Quiz': return 'bg-red-600 text-white';
                case 'Video': return 'bg-purple-600 text-white';
                default: return 'bg-blue-600 text-white';
            }
        };

        return (
            <div className="h-full overflow-y-auto p-4 md:p-8 bg-slate-200 custom-scrollbar">
                <div className="max-w-7xl mx-auto">
                    {screens.length === 0 && (
                        <div className="flex flex-col items-center justify-center text-slate-400 py-32 border-4 border-dashed border-slate-300 rounded-3xl bg-slate-100/50">
                            <Layout size={64} className="mb-6 opacity-30" />
                            <p className="text-xl font-medium text-slate-500">Storyboard is empty</p>
                            <p className="text-sm mt-2">Use the input panel to add your first scene</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        {screens.map((screen: StoryboardScreen, idx) => (
                            <div key={screen.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group transition-transform hover:-translate-y-1 duration-300">
                                
                                {/* 1. Visual Frame (The "Monitor") */}
                                <div className="relative bg-slate-900 p-1">
                                    {/* Header Strip */}
                                    <div className="flex justify-between items-center px-3 py-2 text-white/90">
                                         <div className="flex items-center gap-2">
                                            <span className="font-mono text-xs text-slate-400">SCENE</span>
                                            <span className="font-mono text-lg font-bold text-white">{String(idx + 1).padStart(2, '0')}</span>
                                         </div>
                                         <div className={`flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow-sm ${getTypeColor(screen.type || 'Content')}`}>
                                            {getScreenIcon(screen.type || 'Content')}
                                            {screen.type || 'Content'}
                                        </div>
                                    </div>

                                    {/* Screen Visual Area */}
                                    <div className="aspect-video bg-white relative overflow-hidden group-hover:ring-4 ring-indigo-500/30 transition-all">
                                        {/* Simulated UI or Visual Placeholder */}
                                        <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center">
                                             {screen.type === 'Video' ? <PlayCircle size={48} className="text-slate-200 mb-2" /> : 
                                              screen.type === 'Quiz' ? <CheckSquare size={48} className="text-slate-200 mb-2" /> : 
                                              screen.type === 'Menu' ? <Menu size={48} className="text-slate-200 mb-2" /> :
                                              <Monitor size={48} className="text-slate-200 mb-2" />}
                                            
                                            <div className="text-slate-600 text-sm font-medium leading-relaxed line-clamp-4">
                                                {screen.visualDescription || <span className="text-slate-300 italic">No visual description...</span>}
                                            </div>
                                        </div>

                                        {/* Overlay Label */}
                                        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded font-mono uppercase tracking-widest backdrop-blur-sm">
                                            Visual
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Title & Metadata */}
                                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                                    <h3 className="font-bold text-slate-800 text-sm truncate w-full" title={screen.title}>
                                        {screen.title}
                                    </h3>
                                </div>

                                {/* 3. Script & Action Table */}
                                <div className="flex-1 grid grid-cols-1 divide-y divide-slate-100 text-xs">
                                    {/* Audio / Text */}
                                    <div className="p-4 bg-white">
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-2">
                                            <Volume2 size={12} /> Audio / Script
                                        </div>
                                        <p className="text-slate-600 font-serif leading-relaxed italic whitespace-pre-wrap">
                                            "{screen.audioScript || '...'}"
                                        </p>
                                    </div>
                                    
                                    {/* Interaction */}
                                    {screen.interactionNote && (
                                        <div className="p-4 bg-amber-50/50">
                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-2">
                                                <MousePointer2 size={12} /> Interaction
                                            </div>
                                            <p className="text-slate-700 font-medium">
                                                {screen.interactionNote}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    // --- Phase 12: Evaluation (Kirkpatrick Dashboard) ---
    if (phase.id === 12) {
        const data = phase.data as Phase12Data;
        
        return (
            <div className="h-full overflow-y-auto p-4 md:p-8 bg-slate-100 custom-scrollbar">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-8 text-center">
                        <h2 className="text-xl font-bold text-slate-800">Evaluation Strategy</h2>
                        <p className="text-slate-500 text-sm mt-1">Kirkpatrick 4 Levels of Evaluation</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Level 1: Reaction */}
                        <div className="bg-white p-6 rounded-xl border-t-4 border-emerald-500 shadow-sm">
                             <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                                    <ThumbsUp size={24} />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Level 1</div>
                                    <h3 className="font-bold text-slate-800">Reaction</h3>
                                </div>
                             </div>
                             <p className="text-slate-600 text-sm whitespace-pre-wrap min-h-[60px]">{data.l1_reaction || "Define how you will measure learner satisfaction..."}</p>
                        </div>

                        {/* Level 2: Learning */}
                        <div className="bg-white p-6 rounded-xl border-t-4 border-blue-500 shadow-sm">
                             <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                    <GraduationCap size={24} />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Level 2</div>
                                    <h3 className="font-bold text-slate-800">Learning</h3>
                                </div>
                             </div>
                             <p className="text-slate-600 text-sm whitespace-pre-wrap min-h-[60px]">{data.l2_learning || "Define how you will measure knowledge acquisition..."}</p>
                        </div>

                        {/* Level 3: Behavior */}
                        <div className="bg-white p-6 rounded-xl border-t-4 border-amber-500 shadow-sm">
                             <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                                    <Activity size={24} />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Level 3</div>
                                    <h3 className="font-bold text-slate-800">Behavior</h3>
                                </div>
                             </div>
                             <p className="text-slate-600 text-sm whitespace-pre-wrap min-h-[60px]">{data.l3_behavior || "Define how you will measure on-the-job application..."}</p>
                        </div>

                        {/* Level 4: Results */}
                        <div className="bg-white p-6 rounded-xl border-t-4 border-indigo-500 shadow-sm">
                             <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                                    <TrendingUp size={24} />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Level 4</div>
                                    <h3 className="font-bold text-slate-800">Results</h3>
                                </div>
                             </div>
                             <p className="text-slate-600 text-sm whitespace-pre-wrap min-h-[60px]">{data.l4_results || "Define how you will measure business impact..."}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // --- Generic Visualization for other phases (Document View) ---
    return (
        <div className="h-full overflow-y-auto p-4 md:p-8 bg-slate-100 flex justify-center custom-scrollbar">
            <div className="bg-white w-full max-w-[210mm] min-h-[50vh] md:min-h-[297mm] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 md:p-12 text-slate-800 relative">
                {/* Paper Texture/Header */}
                <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>

                <div className="border-b-2 border-slate-100 pb-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">ID COMPASS ARTIFACT</div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{phase.title}</h1>
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border ${
                        phase.status === 'APPROVED' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-50 text-slate-500 border-slate-200'
                    }`}>
                        {phase.status.replace('_', ' ')}
                    </span>
                </div>

                <div className="prose prose-slate max-w-none space-y-8">
                    {Object.entries(phase.data).map(([key, value]) => {
                        if (key === 'actions' || key === 'screens' || key === 'objectives') return null; // Handle arrays separately
                        if (!value) return null; // Skip empty fields in generic view

                        return (
                            <div key={key} className="break-inside-avoid">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                                    {key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim()}
                                </h3>
                                <div className="text-slate-600 leading-relaxed whitespace-pre-wrap bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm">
                                    {String(value)}
                                </div>
                            </div>
                        )
                    })}
                </div>
                
                <div className="mt-16 pt-8 border-t border-slate-100 text-center text-[10px] text-slate-400 font-mono uppercase tracking-widest">
                    Generated by ID Compass • {new Date().toLocaleDateString()}
                </div>
            </div>
        </div>
    );
};

export default Canvas;