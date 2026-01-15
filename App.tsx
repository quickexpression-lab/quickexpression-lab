
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
  const [overlay, setOverlay] = useState<'none' | 'thirds' | 'triangle'>('thirds');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerHaptic = () => {
    if ('vibrate' in navigator) navigator.vibrate(25);
  };

  useEffect(() => {
    if (image && !critique && !loading) {
      handleAnalyze(image);
    }
  }, [image]);

  const handleCapture = (base64: string) => {
    triggerHaptic();
    setImage(base64);
    setCritique(null);
    setIsCameraOpen(false);
  };

  const handleAnalyze = async (imgData: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzePhoto(imgData);
      setCritique(result);
      if ('vibrate' in navigator) navigator.vibrate([20, 40, 20]);
    } catch (err) {
      setError("NEURAL LINK TIMEOUT");
    } finally {
      setLoading(false);
    }
  };

  const toggleOverlay = (type: 'none' | 'thirds' | 'triangle') => {
    triggerHaptic();
    setOverlay(prev => prev === type ? 'none' : type);
  };

  return (
    <div className="app-container relative">
      <div className="lens-flare top-1/4 -left-10 opacity-30" />
      <div className="lens-flare bottom-1/4 -right-10 opacity-30" />

      <Header 
        onOpenAcademy={(id) => { triggerHaptic(); setActiveTopicId(id); }} 
        onOpenPreset={(id) => { triggerHaptic(); setActiveTopicId(id); }} 
      />
      
      <div className="scroll-view px-6 pb-24">
        {!image ? (
          <div className="flex flex-col items-center pt-12 pb-12 space-y-12">
            
            <div className="flex flex-col items-center justify-center text-center relative px-4">
              <div className="relative select-none max-w-xs w-full animate-in fade-in zoom-in duration-700">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4 text-center">
                     <div className="text-[7px] font-bold text-indigo-500/40 uppercase tracking-[0.5em] mb-5">
                       Studio Standard_01
                     </div>
                     
                     <div className="space-y-0 relative">
                       <h1 className="text-xl font-bold tracking-tight text-white/80 uppercase leading-tight">
                          Express
                       </h1>
                       <div className="flex items-center justify-center gap-1.5 -mt-0.5">
                          <span className="text-sm font-light tracking-[0.3em] text-indigo-400/40 uppercase">Critique</span>
                          <span className="bg-indigo-600/50 px-1 py-0.5 rounded-[3px] text-[6px] font-black text-white/90 tracking-widest">AI</span>
                       </div>
                     </div>
                  </div>
                  
                  <div className="space-y-5 mb-10">
                    <h2 className="text-2xl font-black tracking-tight text-white uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
                      Visual Intelligence
                    </h2>
                    <div className="flex items-center justify-center gap-3">
                      <div className="h-[1px] w-4 bg-emerald-500/30" />
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.45em] leading-relaxed opacity-90 whitespace-nowrap">
                        Neural <span className="text-emerald-400">Aesthetic</span> Matrix
                      </p>
                      <div className="h-[1px] w-4 bg-emerald-500/30" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full max-w-[220px] space-y-3.5 mt-4">
                <button 
                  onClick={() => { triggerHaptic(); setIsCameraOpen(true); }}
                  className="group relative w-full py-4 cyber-card bg-indigo-600/10 border-indigo-500/20 text-white font-bold uppercase tracking-[0.15em] text-[11px] btn-active overflow-hidden shadow-lg shadow-indigo-500/5"
                >
                  <div className="absolute inset-0 bg-indigo-500/5 translate-x-[-100%] group-active:translate-x-0 transition-transform duration-300" />
                  <span className="relative z-10">Neural Scanner</span>
                </button>
                
                <button 
                  onClick={() => { triggerHaptic(); fileInputRef.current?.click(); }}
                  className="w-full py-4 cyber-card bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border-cyan-500/20 text-cyan-200/90 font-bold uppercase tracking-[0.15em] text-[11px] btn-active shadow-lg shadow-cyan-500/5 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <span className="relative z-10">Import Media</span>
                </button>
              </div>
            </div>

            {/* Vision & Purpose Section */}
            <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
              <div className="cyber-card p-8 border-white/5 bg-slate-900/40 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-indigo-500/30 flex items-center justify-center bg-indigo-500/5">
                    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                  </div>
                  <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Our Core Mission</h3>
                </div>
                
                <div className="space-y-4">
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    ExpressCritiqueAI was built to <span className="text-indigo-400">democratize professional creative feedback</span>. We believe every photographer, regardless of their background, should have access to instant, objective insights that help bridge the gap between technical execution and artistic intent.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    Our goal isn't to replace the human eye, but to <span className="text-emerald-400">empower self-learning</span>. By providing a "Neural Mirror" that reflects established photography principles, we give you the data needed to refine your craft independently and build confidence for your next great shoot.
                  </p>
                </div>

                <div className="pt-4 flex justify-between items-center border-t border-white/5">
                   <button 
                     onClick={() => { triggerHaptic(); setActiveTopicId('about-mission'); }}
                     className="text-[8px] font-black text-indigo-400 uppercase tracking-widest hover:text-white transition-colors"
                   >
                     Read the Full Story →
                   </button>
                   <span className="text-[7px] font-bold text-slate-600 uppercase tracking-tighter italic opacity-50">Log_Manifesto_2025</span>
                </div>
              </div>
            </div>

            <div className="text-[7px] font-semibold text-slate-700 uppercase tracking-[0.4em] opacity-40">
              Powered by Gemini Vision
            </div>

            <input type="file" ref={fileInputRef} onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => setImage(ev.target?.result as string);
                reader.readAsDataURL(file);
              }
            }} className="hidden" accept="image/*" />
          </div>
        ) : (
          <div className="space-y-8 pt-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
             <div className="flex items-center justify-between p-3 cyber-card border-white/5 bg-slate-900/40">
                <button onClick={() => { triggerHaptic(); setImage(null); setCritique(null); }} className="p-2 text-slate-400 active:text-white transition-colors">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <div className="flex gap-2">
                  {(['thirds', 'triangle'] as const).map(type => (
                    <button 
                      key={type}
                      onClick={() => toggleOverlay(type)}
                      className={`px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest border transition-all ${overlay === type ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_10px_rgba(99,102,241,0.3)]' : 'bg-white/5 border-white/10 text-slate-500'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
             </div>

             <div className="relative rounded-[2rem] overflow-hidden bg-black shadow-2xl border border-white/10 flex items-center justify-center p-1">
                {loading && <div className="scanline" />}
                <div className="relative inline-block overflow-hidden rounded-2xl">
                  <img src={image} className="max-w-full h-auto max-h-[50vh] block object-contain" />
                  
                  <div className="absolute inset-0 pointer-events-none z-10 opacity-50">
                    {overlay === 'thirds' && (
                      <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="border-[0.5px] border-white/40" />
                        ))}
                      </div>
                    )}
                    {overlay === 'triangle' && (
                      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth="0.8" />
                        <line x1="0" y1="100" x2="25" y2="25" stroke="white" strokeWidth="0.8" />
                        <line x1="100" y1="0" x2="75" y2="75" stroke="white" strokeWidth="0.8" />
                      </svg>
                    )}
                  </div>
                </div>
                
                <div className="frame-corner frame-tl w-8 h-8 pointer-events-none -m-1" />
                <div className="frame-corner frame-br w-8 h-8 pointer-events-none -m-1" />
             </div>

             {critique ? (
               <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-10 duration-700">
                  <div className="cyber-card p-6 bg-indigo-500/5 flex items-center gap-6 overflow-hidden">
                     <div className="w-16 h-16 rounded-xl bg-black border border-white/10 flex items-center justify-center text-4xl font-black italic text-white shrink-0">
                        {critique.overallRating}
                     </div>
                     <div className="space-y-1.5">
                       <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest opacity-80">Neural Summary</p>
                       <div className="text-xs font-medium leading-relaxed text-slate-300 italic">"{critique.summary}"</div>
                     </div>
                  </div>
                  
                  <div className="grid gap-4">
                    <CritiqueCard data={critique.technicalAnalysis.exposure} />
                    <CritiqueCard data={critique.compositionAnalysis.ruleOfThirds} />
                    <CritiqueCard data={critique.lightingAnalysis.quality} />
                  </div>

                  <div className="cyber-card p-6 space-y-4">
                    <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Growth Path</h4>
                    <div className="space-y-3">
                      {critique.professionalTips.map((tip, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <span className="w-1 h-1 rounded-full bg-indigo-500 mt-1.5 shrink-0 opacity-50" />
                          <p className="text-[10px] text-slate-400 leading-relaxed italic">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
             ) : (
               <div className="py-20 flex flex-col items-center justify-center space-y-6 cyber-card border-dashed bg-white/5">
                  <div className="relative">
                    <div className="w-12 h-12 border border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-1">Analyzing Pixels</div>
                    <div className="text-[8px] text-slate-500 uppercase tracking-widest opacity-60">Quantifying aesthetic data...</div>
                  </div>
               </div>
             )}
          </div>
        )}
      </div>

      {activeTopicId && <AcademyModal topicId={activeTopicId} onClose={() => setActiveTopicId(null)} />}
      {isCameraOpen && <CameraView onCapture={handleCapture} onClose={() => setIsCameraOpen(false)} overlay={overlay === 'none' ? 'thirds' : overlay} onToggleOverlay={setOverlay} />}
    </div>
  );
};

export default App;
