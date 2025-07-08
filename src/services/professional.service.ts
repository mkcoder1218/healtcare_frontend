import api from './api';
import type { 
  ProfessionalProfile, 
  ProfessionalFullProfile, 
  Education, 
  WorkExperience, 
  Certification 
} from '../interfaces';
import { ProfessionalStatus } from '../interfaces';

/**
 * Get all professionals
 */
export const getAllProfessionals = async (): Promise<ProfessionalFullProfile[]> => {
  try {
    const response = await api.get('/professionals');
    return response.data;
  } catch (error) {
    console.error('Error fetching professionals:', error);
    throw error;
  }
};

/**
 * Get approved professionals only
 * 
 * First tries to use API filtering, then falls back to client-side filtering if needed
 */
export const getApprovedProfessionals = async (): Promise<ProfessionalFullProfile[]> => {
  try {
    // Try to get approved professionals via API filter
    const response = await api.get('/professionals?status=approved');
    const professionals = response.data;
    
    // Check if API filtering worked correctly
    const allApproved = professionals.every(prof => 
      prof.status === ProfessionalStatus.APPROVED || prof.status === 'Approved'
    );
    
    if (allApproved) {
      console.log('API filtering for approved professionals worked correctly');
      return professionals;
    }
    
    // If API filtering didn't work, fall back to client-side filtering
    console.warn('API filtering not working correctly, using client-side filtering');
    
    // Get all professionals and filter on client side
    const allProfessionals = await getAllProfessionals();
    return allProfessionals.filter(prof => 
      prof.status === ProfessionalStatus.APPROVED || prof.status === 'Approved'
    );
  } catch (error) {
    console.error('Error fetching approved professionals:', error);
    throw error;
  }
};

/**
 * Get professional by ID
 */
export const getProfessionalById = async (id: number): Promise<ProfessionalFullProfile> => {
  try {
    const response = await api.get(`/professionals/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching professional ${id}:`, error);
    throw error;
  }
};

// Update professional profile
export const updateProfile = async (profileData: Partial<ProfessionalProfile>): Promise<ProfessionalProfile> => {
  try {
    const { data } = await api.put('/professionals/profile', profileData);
    return data.profile;
  } catch (error) {
    throw handleError(error);
  }
};

// Education operations
export const addEducation = async (educationData: Partial<Education>): Promise<Education> => {
  try {
    const { data } = await api.post('/professionals/education', educationData);
    return data;
  } catch (error) {
    throw handleError(error);
  }
};

export const updateEducation = async (id: number, educationData: Partial<Education>): Promise<Education> => {
  try {
    const { data } = await api.put(`/professionals/education/${id}`, educationData);
    return data.education;
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteEducation = async (id: number): Promise<void> => {
  try {
    await api.delete(`/professionals/education/${id}`);
  } catch (error) {
    throw handleError(error);
  }
};

// Work experience operations
export const addWorkExperience = async (workData: Partial<WorkExperience>): Promise<WorkExperience> => {
  try {
    const { data } = await api.post('/professionals/work-experience', workData);
    return data;
  } catch (error) {
    throw handleError(error);
  }
};

// Certification operations
export const addCertification = async (certData: Partial<Certification>): Promise<Certification> => {
  try {
    const { data } = await api.post('/professionals/certification', certData);
    return data;
  } catch (error) {
    throw handleError(error);
  }
};

// Handle errors
const handleError = (error: any): Error => {
  const errorMessage = 
    error.response?.data?.message || 
    error.message || 
    'API error';
  return new Error(errorMessage);
}; 