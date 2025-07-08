import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import NotificationContainer from './components/NotificationContainer';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Services from './pages/Services';
import BookConsultation from './pages/BookConsultation';
import Appointments from './pages/Appointments';
import ProtectedRoute from './components/ProtectedRoute';
import { UserRole } from './interfaces';

// Import professional pages when created
// import ProfessionalProfile from './pages/ProfessionalProfile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <div className="min-h-screen w-screen flex flex-col overflow-x-hidden">
            <Header />
            <NotificationContainer />
            <main className="flex-grow w-full">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services" element={<Services />} />
                
                {/* Client routes */}
                <Route 
                  path="/book/:consultationId" 
                  element={
                    <ProtectedRoute>
                      <BookConsultation />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/appointments" 
                  element={
                    <ProtectedRoute>
                      <Appointments />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Professional Routes - Uncomment when components are created */}
                {/* <Route 
                  path="/professional/profile" 
                  element={
                    <ProtectedRoute requiredRole={UserRole.PROFESSIONAL}>
                      <ProfessionalProfile />
                    </ProtectedRoute>
                  } 
                /> */}
              </Routes>
            </main>
            <footer className="bg-gray-800 text-white py-6 w-full">
              <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm">
                  &copy; {new Date().getFullYear()} Mental Healthcare Consultancy. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
