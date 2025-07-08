import api from './api';
import type { Appointment } from '../interfaces/index.ts';

// Get all appointments
export const getAllAppointments = async (): Promise<Appointment[]> => {
  try {
    const { data } = await api.get<Appointment[]>('/appointments');
    return data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

// Get appointments for a specific user
export const getUserAppointments = async (userId: number): Promise<Appointment[]> => {
  try {
    console.log(`Fetching appointments for user ${userId}`);
    console.log(`API endpoint: /appointments/user/${userId}`);
    
    const response = await api.get<Appointment[]>(`/appointments/user/${userId}`);
    console.log('API response status:', response.status);
    console.log('API response headers:', response.headers);
    console.log('API response data:', response.data);
    
    // If response.data is not an array, return an empty array
    if (!Array.isArray(response.data)) {
      console.warn('API did not return an array for appointments. Response:', response.data);
      return [];
    }
    
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching appointments for user ${userId}:`, error);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    // Return empty array on error instead of throwing
    return [];
  }
};

// Get appointment by ID
export const getAppointmentById = async (id: number): Promise<Appointment> => {
  try {
    const { data } = await api.get<Appointment>(`/appointments/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching appointment with ID ${id}:`, error);
    throw error;
  }
};

// Create new appointment
export const createAppointment = async (appointmentData: Omit<Appointment, 'id' | 'created_at' | 'updated_at'>): Promise<Appointment> => {
  try {
    console.log('Creating appointment with data:', appointmentData);
    console.log('API endpoint:', '/appointments');
    
    const { data } = await api.post<Appointment>('/appointments', appointmentData);
    console.log('Appointment created successfully:', data);
    return data;
  } catch (error: any) {
    console.error('Error creating appointment:', error);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    throw error;
  }
};

// Update appointment
export const updateAppointment = async (id: number, appointmentData: Partial<Appointment>): Promise<Appointment> => {
  try {
    const { data } = await api.put<Appointment>(`/appointments/${id}`, appointmentData);
    return data;
  } catch (error) {
    console.error(`Error updating appointment with ID ${id}:`, error);
    throw error;
  }
};

// Cancel appointment
export const cancelAppointment = async (id: number): Promise<void> => {
  try {
    await api.put<Appointment>(`/appointments/${id}/cancel`, { status: 'cancelled' });
  } catch (error) {
    console.error(`Error cancelling appointment with ID ${id}:`, error);
    throw error;
  }
}; 