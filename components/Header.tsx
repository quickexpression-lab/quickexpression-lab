
import React, { useState } from 'react';

interface HeaderProps {
  onOpenAcademy: (topicId: string) => void;
  onOpenPreset: (presetId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenAcademy, onOpenPreset }) => {
  const [activeMenu, setActiveMenu] = useState<'academy' | 'presets' | 'contact' | null>(null);

  const industryPresets = [
    { id: 'golden-hour', name: 'Golden Hour', desc: 'Warm aesthetics' },
    { id: 'film-noir', name: 'Film Noir', desc: 'Dramatic B&W' },
    { id: 'cinematic-teal', name: 'Cinematic', desc: 'Teal & Orange' },
    { id: 'high-key', name: 'High Key', desc: 'Clean & Airy' },
  ];

  const academyTopics = [
    { id: 'exposure', name: 'Exposure', desc: 'The Triangle' },
    { id: 'composition', name: 'Composition', desc: 'Core Rules' },
    { id: 'lighting', name: 'Lighting', desc: 'The Basics' },
    { id: 'cropping', name: 'Cropping', desc: 'Golden Geometry' },
  ];

  const toggleMenu = (menu: 'academy' | 'presets' | 'contact') => {
    setActiveMenu(prev => prev === menu ? null : menu);
  };

  return (
    <header className="sticky top-0 z-[60] w-full border-b border-white/5 bg-slate-950/40 backdrop-blur-xl">
      <div className="px-4 py-3 flex justify-between items-center relative">
        {/* Restored Logo and App Name */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer group" 
          onClick={() => window.location.reload()}
        >
          <div className="w-8 h-8 rounded-lg border border-white/10 bg-black overflow-hidden relative shadow-inner">
            <img 
              src="https://target.b-cdn.net/67ade02766ec3c00122e20b3/6c653634-2e9b-46cb-84ae-f93390c88599" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
              alt="Logo"
            />
            <div className="absolute inset-0 bg-indigo-500/5" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-[9px] font-black text-white leading-none tracking-tight uppercase">
              ExpressCritique<span className="text-indigo-400">AI</span>
            </h1>
            <span className="text-[6px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-0.5">Visual Intelligence</span>
          </div>
        </div>

        <div className="flex gap-1">
          <button 
            onClick={() => toggleMenu('academy')}
            className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-lg border transition-all ${activeMenu === 'academy' ? 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10' : 'text-slate-400 border-transparent hover:text-slate-200'}`}
          >
            Academy
          </button>
          
          <button 
            onClick={() => toggleMenu('presets')}
            className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-lg border transition-all ${activeMenu === 'presets' ? 'text-purple-400 border-purple-500/30 bg-purple-500/10' : 'text-slate-400 border-transparent hover:text-slate-200'}`}
          >
            Presets
          </button>

          <button 
            onClick={() => toggleMenu('contact')}
            className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-lg border transition-all ${activeMenu === 'contact' ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' : 'text-slate-400 border-transparent hover:text-slate-200'}`}
          >
            Contact
          </button>
        </div>

        {/* Floating Menus */}
        {activeMenu === 'academy' && (
          <div className="absolute top-[calc(100%+8px)] right-4 w-48 animate-in fade-in slide-in-from-top-2 duration-200 z-[70]">
            <div className="cyber-card p-2 shadow-2xl border-indigo-500/20 bg-slate-900/95 backdrop-blur-2xl rounded-2xl">
              <div className="flex flex-col gap-1">
                {academyTopics.map((item) => (
                  <button key={item.id} onClick={() => { onOpenAcademy(item.id); setActiveMenu(null); }} className="p-3 rounded-xl hover:bg-white/5 text-left transition-all">
                    <div className="text-[9px] font-black text-slate-200 uppercase tracking-wider">{item.name}</div>
                    <div className="text-[7px] text-slate-500 mt-0.5 uppercase">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeMenu === 'presets' && (
          <div className="absolute top-[calc(100%+8px)] right-4 w-48 animate-in fade-in slide-in-from-top-2 duration-200 z-[70]">
            <div className="cyber-card p-2 shadow-2xl border-purple-500/20 bg-slate-900/95 backdrop-blur-2xl rounded-2xl">
              <div className="flex flex-col gap-1">
                {industryPresets.map((item) => (
                  <button key={item.id} onClick={() => { onOpenPreset(item.id); setActiveMenu(null); }} className="p-3 rounded-xl hover:bg-white/5 text-left transition-all">
                    <div className="text-[9px] font-black text-slate-200 uppercase tracking-wider">{item.name}</div>
                    <div className="text-[7px] text-slate-500 mt-0.5 uppercase">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeMenu === 'contact' && (
          <div className="absolute top-[calc(100%+8px)] right-4 w-48 animate-in fade-in slide-in-from-top-2 duration-200 z-[70]">
            <div className="cyber-card p-3 shadow-2xl border-emerald-500/20 bg-slate-900/95 backdrop-blur-2xl rounded-2xl">
              <div className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-3 px-1">Neural_Support</div>
              <div className="space-y-2">
                <a href="mailto:support@expresscritique.ai" className="block p-3 rounded-xl hover:bg-white/5 border border-white/5 transition-all">
                  <div className="text-[9px] font-bold text-slate-200">Email Dispatch</div>
                  <div className="text-[7px] text-slate-500 mt-0.5 uppercase">Direct Query</div>
                </a>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[9px] font-bold text-slate-200 italic">@CritiqueAI_Bot</div>
                  <div className="text-[7px] text-slate-500 mt-0.5 uppercase">Social Hub</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {activeMenu && <div className="fixed inset-0 z-[-1]" onClick={() => setActiveMenu(null)} />}
    </header>
  );
};

export default Header;
