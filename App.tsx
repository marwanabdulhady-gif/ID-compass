import React, { useState, useEffect } from 'react';
import { 
    LayoutDashboard, 
    BookOpen, 
    ChevronRight, 
    CheckCircle2, 
    Circle,
    Save,
    FolderOpen,
    Plus
} from 'lucide-react';
import PhaseInputs from './components/PhaseInputs';
import AICopilot from './components/AICopilot';
import Canvas from './components/Canvas';
import { Project, Phase, PhaseStatus } from './types';
import { createNewProject, PHASES_CONFIG } from './constants';

const App: React.FC = () => {
    // State
    const [project, setProject] = useState<Project | null>(null);
    const [view, setView] = useState<'dashboard' | 'workspace'>('dashboard');
    const [activePhaseId, setActivePhaseId] = useState<number>(1);

    // Initial Load - Check LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem('id-compass-project');
        if (saved) {
            try {
                setProject(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load project", e);
            }
        }
    }, []);

    // Save Logic
    useEffect(() => {
        if (project) {
            localStorage.setItem('id-compass-project', JSON.stringify(project));
        }
    }, [project]);

    // Actions
    const handleCreateProject = () => {
        const newProj = createNewProject("New Instructional Design Project");
        setProject(newProj);
        setActivePhaseId(1);
        setView('workspace');
    };

    const handleUpdatePhaseData = (data: any) => {
        if (!project) return;
        
        const updatedPhases = project.phases.map(p => 
            p.id === activePhaseId ? { ...p, data: data, status: PhaseStatus.DRAFT } : p
        );
        
        setProject({ ...project, phases: updatedPhases });
    };

    const handleUpdatePhase = (updatedPhase: Phase) => {
        if (!project) return;
        const updatedPhases = project.phases.map(p => 
            p.id === updatedPhase.id ? updatedPhase : p
        );
        setProject({ ...project, phases: updatedPhases });
    };

    const handlePhaseStatusChange = (status: PhaseStatus) => {
        if (!project) return;
        const updatedPhases = project.phases.map(p => 
            p.id === activePhaseId ? { ...p, status } : p
        );
        setProject({ ...project, phases: updatedPhases });
    }

    // Derived State
    const currentPhase = project?.phases.find(p => p.id === activePhaseId);

    // --- Dashboard View ---
    if (view === 'dashboard' || !project) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-200">
                        <BookOpen className="text-white w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">ID Compass</h1>
                    <p className="text-slate-500 mb-8">AI-Powered Instructional Design Workflow</p>

                    <div className="space-y-3">
                        {project && (
                            <button 
                                onClick={() => setView('workspace')}
                                className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-500 hover:shadow-md transition-all group"
                            >
                                <div className="text-left">
                                    <div className="font-semibold text-slate-800 flex items-center gap-2">
                                        <FolderOpen size={16} /> Continue Project
                                    </div>
                                    <div className="text-xs text-slate-400 mt-1">Last edited: Today</div>
                                </div>
                                <ChevronRight className="text-slate-300 group-hover:text-indigo-600" />
                            </button>
                        )}
                        
                        <button 
                            onClick={handleCreateProject}
                            className="w-full flex items-center justify-center gap-2 p-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all font-medium"
                        >
                            <Plus size={18} /> Start New Project
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // --- Workspace View ---
    return (
        <div className="flex h-screen overflow-hidden bg-slate-50">
            {/* 1. Navigation Sidebar (Left) */}
            <div className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0">
                <div className="p-4 border-b border-slate-800 flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <BookOpen size={16} className="text-white" />
                    </div>
                    <div className="font-bold text-white tracking-tight">ID Compass</div>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                    <div className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Workflow Phases</div>
                    {project.phases.map((phase) => (
                        <button
                            key={phase.id}
                            onClick={() => setActivePhaseId(phase.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors border-l-2 ${
                                activePhaseId === phase.id 
                                    ? 'bg-slate-800 text-white border-indigo-500' 
                                    : 'border-transparent hover:bg-slate-800/50 hover:text-white'
                            }`}
                        >
                            {phase.status === PhaseStatus.APPROVED ? (
                                <CheckCircle2 size={16} className="text-green-500" />
                            ) : (
                                <Circle size={16} className={activePhaseId === phase.id ? "text-indigo-400" : "text-slate-600"} />
                            )}
                            <div className="text-left">
                                <div className="font-medium">{PHASES_CONFIG.find(c => c.id === phase.id)?.shortTitle}</div>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="p-4 border-t border-slate-800">
                    <button onClick={() => setView('dashboard')} className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors">
                        <LayoutDashboard size={14} /> Back to Dashboard
                    </button>
                </div>
            </div>

            {/* 2. Main Workspace Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Bar */}
                <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
                    <div className="flex items-center gap-4">
                        <h2 className="font-bold text-slate-800 text-lg">{currentPhase?.title}</h2>
                        <span className="text-slate-400 text-sm border-l border-slate-200 pl-4">{project.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <select 
                            value={currentPhase?.status}
                            onChange={(e) => handlePhaseStatusChange(e.target.value as PhaseStatus)}
                            className="text-xs font-medium bg-slate-100 border-none rounded-md py-1.5 px-3 focus:ring-2 focus:ring-indigo-500"
                        >
                            {Object.values(PhaseStatus).map(s => (
                                <option key={s} value={s}>{s.replace('_', ' ')}</option>
                            ))}
                        </select>
                        <div className="flex items-center gap-1 text-green-600 text-xs font-medium px-3 py-1.5 bg-green-50 rounded-md">
                            <Save size={14} /> Saved
                        </div>
                    </div>
                </header>

                {/* 3-Panel Content */}
                <main className="flex-1 flex overflow-hidden">
                    {/* Left Panel: Inputs */}
                    <div className="w-[350px] bg-white border-r border-slate-200 flex flex-col shrink-0">
                        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="font-semibold text-slate-700 text-sm">Inputs & Decisions</h3>
                            <p className="text-xs text-slate-500 mt-1">{currentPhase?.description}</p>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4">
                            {currentPhase && (
                                <PhaseInputs 
                                    phase={currentPhase} 
                                    onChange={handleUpdatePhaseData} 
                                />
                            )}
                        </div>
                    </div>

                    {/* Center Panel: Canvas */}
                    <div className="flex-1 bg-slate-100 relative overflow-hidden">
                        {currentPhase && <Canvas phase={currentPhase} />}
                    </div>

                    {/* Right Panel: AI Co-pilot */}
                    <div className="w-[350px] shrink-0 h-full">
                        {currentPhase && project && (
                            <AICopilot 
                                project={project}
                                currentPhase={currentPhase}
                                onUpdatePhase={handleUpdatePhase}
                            />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;