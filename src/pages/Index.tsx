import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Sparkles, Filter, Building2, RefreshCw } from 'lucide-react';
import { useCompany } from '@/src/context/CompanyContext.tsx';
import { CompanyCard } from '@/src/components/companies/CompanyCard.tsx';
import type { RawCompanyRecord } from '@/src/data/seedCompanies.ts';
import { CATEGORY_COLORS } from '@/src/components/common/Badges.tsx';

const COLLEGE_NAME = "JSS Academy of Technical Education Noida";
const COLLEGE_SHORT = "JSSATEN";

export const Index: React.FC = () => {
  const { allCompanies, selectCompany } = useCompany();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(false);

  // 200ms search input debounce
  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Handle card click: save to localStorage + update Context + navigate
  const handleCompanyClick = useCallback(
    (company: RawCompanyRecord) => {
      selectCompany(company);
      navigate('/company/intelligence');
    },
    [selectCompany, navigate]
  );

  // Calculate live counts for the 5 category pills
  const counts = useMemo(() => {
    const res: Record<string, number> = {
      All: allCompanies.length,
      'Super Dream': 0,
      Dream: 0,
      Standard: 0,
      Regular: 0,
    };

    allCompanies.forEach(c => {
      const type = c.short_json.company_type || 'Standard';
      if (res[type] !== undefined) {
        res[type] += 1;
      }
    });

    return res;
  }, [allCompanies]);

  // Filter companies based on category & search term
  const filteredCompanies = useMemo(() => {
    return allCompanies.filter(c => {
      const matchesCategory =
        activeCategory === 'All' || c.short_json.company_type === activeCategory;

      if (!matchesCategory) return false;

      if (!debouncedQuery.trim()) return true;

      const q = debouncedQuery.toLowerCase();
      const short = c.short_json;
      return (
        short.name.toLowerCase().includes(q) ||
        (short.short_name && short.short_name.toLowerCase().includes(q)) ||
        (short.category && short.category.toLowerCase().includes(q)) ||
        (short.headquarters_address && short.headquarters_address.toLowerCase().includes(q))
      );
    });
  }, [allCompanies, activeCategory, debouncedQuery]);

  const categoryOptions = ['All', 'Super Dream', 'Dream', 'Standard', 'Regular'];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* Top Utility Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              {COLLEGE_SHORT.slice(0, 3)}
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-slate-900 block leading-tight">
                {COLLEGE_NAME}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Training & Placement Cell · Research Hub
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              2025-2026 Season
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section: Clean white background, bottom border, large heading, small subtitle, search bar directly below */}
      <section className="bg-white border-b border-slate-200 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          {/* Pill: COLLEGE_SHORT · INTELLIGENCE PLATFORM */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{COLLEGE_SHORT} · INTELLIGENCE PLATFORM</span>
          </div>

          {/* Large Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight max-w-4xl leading-tight">
            {COLLEGE_NAME} Companies Research & Placement Analytics Portal
          </h1>

          {/* Small Descriptive Subtitle */}
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal max-w-2xl">
            Your strategic edge for campus placements
          </p>

          {/* Search bar directly below */}
          <div className="mt-8 max-w-2xl relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search recruiting companies by name, domain, industry or location..."
                className="w-full pl-12 pr-10 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-3 focus:ring-blue-100 transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Body: Filter Pills + Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Category Filters Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>

            {categoryOptions.map(cat => {
              const isActive = activeCategory === cat;
              const count = counts[cat] || 0;
              const colorConfig = CATEGORY_COLORS[cat];

              let activeStyle = 'bg-slate-900 text-white border-slate-900';
              if (colorConfig && cat !== 'All') {
                activeStyle = `border-[${colorConfig.border}]`;
              }

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={
                    isActive && colorConfig && cat !== 'All'
                      ? {
                          backgroundColor: colorConfig.bg,
                          color: colorConfig.text,
                          borderColor: colorConfig.border,
                        }
                      : {}
                  }
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all shrink-0 cursor-pointer ${
                    isActive && cat === 'All'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                      : isActive
                      ? 'shadow-2xs font-bold'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`font-mono tabular-nums text-[11px] px-1.5 py-0.2 rounded ${
                      isActive && cat === 'All'
                        ? 'bg-slate-800 text-slate-200'
                        : isActive
                        ? 'bg-white/80'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-500 font-medium shrink-0">
            Showing <span className="font-semibold text-slate-900">{filteredCompanies.length}</span>{' '}
            {filteredCompanies.length === 1 ? 'organization' : 'organizations'}
          </div>
        </div>

        {/* Loading Skeleton vs Companies Grid vs Empty State */}
        <div className="mt-6">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-slate-200 bg-white animate-pulse space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg" />
                    <div className="w-16 h-5 bg-slate-100 rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="w-3/4 h-5 bg-slate-100 rounded" />
                    <div className="w-1/2 h-3 bg-slate-100 rounded" />
                  </div>
                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    <div className="w-full h-3 bg-slate-100 rounded" />
                    <div className="w-4/5 h-3 bg-slate-100 rounded" />
                    <div className="w-2/3 h-3 bg-slate-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCompanies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredCompanies.map(company => (
                <CompanyCard
                  key={company.company_id}
                  company={company}
                  onClick={handleCompanyClick}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-slate-50 rounded-2xl border border-slate-200 my-4 max-w-xl mx-auto px-6">
              <div className="w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-400 mx-auto flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No matching organizations</h3>
              <p className="mt-1.5 text-xs text-slate-500">
                We couldn't find any companies matching your current search query or tier filters.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-2xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Enterprise Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p className="font-medium text-slate-700">
              {COLLEGE_NAME}
            </p>
            <p className="mt-0.5 text-slate-500">
              Campus Placement Intelligence Hub · Dedicated Research Archive
            </p>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Enterprise Placement Analytics</span>
            <span>·</span>
            <span>Phase 1 Verified Architecture</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
