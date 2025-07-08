import React from 'react';

const About = () => {
  return (
    <div className="bg-white w-full">
      <div className="w-full mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-6">
              Welcome to Mental Healthcare Consultancy, where we are dedicated to providing compassionate and professional mental health support.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              Our mission is to make quality mental healthcare accessible to everyone. We believe that mental health is just as important as physical health, and we strive to provide a supportive environment for our clients to heal and grow.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Team</h2>
            <p className="text-lg text-gray-600 mb-6">
              Our team consists of licensed therapists, counselors, and mental health professionals with extensive experience in various areas of mental health. Each member of our team is committed to providing personalized care that meets the unique needs of each client.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
              {/* Team Member 1 */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Dr. Sarah Johnson</h3>
                <p className="text-primary-600 mb-3">Clinical Psychologist</p>
                <p className="text-gray-600">
                  Specializes in anxiety disorders and depression with over 15 years of experience.
                </p>
              </div>
              
              {/* Team Member 2 */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Dr. Michael Chen</h3>
                <p className="text-primary-600 mb-3">Psychiatrist</p>
                <p className="text-gray-600">
                  Expert in medication management and treatment of severe mental health conditions.
                </p>
              </div>
              
              {/* Team Member 3 */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Lisa Rodriguez</h3>
                <p className="text-primary-600 mb-3">Licensed Therapist</p>
                <p className="text-gray-600">
                  Specializes in family therapy and relationship counseling.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Approach</h2>
            <p className="text-lg text-gray-600 mb-6">
              We take a holistic approach to mental health, considering the whole person — mind, body, and spirit. We utilize evidence-based practices and tailor our approach to meet the individual needs of each client.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Values</h2>
            <ul className="list-disc pl-6 text-lg text-gray-600 mb-6">
              <li className="mb-2">Compassion and empathy in all interactions</li>
              <li className="mb-2">Respect for the dignity and uniqueness of each individual</li>
              <li className="mb-2">Commitment to ethical practice and confidentiality</li>
              <li className="mb-2">Dedication to ongoing professional development</li>
              <li className="mb-2">Accessibility and inclusivity in our services</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 