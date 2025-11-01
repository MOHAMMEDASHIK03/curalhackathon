
import { GoogleGenAI } from "@google/genai";
import type { Publication, ClinicalTrial, Expert, UserProfile } from '../types';
import { MOCK_PUBLICATIONS, MOCK_TRIALS, MOCK_EXPERTS } from '../constants';

// This is a mocked service. In a real application, you would initialize this.
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generateSummary = (title: string, text: string): string => {
  return `This document, titled "${title}", discusses key aspects of its subject matter in a concise format. It aims to provide a clear overview for patients and researchers, highlighting the main objectives, methods, and potential implications of the study or work.`;
};

export const geminiService = {
  parseNaturalLanguageCondition: async (text: string): Promise<string[]> => {
    console.log('Simulating Gemini parsing for:', text);
    await new Promise(res => setTimeout(res, 500));
    // Simple mock logic
    if (text.toLowerCase().includes('brain cancer')) {
      return ['Brain Cancer', 'Glioma'];
    }
    if (text.toLowerCase().includes('lung cancer')) {
      return ['Lung Cancer', 'Immunotherapy'];
    }
    return ['General Health'];
  },

  getPublicationSummary: async (publication: Publication): Promise<string> => {
    console.log('Simulating Gemini summary for publication:', publication.id);
    await new Promise(res => setTimeout(res, 700));
    // In a real app, you would call:
    // const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: `Summarize this publication for a patient: ${publication.title}` });
    // return response.text;
    return generateSummary(publication.title, "mock publication content");
  },

  getTrialSummary: async (trial: ClinicalTrial): Promise<string> => {
    console.log('Simulating Gemini summary for trial:', trial.id);
    await new Promise(res => setTimeout(res, 700));
    return generateSummary(trial.title, trial.description);
  },

  getPatientRecommendations: async (profile: UserProfile): Promise<{ trials: ClinicalTrial[], experts: Expert[], publications: Publication[] }> => {
    console.log('Simulating Gemini recommendations for patient:', profile.name);
    await new Promise(res => setTimeout(res, 1000));
    return {
      trials: MOCK_TRIALS.slice(0, 3),
      experts: MOCK_EXPERTS.slice(0, 4),
      publications: MOCK_PUBLICATIONS.slice(0, 3),
    };
  },
  
  getResearcherRecommendations: async (profile: UserProfile): Promise<{ trials: ClinicalTrial[], collaborators: Expert[], publications: Publication[] }> => {
    console.log('Simulating Gemini recommendations for researcher:', profile.name);
    await new Promise(res => setTimeout(res, 1000));
    return {
      trials: MOCK_TRIALS.slice(1, 4),
      collaborators: MOCK_EXPERTS.slice(2, 6),
      publications: MOCK_PUBLICATIONS.slice(2, 5),
    };
  },
};
