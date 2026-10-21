import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, ChevronRight, PanelLeftClose, PanelLeft, Home, Building } from 'lucide-react';
import { useCompany } from '@/src/context/CompanyContext.tsx';
import { AppSidebar } from '@/src/components/layout/AppSidebar.tsx';

export const AppLayout: React.FC = () => {
  const { selectedCompany, isInitialized, selectedMeta } = useCompany();
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Route Guard: If initialization is complete and no valid company is selected/found, redirect to home
  useEffect(() => {
    if (isInitialized && !selectedCompany && !selectedMeta) {
      navigate('/', { replace: true });
    }
  }, [isInitialized, selectedCompany, selectedMeta, navigate]);

  // Loading state while restoring from localStorage
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-500 font-medium tracking-wide">
            Loading company intelligence...
          </p>
        </div>
      </div>
    );
  }

  // If after initialization we don't have a company yet, return null while redirect triggers
  if (!selectedCompany) {
    return null;
  }

  const currentTabName = location.pathname.includes('/company/skills')
    ? 'Skill Intelligence'
    : 'Company Intelligence';

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar Component */}
      <AppSidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(prev => !prev)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Global Sub-Header Bar with Mobile Trigger & Contextual Breadcrumbs */}
        <header className="h-14 border-b border-slate-200 bg-white sticky top-0 z-20 px-4 md:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-1.5 -ml-1 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors"
              aria-label="Open navigation sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Desktop Collapse Toggle */}
            <button
              onClick={() => setCollapsed(prev => !prev)}
              className="hidden md:flex p-1.5 -ml-2 text-slate-500 hover:text-slate-800 rounded-md hover:bg-slate-100 transition-colors"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? (
                <PanelLeft className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </button>

            {/* Breadcrumb Navigation Trail */}
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 truncate" aria-label="Breadcrumb">
              <Link
                to="/"
                className="hover:text-blue-600 font-medium flex items-center gap-1 transition-colors shrink-0"
              >
                <Home className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Portal</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-semibold text-slate-900 truncate">
                {selectedCompany.short_json.name}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="text-blue-600 font-medium truncate">
                {currentTabName}
              </span>
            </nav>
          </div>

          {/* Quick Institutional Pill */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-mono tracking-wider font-semibold text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded">
              JSSATEN Placements
            </span>
          </div>
        </header>

        {/* Dynamic Nested Routed Page */}
        <main className="flex-1 w-full bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
