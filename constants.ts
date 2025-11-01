
import type { Publication, ClinicalTrial, Expert, ForumPost } from './types';

export const MOCK_PUBLICATIONS: Publication[] = [
  { id: 'pub1', title: 'Advances in Glioblastoma Immunotherapy', journal: 'Nature Medicine', authors: ['Dr. Emily Carter', 'Dr. Ben Hanson'], year: 2023, url: '#' },
  { id: 'pub2', title: 'Targeted Gene Therapy for Lung Cancer', journal: 'The Lancet', authors: ['Dr. Sarah Jenkins', 'Dr. Omar Rashid'], year: 2023, url: '#' },
  { id: 'pub3', title: 'A Phase III Study of a Novel Kinase Inhibitor', journal: 'NEJM', authors: ['Dr. David Chen', 'Dr. Maria Rodriguez'], year: 2022, url: '#' },
  { id: 'pub4', title: 'The Role of AI in Diagnostic Radiology', journal: 'JAMA', authors: ['Dr. Alex Schmidt', 'Dr. Priya Sharma'], year: 2024, url: '#' },
];

export const MOCK_TRIALS: ClinicalTrial[] = [
  { id: 'trial1', title: 'Immunotherapy Combination for Recurrent Glioblastoma', status: 'Recruiting', location: 'New York, USA', description: 'A phase II clinical trial evaluating the efficacy of a new immunotherapy combination for patients with recurrent glioblastoma.', url: '#' },
  { id: 'trial2', title: 'A Study of a New Oral Treatment for NSCLC', status: 'Recruiting', location: 'London, UK', description: 'This study will test a new oral medication for non-small cell lung cancer.', url: '#' },
  { id: 'trial3', title: 'CAR-T Cell Therapy for Advanced Melanoma', status: 'Completed', location: 'Global', description: 'A completed trial on the use of CAR-T cell therapy in advanced melanoma patients.', url: '#' },
  { id: 'trial4', title: 'Preventative Vaccine for High-Risk Individuals', status: 'Not yet recruiting', location: 'Boston, USA', description: 'A future trial for a vaccine aimed at individuals with a high genetic risk for certain cancers.', url: '#' },
];

export const MOCK_EXPERTS: Expert[] = [
  { id: 'exp1', name: 'Dr. Emily Carter', specialty: 'Neuro-Oncology', institution: 'Global Cancer Institute', publications: 75, researchInterests: ['Immunotherapy', 'Glioma Biology'] },
  { id: 'exp2', name: 'Dr. Sarah Jenkins', specialty: 'Thoracic Oncology', institution: 'Unity Health System', publications: 112, researchInterests: ['Gene Therapy', 'Targeted Agents'] },
  { id: 'exp3', name: 'Dr. David Chen', specialty: 'Clinical Trials', institution: 'Advanced Research Center', publications: 98, researchInterests: ['Pharmacology', 'Trial Design'] },
  { id: 'exp4', name: 'Dr. Alex Schmidt', specialty: 'Radiology & AI', institution: 'TechMed University', publications: 45, researchInterests: ['Medical Imaging', 'Machine Learning'] },
];

export const MOCK_FORUMS: ForumPost[] = [
  {
    id: 'forum1',
    title: 'Managing side effects of new immunotherapy?',
    author: 'John D.',
    category: 'Cancer Research',
    content: 'I\'m about to start a new immunotherapy trial and was wondering what to expect in terms of side effects. Any advice from researchers on how to best manage them?',
    replies: [
      { id: 'reply1', author: 'Dr. Emily Carter', content: 'This is an excellent question. Common side effects include fatigue and skin reactions. It is crucial to maintain open communication with your clinical team, as they can provide supportive care measures tailored to your specific experience. We are seeing promising management strategies emerge from recent studies.' }
    ]
  },
  {
    id: 'forum2',
    title: 'What\'s the future of gene therapy?',
    author: 'Jane S.',
    category: 'Clinical Trials Insights',
    content: 'I keep hearing about gene therapy. How far away are we from it being a common treatment for cancers like lung cancer?',
    replies: []
  }
];
