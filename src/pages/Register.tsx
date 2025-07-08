import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../interfaces';
import api from '../services/api';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.USER);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cv, setCv] = useState<File | null>(null);
  const [cvError, setCvError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      setCv(null);
      return;
    }

    const file = files[0];
    
    // Check if file is a PDF
    if (file.type !== 'application/pdf') {
      setCvError('Only PDF files are allowed');
      setCv(null);
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setCvError('File size exceeds 5MB limit');
      setCv(null);
      return;
    }

    setCv(file);
    setCvError('');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // For professionals, CV is required
    if (role === UserRole.PROFESSIONAL && !cv) {
      setCvError('CV is required for professional registration');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      
      // Register the user first
      const userData = await register(name, email, password, role);
      
      // If professional, upload CV
      if (role === UserRole.PROFESSIONAL && cv) {
        const formData = new FormData();
        formData.append('cv', cv);
        
        try {
          await api.post('/professionals/cv', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        } catch (cvError) {
          console.error('Error uploading CV:', cvError);
          // Continue with registration even if CV upload fails
          // We'll show a warning to the user
          setError('Registration successful but CV upload failed. Please upload your CV in your profile.');
          setLoading(false);
          return;
        }
      }
      
      navigate('/');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to register';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Account Type</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={role === UserRole.USER}
                onChange={() => setRole(UserRole.USER)}
                className="mr-2"
              />
              User
            </label>
            
            <label className="flex items-center">
              <input
                type="radio"
                checked={role === UserRole.PROFESSIONAL}
                onChange={() => setRole(UserRole.PROFESSIONAL)}
                className="mr-2"
              />
              Professional
            </label>
          </div>
        </div>
        
        {/* CV Upload for Professionals */}
        {role === UserRole.PROFESSIONAL && (
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">CV Upload (PDF only)</label>
            <div className="flex items-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="w-full"
                required
              />
            </div>
            {cv && (
              <p className="text-sm text-green-600 mt-1">
                Selected: {cv.name} ({Math.round(cv.size / 1024)} KB)
              </p>
            )}
            {cvError && (
              <p className="text-sm text-red-600 mt-1">{cvError}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Please upload your CV in PDF format (max 5MB)
            </p>
          </div>
        )}
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <p>
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-800">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register; 