
import React from 'react';
import { CritiqueScore } from '../types';

interface CritiqueCardProps {
  data: CritiqueScore;
}

const CritiqueCard: React.FC<CritiqueCardProps> = ({ data }) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    if (score >= 5) return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
    return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
  };

  return (
    <div className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden cyber-card">
      <div className="absolute top-0 right-0 px-2 py-0.5 text-[8px] font-mono text-slate-600 tracking-tighter uppercase opacity-50">
        Metric_{data.category.substring(0, 3).toUpperCase()}
      </div>
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Analytical Component</h5>
          <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight">
            {data.category.replace(/([A-Z])/g, ' $1').trim()}
          </h4>
        </div>
        <div className={`px-3 py-1.5 rounded-lg border text-sm font-black italic relative ${getScoreColor(data.score)}`}>
          {data.score}.0
          <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-white/20" />
        </div>
      </div>
      
      <p className="text-[11px] leading-relaxed text-slate-400 font-medium italic mb-4 relative z-10">
        {data.feedback}
      </p>

      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden relative z-10">
        <div 
          className="h-full bg-indigo-500 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
          style={{ width: `${data.score * 10}%` }}
        />
      </div>
    </div>
  );
};

export default CritiqueCard;