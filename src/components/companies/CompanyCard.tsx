import React, { memo } from 'react';
import { MapPin, Users, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import type { RawCompanyRecord } from '@/src/data/seedCompanies.ts';
import { CompanyLogo } from '@/src/components/common/CompanyLogo.tsx';
import { CategoryBadge } from '@/src/components/common/Badges.tsx';
import { isNullish } from '@/src/lib/companyData.ts';

interface CompanyCardProps {
  company: RawCompanyRecord;
  onClick: (company: RawCompanyRecord) => void;
}

export const CompanyCard = memo<CompanyCardProps>(({ company, onClick }) => {
  const short = company.short_json;
  const isNegativeGrowth = String(short.yoy_growth_rate || '').trim().startsWith('-');

  const renderVal = (val: any) => {
    if (isNullish(val)) {
      return <span className="italic text-slate-400 text-xs">not publicly available</span>;
    }
    return <span>{val}</span>;
  };

  return (
    <div
      onClick={() => onClick(company)}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(company);
        }
      }}
      className="group relative flex flex-col justify-between p-5 bg-white rounded-xl border border-slate-200/90 hover:border-blue-500/80 hover:shadow-md transition-all duration-200 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
    >
      <div>
        {/* Top Header: Logo + Category Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <CompanyLogo
            name={short.name}
            logoUrl={short.logo_url}
            domain={short.website_url ? new URL(short.website_url).hostname : undefined}
            size="lg"
          />
          <CategoryBadge category={short.company_type || 'Standard'} />
        </div>

        {/* Company Title */}
        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {short.name}
          </h3>
          <p className="text-xs font-medium text-slate-500 line-clamp-1 mt-0.5">
            {short.short_name !== short.name ? short.short_name : short.category}
          </p>
        </div>

        {/* Vital Metrics List */}
        <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{renderVal(short.headquarters_address)}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{renderVal(short.employee_size)}</span>
          </div>

          <div className="flex items-center gap-2">
            {isNegativeGrowth ? (
              <TrendingDown className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            ) : (
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            )}
            <span
              className={`font-mono tabular-nums font-medium ${
                isNegativeGrowth ? 'text-rose-600' : 'text-emerald-700'
              }`}
            >
              {isNullish(short.yoy_growth_rate) ? (
                <span className="italic text-slate-400 text-xs font-sans">not publicly available</span>
              ) : (
                `${short.yoy_growth_rate} YoY Growth`
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Footer CTA Strip */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-blue-600 transition-colors">
        <span>Placement Intelligence</span>
        <div className="w-7 h-7 rounded-full bg-slate-50 group-hover:bg-blue-50 group-hover:text-blue-600 flex items-center justify-center transition-colors">
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
});

CompanyCard.displayName = 'CompanyCard';
