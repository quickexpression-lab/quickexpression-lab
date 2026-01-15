
import { GoogleGenAI, Type } from "@google/genai";
import { PhotographyCritique } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzePhoto = async (base64Image: string): Promise<PhotographyCritique> => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `You are an elite photography professor. Analyze this image across these specific dimensions:
  - COMPOSITION: Rule of Thirds, Leading Lines, Framing, Symmetry, Negative Space, Depth, Filling the Frame, Rule of Odds, and the Golden Triangle.
  - TECHNICAL: Exposure Triangle (estimated Aperture/Shutter/ISO balance), Contrast, White Balance (Kelvin/Mood), and Sharpness.
  - LIGHTING: Quality (Hard vs Soft), Direction (Side, Back, Front), and Intensity.

  For the "lightingAnalysis" section specifically:
  - In the "feedback" for both "quality" and "direction", do not just name the type of light. 
  - Explain explicitly how the current lighting impacts the subject's texture, mood, and dimensionality.
  - Example: If you detect hard side-lighting, describe how it accentuates surface textures and creates high-contrast, dramatic shadows that add depth or tension.

  For the "professionalTips", provide 3-5 high-impact, actionable suggestions that would move this photo from a snapshot to a gallery piece.`;

  const scoreSchema = {
    type: Type.OBJECT,
    properties: {
      category: { type: Type.STRING },
      score: { type: Type.NUMBER },
      feedback: { type: Type.STRING }
    },
    required: ["category", "score", "feedback"]
  };

  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image.split(',')[1] || base64Image
            }
          }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overallRating: { type: Type.NUMBER },
          summary: { type: Type.STRING },
          technicalAnalysis: {
            type: Type.OBJECT,
            properties: {
              exposure: scoreSchema,
              contrast: scoreSchema,
              whiteBalance: scoreSchema,
              isoAndNoise: scoreSchema
            },
            required: ["exposure", "contrast", "whiteBalance", "isoAndNoise"]
          },
          compositionAnalysis: {
            type: Type.OBJECT,
            properties: {
              balance: scoreSchema,
              ruleOfThirds: scoreSchema,
              leadingLines: scoreSchema,
              depth: scoreSchema,
              negativeSpace: scoreSchema
            },
            required: ["balance", "ruleOfThirds", "leadingLines", "depth", "negativeSpace"]
          },
          lightingAnalysis: {
            type: Type.OBJECT,
            properties: {
              quality: scoreSchema,
              direction: scoreSchema
            },
            required: ["quality", "direction"]
          },
          professionalTips: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["overallRating", "summary", "technicalAnalysis", "compositionAnalysis", "lightingAnalysis", "professionalTips"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Empty response from AI");
  return JSON.parse(text) as PhotographyCritique;
};
