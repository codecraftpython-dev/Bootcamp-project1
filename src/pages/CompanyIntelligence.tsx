import React, { useState, useEffect, useRef, useMemo, memo } from 'react';
import {
  ExternalLink,
  Globe,
  Linkedin,
  Star,
  PlayCircle,
  Copy,
  Check,
  ChevronDown,
} from 'lucide-react';
import { useCompany } from '@/src/context/CompanyContext.tsx';
import { CompanyLogo } from '@/src/components/common/CompanyLogo.tsx';
import { CategoryBadge } from '@/src/components/common/Badges.tsx';
import {
  buildIntelligenceSections,
  type IntelligenceSection,
  type IntelligenceField,
} from '@/src/data/intelligenceData.tsx';
import {
  normalizeCompanyProfile,
  isNullish,
  splitItems,
} from '@/src/lib/companyData.ts';

// Value renderer
const FieldValue: React.FC<{ field: IntelligenceField }> = ({ field }) => {
  const [copied, setCopied] = useState(false);
  const raw = field.value;

  if (isNullish(raw)) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200">
        Not Available
      </span>
    );
  }

  const str = String(raw).trim();

  // URL rendering
  if (field.type === 'url' || str.startsWith('http://') || str.startsWith('https://')) {
    return (
      <a
        href={str}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline font-medium break-all text-xs sm:text-sm"
      >
        <span>{str}</span>
        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
      </a>
    );
  }

  // Email rendering
  if (field.type === 'email' || (str.includes('@') && !str.includes(' '))) {
    const handleCopy = () => {
      navigator.clipboard.writeText(str);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    };

    return (
      <div className="inline-flex items-center gap-2">
        <a
          href={`mailto:${str}`}
          className="text-blue-600 hover:underline font-mono text-xs sm:text-sm"
        >
          {str}
        </a>
        <button
          onClick={handleCopy}
          className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors"
          title="Copy email"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-600" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    );
  }

  // Video URL rendering
  if (field.type === 'video') {
    return (
      <a
        href={str}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 transition-colors text-xs font-medium"
      >
        <PlayCircle className="w-4 h-4 text-rose-600" />
        <span>Watch Corporate Showcase</span>
        <ExternalLink className="w-3 h-3 text-rose-500" />
      </a>
    );
  }

  // Rating rendering
  if (field.type === 'rating') {
    const numMatch = str.match(/([0-9.]+)/);
    const score = numMatch ? parseFloat(numMatch[1]) : null;

    return (
      <div className="inline-flex items-center gap-2">
        <span className="font-mono font-bold text-slate-900 bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded border border-amber-200 text-xs flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
          {str}
        </span>
        {score && score <= 5 && (
          <span className="text-[11px] text-slate-400 font-medium">out of 5.0</span>
        )}
      </div>
    );
  }

  // Auto-detection of multi-item lists (separated by ';' or newlines)
  if (str.includes(';') || str.includes('\n')) {
    const items = splitItems(str);
    if (items.length > 1) {
      return (
        <div className="flex flex-wrap gap-1.5">
          {items.map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100/90 text-slate-700 border border-slate-200/80"
            >
              {item}
            </span>
          ))}
        </div>
      );
    }
  }

  // Standard prose/paragraph rendering
  return (
    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
      {str}
    </p>
  );
};

// Memoized Section Card
interface SectionCardProps {
  section: IntelligenceSection;
}

const SectionCard = memo<SectionCardProps>(({ section }) => {
  const Icon = section.icon;

  const validFieldCount = useMemo(() => {
    return section.fields.filter(f => !isNullish(f.value)).length;
  }, [section.fields]);

  return (
    <section
      id={section.id}
      className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden scroll-mt-36"
    >
      {/* Section Card Header */}
      <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              {section.index}. {section.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-medium px-2 py-0.5 rounded-full bg-slate-200/70 text-slate-700">
            {validFieldCount} / {section.fields.length} available
          </span>
        </div>
      </div>

      {/* Field Rows */}
      <div className="divide-y divide-slate-100">
        {section.fields.map(field => (
          <div
            key={field.key}
            className="flex flex-col sm:flex-row px-5 py-3 hover:bg-slate-50/50 transition-colors gap-1 sm:gap-4"
          >
            <div className="sm:w-1/3 shrink-0">
              <span className="text-xs font-semibold text-slate-600 block">
                {field.label}
              </span>
            </div>
            <div className="sm:w-2/3 min-w-0">
              <FieldValue field={field} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

SectionCard.displayName = 'SectionCard';

export const CompanyIntelligence: React.FC = () => {
  const { selectedCompany } = useCompany();
  const [activeTab, setActiveTab] = useState<string>('');
  const isScrollingRef = useRef(false);
  const tabContainerRef = useRef<HTMLDivElement>(null);

  // Normalize profile from seed/store
  const profile = useMemo(() => {
    if (!selectedCompany) return null;
    return normalizeCompanyProfile(
      selectedCompany.full_json,
      selectedCompany.short_json
    );
  }, [selectedCompany]);

  // Build the 22 sections
  const sections = useMemo(() => {
    return buildIntelligenceSections(profile || {});
  }, [profile]);

  // Initialize active tab
  useEffect(() => {
    if (sections.length > 0 && !activeTab) {
      setActiveTab(sections[0].id);
    }
  }, [sections, activeTab]);

  // Scroll spy setup
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const scrollPos = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i].id);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPos >= top) {
            setActiveTab(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Auto-center active tab in horizontal scroll
  useEffect(() => {
    if (!activeTab || !tabContainerRef.current) return;
    const activeBtn = tabContainerRef.current.querySelector(
      `button[data-tab-id="${activeTab}"]`
    ) as HTMLElement | null;

    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeTab]);

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    isScrollingRef.current = true;

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 700);
  };

  if (!selectedCompany || !profile) {
    return null;
  }

  const short = selectedCompany.short_json;

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky top information bar (No hero section, No gradient background) */}
      <div className="sticky top-14 z-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          {/* Left: Company logo, Company name, Industry badge */}
          <div className="flex items-center gap-3.5 min-w-0">
            <CompanyLogo
              name={short.name}
              logoUrl={short.logo_url}
              domain={short.website_url ? new URL(short.website_url).hostname : undefined}
              size="lg"
            />
            <div className="truncate">
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                  {short.name}
                </h1>
                <CategoryBadge category={short.company_type || 'Standard'} />
              </div>
              <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                {short.category || 'Enterprise'} · {short.headquarters_address}
              </p>
            </div>
          </div>

          {/* Right: Website button, LinkedIn button */}
          <div className="flex items-center gap-2">
            {profile.website_url && !isNullish(profile.website_url) && (
              <a
                href={profile.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>Website</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            )}

            {profile.linkedin_url && !isNullish(profile.linkedin_url) && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200 text-xs font-semibold text-blue-700 bg-blue-50/60 hover:bg-blue-100/70 transition-colors shadow-2xs"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-blue-500" />
              </a>
            )}
          </div>
        </div>

        {/* Sticky Tab Bar (22 tabs) with scroll-spy */}
        <div
          ref={tabContainerRef}
          className="border-t border-slate-200/80 bg-slate-50/60 flex items-center gap-1 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-8 py-1.5 text-xs font-medium"
        >
          {sections.map(section => {
            const isActive = activeTab === section.id;
            return (
              <button
                key={section.id}
                data-tab-id={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`whitespace-nowrap shrink-0 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {section.index}. {section.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area: 22 Exhaustive Sections in Order */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {sections.map(section => (
          <SectionCard key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
};
