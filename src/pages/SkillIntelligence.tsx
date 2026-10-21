import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  Lock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
  Flame,
  Award,
} from 'lucide-react';
import { useCompany } from '@/src/context/CompanyContext.tsx';
import { CompanyLogo } from '@/src/components/common/CompanyLogo.tsx';
import {
  BloomBadge,
  CriticalityBadge,
  BLOOM_CONFIG,
} from '@/src/components/common/Badges.tsx';
import {
  normalizeDashboardSkills,
  type DashboardSkill,
} from '@/src/lib/companyData.ts';
import { SKILL_TOPICS_MAP } from '@/src/data/skillTopics.ts';

export const SkillIntelligence: React.FC = () => {
  const { selectedCompany } = useCompany();
  const [expandedSkills, setExpandedSkills] = useState<Record<number, boolean>>({});

  const skills = useMemo<DashboardSkill[]>(() => {
    if (!selectedCompany?.skill_levels) return [];
    const normalized = normalizeDashboardSkills(selectedCompany.skill_levels);
    // Sort descending by required_level
    return normalized.sort((a, b) => b.required_level - a.required_level);
  }, [selectedCompany]);

  const toggleExpand = (skillId: number) => {
    setExpandedSkills(prev => ({
      ...prev,
      [skillId]: !prev[skillId],
    }));
  };

  const expandAll = () => {
    const all: Record<number, boolean> = {};
    skills.forEach(s => {
      all[s.skill_set_id] = true;
    });
    setExpandedSkills(all);
  };

  const collapseAll = () => {
    setExpandedSkills({});
  };

  if (!selectedCompany) {
    return null;
  }

  const companyName = selectedCompany.short_json.name;
  const short = selectedCompany.short_json;

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header: Company Logo + "{Company} Skill Intelligence" */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <CompanyLogo
                name={short.name}
                logoUrl={short.logo_url}
                domain={short.website_url ? new URL(short.website_url).hostname : undefined}
                size="xl"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    {companyName} Skill Intelligence
                  </h1>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
                  Recruitment competency matrix, Bloom's cognitive taxonomy, and 10-level preparation ladders
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={expandAll}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
              >
                Expand All Ladders
              </button>
              <button
                type="button"
                onClick={collapseAll}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Bloom's Taxonomy 5-Column Legend */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Cognitive Depth Framework (Bloom's Taxonomy)
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {(['CU', 'AP', 'AS', 'EV', 'CR'] as const).map(code => {
              const conf = BLOOM_CONFIG[code];
              return (
                <div
                  key={code}
                  className="p-3.5 rounded-xl border transition-all"
                  style={{
                    backgroundColor: conf.bg,
                    borderColor: conf.border,
                  }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-white/90 border"
                      style={{ color: conf.hex, borderColor: conf.border }}
                    >
                      {code}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-600">
                      {code === 'CU' && 'Lvl 1–2'}
                      {code === 'AP' && 'Lvl 3–4'}
                      {code === 'AS' && 'Lvl 5–6'}
                      {code === 'EV' && 'Lvl 7–8'}
                      {code === 'CR' && 'Lvl 9–10'}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 leading-tight">
                    {conf.name}
                  </h3>
                  <p className="mt-1 text-[11px] text-slate-600 leading-normal line-clamp-2">
                    {conf.desc.split('·')[1] || conf.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Criticality 3-Card Legend */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            Interview Screening Criticality Tiers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-rose-700">Critical Priority (Score ≥ 7)</span>
                <span className="w-2 h-2 rounded-full bg-rose-600" />
              </div>
              <p className="text-xs text-rose-800/80 leading-relaxed">
                Mandatory for clearing coding assessments and technical rounds. Flaws at this level trigger immediate rejection.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-amber-700">Important Baseline (Score 5–6)</span>
                <span className="w-2 h-2 rounded-full bg-amber-500" />
              </div>
              <p className="text-xs text-amber-800/80 leading-relaxed">
                Core engineering prerequisites evaluated in secondary discussions and design rounds.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-700">Baseline Foundation (Score &lt; 5)</span>
                <span className="w-2 h-2 rounded-full bg-slate-400" />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Conceptual and orientation breadth. Evaluated through conceptual questions or domain alignment.
              </p>
            </div>
          </div>
        </div>

        {/* 12 Skill Cards Sorted Descending */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              Required Competencies ({skills.length} Technical Disciplines)
            </h2>
            <span className="text-xs text-slate-500">
              Sorted by target proficiency depth
            </span>
          </div>

          <div className="space-y-3">
            {skills.map(skill => {
              const isExpanded = !!expandedSkills[skill.skill_set_id];
              const bloomConf = BLOOM_CONFIG[skill.bloom_level];
              const roadmap = SKILL_TOPICS_MAP[skill.skill_set_id] || [];

              return (
                <div
                  key={skill.skill_set_id}
                  className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all duration-200"
                >
                  {/* Skill Card Main Header Strip */}
                  <div
                    onClick={() => toggleExpand(skill.skill_set_id)}
                    className="p-5 cursor-pointer hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm shrink-0 border"
                        style={{
                          backgroundColor: bloomConf.bg,
                          color: bloomConf.hex,
                          borderColor: bloomConf.border,
                        }}
                      >
                        {skill.bloom_level}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-bold text-slate-900">
                            {skill.skill_set_name}
                          </h3>
                          <CriticalityBadge criticality={skill.criticality} />
                        </div>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          Target Proficiency: <span className="text-slate-800 font-semibold">{skill.required_proficiency}</span> · Cognitive Level: <span className="font-semibold text-slate-800">{bloomConf.name}</span>
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar + Level Indicator + Expand Button */}
                    <div className="flex items-center gap-4 self-end md:self-center shrink-0 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="w-32 sm:w-40 flex flex-col gap-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-medium text-slate-500">Benchmark</span>
                          <span className="font-mono font-bold tabular-nums text-slate-900">
                            {skill.required_level}/10
                          </span>
                        </div>
                        {/* Colored Progress Bar */}
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${(skill.required_level / 10) * 100}%`,
                              backgroundColor: bloomConf.hex,
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <BloomBadge level={skill.bloom_level} />
                        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expandable 10-Level Roadmap */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/40">
                      <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
                        <span className="font-semibold uppercase tracking-wider text-[11px] text-slate-400">
                          10-Level Preparation Roadmap
                        </span>
                        <span>
                          Target benchmark: Level {skill.required_level}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {roadmap.map(levelItem => {
                          const isTarget = levelItem.level_number === skill.required_level;
                          const isMet = levelItem.level_number <= skill.required_level;

                          return (
                            <div
                              key={levelItem.level_number}
                              className={`flex items-center gap-3 p-2.5 rounded-lg text-xs transition-colors border ${
                                isTarget
                                  ? 'bg-blue-50/90 border-blue-200 shadow-2xs'
                                  : isMet
                                  ? 'bg-white border-slate-200/80 text-slate-800'
                                  : 'bg-slate-100/60 border-slate-200/50 text-slate-400'
                              }`}
                            >
                              {/* Level Number */}
                              <div
                                className={`w-6 h-6 rounded flex items-center justify-center font-mono font-bold text-[11px] shrink-0 ${
                                  isTarget
                                    ? 'bg-blue-600 text-white'
                                    : isMet
                                    ? 'bg-slate-800 text-white'
                                    : 'bg-slate-200 text-slate-500'
                                }`}
                              >
                                {levelItem.level_number}
                              </div>

                              {/* Topic Description */}
                              <div className="flex-1 min-w-0 font-medium truncate sm:whitespace-normal">
                                {levelItem.topic}
                              </div>

                              {/* Target Marker / Locked State */}
                              <div className="shrink-0 flex items-center gap-1.5">
                                {isTarget && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white">
                                    Target Level
                                  </span>
                                )}
                                {!isMet ? (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
                                    <Lock className="w-3 h-3" />
                                    <span>Beyond scope</span>
                                  </span>
                                ) : (
                                  <CheckCircle2
                                    className={`w-4 h-4 ${
                                      isTarget ? 'text-blue-600' : 'text-emerald-600'
                                    }`}
                                  />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
