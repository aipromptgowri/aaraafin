import React, { useState, useEffect, useCallback } from 'react';
import { ProjectSelector } from './components/ProjectSelector';
import { FinancialDashboard } from './components/FinancialDashboard';
import { Login } from './components/Login';
import { fetchProjects, fetchDashboardData, checkDatabaseConnection } from './services/projectService';
import { DashboardData, Project } from './types';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [view, setView] = useState<'login' | 'selector' | 'dashboard'>('login');
  const [loading, setLoading] = useState(false);
  const [dbStatus, setDbStatus] = useState<{status: string, message: string} | null>(null);

  // Define data loading function
  const loadData = useCallback(async () => {
    // Check connection health first
    const status = await checkDatabaseConnection();
    setDbStatus(status);

    // Fetch projects (will fallback to mock if DB empty/error)
    const data = await fetchProjects();
    setProjects(data);
  }, []);

  // Fetch projects and check connection on mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleLogin = () => {
    setView('selector');
  };

  const handleProjectSelect = (id: string) => {
    setSelectedProjectId(id);
  };

  const handleSubmit = async () => {
    if (selectedProjectId) {
      setLoading(true);
      try {
        const data = await fetchDashboardData(selectedProjectId);
        if (data) {
          setDashboardData(data);
          setView('dashboard');
        }
      } catch (error) {
        console.error("Failed to load dashboard data", error);
        // Optional: Add toast notification here
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    setView('selector');
    setDashboardData(null);
    setSelectedProjectId(null);
  };

  if (view === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/20 px-6 py-4 flex justify-between items-center animate-in slide-in-from-top-4 duration-500">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xs">
             AI
           </div>
           <span className="font-semibold text-gray-900 tracking-tight">AARAA</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-sm text-right">
            <p className="font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">Finance Dept.</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-white shadow-sm">
             <img src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-24 pb-12 px-4 md:px-8">
        {view === 'selector' && (
          <ProjectSelector 
            projects={projects}
            selectedId={selectedProjectId} 
            onSelect={handleProjectSelect} 
            onSubmit={handleSubmit}
            isLoading={loading}
            dbStatus={dbStatus}
            onRetry={loadData}
          />
        )}
        
        {view === 'dashboard' && dashboardData && (
          <FinancialDashboard 
            data={dashboardData} 
            onBack={handleBack} 
          />
        )}
      </main>
    </div>
  );
};

export default App;