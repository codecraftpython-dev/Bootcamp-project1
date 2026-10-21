import { describe, it, expect } from 'vitest';
import { SEED_COMPANIES } from '@/src/data/seedCompanies.ts';
import {
  normalizeCompanySummary,
  normalizeCompanyProfile,
  normalizeDashboardSkills,
  scoreToDifficulty,
  proficiencyToBloom,
  scoreToCriticality,
  isNullish,
} from '@/src/lib/companyData.ts';
import { buildIntelligenceSections } from '@/src/data/intelligenceData.tsx';
import { SKILL_TOPICS_MAP } from '@/src/data/skillTopics.ts';

describe('Phase 1 Portal Smoke & Data Integrity Tests', () => {
  it('loads SEED_COMPANIES with valid Accenture reference data', () => {
    expect(SEED_COMPANIES.length).toBe(1);
    const accenture = SEED_COMPANIES[0];
    expect(accenture.short_json.name).toBe('Accenture plc');
    expect(accenture.short_json.company_type).toBe('Dream');
    expect(accenture.skill_levels.length).toBe(12);
  });

  it('normalizes company summary correctly', () => {
    const summary = normalizeCompanySummary(SEED_COMPANIES[0].short_json);
    expect(summary.name).toBe('Accenture plc');
    expect(summary.company_type).toBe('Dream');
    expect(summary.operating_countries.length).toBeGreaterThan(0);
  });

  it('normalizes company profile with all 22 section fields and prevents CTC leakage', () => {
    const raw = {
      ...SEED_COMPANIES[0].full_json,
      ctc: '20 LPA',
      stipend: '50k',
      selection_ratio: '5%',
    };
    const profile = normalizeCompanyProfile(raw, SEED_COMPANIES[0].short_json);
    expect(profile.name).toBe('Accenture plc');
    expect(profile.ctc).toBeUndefined();
    expect(profile.stipend).toBeUndefined();
    expect(profile.selection_ratio).toBeUndefined();
  });

  it('builds exactly 22 intelligence sections in the designated order', () => {
    const sections = buildIntelligenceSections(SEED_COMPANIES[0].full_json);
    expect(sections.length).toBe(22);
    expect(sections[0].title).toBe('Company Identity');
    expect(sections[1].title).toBe('Overview & Vision');
    expect(sections[2].title).toBe('Leadership');
    expect(sections[21].title).toBe('Contact Information');
  });

  it('maps skills and taxonomy correctly to Bloom levels and criticality tiers', () => {
    const skills = normalizeDashboardSkills(SEED_COMPANIES[0].skill_levels);
    expect(skills.length).toBe(12);

    // DSA has required_level 8 -> EV, Critical
    const dsa = skills.find(s => s.skill_set_name === 'Data Structures & Algorithms');
    expect(dsa).toBeDefined();
    expect(dsa?.bloom_level).toBe('EV');
    expect(dsa?.criticality).toBe('Critical');
    expect(dsa?.difficulty).toBe('EXPERT');

    // System Design Intro has required_level 4 -> AP, Baseline
    const sd = skills.find(s => s.skill_set_name === 'System Design (Intro)');
    expect(sd).toBeDefined();
    expect(sd?.bloom_level).toBe('AP');
    expect(sd?.criticality).toBe('Baseline');
  });

  it('has complete 10-level topic roadmaps for all 12 seed skills', () => {
    for (let id = 1; id <= 12; id++) {
      const ladder = SKILL_TOPICS_MAP[id];
      expect(ladder).toBeDefined();
      expect(ladder.length).toBe(10);
      ladder.forEach(level => {
        expect(level.topic.length).toBeGreaterThan(5);
        expect(level.topic.length).toBeLessThanOrEqual(95);
      });
    }
  });

  it('isNullish handles na, null, undefined, dash correctly', () => {
    expect(isNullish(null)).toBe(true);
    expect(isNullish(undefined)).toBe(true);
    expect(isNullish('NA')).toBe(true);
    expect(isNullish('n/a')).toBe(true);
    expect(isNullish('-')).toBe(true);
    expect(isNullish('none')).toBe(true);
    expect(isNullish('Valid Data')).toBe(false);
  });
});
