import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ToastContainer from '../components/Toast';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Sticky header navbar */}
      <Navbar />

      {/* Main page content shell with loading Suspense boundary */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="w-10 h-10 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>

      {/* Structured Footer */}
      <Footer />

      {/* Float Toasts Portal Container */}
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
