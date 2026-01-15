
import React, { useState, useRef } from 'react';
import Header from './components/Header';
import CritiqueCard from './components/CritiqueCard';
import CameraView from './components/CameraView';
import { analyzePhoto } from './services/geminiService';
import { PhotographyCritique } from './types';

const App: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [critique, setCritique] = useState<PhotographyCritique | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [overlay, setOverlay] = useState<'none' | 'thirds' | 'triangle'>('none');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setCritique(null);
        setError(null);
        setOverlay('none');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = (base64: string) => {
    setImage(base64);
    setIsCameraOpen(false);
    setCritique(null);
    setError(null);
    setOverlay('none');
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    try {
      const result = await analyzePhoto(image);
      setCritique(result);
    } catch (err) {
      setError("Analysis module failure. Satellite link or engine timeout.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setCritique(null);
    setError(null);
    setOverlay('none');
  };

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden font-space">
      {/* Visual Accents - Lens & Cameras */}
      <img 
        src="https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&q=80&w=400" 
        className="fixed -top-20 -right-20 w-80 opacity-[0.03] pointer-events-none grayscale rotate-12" 
        alt=""
      />
      <img 
        src="https://images.unsplash.com/photo-1616423642371-3644f1262f2f?auto=format&fit=crop&q=80&w=400" 
        className="fixed top-1/2 -left-32 w-96 opacity-[0.02] pointer-events-none grayscale -rotate-90" 
        alt=""
      />
      <div className="lens-flare top-1/4 right-0" />
      <div className="lens-flare bottom-1/4 left-0" />

      <Header />
      
      {isCameraOpen && (
        <CameraView 
          onCapture={handleCapture} 
          onClose={() => setIsCameraOpen(false)} 
          overlay={overlay} 
        />
      )}

      <main className="max-w-[1400px] mx-auto px-6 pt-10 relative z-10">
        {!image ? (
          <div className="flex flex-col gap-32">
            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center relative">
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                V2.5 Engine Online
              </div>
              
              <h2 className="text-7xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-none relative">
                VISUAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">INTELLIGENCE</span>
                {/* Subtle labeling */}
                <span className="absolute -top-4 -right-8 text-[8px] font-mono text-slate-600 tracking-[0.5em] hidden md:block">TECH_SPEC_A1</span>
              </h2>
              
              <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed mb-12">
                ExpressCritiqueAI transforms standard captures into architectural masterpieces using advanced neural vision and artistic principles.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg relative">
                <div className="frame-corner frame-tl" />
                <div className="frame-corner frame-br" />
                
                <button 
                  onClick={() => setIsCameraOpen(true)}
                  className="flex-1 cyber-card px-8 py-5 rounded-2xl text-white font-bold flex items-center justify-center gap-3 group hover:bg-white/5 transition-all shadow-[0_0_30px_rgba(99,102,241,0.1)]"
                >
                  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><circle cx="12" cy="13" r="3" strokeWidth="2" /></svg>
                  LAUNCH CAMERA
                </button>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 cyber-card px-8 py-5 rounded-2xl text-slate-400 font-bold flex items-center justify-center gap-3 hover:text-white hover:bg-white/5 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                  UPLOAD DATA
                </button>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
            </div>

            {/* Philosophy Display */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                { label: 'OBJECTIVE', title: 'Neural Analysis', desc: 'Real-time assessment of tonal range and composition geometry.' },
                { label: 'DIPLOMATIC', title: 'Refined Guidance', desc: 'Constructive perspective serving as a versatile reference tool for artists.' },
                { label: 'ADAPTIVE', title: 'Studio Tactics', desc: 'Personalized high-impact suggestions to elevate your gallery output.' }
              ].map((item, i) => (
                <div key={i} className="cyber-card p-10 rounded-[2rem] group transition-all relative">
                  <div className="frame-corner frame-tl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="frame-corner frame-br opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[10px] font-black text-indigo-500 tracking-[0.4em] uppercase mb-6 block">{item.label}</span>
                  <h4 className="text-2xl font-bold text-white mb-4">{item.title}</h4>
                  <p className="text-slate-500 leading-relaxed font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in-95 duration-700">
            {/* Command Interface Header */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12 p-8 cyber-card rounded-3xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-indigo-500/5 to-transparent pointer-events-none" />
              <div className="flex items-center gap-6">
                <button onClick={reset} className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all relative">
                  <div className="frame-corner frame-tl w-2 h-2" />
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <div>
                  <h3 className="text-sm font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" />
                    Active Analysis Session
                  </h3>
                  <p className="text-[10px] text-slate-500 font-mono mt-1">ID: EXPR-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-black/40 p-2 rounded-2xl border border-white/5 relative">
                {['none', 'thirds', 'triangle'].map((type) => (
                  <button 
                    key={type}
                    onClick={() => setOverlay(type as any)}
                    className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${overlay === type ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-white'}`}
                  >
                    {type === 'none' ? 'Clean' : type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
              {/* Main Viewport */}
              <div className="xl:col-span-8 flex flex-col gap-10">
                <div className="relative cyber-card rounded-[2.5rem] overflow-hidden group shadow-2xl bg-black border-indigo-500/10">
                  {loading && <div className="scanline" />}
                  
                  {/* Viewfinder brackets */}
                  <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-indigo-500/40 z-10" />
                  <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-indigo-500/40 z-10" />
                  <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-indigo-500/40 z-10" />
                  <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-indigo-500/40 z-10" />

                  <img src={image} alt="Subject Preview" className="w-full aspect-[4/3] object-contain relative z-0" />

                  {/* Dynamic Overlays */}
                  <div className="absolute inset-0 pointer-events-none z-10">
                    {overlay === 'thirds' && (
                      <div className="grid grid-cols-3 grid-rows-3 w-full h-full opacity-20">
                        {[...Array(9)].map((_, i) => <div key={i} className="border border-white/40" />)}
                      </div>
                    )}
                    {overlay === 'triangle' && (
                      <svg className="w-full h-full stroke-white/20 opacity-30" preserveAspectRatio="none">
                        <line x1="0" y1="0" x2="100%" y2="100%" />
                        <line x1="0" y1="100%" x2="25%" y2="25%" />
                        <line x1="100%" y1="0" x2="75%" y2="75%" />
                      </svg>
                    )}
                  </div>
                </div>

                {!critique && (
                  <button 
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="w-full cyber-card py-10 rounded-3xl text-white font-black text-xl tracking-[0.3em] uppercase group overflow-hidden relative border-indigo-500/30"
                  >
                    <div className="absolute inset-0 bg-indigo-600/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="relative z-10 flex items-center justify-center gap-6">
                      {loading ? 'Processing Visual Data...' : 'Initialize Analysis Audit'}
                      {!loading && <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>}
                    </span>
                  </button>
                )}
              </div>

              {/* Side Intelligence Panel */}
              <div className="xl:col-span-4 space-y-8">
                {critique ? (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-1000">
                    {/* Mastery Index */}
                    <div className="cyber-card p-10 rounded-[2.5rem] bg-indigo-500/5 relative overflow-hidden">
                      <div className="frame-corner frame-tl w-4 h-4" />
                      <div className="frame-corner frame-br w-4 h-4" />
                      <div className="flex items-center justify-between mb-8">
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Mastery Index</span>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_,i) => <div key={i} className={`w-1 h-3 rounded-full ${i < Math.floor(critique.overallRating/2) ? 'bg-indigo-400' : 'bg-white/10'}`} />)}
                        </div>
                      </div>
                      <div className="flex items-center gap-8 relative">
                        <div className="w-24 h-24 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-5xl font-black italic text-white shadow-2xl relative">
                          <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-indigo-500" />
                          {critique.overallRating}
                        </div>
                        <p className="text-white text-lg font-medium leading-tight">"{critique.summary}"</p>
                      </div>
                    </div>

                    {/* Data Points */}
                    <div className="space-y-4 relative">
                      <div className="flex items-center gap-3 px-4 py-2 border-l-2 border-indigo-500 bg-indigo-500/5 text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-4">
                        Core Metrics
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        <CritiqueCard data={critique.technicalAnalysis.exposure} />
                        <CritiqueCard data={critique.compositionAnalysis.ruleOfThirds} />
                        <CritiqueCard data={critique.lightingAnalysis.quality} />
                      </div>
                    </div>

                    {/* Tactics Section */}
                    <div className="cyber-card p-8 rounded-[2rem] relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.05] pointer-events-none translate-x-8 -translate-y-8">
                         <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                      </div>
                      <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-indigo-500" />
                        Professional Directives
                      </h4>
                      <div className="space-y-4">
                        {critique.professionalTips.slice(0, 3).map((tip, idx) => (
                          <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-400 leading-relaxed font-medium relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/20" />
                            {tip}
                          </div>
                        ))}
                      </div>
                      <button onClick={reset} className="w-full mt-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
                        Close Intel Log
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col justify-center items-center p-12 cyber-card rounded-[2.5rem] border-dashed text-center opacity-40">
                    <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
                    <svg className="w-16 h-16 text-indigo-500 mb-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    <h4 className="text-white font-bold mb-2">Awaiting Visual Link</h4>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">Neural scanner standby...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Global Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 py-4 px-10 border-t border-white/5 bg-slate-950/80 backdrop-blur-xl z-50 flex justify-between items-center hidden md:flex">
        <div className="flex items-center gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
          <span className="text-indigo-400">System Ready</span>
          <span>Buffer: 100%</span>
          <span>Latency: 24ms</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
          <span className="opacity-50 uppercase tracking-widest">Photogrammetry_v2.5</span>
        </div>
      </footer>
    </div>
  );
};

export default App;