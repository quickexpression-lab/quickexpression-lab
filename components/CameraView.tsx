
import React, { useRef, useEffect, useState } from 'react';

interface CameraViewProps {
  onCapture: (base64: string) => void;
  onClose: () => void;
  overlay: 'none' | 'thirds' | 'triangle';
}

const CameraView: React.FC<CameraViewProps> = ({ onCapture, onClose, overlay }) => {
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
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className="w-full h-full object-cover"
        />
        
        {/* Composition Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {overlay === 'thirds' && (
            <div className="grid grid-cols-3 grid-rows-3 w-full h-full opacity-30">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="border border-white/40 shadow-[0_0_1px_rgba(0,0,0,0.5)]" />
              ))}
            </div>
          )}
          {overlay === 'triangle' && (
            <svg className="w-full h-full stroke-white/30 opacity-40 shadow-[0_0_1px_rgba(0,0,0,0.5)]" preserveAspectRatio="none">
              <line x1="0" y1="0" x2="100%" y2="100%" strokeWidth="1" />
              <line x1="0" y1="100%" x2="25%" y2="25%" strokeWidth="1" />
              <line x1="100%" y1="0" x2="75%" y2="75%" strokeWidth="1" />
            </svg>
          )}
        </div>

        {/* Global Controls */}
        <div className="absolute top-10 left-10 right-10 flex justify-between items-center z-20">
          <button onClick={onClose} className="w-14 h-14 glass flex items-center justify-center rounded-2xl text-white transition-all hover:scale-105 active:scale-90">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          
          <div className="px-6 py-3 glass rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-white">
            Live Precision View
          </div>
          
          <div className="w-14 h-14" /> {/* Spacer */}
        </div>

        <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-10 z-20">
          <button 
            onClick={capturePhoto}
            className="group relative w-24 h-24 p-2 rounded-full border-2 border-white/50 active:scale-90 transition-all duration-300"
          >
            <div className="w-full h-full rounded-full bg-white transition-transform group-hover:scale-[0.9]" />
            <div className="absolute -inset-4 border border-white/10 rounded-full animate-pulse" />
          </button>
          
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Hold steady for optimal clarity</p>
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraView;
