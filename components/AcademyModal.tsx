
import React from 'react';

interface AcademyModalProps {
  topicId: string;
  onClose: () => void;
}

const academyData: Record<string, { title: string; content: string; keyPoints: string[] }> = {
  // Knowledge Base
  exposure: {
    title: 'The Exposure Triangle',
    content: 'The exposure triangle is the fundamental relationship between Aperture, Shutter Speed, and ISO that controls the brightness and creative look of an image.',
    keyPoints: [
      'Aperture (f-stop): Controls depth of field (blur). Low numbers = wide opening, more light, blurry background.',
      'Shutter Speed: Controls motion. Fast (1/1000s) freezes action; Slow (1/30s) blurs movement.',
      'ISO: Controls sensor sensitivity. Low ISO (100) is clean; High ISO (3200+) allows low-light shots but adds grain (noise).'
    ]
  },
  composition: {
    title: 'Composition Principles',
    content: 'Composition is the strategic arrangement of visual elements to guide the viewer\'s eye and tell a stronger story.',
    keyPoints: [
      'Rule of Thirds: Place subjects along grid lines or intersections for balance.',
      'Leading Lines: Use roads, fences, or rivers to draw the eye toward the subject.',
      'Negative Space: Leave empty areas around a subject to create focus and a minimalist feel.',
      'Framing: Use windows or trees to border the subject and add depth.'
    ]
  },
  lighting: {
    title: 'Lighting Principles',
    content: 'Lighting controls mood and dimension. It is categorized by quality (hard/soft), direction, and intensity.',
    keyPoints: [
      'Soft Light: Large sources (clouds, softbox) create gradual shadows and flattering portraits.',
      'Hard Light: Small sources (direct sun) create sharp shadows and high contrast/drama.',
      'Side Lighting: Accentuates texture and creates depth through shadows.',
      'Backlighting: Separates the subject from the background, creating a rim light or silhouette.'
    ]
  },
  cropping: {
    title: 'Cropping & Geometry',
    content: 'Cropping improves composition after the shot. Geometric guides like the Golden Triangle add dynamic flow.',
    keyPoints: [
      'Golden Triangle: Diagonal lines that create movement and lead the eye through angular flow.',
      'Aspect Ratios: Standard sizes like 4:3 or 16:9 change how the scene is perceived.',
      'Tight Cropping: Removing distractions to let the subject dominate the frame.'
    ]
  },
  technical: {
    title: 'Technical Standards',
    content: 'Ensuring your files meet professional output standards for color accuracy and sharpness.',
    keyPoints: [
      'White Balance: Adjusting for color temperature (warm/yellow vs cool/blue).',
      'Resolution (PPI): Professional prints require 300 PPI for maximum detail.',
      'Sharpening: Adding edge definition without creating halos or artificial artifacts.'
    ]
  },
  // Presets Knowledge
  'golden-hour': {
    title: 'Golden Hour Aesthetics',
    content: 'The period shortly after sunrise or before sunset where the sun is low in the sky, producing a warm, soft, and long-shadowed quality of light.',
    keyPoints: [
      'Warm Color Temp: Naturally lowers Kelvin values (approx 3500K) for a glowing skin tone.',
      'Soft Shadows: Low angle light passes through more atmosphere, diffusing the sun into a massive softbox.',
      'Rim Lighting: Perfect for silhouetting or creating "hair light" separation from backgrounds.'
    ]
  },
  'film-noir': {
    title: 'Film Noir Standards',
    content: 'A cinematic style characterized by high-contrast black and white, deep shadows, and moody atmosphere inspired by 1940s crime dramas.',
    keyPoints: [
      'Chiaroscuro: Using strong contrasts between light and dark to create volume and mystery.',
      'Low Key Lighting: Emphasizing shadows over highlights to hide parts of the scene.',
      'Hard Edge Light: Often uses "Venetian blind" or "Slit" lighting patterns for dramatic tension.'
    ]
  },
  'cinematic-teal': {
    title: 'Cinematic Teal & Orange',
    content: 'The most popular color grading technique in modern cinema, utilizing complementary colors to make subjects pop.',
    keyPoints: [
      'Color Contrast: Skin tones (Orange) are juxtaposed against backgrounds (Teal).',
      'Dynamic Separation: Warmth pushes toward the viewer while coolness recedes, creating 3D depth.',
      'Split Toning: Highlights are pushed toward warmth, while shadows are cooled down.'
    ]
  },
  'high-key': {
    title: 'High Key Principles',
    content: 'A lighting style that aims to reduce the lighting ratio in the scene, resulting in bright, optimistic, and clean visuals.',
    keyPoints: [
      'Minimal Shadows: Multiple light sources or heavy diffusion wash out dark areas.',
      'Low Contrast: The tonal range is compressed toward the white/bright end of the histogram.',
      'Clean Backgrounds: Often uses pure white or light grey backdrops for a commercial look.'
    ]
  },
  'muted-tones': {
    title: 'Muted Tone Aesthetic',
    content: 'A sophisticated look that reduces saturation and contrast to create a calm, vintage, or melancholic mood.',
    keyPoints: [
      'Desaturation: Colors are less "vibrant," shifting focus to texture and form.',
      'Crushed Blacks: Lifting the black point of the image to create a "matte" or "faded" finish.',
      'Limited Palette: Often restricts the image to 2-3 harmonious colors.'
    ]
  },
  'kodak-style': {
    title: 'Kodak Film Heritage',
    content: 'Emulating the warm, nostalgic characteristics of classic film stocks like Portra or Ektar.',
    keyPoints: [
      'Film Grain: Adds an organic texture that mimics silver halide crystals.',
      'Cyan Shadows: A specific chemical response in old film that adds depth to dark areas.',
      'Dynamic Range Roll-off: Highlights fade into white gradually rather than "clipping" harshly like digital.'
    ]
  }
};

const AcademyModal: React.FC<AcademyModalProps> = ({ topicId, onClose }) => {
  const data = academyData[topicId];
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-10 font-space">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-2xl cyber-card rounded-[2.5rem] bg-slate-900 border-indigo-500/20 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500" />
        
        <div className="p-8 sm:p-12 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-2 block">Standard Notes_A1</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">{data.title}</h2>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <p className="text-slate-400 text-lg font-light leading-relaxed mb-10">
            {data.content}
          </p>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Core Principles</h4>
            {data.keyPoints.map((point, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 flex gap-4 items-start group hover:border-indigo-500/30 transition-all">
                <span className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                <p className="text-sm text-slate-300 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>

          <button 
            onClick={onClose}
            className="w-full mt-12 py-5 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-[0.2em] hover:bg-indigo-500 transition-all shadow-lg"
          >
            Acknowledge Intelligence
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcademyModal;
