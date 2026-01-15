
import React, { useState } from 'react';

const Header: React.FC = () => {
  const [showPresets, setShowPresets] = useState(false);

  const industryPresets = [
    { name: 'Golden Hour', desc: 'Warm highlights & soft contrast' },
    { name: 'Film Noir', desc: 'Dramatic B&W with deep shadows' },
    { name: 'Cinematic Teal', desc: 'Classic teal/orange color grade' },
    { name: 'High Key', desc: 'Bright, airy, and low contrast' },
    { name: 'Muted Tones', desc: 'Desaturated, moody aesthetic' },
    { name: 'Kodak Style', desc: 'Retro film-inspired warmth' },
  ];

  return (
    <header className="sticky top-0 z-[60] w-full border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.location.reload()}>
            <div className="relative">
              <div className="w-14 h-14 rounded-full overflow-hidden border border-white/10 bg-black flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
                <img 
                  src="https://target.b-cdn.net/67ade02766ec3c00122e20b3/6c653634-2e9b-46cb-84ae-f93390c88599" 
                  alt="Quickexpression Photography" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -inset-1 bg-white/5 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-extrabold tracking-tight text-white leading-tight">
                ExpressCritique<span className="text-indigo-400">AI</span>
              </h1>
              <div className="flex flex-col mt-0.5">
                <span className="text-[10px] font-normal text-slate-400 uppercase tracking-[0.2em] leading-none">
                  By Quickexpression.com
                </span>
                <span className="text-[9px] font-medium text-indigo-300/80 italic tracking-wider leading-none mt-1">
                  expression captured in a click
                </span>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-10">
            {['Showcase', 'Academy'].map((item) => (
              <span key={item} className="text-sm font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer">
                {item}
              </span>
            ))}
            
            {/* Presets Menu with Dropdown */}
            <div className="relative" onMouseEnter={() => setShowPresets(true)} onMouseLeave={() => setShowPresets(false)}>
              <button className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer">
                Presets
                <svg className={`w-4 h-4 transition-transform duration-300 ${showPresets ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showPresets && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-64 animate-in fade-in zoom-in-95 duration-200">
                  <div className="glass rounded-2xl border border-white/10 p-4 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 px-2">Standard Industry Grades</h4>
                    <div className="space-y-1">
                      {industryPresets.map((preset) => (
                        <button key={preset.name} className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 transition-all group/item">
                          <div className="text-xs font-bold text-slate-200 group-hover/item:text-indigo-400 transition-colors">{preset.name}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{preset.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a 
              href="mailto:quickexpression@gmail.com" 
              className="text-sm font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
