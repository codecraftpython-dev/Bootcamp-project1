import React from 'react';
import type { BloomLevel, CriticalityLevel, DifficultyLevel } from '@/src/lib/companyData.ts';

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Super Dream': { bg: '#f5f3ff', text: '#7c3aed', border: '#ddd6fe' },
  Dream: { bg: '#eff6ff', text: '#2563eb', border: '#bfdbfe' },
  Standard: { bg: '#f0fdf4', text: '#16a34a', border: '#bbf7d0' },
  Regular: { bg: '#fffbeb', text: '#d97706', border: '#fde68a' },
};

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, className = '' }) => {
  const norm = category || 'Standard';
  const style = CATEGORY_COLORS[norm] || CATEGORY_COLORS.Dream;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold tracking-wide border whitespace-nowrap shrink-0 ${className}`}
      style={{
        backgroundColor: style.bg,
        color: style.text,
        borderColor: style.border,
      }}
    >
      {norm}
    </span>
  );
};

export const BLOOM_CONFIG: Record<
  BloomLevel,
  { name: string; hex: string; bg: string; border: string; desc: string }
> = {
  CU: {
    name: 'Conceptual Understanding',
    hex: '#3b82f6',
    bg: '#eff6ff',
    border: '#bfdbfe',
    desc: 'Level 1-2 · Comprehension of core foundational definitions and mechanics',
  },
  AP: {
    name: 'Application',
    hex: '#22c55e',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    desc: 'Level 3-4 · Implementation of knowledge to solve practical programming problems',
  },
  AS: {
    name: 'Analysis',
    hex: '#eab308',
    bg: '#fefce8',
    border: '#fef08a',
    desc: 'Level 5-6 · Breakdown of complex structures and comparative trade-off inspection',
  },
  EV: {
    name: 'Evaluation',
    hex: '#ef4444',
    bg: '#fef2f2',
    border: '#fecaca',
    desc: 'Level 7-8 · Critical assessment, architectural benchmarking and edge-case judgment',
  },
  CR: {
    name: 'Creation',
    hex: '#a855f7',
    bg: '#faf5ff',
    border: '#e9d5ff',
    desc: 'Level 9-10 · High-level original design, distributed scale and optimization',
  },
};

export const BloomBadge: React.FC<{ level: BloomLevel; className?: string }> = ({
  level,
  className = '',
}) => {
  const conf = BLOOM_CONFIG[level] || BLOOM_CONFIG.CU;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-bold tracking-wider border whitespace-nowrap ${className}`}
      style={{
        backgroundColor: conf.bg,
        color: conf.hex,
        borderColor: conf.border,
      }}
      title={`${conf.name}: ${conf.desc}`}
    >
      {level}
    </span>
  );
};

export const CriticalityBadge: React.FC<{ criticality: CriticalityLevel }> = ({ criticality }) => {
  const styles = {
    Critical: 'bg-rose-50 text-rose-700 border-rose-200',
    Important: 'bg-amber-50 text-amber-700 border-amber-200',
    Baseline: 'bg-slate-50 text-slate-700 border-slate-200',
  }[criticality] || 'bg-slate-50 text-slate-700 border-slate-200';

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border whitespace-nowrap ${styles}`}>
      {criticality}
    </span>
  );
};
