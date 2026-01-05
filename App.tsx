import React, { useState, useEffect } from 'react';
import { 
    LayoutDashboard, 
    BookOpen, 
    ChevronRight, 
    CheckCircle2, 
    Circle,
    Save,
    FolderOpen,
    Plus,
    Calendar,
    MonitorPlay,
    Trash2,
    X,
    ChevronDown,
    PanelLeftClose,
    PanelRightClose,
    PanelLeftOpen,
    PanelRightOpen,
    Maximize2,
    Minimize2,
    Menu,
    Download
} from 'lucide-react';
import PhaseInputs from './components/PhaseInputs';
import AICopilot from './components/AICopilot';
import Canvas from './components/Canvas';
import { Project, Phase, PhaseStatus, ProjectModality, Phase8Data, StoryboardScreen } from './types';
import { createNewProject, PHASES_CONFIG } from './constants';

const App: React.FC = () => {
    // Data State
    const [projects, setProjects] = useState<Project[]>([]);
    const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
    const [activePhaseId, setActivePhaseId] = useState<number>(1);
    
    // View State
    const [view, setView] = useState<'dashboard' | 'workspace' | 'create'>('dashboard');
    const [showLeftPanel, setShowLeftPanel] = useState(true);
    const [showRightPanel, setShowRightPanel] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // Create Form State
    const [newProjName, setNewProjName] = useState("");
    const [newProjDesc, setNewProjDesc] = useState("");
    const [newProjModality, setNewProjModality] = useState<ProjectModality>("eLearning");
    const [newProjDueDate, setNewProjDueDate] = useState("");

    // Detect mobile for initial state
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setShowLeftPanel(false);
                setShowRightPanel(false);
            } else {
                setShowLeftPanel(true);
                setShowRightPanel(true);
            }
        };

        // Set initial
        handleResize();

        // Add listener
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Initial Load
    useEffect(() => {
        const saved = localStorage.getItem('id-compass-projects');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (!Array.isArray(parsed) && parsed.id) {
                    setProjects([parsed]);
                } else {
                    setProjects(parsed);
                }
            } catch (e) {
                console.error("Failed to load projects", e);
            }
        }
    }, []);

    // Save Logic
    useEffect(() => {
        localStorage.setItem('id-compass-projects', JSON.stringify(projects));
    }, [projects]);

    // Actions
    const handleCreateProject = (e: React.FormEvent) => {
        e.preventDefault();
        const newProj = createNewProject(newProjName, newProjDesc, newProjModality, newProjDueDate);
        setProjects([...projects, newProj]);
        setActiveProjectId(newProj.id);
        setActivePhaseId(1);
        setView('workspace');
        setNewProjName("");
        setNewProjDesc("");
        setNewProjDueDate("");
    };

    const handleDeleteProject = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if(confirm("Are you sure you want to delete this project?")) {
            const remaining = projects.filter(p => p.id !== id);
            setProjects(remaining);
            if(activeProjectId === id) {
                setActiveProjectId(null);
                setView('dashboard');
            }
        }
    };

    const handleOpenProject = (id: string) => {
        setActiveProjectId(id);
        setView('workspace');
        // On mobile, close sidebar after selection if open
        if (window.innerWidth < 768) setIsSidebarOpen(false);
    };

    const handleProjectSwitch = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === 'NEW') {
            setView('create');
            setIsSidebarOpen(false);
        } else {
            handleOpenProject(e.target.value);
        }
    };

    const updateCurrentProject = (updatedProject: Project) => {
        setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
    };

    const handleUpdatePhaseData = (data: any) => {
        const currentProject = projects.find(p => p.id === activeProjectId);
        if (!currentProject) return;
        
        const updatedPhases = currentProject.phases.map(p => 
            p.id === activePhaseId ? { ...p, data: data, status: PhaseStatus.DRAFT } : p
        );
        
        updateCurrentProject({ ...currentProject, phases: updatedPhases });
    };

    const handleUpdatePhase = (updatedPhase: Phase) => {
        const currentProject = projects.find(p => p.id === activeProjectId);
        if (!currentProject) return;
        const updatedPhases = currentProject.phases.map(p => 
            p.id === updatedPhase.id ? updatedPhase : p
        );
        updateCurrentProject({ ...currentProject, phases: updatedPhases });
    };

    const handlePhaseStatusChange = (status: PhaseStatus) => {
        const currentProject = projects.find(p => p.id === activeProjectId);
        if (!currentProject) return;
        const updatedPhases = currentProject.phases.map(p => 
            p.id === activePhaseId ? { ...p, status } : p
        );
        updateCurrentProject({ ...currentProject, phases: updatedPhases });
    }

    const toggleLeftPanel = () => {
        const willOpen = !showLeftPanel;
        setShowLeftPanel(willOpen);
        // On mobile, close right panel if opening left
        if (willOpen && window.innerWidth < 768) {
            setShowRightPanel(false);
        }
    };

    const toggleRightPanel = () => {
        const willOpen = !showRightPanel;
        setShowRightPanel(willOpen);
        // On mobile, close left panel if opening right
        if (willOpen && window.innerWidth < 768) {
            setShowLeftPanel(false);
        }
    };

    const toggleFocusMode = () => {
        if (showLeftPanel || showRightPanel) {
            setShowLeftPanel(false);
            setShowRightPanel(false);
        } else {
            setShowLeftPanel(true);
            setShowRightPanel(true);
        }
    };

    // --- Export Functionality ---
    const handleExport = () => {
        if (!activeProject || !currentPhase) return;

        let content = "";
        let filename = `${activeProject.name.replace(/\s+/g, '_')}_${currentPhase.title.replace(/[\s\.]+/g, '_')}`;
        let mimeType = "text/plain";

        // Logic for Storyboard Export (CSV for Storyline)
        if (currentPhase.id === 8) {
            const data = currentPhase.data as Phase8Data;
            filename += ".csv";
            mimeType = "text/csv";
            
            // CSV Header
            content = "Slide_ID,Title,Type,Visual_Description,Audio_Script,Interaction_Notes\n";
            
            // CSV Rows
            if (data.screens) {
                data.screens.forEach((screen: StoryboardScreen, idx: number) => {
                    // Simple CSV escaping
                    const escape = (text: string) => `"${(text || '').replace(/"/g, '""')}"`;
                    
                    content += [
                        idx + 1,
                        escape(screen.title),
                        escape(screen.type || 'Content'),
                        escape(screen.visualDescription),
                        escape(screen.audioScript),
                        escape(screen.interactionNote)
                    ].join(",") + "\n";
                });
            }
        } else {
            // Generic JSON Export for other phases
            filename += ".json";
            mimeType = "application/json";
            content = JSON.stringify(currentPhase.data, null, 2);
        }

        // Trigger Download
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    // Derived State
    const activeProject = projects.find(p => p.id === activeProjectId);
    const currentPhase = activeProject?.phases.find(p => p.id === activePhaseId);
    
    const completedPhases = activeProject?.phases.filter(p => p.status === PhaseStatus.APPROVED).length || 0;
    const progressPercent = activeProject ? Math.round((completedPhases / activeProject.phases.length) * 100) : 0;

    // --- Create Modal View ---
    if (view === 'create') {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-200">
                    <div className="bg-indigo-600 p-6 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Plus size={24} /> New Project
                        </h2>
                        <button onClick={() => setView('dashboard')} className="text-indigo-200 hover:text-white">
                            <X size={24} />
                        </button>
                    </div>
                    <form onSubmit={handleCreateProject} className="p-8 space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Project Name</label>
                            <input 
                                required
                                value={newProjName}
                                onChange={(e) => setNewProjName(e.target.value)}
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500" 
                                placeholder="e.g. Sales Onboarding Q3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
                            <textarea 
                                value={newProjDesc}
                                onChange={(e) => setNewProjDesc(e.target.value)}
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500" 
                                placeholder="What is this project about?"
                                rows={3}
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Modality</label>
                                <select 
                                    value={newProjModality}
                                    onChange={(e) => setNewProjModality(e.target.value as ProjectModality)}
                                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="eLearning">eLearning</option>
                                    <option value="ILT">ILT (Classroom)</option>
                                    <option value="VILT">VILT (Virtual)</option>
                                    <option value="Hybrid">Hybrid</option>
                                    <option value="Video">Video</option>
                                    <option value="Microlearning">Microlearning</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Due Date</label>
                                <input 
                                    type="date"
                                    value={newProjDueDate}
                                    onChange={(e) => setNewProjDueDate(e.target.value)}
                                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500" 
                                />
                            </div>
                        </div>
                        <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md transition-colors">
                            Create Project
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    // --- Dashboard View ---
    if (view === 'dashboard') {
        return (
            <div className="min-h-screen bg-slate-50 p-4 md:p-8">
                <div className="max-w-6xl mx-auto">
                    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                                <BookOpen className="text-white w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">ID Compass</h1>
                                <p className="text-sm text-slate-500">Instructional Design Workbench</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setView('create')}
                            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all font-medium w-full sm:w-auto justify-center"
                        >
                            <Plus size={18} /> New Project
                        </button>
                    </header>

                    {projects.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-200">
                             <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FolderOpen className="text-slate-400 w-8 h-8" />
                            </div>
                            <h2 className="text-xl font-semibold text-slate-800">No projects yet</h2>
                            <p className="text-slate-500 mt-2 mb-6">Start your first instructional design journey today.</p>
                            <button 
                                onClick={() => setView('create')}
                                className="text-indigo-600 font-medium hover:underline"
                            >
                                Create a project
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map(proj => {
                                const done = proj.phases.filter(p => p.status === PhaseStatus.APPROVED).length;
                                const total = proj.phases.length;
                                const percent = Math.round((done/total)*100);

                                return (
                                    <div 
                                        key={proj.id} 
                                        onClick={() => handleOpenProject(proj.id)}
                                        className="bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer group relative"
                                    >
                                        <button 
                                            onClick={(e) => handleDeleteProject(e, proj.id)}
                                            className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors z-10 p-1 hover:bg-red-50 rounded"
                                            title="Delete Project"
                                        >
                                            <Trash2 size={16} />
                                        </button>

                                        <div className="flex items-start justify-between mb-3">
                                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                                                <MonitorPlay size={12} /> {proj.modality}
                                            </div>
                                            {proj.dueDate && (
                                                <div className="flex items-center gap-1 text-xs text-slate-400">
                                                    <Calendar size={12} /> {new Date(proj.dueDate).toLocaleDateString()}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <h3 className="font-bold text-lg text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors truncate pr-8">{proj.name}</h3>
                                        <p className="text-sm text-slate-500 mb-6 line-clamp-2 h-10">{proj.description || "No description provided."}</p>

                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs font-medium text-slate-500">
                                                <span>Progress</span>
                                                <span>{percent}%</span>
                                            </div>
                                            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                                <div className="bg-indigo-600 h-full rounded-full transition-all duration-500" style={{width: `${percent}%`}}></div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    if (!activeProject) return <div>Loading...</div>;

    // --- Workspace View ---
    return (
        <div className="flex h-screen overflow-hidden bg-slate-50">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/50 z-30 md:hidden backdrop-blur-sm transition-opacity" 
                    onClick={() => setIsSidebarOpen(false)} 
                />
            )}

            {/* 1. Navigation Sidebar (Responsive Drawer) */}
            <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-300 ease-in-out md:relative md:translate-x-0 shrink-0 ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
                {/* Branding & Project Switcher */}
                <div className="p-4 border-b border-slate-800">
                     <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                                <BookOpen size={16} className="text-white" />
                            </div>
                            <div className="font-bold text-white tracking-tight">ID Compass</div>
                        </div>
                        <button 
                            className="md:hidden text-slate-400 hover:text-white"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X size={20} />
                        </button>
                    </div>
                    
                    <div className="relative group">
                         <div className="absolute left-3 top-2.5 text-indigo-400 pointer-events-none">
                            <FolderOpen size={14} />
                        </div>
                        <select
                            value={activeProjectId || ""}
                            onChange={handleProjectSwitch}
                            className="w-full bg-slate-800 text-slate-200 text-xs font-medium border border-slate-700 rounded-md py-2.5 pl-9 pr-8 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none cursor-pointer hover:bg-slate-700 transition-colors"
                        >
                            {projects.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                            <option disabled>──────────</option>
                            <option value="NEW">+ Create New Project</option>
                        </select>
                        <div className="absolute right-3 top-2.5 pointer-events-none text-slate-500 group-hover:text-slate-300">
                            <ChevronDown size={14} />
                        </div>
                    </div>
                </div>

                {/* Navigation List */}
                <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
                    <div className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Workflow Phases</div>
                    {activeProject.phases.map((phase) => (
                        <button
                            key={phase.id}
                            onClick={() => {
                                setActivePhaseId(phase.id);
                                if (window.innerWidth < 768) setIsSidebarOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all border-l-2 group relative ${
                                activePhaseId === phase.id 
                                    ? 'bg-slate-800 text-white border-indigo-500' 
                                    : 'border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                            }`}
                        >
                            <div className="shrink-0">
                                {phase.status === PhaseStatus.APPROVED ? (
                                    <CheckCircle2 size={16} className="text-green-500" />
                                ) : (
                                    <Circle size={16} className={`${activePhaseId === phase.id ? "text-indigo-400" : "text-slate-600 group-hover:text-slate-500"}`} />
                                )}
                            </div>
                            <div className="text-left truncate">
                                {PHASES_CONFIG.find(c => c.id === phase.id)?.shortTitle}
                            </div>
                            {activePhaseId === phase.id && (
                                <div className="absolute right-0 top-0 bottom-0 w-1 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-800">
                    <button onClick={() => setView('dashboard')} className="flex items-center gap-2 text-xs text-slate-500 hover:text-white transition-colors w-full">
                        <LayoutDashboard size={14} /> Return to Dashboard
                    </button>
                </div>
            </div>

            {/* 2. Main Workspace Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-slate-50 relative">
                {/* Top Bar */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shrink-0 shadow-sm z-10 relative">
                    <div className="flex items-center gap-3">
                        <button 
                            className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-md"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={20} />
                        </button>
                        <div className="flex flex-col">
                            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 mb-0.5">
                                <span className="truncate max-w-[150px]">{activeProject.name}</span>
                                <ChevronRight size={12} />
                                <span>Phase {currentPhase?.id}</span>
                            </div>
                            <h2 className="font-bold text-slate-800 text-base sm:text-lg flex items-center gap-2 truncate max-w-[200px] sm:max-w-none">
                                {currentPhase?.title}
                            </h2>
                        </div>
                    </div>
                    
                    {/* Header Controls */}
                    <div className="flex items-center gap-2 sm:gap-4">
                         {/* Export Button (Visible on Phase 8) */}
                         {currentPhase?.id === 8 && (
                            <button
                                onClick={handleExport}
                                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 rounded-md text-xs font-bold transition-colors border border-slate-200"
                                title="Export Storyboard to CSV"
                            >
                                <Download size={14} />
                                Export CSV
                            </button>
                        )}

                        {/* Layout Toggles */}
                        <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
                            <button 
                                onClick={toggleLeftPanel}
                                className={`p-1.5 rounded-md transition-all ${showLeftPanel ? 'bg-white shadow text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                                title="Inputs"
                            >
                                {showLeftPanel ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
                            </button>
                            <div className="w-px h-4 bg-slate-300 mx-1 hidden sm:block"></div>
                            <button 
                                onClick={toggleRightPanel}
                                className={`p-1.5 rounded-md transition-all ${showRightPanel ? 'bg-white shadow text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                                title="AI Co-pilot"
                            >
                                {showRightPanel ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
                            </button>
                        </div>

                        {/* Status & Save */}
                        <div className="flex items-center gap-2">
                             <div className="relative">
                                <select 
                                    value={currentPhase?.status}
                                    onChange={(e) => handlePhaseStatusChange(e.target.value as PhaseStatus)}
                                    className="text-xs font-bold bg-white border border-slate-200 rounded-md py-2 pl-3 pr-8 focus:ring-2 focus:ring-indigo-500 shadow-sm appearance-none cursor-pointer"
                                >
                                    {Object.values(PhaseStatus).map(s => (
                                        <option key={s} value={s}>{s.replace('_', ' ')}</option>
                                    ))}
                                </select>
                                <ChevronDown size={12} className="absolute right-2 top-3 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* 3-Panel Content */}
                <main className="flex-1 flex overflow-hidden relative">
                    {/* Left Panel: Inputs */}
                    <div 
                        className={`
                            absolute inset-y-0 left-0 z-20 bg-white border-r border-slate-200 flex flex-col 
                            transition-transform duration-300 ease-in-out shadow-xl md:shadow-none
                            w-full md:w-[350px] md:relative md:translate-x-0
                            ${showLeftPanel ? 'translate-x-0' : '-translate-x-full md:w-0 md:opacity-0 md:overflow-hidden'}
                        `}
                    >
                         {/* Mobile Close Bar */}
                         <div className="md:hidden p-2 bg-slate-50 border-b border-slate-200 flex justify-end">
                            <button onClick={() => setShowLeftPanel(false)} className="p-2 text-slate-500 hover:bg-slate-200 rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="font-bold text-slate-700 text-sm">Inputs & Decisions</h3>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{currentPhase?.description}</p>
                        </div>
                        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
                            {currentPhase && (
                                <PhaseInputs 
                                    phase={currentPhase} 
                                    onChange={handleUpdatePhaseData} 
                                />
                            )}
                        </div>
                    </div>

                    {/* Center Panel: Canvas */}
                    <div className="flex-1 bg-slate-100/50 relative overflow-hidden flex flex-col w-full">
                        {currentPhase && <Canvas phase={currentPhase} />}
                    </div>

                    {/* Right Panel: AI Co-pilot */}
                    <div 
                        className={`
                            absolute inset-y-0 right-0 z-20 bg-white border-l border-slate-200 flex flex-col 
                            transition-transform duration-300 ease-in-out shadow-xl md:shadow-none
                            w-full md:w-[350px] md:relative md:translate-x-0
                            ${showRightPanel ? 'translate-x-0' : 'translate-x-full md:w-0 md:opacity-0 md:overflow-hidden'}
                        `}
                    >
                         {/* Mobile Close Bar */}
                         <div className="md:hidden p-2 bg-slate-50 border-b border-slate-200 flex justify-start">
                            <button onClick={() => setShowRightPanel(false)} className="p-2 text-slate-500 hover:bg-slate-200 rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        {currentPhase && activeProject && (
                            <AICopilot 
                                project={activeProject}
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