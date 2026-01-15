
import React, { useRef, useEffect, useState } from 'react';

interface CameraViewProps {
  onCapture: (base64: string) => void;
  onClose: () => void;
  overlay: 'none' | 'thirds' | 'triangle';
  onToggleOverlay?: (type: 'none' | 'thirds' | 'triangle') => void;
}

const CameraView: React.FC<CameraViewProps> = ({ onCapture, onClose, overlay, onToggleOverlay }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

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

    return () => {
      stream?.getTracks().forEach(track => track.stop());
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
        
        {/* Technical HUD Brackets */}
        <div className="absolute inset-10 pointer-events-none z-10 border border-white/5">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-indigo-500" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-indigo-500" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-indigo-500" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-indigo-500" />
        </div>

        {/* Live Precision Composition Guides */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {overlay === 'thirds' && (
            <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="border border-white/20" />
              ))}
            </div>
          )}
          {overlay === 'triangle' && (
            <svg className="w-full h-full" preserveAspectRatio="none">
              <line x1="0" y1="0" x2="100%" y2="100%" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <line x1="0" y1="100%" x2="25%" y2="25%" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <line x1="100%" y1="0" x2="75%" y2="75%" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            </svg>
          )}
        </div>

        {/* HUD UI Controls */}
        <div className="absolute top-10 left-10 right-10 flex justify-between items-center z-30">
          <button onClick={onClose} className="w-14 h-14 bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center rounded-2xl text-white transition-all hover:scale-105 active:scale-90">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          
          <div className="flex gap-2">
            {(['none', 'thirds', 'triangle'] as const).map(type => (
              <button 
                key={type}
                onClick={() => onToggleOverlay?.(type)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${overlay === type ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-black/40 border-white/10 text-slate-400'}`}
              >
                {type}
              </button>
            ))}
          </div>
          
          <div className="w-14 h-14" />
        </div>

        <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-10 z-30">
          <div className="relative group">
            <button 
              onClick={capturePhoto}
              className="relative w-24 h-24 p-2 rounded-full border-2 border-white/50 active:scale-90 transition-all duration-300 z-10"
            >
              <div className="w-full h-full rounded-full bg-white group-hover:bg-indigo-50" />
            </button>
            <div className="absolute -inset-4 border border-indigo-500/30 rounded-full animate-ping opacity-20" />
          </div>
          
          <p className="text-white/80 text-[10px] font-black uppercase tracking-[0.4em] bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
            Scanning Environment_A1
          </p>
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraView;
