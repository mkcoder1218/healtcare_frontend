// User roles enum
export enum UserRole {
  ADMIN = 'admin',
  PROFESSIONAL = 'professional',
  USER = 'user'
}

// Professional Status enum
export enum ProfessionalStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

// User Interface
export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  created_at?: string;
  updated_at?: string;
}

// Professional Profile Interface
export interface ProfessionalProfile {
  id: number;
  user_id: number;
  specialization: string | null;
  years_of_experience: number | null;
  bio: string | null;
  status?: ProfessionalStatus;
  created_at?: string;
  updated_at?: string;
}

// Education Interface
export interface Education {
  id: number;
  professional_id: number;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string | null;
  description: string | null;
  created_at?: string;
  updated_at?: string;
}

// Work Experience Interface
export interface WorkExperience {
  id: number;
  professional_id: number;
  company: string;
  position: string;
  start_date: string;
  end_date: string | null;
  description: string | null;
  created_at?: string;
  updated_at?: string;
}

// Certification Interface
export interface Certification {
  id: number;
  professional_id: number;
  name: string;
  issuing_organization: string;
  issue_date: string;
  expiration_date: string | null;
  credential_id: string | null;
  created_at?: string;
  updated_at?: string;
}

// Professional Full Profile Interface (with related data)
export interface ProfessionalFullProfile extends ProfessionalProfile {
  user?: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
  name?: string;
  email?: string;
  status: ProfessionalStatus;
  education?: Education[];
  work_experience?: WorkExperience[];
  certifications?: Certification[];
}

// Auth State Interface
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
}

// Consultation Type Interface
export interface ConsultationType {
  id: number;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  is_online: boolean;
}

// Appointment Interface
export interface Appointment {
  id: number;
  user_id: number;
  professional_id: number;
  consultation_type_id: number;
  appointment_date: string; // Format: YYYY-MM-DD
  appointment_time: string; // Format: HH:MM
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  client_name?: string;
  client_email?: string;
  consultation_name?: string;
  duration?: number;
  is_online?: boolean;
  created_at?: string;
  updated_at?: string;
}

// API Response Interface
export interface ApiResponse<T> {
  message?: string;
  success: boolean;
  data?: T;
  error?: string;
} 