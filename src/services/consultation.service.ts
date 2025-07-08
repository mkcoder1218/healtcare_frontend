import api from './api';
import type { ConsultationType } from '../interfaces/index.ts';

// Get all consultation types
export const getAllConsultationTypes = async (): Promise<ConsultationType[]> => {
  try {
    console.log('Fetching all consultation types');
    const { data } = await api.get<ConsultationType[]>('/consultations');
    console.log('Consultation types fetched:', data);
    return data;
  } catch (error: any) {
    console.error('Error fetching consultation types:', error);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    throw error;
  }
};

// Get consultation type by ID
export const getConsultationTypeById = async (id: number): Promise<ConsultationType> => {
  try {
    console.log(`Fetching consultation type with ID ${id}`);
    const { data } = await api.get<ConsultationType>(`/consultations/${id}`);
    console.log('Consultation type fetched:', data);
    return data;
  } catch (error: any) {
    console.error(`Error fetching consultation type with ID ${id}:`, error);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    throw error;
  }
};

// Create new consultation type (admin only)
export const createConsultationType = async (consultationType: Omit<ConsultationType, 'id'>): Promise<ConsultationType> => {
  try {
    const { data } = await api.post<{consultation: ConsultationType}>('/consultations', consultationType);
    return data.consultation;
  } catch (error) {
    console.error('Error creating consultation type:', error);
    throw error;
  }
};

// Update consultation type (admin only)
export const updateConsultationType = async (id: number, consultationType: Partial<ConsultationType>): Promise<ConsultationType> => {
  try {
    const { data } = await api.put<{consultation: ConsultationType}>(`/consultations/${id}`, consultationType);
    return data.consultation;
  } catch (error) {
    console.error(`Error updating consultation type with ID ${id}:`, error);
    throw error;
  }
};

// Delete consultation type (admin only)
export const deleteConsultationType = async (id: number): Promise<void> => {
  try {
    await api.delete(`/consultations/${id}`);
  } catch (error) {
    console.error(`Error deleting consultation type with ID ${id}:`, error);
    throw error;
  }
}; 