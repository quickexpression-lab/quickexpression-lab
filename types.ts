
export interface CritiqueScore {
  category: string;
  score: number; // 0-10
  feedback: string;
}

export interface PhotographyCritique {
  overallRating: number;
  summary: string;
  technicalAnalysis: {
    exposure: CritiqueScore;
    contrast: CritiqueScore;
    whiteBalance: CritiqueScore;
    isoAndNoise: CritiqueScore;
  };
  compositionAnalysis: {
    balance: CritiqueScore;
    ruleOfThirds: CritiqueScore;
    leadingLines: CritiqueScore;
    depth: CritiqueScore;
    negativeSpace: CritiqueScore;
  };
  lightingAnalysis: {
    quality: CritiqueScore;
    direction: CritiqueScore;
  };
  professionalTips: string[];
}
