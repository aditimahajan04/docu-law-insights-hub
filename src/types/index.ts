
export interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
}

export interface Document {
  id: string;
  title: string;
  originalFilename: string;
  uploadDate: string;
  status: DocumentStatus;
  userId: string;
  simplifiedText?: string;
  originalText?: string;
}

export enum DocumentStatus {
  UPLOADED = "UPLOADED",
  PARSED = "PARSED",
  SIMPLIFIED = "SIMPLIFIED",
  REVIEWED = "REVIEWED"
}

export interface DocumentDetail extends Document {
  originalText: string;
  simplifiedText: string;
  flaws: DocumentFlaw[];
  caseStudies: CaseStudy[];
}

export interface DocumentFlaw {
  id: string;
  type: FlawType;
  description: string;
  location: {
    startIndex: number;
    endIndex: number;
  };
  suggestion: string;
}

export enum FlawType {
  MISSING_CLAUSE = "MISSING_CLAUSE",
  AMBIGUITY = "AMBIGUITY",
  NUMBERING_ERROR = "NUMBERING_ERROR",
  CONTRADICTORY = "CONTRADICTORY"
}

export interface CaseStudy {
  id: string;
  title: string;
  citation: string;
  summary: string;
  relevanceScore: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
