import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllConsultationTypes } from '../services/consultation.service';
import type { ConsultationType } from '../interfaces/index.ts';
import { useAuth } from '../contexts/AuthContext';

const Services = () => {
  const [consultationTypes, setConsultationTypes] = useState<ConsultationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchConsultationTypes = async () => {
      try {
        const data = await getAllConsultationTypes();
        setConsultationTypes(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching consultation types:', err);
        setError('Failed to load consultation types. Please try again later.');
        setLoading(false);
      }
    };

    fetchConsultationTypes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Services</h2>
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
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Services</h2>
          <p className="mt-4 text-lg text-gray-500">
            Browse our available consultation types and book an appointment with one of our professionals.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {consultationTypes.length > 0 ? (
            consultationTypes.map((consultationType) => (
              <div
                key={consultationType.id}
                className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 transition-all hover:shadow-lg"
              >
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{consultationType.name}</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {consultationType.is_online ? 'Online Session' : 'In-Person Session'}
                  </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <p className="text-sm text-gray-500 mb-4">{consultationType.description}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span className="font-medium">Duration:</span>
                    <span className="ml-2">{consultationType.duration} minutes</span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span className="font-medium">Price:</span>
                    <span className="ml-2">${consultationType.price}</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-4 sm:px-6 bg-gray-50">
                  {isAuthenticated ? (
                    <Link
                      to={`/book/${consultationType.id}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Book Now
                    </Link>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to="/login"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Login to Book
                      </Link>
                      <p className="text-xs text-gray-500">
                        You need to be logged in to book a consultation.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-gray-500">No consultation types available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services; 