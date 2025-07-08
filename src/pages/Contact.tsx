import { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!name || !email || !message) {
      setError('Please fill in all fields');
      return;
    }
    
    // For now, just simulate a submission
    setSubmitted(true);
    setError('');
    // In a real app, you would send the form data to your backend
  };

  return (
    <div className="bg-white w-full">
      <div className="w-full mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-xl text-gray-600 mb-6">
                We're here to help. Contact us with any questions about our services, 
                appointment scheduling, or general inquiries.
              </p>
              
              <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Location</h2>
                <address className="not-italic text-lg text-gray-600">
                  123 Healing Way<br />
                  Wellness City, WC 12345<br />
                  United States
                </address>
              </div>
              
              <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                <p className="text-lg text-gray-600">
                  <strong>Phone:</strong> (123) 456-7890<br />
                  <strong>Email:</strong> contact@mentalhealthcare.com<br />
                  <strong>Hours:</strong> Monday-Friday: 9am-5pm
                </p>
              </div>
              
              <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Emergency Support</h2>
                <p className="text-lg text-gray-600">
                  If you're experiencing a mental health emergency, please call our 24/7 support line:<br />
                  <strong className="text-red-600">(800) 123-4567</strong>
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              {submitted ? (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-medium text-primary-600 mb-4">Thank You!</h3>
                  <p className="text-lg text-gray-600">
                    We've received your message and will get back to you as soon as possible.
                  </p>
                  <button 
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h2>
                  
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                      <span className="block sm:inline">{error}</span>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                        placeholder="you@example.com"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                        placeholder="How can we help you?"
                      />
                    </div>
                    
                    <div className="text-right">
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 