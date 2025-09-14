"use client";

import React from 'react';
import { withAuth } from '@/components/AuthProvider';


import { useAuth } from '@/components/AuthProvider';

const DashboardPage = () => {
  const { logout } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Hello, world</h1>
      <button
        onClick={logout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default withAuth(DashboardPage);
