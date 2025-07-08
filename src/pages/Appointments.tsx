import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserAppointments, cancelAppointment } from '../services/appointment.service';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import { NotificationType } from '../contexts/NotificationContext';
import type { Appointment } from '../interfaces/index.ts';

// Mock data for testing
const mockAppointments: Appointment[] = [
  {
    id: 1,
    user_id: 20,
    professional_id: 1,
    consultation_type_id: 1,
    appointment_date: '2023-06-15',
    appointment_time: '10:00',
    status: 'confirmed',
    notes: 'Initial consultation',
    client_name: 'John Doe',
    client_email: 'john@example.com',
    consultation_name: 'Initial Consultation',
    duration: 60,
    is_online: true,
    created_at: '2023-06-01',
    updated_at: '2023-06-01'
  },
  {
    id: 2,
    user_id: 20,
    professional_id: 2,
    consultation_type_id: 2,
    appointment_date: '2023-06-20',
    appointment_time: '14:30',
    status: 'pending',
    notes: 'Follow-up session',
    client_name: 'John Doe',
    client_email: 'john@example.com',
    consultation_name: 'Follow-up Session',
    duration: 45,
    is_online: true,
    created_at: '2023-06-05',
    updated_at: '2023-06-05'
  }
];

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (!user?.id) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        // Try to get appointments from API
        try {
          const data = await getUserAppointments(user.id);
          
          // If we got data back, use it
          if (data && data.length > 0) {
            setAppointments(data);
          } else {
            // Only use mock data if no appointments were returned
            console.log('No appointments returned from API, using mock data');
            setAppointments([]);
          }
        } catch (err) {
          // Only use mock data and show notification on error
          console.error('Error fetching appointments, using mock data:', err);
          setAppointments(mockAppointments);
          addNotification({
            message: 'Could not connect to server. Using mock data for demonstration.',
            type: NotificationType.WARNING,
            duration: 5000
          });
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error in appointment component:', err);
        setError('Failed to load appointments. Please try again later.');
        setLoading(false);
        addNotification({
          message: 'Failed to load appointments. Please try again later.',
          type: NotificationType.ERROR,
          duration: 5000
        });
      }
    };

    fetchAppointments();
  }, [user?.id, addNotification]);

  const handleCancelAppointment = async (appointmentId: number) => {
    try {
      await cancelAppointment(appointmentId);
      // Update appointments list after cancellation
      setAppointments(appointments.map(appointment => 
        appointment.id === appointmentId 
          ? { ...appointment, status: 'cancelled' }
          : appointment
      ));
      addNotification({
        message: 'Appointment cancelled successfully',
        type: NotificationType.SUCCESS,
        duration: 3000
      });
    } catch (err) {
      console.error('Error cancelling appointment:', err);
      setError('Failed to cancel appointment. Please try again later.');
      addNotification({
        message: 'Failed to cancel appointment. Please try again later.',
        type: NotificationType.ERROR,
        duration: 5000
      });
    }
  };

  const formatAppointmentDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error && appointments.length === 0) {
    return (
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Your Appointments</h2>
            <p className="mt-4 text-lg text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Your Appointments</h2>
          <p className="mt-4 text-lg text-gray-500">
            View and manage your upcoming and past appointments.
          </p>
          <button
            onClick={() => navigate('/services')}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            Book New Appointment
          </button>
        </div>

        <div className="mt-12">
          {appointments.length > 0 ? (
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="py-2 align-middle inline-block min-w-full">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Professional
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date & Time
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {appointments.map((appointment) => (
                          <tr key={appointment.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {/* Display professional ID */}
                                Dr. Professional {appointment.professional_id}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {/* Display consultation name if available, otherwise ID */}
                                {appointment.consultation_name || `Consultation ${appointment.consultation_type_id}`}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {/* Format date and time */}
                                {`${new Date(appointment.appointment_date).toLocaleDateString()} at ${appointment.appointment_time}`}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(appointment.status)}`}>
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              {appointment.status === 'pending' && (
                                <button
                                  onClick={() => handleCancelAppointment(appointment.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Cancel
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white">
              <p className="text-lg text-gray-500">You have no appointments scheduled.</p>
              <p className="mt-2 text-gray-500">
                Visit our services page to book a consultation with one of our professionals.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments; 