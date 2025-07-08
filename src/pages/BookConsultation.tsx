import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getConsultationTypeById } from '../services/consultation.service';
import { getApprovedProfessionals } from '../services/professional.service';
import { createAppointment } from '../services/appointment.service';
import type { ConsultationType, ProfessionalFullProfile } from '../interfaces/index.ts';
import { useAuth } from '../contexts/AuthContext';

const BookConsultation = () => {
  const { consultationId } = useParams<{ consultationId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [consultationType, setConsultationType] = useState<ConsultationType | null>(null);
  const [professionals, setProfessionals] = useState<ProfessionalFullProfile[]>([]);
  const [selectedProfessional, setSelectedProfessional] = useState<number | null>(null);
  const [appointmentDate, setAppointmentDate] = useState<string>('');
  const [appointmentTime, setAppointmentTime] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Calculate min date (today) and max date (3 months from now)
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  const maxDate = new Date(today);
  maxDate.setMonth(today.getMonth() + 3);
  const maxDateString = maxDate.toISOString().split('T')[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!consultationId) {
          setError('Invalid consultation type');
          setLoading(false);
          return;
        }
        
        const [consultationData, approvedProfessionals] = await Promise.all([
          getConsultationTypeById(parseInt(consultationId)),
          getApprovedProfessionals()
        ]);
        
        setConsultationType(consultationData);
        setProfessionals(approvedProfessionals);
        
        if (approvedProfessionals.length === 0) {
          console.log("No approved professionals found");
        } else {
          console.log(`Found ${approvedProfessionals.length} approved professionals`);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load booking information. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [consultationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    if (!selectedProfessional || !appointmentDate || !appointmentTime || !user?.id || !consultationType?.id) {
      setError('Please fill in all required fields');
      setSubmitting(false);
      return;
    }
    
    try {
      // Format appointment data according to API expectations
      await createAppointment({
        user_id: user.id,
        professional_id: selectedProfessional,
        consultation_type_id: consultationType.id,
        appointment_date: appointmentDate, // Send date and time separately
        appointment_time: appointmentTime,
        status: 'pending',
        notes: ''
      });
      
      setSuccessMessage('Appointment booked successfully! You will receive a confirmation soon.');
      setTimeout(() => {
        navigate('/appointments');
      }, 3000);
    } catch (err) {
      console.error('Error booking appointment:', err);
      setError('Failed to book appointment. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error && !consultationType) {
    return (
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Book a Consultation</h2>
            <p className="mt-4 text-lg text-red-600">{error}</p>
            <button
              onClick={() => navigate('/services')}
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
            >
              Return to Services
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Book a Consultation</h2>
          <p className="mt-4 text-lg text-gray-500">
            Please fill out the form below to schedule your appointment.
          </p>
        </div>

        {successMessage ? (
          <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
            <p className="font-bold">Success!</p>
            <p className="block sm:inline">{successMessage}</p>
            <p className="mt-2 text-sm">Redirecting to your appointments...</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 bg-gray-50">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {consultationType?.name}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {consultationType?.is_online ? 'Online Session' : 'In-Person Session'} - 
                {consultationType?.duration} minutes - ${consultationType?.price}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
              {error && (
                <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                  <p className="font-bold">Error</p>
                  <p className="block sm:inline">{error}</p>
                </div>
              )}

              {professionals.length === 0 && (
                <div className="bg-yellow-50 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-6" role="alert">
                  <p className="font-bold">No professionals available</p>
                  <p className="block sm:inline">
                    There are currently no approved professionals available for booking. 
                    Please check back later or contact support.
                  </p>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label htmlFor="professional" className="block text-sm font-medium text-gray-700">
                    Select a Professional
                  </label>
                  <select
                    id="professional"
                    name="professional"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    value={selectedProfessional || ''}
                    onChange={(e) => setSelectedProfessional(parseInt(e.target.value))}
                    required
                    disabled={professionals.length === 0}
                  >
                    <option value="">-- Select a Professional --</option>
                    {professionals.map((professional) => (
                      <option key={professional.id} value={professional.id}>
                        {/* Handle different professional data structures */}
                        {professional.user?.first_name ? 
                          `${professional.user.first_name} ${professional.user.last_name} - ${professional.specialization || professional.bio}` : 
                          `${professional.name || 'Professional'} - ${professional.specialization || professional.bio || 'Healthcare Professional'}`
                        }
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    min={minDate}
                    max={maxDateString}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                    Appointment Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    id="time"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Please select a time between 9:00 AM and 5:00 PM.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => navigate('/services')}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || professionals.length === 0}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                >
                  {submitting ? 'Booking...' : 'Book Appointment'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookConsultation; 