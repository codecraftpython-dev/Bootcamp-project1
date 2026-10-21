import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Building, Sparkles, ArrowLeft, Layers } from 'lucide-react';
import { useCompany } from '@/src/context/CompanyContext.tsx';
import { CompanyLogo } from '@/src/components/common/CompanyLogo.tsx';

interface AppSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  collapsed,
  mobileOpen,
  onCloseMobile,
}) => {
  const { selectedCompany } = useCompany();
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Company Intelligence',
      path: '/company/intelligence',
      icon: Building,
      description: '22 exhaustive corporate dimensions',
    },
    {
      name: 'Skill Intelligence',
      path: '/company/skills',
      icon: Sparkles,
      description: '12 core skills & 10-level roadmaps',
    },
  ];

  const sidebarContent = (
    <div
      className="flex flex-col h-full bg-[#F8FAFC] border-r border-[#E5E7EB] text-[#334155] select-none transition-all duration-300"
      style={{ width: collapsed ? '4.5rem' : '17rem' }}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-4 border-b border-[#E5E7EB] shrink-0 justify-between">
        {!collapsed ? (
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
              JSS
            </div>
            <div className="truncate">
              <span className="block text-xs font-bold tracking-tight text-slate-900 truncate">
                JSSATEN
              </span>
              <span className="block text-[10px] text-slate-500 font-medium truncate uppercase tracking-wider">
                Placement Hub
              </span>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 mx-auto rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
            JSS
          </div>
        )}
      </div>

      {/* Selected Company Mini-Lockup */}
      {selectedCompany && (
        <div
          className={`px-4 py-3 border-b border-[#E5E7EB] bg-white/70 ${
            collapsed ? 'flex justify-center p-2' : ''
          }`}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <CompanyLogo
              name={selectedCompany.short_json.name}
              logoUrl={selectedCompany.short_json.logo_url}
              size={collapsed ? 'sm' : 'md'}
            />
            {!collapsed && (
              <div className="truncate">
                <span className="block text-xs font-semibold text-slate-900 truncate">
                  {selectedCompany.short_json.name}
                </span>
                <span className="block text-[11px] text-slate-500 truncate">
                  {selectedCompany.short_json.company_type} Tier
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2">
          {!collapsed && (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Intelligence Portals
            </span>
          )}
        </div>

        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => onCloseMobile()}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-[#EFF6FF] text-[#2563EB] shadow-2xs font-semibold'
                    : 'text-[#334155] hover:bg-slate-200/60 hover:text-slate-900'
                } ${collapsed ? 'justify-center px-0' : ''}`
              }
              title={collapsed ? item.name : undefined}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && (
                <div className="truncate text-left">
                  <span className="block leading-none">{item.name}</span>
                </div>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="p-3 border-t border-[#E5E7EB] bg-[#F8FAFC] shrink-0 space-y-1">
        <button
          onClick={() => {
            onCloseMobile();
            navigate('/');
          }}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-200/60 transition-colors ${
            collapsed ? 'justify-center px-0' : ''
          }`}
          title="All Companies"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          {!collapsed && <span>All Companies</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block shrink-0 sticky top-0 h-screen z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#F8FAFC] z-10 shadow-xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
