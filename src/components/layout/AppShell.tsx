import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface AppShellProps {
  children?: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col antialiased">
      <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex-1 flex w-full max-w-[1800px] mx-auto relative">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main
          className={`flex-1 w-full p-4 sm:p-6 lg:p-8 min-w-0 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'lg:pl-80' : 'lg:pl-0'
          }`}
        >
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

