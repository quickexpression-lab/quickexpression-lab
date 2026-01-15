
import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import CritiqueCard from './components/CritiqueCard';
import CameraView from './components/CameraView';
import AcademyModal from './components/AcademyModal';
import { analyzePhoto } from './services/geminiService';
import { PhotographyCritique } from './types';

const App: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [critique, setCritique] = useState<PhotographyCritique | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [overlay, setOverlay] = useState<'none' | 'thirds' | 'triangle'>('none');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (image && !critique && !loading) {
      handleAnalyze(image);
    }
  }, [image]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setCritique(null);
        setError(null);
        setOverlay('none');
        setImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = (base64: string) => {
    setCritique(null);
    setError(null);
    setOverlay('none');
    setImage(base64);
    setIsCameraOpen(false);
  };

  const handleAnalyze = async (imgData: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzePhoto(imgData);
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

  const toggleOverlay = (type: 'none' | 'thirds' | 'triangle') => {
    setOverlay(prev => prev === type ? 'none' : type);
  };

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden font-space">
      <div className="lens-flare top-1/4 right-0" />
      <div className="lens-flare bottom-1/4 left-0" />

      <Header 
        onOpenAcademy={(id) => setActiveTopicId(id)} 
        onOpenPreset={(id) => setActiveTopicId(id)} 
      />
      
      {activeTopicId && (
        <AcademyModal 
          topicId={activeTopicId} 
          onClose={() => setActiveTopicId(null)} 
        />
      )}
      
      {isCameraOpen && (
        <CameraView 
          onCapture={handleCapture} 
          onClose={() => setIsCameraOpen(false)} 
          overlay={overlay} 
          onToggleOverlay={setOverlay}
        />
      )}

      <main className="max-w-[1400px] mx-auto px-6 pt-10 relative z-10">
        {!image ? (
          <div className="flex flex-col gap-32">
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center relative">
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                V2.5 Engine Online
              </div>
              
              <h2 className="text-7xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-none relative">
                VISUAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">INTELLIGENCE</span>
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
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in-95 duration-700">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12 p-8 cyber-card rounded-3xl overflow-hidden">
              <div className="flex items-center gap-6">
                <button onClick={reset} className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all relative">
                  <div className="frame-corner frame-tl w-2 h-2" />
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <div>
                  <h3 className="text-sm font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" />
                    {loading ? 'Analyzing Neural Data...' : 'Analysis Complete'}
                  </h3>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-black/40 p-2 rounded-2xl border border-white/5 relative z-20">
                {(['none', 'thirds', 'triangle'] as const).map((type) => (
                  <button 
                    key={type}
                    onClick={() => toggleOverlay(type)}
                    className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${overlay === type ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]' : 'text-slate-500 border-transparent hover:text-white hover:bg-white/5'}`}
                  >
                    {type === 'none' ? 'Clean' : type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
              <div className="xl:col-span-8 flex flex-col gap-10">
                <div className="relative cyber-card rounded-[2.5rem] overflow-hidden bg-black border-indigo-500/10 shadow-2xl">
                  {loading && <div className="scanline" />}
                  <img src={image} alt="Subject Preview" className="w-full h-auto object-contain relative z-0" />
                  <div className="absolute inset-0 pointer-events-none z-10">
                    {overlay === 'thirds' && (
                      <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="border border-white/25 shadow-[inset_0_0_1px_rgba(255,255,255,0.2)]" />
                        ))}
                      </div>
                    )}
                    {overlay === 'triangle' && (
                      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
                        <line x1="100" y1="0" x2="0" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="0.3" strokeDasharray="2,2" />
                        <line x1="0" y1="100" x2="25" y2="25" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
                        <line x1="100" y1="0" x2="75" y2="75" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
                      </svg>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="p-6 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-400 text-sm font-bold flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                    {error}
                    <button onClick={() => handleAnalyze(image!)} className="ml-auto underline underline-offset-4 hover:text-rose-300">Retry Link</button>
                  </div>
                )}
              </div>

              <div className="xl:col-span-4 space-y-8">
                {critique ? (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-1000">
                    <div className="cyber-card p-10 rounded-[2.5rem] bg-indigo-500/5 relative overflow-hidden">
                      <div className="flex items-center gap-8">
                        <div className="w-24 h-24 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-5xl font-black italic text-white shadow-2xl">
                          {critique.overallRating}
                        </div>
                        <p className="text-white text-lg font-medium">"{critique.summary}"</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <CritiqueCard data={critique.technicalAnalysis.exposure} />
                      <CritiqueCard data={critique.compositionAnalysis.ruleOfThirds} />
                      <CritiqueCard data={critique.lightingAnalysis.quality} />
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col justify-center items-center p-12 cyber-card rounded-[2.5rem] border-dashed text-center">
                    <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
                    <div className="relative">
                      <svg className={`w-16 h-16 text-indigo-500 mb-6 ${loading ? 'animate-spin' : 'animate-pulse'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {loading ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        )}
                      </svg>
                    </div>
                    <h4 className="text-white font-bold mb-2">{loading ? 'Neural Processing...' : 'Awaiting Visual Link'}</h4>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">{loading ? 'Decoding geometry and light' : 'Neural scanner standby...'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
