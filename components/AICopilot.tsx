import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User, Loader2 } from 'lucide-react';
import { ChatMessage, MessageRole, Phase, Project } from '../types';
import { generateCoPilotResponse } from '../services/geminiService';
import { PHASES_CONFIG } from '../constants';

interface AICopilotProps {
    project: Project;
    currentPhase: Phase;
    onUpdatePhase: (updatedPhase: Phase) => void;
}

const AICopilot: React.FC<AICopilotProps> = ({ project, currentPhase, onUpdatePhase }) => {
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [currentPhase.chatHistory]);

    const handleSend = async () => {
        if (!input.trim() || isThinking) return;

        const userMsg: ChatMessage = {
            role: MessageRole.USER,
            text: input,
            timestamp: Date.now()
        };

        const updatedHistory = [...currentPhase.chatHistory, userMsg];
        
        // Optimistic update
        const updatedPhase = { ...currentPhase, chatHistory: updatedHistory };
        onUpdatePhase(updatedPhase);
        setInput('');
        setIsThinking(true);

        try {
            const aiResponseText = await generateCoPilotResponse(
                currentPhase.id,
                currentPhase.data,
                currentPhase.chatHistory,
                input
            );

            const aiMsg: ChatMessage = {
                role: MessageRole.MODEL,
                text: aiResponseText,
                timestamp: Date.now()
            };

            onUpdatePhase({
                ...currentPhase,
                chatHistory: [...updatedHistory, aiMsg]
            });
        } catch (error) {
            console.error("Failed to get AI response", error);
        } finally {
            setIsThinking(false);
        }
    };

    const handlePromptClick = (prompt: string) => {
        setInput(prompt);
    };

    const config = PHASES_CONFIG.find(c => c.id === currentPhase.id);

    return (
        <div className="flex flex-col h-full bg-white border-l border-slate-200">
            {/* Header */}
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    <div>
                        <h3 className="font-semibold text-slate-800 text-sm">ID Co-Pilot</h3>
                        <p className="text-xs text-slate-500">Mentoring you on {config?.shortTitle}</p>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                {currentPhase.chatHistory.length === 0 && (
                    <div className="text-center mt-10">
                        <div className="bg-indigo-100 p-3 rounded-full inline-block mb-3">
                            <Bot className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h4 className="text-sm font-medium text-slate-700">Ready to assist</h4>
                        <p className="text-xs text-slate-500 mt-1 max-w-[200px] mx-auto">
                            I'm here to ensure your {config?.title} aligns with learning science.
                        </p>
                        <div className="mt-4 flex flex-col gap-2">
                            {config?.initialPrompts.map((prompt, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => handlePromptClick(prompt)}
                                    className="text-xs text-left bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-700 px-3 py-2 rounded shadow-sm transition-colors"
                                >
                                    "{prompt}"
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {currentPhase.chatHistory.map((msg, idx) => (
                    <div key={idx} className={`flex gap-3 ${msg.role === MessageRole.USER ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === MessageRole.USER ? 'bg-slate-200' : 'bg-indigo-600'}`}>
                            {msg.role === MessageRole.USER ? <User size={14} className="text-slate-600" /> : <Sparkles size={14} className="text-white" />}
                        </div>
                        <div className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed shadow-sm ${
                            msg.role === MessageRole.USER 
                                ? 'bg-white border border-slate-200 text-slate-800 rounded-tr-none' 
                                : 'bg-indigo-50 border border-indigo-100 text-slate-800 rounded-tl-none'
                        }`}>
                            <div className="whitespace-pre-wrap markdown-body">{msg.text}</div>
                        </div>
                    </div>
                ))}

                {isThinking && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                            <Loader2 size={14} className="text-white animate-spin" />
                        </div>
                        <div className="bg-indigo-50 border border-indigo-100 text-slate-500 text-xs p-3 rounded-lg rounded-tl-none flex items-center">
                            Applying learning science...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-200">
                <div className="relative">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Ask for feedback or guidance..."
                        className="w-full pr-10 pl-3 py-3 text-sm text-slate-700 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none h-24"
                    />
                    <button 
                        onClick={handleSend}
                        disabled={!input.trim() || isThinking}
                        className="absolute bottom-3 right-3 p-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send size={16} />
                    </button>
                </div>
                <div className="text-[10px] text-center text-slate-400 mt-2">
                    AI can make mistakes. Verify with ID principles.
                </div>
            </div>
        </div>
    );
};

export default AICopilot;