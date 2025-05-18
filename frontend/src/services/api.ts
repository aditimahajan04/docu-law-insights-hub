
import { ApiResponse, Document, DocumentDetail, LoginCredentials, RegisterData, User } from "@/types";
import { 
  mockLoginApi, 
  mockRegisterApi, 
  mockGetDocumentsApi, 
  mockGetDocumentApi,
  mockUploadDocumentApi
} from "./mockData";

// Mock API for demonstration
// In a real application, this would connect to a real backend

// Authentication API calls
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<User>> => {
    try {
      const data = await mockLoginApi(credentials.email, credentials.password);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Login failed" };
    }
  },
  
  register: async (userData: RegisterData): Promise<ApiResponse<User>> => {
    try {
      const data = await mockRegisterApi(userData.name, userData.email, userData.password);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Registration failed" };
    }
  }
};

// Document API calls
export const documentApi = {
  getAll: async (_token: string): Promise<ApiResponse<Document[]>> => {
    try {
      const data = await mockGetDocumentsApi();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Failed to fetch documents" };
    }
  },
  
  getById: async (id: string, _token: string): Promise<ApiResponse<DocumentDetail>> => {
    try {
      const data = await mockGetDocumentApi(id);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Failed to fetch document" };
    }
  },
  
  upload: async (file: File, _token: string): Promise<ApiResponse<Document>> => {
    try {
      const data = await mockUploadDocumentApi(file);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Upload failed" };
    }
  },
  
  getCaseStudies: async (documentId: string, _token: string): Promise<ApiResponse<Document>> => {
    try {
      // Case studies are already included in the document detail in our mock
      const data = await mockGetDocumentApi(documentId);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Failed to fetch case studies" };
    }
  }
};
