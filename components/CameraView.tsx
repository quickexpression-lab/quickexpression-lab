
import React, { useRef, useEffect, useState } from 'react';

interface CameraViewProps {
  onCapture: (base64: string) => void;
  onClose: () => void;
  overlay: 'none' | 'thirds' | 'triangle';
  onToggleOverlay: (type: 'none' | 'thirds' | 'triangle') => void;
}

const CameraView: React.FC<CameraViewProps> = ({ onCapture, onClose, overlay, onToggleOverlay }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [exposureLevel, setExposureLevel] = useState(50); 
  const [histogram, setHistogram] = useState<number[]>(Array(12).fill(40));

  useEffect(() => {
    async function startCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } },
          audio: false,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Camera access failed:", err);
        alert("Camera access denied. Please verify permissions in system settings.");
        onClose();
      }
    }
    startCamera();

    // Enhanced simulation of real-time exposure and tonal distribution
    const interval = setInterval(() => {
      setExposureLevel(prev => {
        const delta = (Math.random() - 0.5) * 6;
        return Math.max(5, Math.min(95, prev + delta));
      });
      setHistogram(prev => prev.map(h => Math.max(10, Math.min(100, h + (Math.random() - 0.5) * 20))));
    }, 150);

    return () => {
      stream?.getTracks().forEach(track => track.stop());
      clearInterval(interval);
    };
  }, []);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
        onCapture(dataUrl);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-space">
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className="w-full h-full object-cover"
        />
        
        {/* Live Precision Composition Guides */}
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
          <div className="relative w-full h-full">
            {overlay === 'thirds' && (
              <div className="grid grid-cols-3 grid-rows-3 w-full h-full opacity-60">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="border-[0.5px] border-white/30" />
                ))}
              </div>
            )}
            {overlay === 'triangle' && (
              <svg className="w-full h-full opacity-80" preserveAspectRatio="none" viewBox="0 0 100 100">
                <line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth="0.4" strokeDasharray="2 1" />
                <line x1="0" y1="100" x2="100" y2="0" stroke="white" strokeWidth="0.2" opacity="0.3" />
                <line x1="100" y1="0" x2="31" y2="69" stroke="white" strokeWidth="0.6" />
                <line x1="0" y1="100" x2="69" y2="31" stroke="white" strokeWidth="0.6" />
                <circle cx="31" cy="69" r="1.5" fill="#818cf8" className="animate-pulse shadow-lg" />
                <circle cx="69" cy="31" r="1.5" fill="#818cf8" className="animate-pulse shadow-lg" />
              </svg>
            )}
          </div>
        </div>

        {/* Pro Exposure Tonal HUD (Histogram style) */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-row items-end gap-1 px-2 py-4 rounded-full bg-black/40 backdrop-blur-md border border-white/10 z-30 pointer-events-none">
           <div className="flex flex-col items-center gap-1 mb-1">
             <div className="text-[6px] font-black text-indigo-400 vertical-text transform rotate-180 uppercase tracking-widest">TONAL_RANGE</div>
           </div>
           {histogram.map((h, i) => (
             <div key={i} className="w-1 bg-white/20 rounded-full relative" style={{ height: '60px' }}>
                <div 
                  className="absolute bottom-0 left-0 w-full rounded-full transition-all duration-300 ease-out"
                  style={{ 
                    height: `${h}%`,
                    backgroundColor: i < 3 ? '#fb7185' : i > 8 ? '#f43f5e' : '#818cf8',
                    opacity: 0.6 + (h / 200)
                  }}
                />
             </div>
           ))}
           <div className="flex flex-col justify-between h-[60px] ml-1">
              <span className="text-[6px] text-rose-400 font-bold">H</span>
              <span className="text-[6px] text-indigo-400 font-bold">M</span>
              <span className="text-[6px] text-rose-400 font-bold">S</span>
           </div>
        </div>

        {/* Real-time Digital EV Slider (Floating HUD) */}
        <div className="absolute right-14 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-30 pointer-events-none">
          <div className="text-[7px] font-black text-white/60 uppercase tracking-tighter mb-2">EV_LINK</div>
          <div className="w-0.5 h-32 bg-white/10 relative rounded-full">
            <div 
              className="absolute left-1/2 -translate-x-1/2 w-3 h-3 border-2 border-white rounded-full transition-all duration-150"
              style={{ top: `${100 - exposureLevel}%` }}
            >
               <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-30" />
            </div>
          </div>
          <div className="text-[9px] font-bold text-white mt-1 tabular-nums">
            {(exposureLevel / 10).toFixed(1)}
          </div>
        </div>

        {/* Technical HUD Brackets */}
        <div className="absolute inset-10 pointer-events-none z-10">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-indigo-500/60" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-indigo-500/60" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-indigo-500/60" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-indigo-500/60" />
        </div>

        {/* HUD UI Controls */}
        <div className="absolute top-10 left-6 right-6 flex justify-between items-center z-30">
          <button onClick={onClose} className="w-12 h-12 bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center rounded-2xl text-white transition-all active:scale-90">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          
          <div className="flex gap-1.5 bg-black/20 p-1.5 rounded-2xl backdrop-blur-md border border-white/5">
            {(['thirds', 'triangle'] as const).map(type => (
              <button 
                key={type}
                onClick={() => onToggleOverlay(type)}
                className={`px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all border ${overlay === type ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]' : 'bg-transparent border-transparent text-slate-400'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-8 z-30">
          <div className="relative group">
            <button 
              onClick={capturePhoto}
              className="relative w-20 h-20 p-1.5 rounded-full border-2 border-white/50 active:scale-95 transition-all duration-300 z-10"
            >
              <div className="w-full h-full rounded-full bg-white shadow-[0_0_20px_white]" />
            </button>
            <div className="absolute -inset-3 border border-indigo-500/30 rounded-full animate-ping opacity-20" />
          </div>
          
          <p className="text-white/80 text-[8px] font-black uppercase tracking-[0.3em] bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
            Scanner_Ready :: Neural_Grid_Link
          </p>
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraView;
