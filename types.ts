
export type UserType = 'patient' | 'researcher';

export interface PatientProfile {
  type: 'patient';
  name: string;
  conditions: string[];
  location: string;
}

export interface ResearcherProfile {
  type: 'researcher';
  name: string;
  specialties: string[];
  researchInterests: string[];
  orcid?: string;
  researchGate?: string;
  availableForMeetings: boolean;
}

export type UserProfile = PatientProfile | ResearcherProfile;

export interface Publication {
  id: string;
  title: string;
  journal: string;
  authors: string[];
  year: number;
  url: string;
  summary?: string;
}

export interface ClinicalTrial {
  id: string;
  title: string;
  status: 'Recruiting' | 'Completed' | 'Not yet recruiting';
  location: string;
  description: string;
  url: string;
  summary?: string;
}

export interface Expert {
  id: string;
  name: string;
  specialty: string;
  institution: string;
  publications: number;
  researchInterests: string[];
}

export interface ForumPost {
  id: string;
  title: string;
  author: string; // Patient name
  content: string;
  category: string;
  replies: ForumReply[];
}

export interface ForumReply {
  id: string;
  author: string; // Researcher name
  content: string;
}
