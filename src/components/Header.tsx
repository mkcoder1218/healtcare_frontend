import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { name: 'Home', to: '/', current: true },
    { name: 'Services', to: '/services', current: false },
    { name: 'About', to: '/about', current: false },
    { name: 'Contact', to: '/contact', current: false },
  ];
  
  const authLinks = [
    { name: 'Dashboard', to: '/dashboard', role: ['client', 'admin'] },
    { name: 'Appointments', to: '/appointments', role: ['client', 'admin'] },
    { name: 'Admin Panel', to: '/admin', role: ['admin'] },
  ];

  // Filter navigation links based on user role
  const filteredAuthLinks = authLinks.filter(link => {
    if (!isAuthenticated) return false;
    if (!link.role) return true;
    return link.role.includes(user?.role as string);
  });

  return (
    <Disclosure as="nav" className="bg-white shadow-md w-full">
      {({ open }) => (
        <>
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/" className="text-2xl font-bold text-primary-600">
                    MentalCare
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {/* Standard navigation links */}
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="border-transparent text-gray-500 hover:border-primary-500 hover:text-primary-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {/* Auth-dependent links */}
                  {isAuthenticated && filteredAuthLinks.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="border-transparent text-gray-500 hover:border-primary-500 hover:text-primary-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {/* Login/Register or Profile buttons based on auth state */}
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">
                      Welcome, {user?.name}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="bg-primary-600 py-2 px-4 rounded-md text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link
                      to="/login"
                      className="text-gray-700 hover:text-primary-600"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="bg-primary-600 py-2 px-4 rounded-md text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Mobile menu button */}
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-700"
                >
                  {item.name}
                </Link>
              ))}
              {isAuthenticated && filteredAuthLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-700"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              {isAuthenticated ? (
                <div>
                  <div className="px-4 py-2">
                    <p className="text-base font-medium text-gray-700">
                      {user?.name}
                    </p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                  <div className="mt-3 space-y-1">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-700"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-1 px-4">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-700"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-700"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header; 