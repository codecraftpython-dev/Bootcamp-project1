export interface CompanySummary {
  name: string;
  short_name: string;
  logo_url: string;
  category: string;
  company_type: 'Super Dream' | 'Dream' | 'Standard' | 'Regular' | string;
  incorporation_year: number;
  employee_size: string;
  headquarters_address: string;
  operating_countries: string[];
  office_locations: string[];
  yoy_growth_rate: string;
  website_url: string;
  [key: string]: any;
}

export interface CompanyProfile {
  name: string;
  short_name: string;
  category: string;
  incorporation_year: number;
  nature_of_company: string;
  overview_text: string;
  headquarters_address: string;
  operating_countries: string;
  office_count: string;
  office_locations: string;
  employee_size: string;
  vision_statement: string;
  mission_statement: string;
  core_values: string;
  history_timeline: string;
  recent_news: string;

  website_url: string;
  linkedin_url: string;
  twitter_handle: string;
  facebook_url: string;
  instagram_url: string;
  primary_contact_email: string;
  primary_phone_number: string;

  regulatory_status: string;
  legal_issues: string;
  esg_ratings: string;
  supply_chain_dependencies: string;
  geopolitical_risks: string;
  macro_risks: string;
  carbon_footprint: string;
  ethical_sourcing: string;

  marketing_video_url: string;
  customer_testimonials: string;
  website_quality: string;
  website_rating: string;
  website_traffic_rank: string;
  social_media_followers: string;
  glassdoor_rating: string;
  indeed_rating: string;
  google_rating: string;
  awards_recognitions: string;
  brand_sentiment_score: string;
  event_participation: string;

  pain_points_addressed: string;
  focus_sectors: string;
  offerings_description: string;
  top_customers: string;
  core_value_proposition: string;
  unique_differentiators: string;
  competitive_advantages: string;
  weaknesses_gaps: string;
  key_challenges_needs: string;
  key_competitors: string;
  market_share_percentage: string;
  sales_motion: string;
  customer_concentration_risk: string;
  exit_strategy_history: string;
  benchmark_vs_peers: string;
  future_projections: string;
  strategic_priorities: string;
  industry_associations: string;
  case_studies: string;
  go_to_market_strategy: string;
  innovation_roadmap: string;
  product_pipeline: string;
  tam: string;
  sam: string;
  som: string;

  leave_policy: string;
  health_support: string;
  fixed_vs_variable_pay: string;
  bonus_predictability: string;
  esops_incentives: string;
  family_health_insurance: string;
  relocation_support: string;
  lifestyle_benefits: string;
  hiring_velocity: string;
  employee_turnover: string;
  avg_retention_tenure: string;
  diversity_metrics: string;
  work_culture_summary: string;
  manager_quality: string;
  psychological_safety: string;
  feedback_culture: string;
  diversity_inclusion_score: string;
  ethical_standards: string;
  burnout_risk: string;
  layoff_history: string;
  mission_clarity: string;
  sustainability_csr: string;
  crisis_behavior: string;

  annual_revenue: string;
  annual_profit: string;
  revenue_mix: string;
  valuation: string;
  yoy_growth_rate: string;
  profitability_status: string;
  key_investors: string;
  recent_funding_rounds: string;
  total_capital_raised: string;
  customer_acquisition_cost: string;
  customer_lifetime_value: string;
  cac_ltv_ratio: string;
  churn_rate: string;
  net_promoter_score: string;
  burn_rate: string;
  runway_months: string;
  burn_multiplier: string;

  remote_policy_details: string;
  typical_hours: string;
  overtime_expectations: string;
  weekend_work: string;
  flexibility_level: string;
  location_centrality: string;
  public_transport_access: string;
  cab_policy: string;
  airport_commute_time: string;
  office_zone_type: string;
  area_safety: string;
  safety_policies: string;
  infrastructure_safety: string;
  emergency_preparedness: string;

  ceo_name: string;
  ceo_linkedin_url: string;
  key_leaders: string;
  warm_intro_pathways: string;
  decision_maker_access: string;
  contact_person_name: string;
  contact_person_title: string;
  contact_person_email: string;
  contact_person_phone: string;
  board_members: string;

  training_spend: string;
  onboarding_quality: string;
  learning_culture: string;
  exposure_quality: string;
  mentorship_availability: string;
  internal_mobility: string;
  promotion_clarity: string;
  tools_access: string;
  role_clarity: string;
  early_ownership: string;
  work_impact: string;
  execution_thinking_balance: string;
  automation_level: string;
  cross_functional_exposure: string;
  company_maturity: string;
  brand_value: string;
  client_quality: string;
  exit_opportunities: string;
  skill_relevance: string;
  external_recognition: string;
  network_strength: string;
  global_exposure: string;

  technology_partners: string;
  intellectual_property: string;
  r_and_d_investment: string;
  ai_ml_adoption_level: string;
  tech_stack: string;
  cybersecurity_posture: string;
  partnership_ecosystem: string;
  tech_adoption_rating: string;

  [key: string]: any;
}

export type BloomLevel = 'CU' | 'AP' | 'AS' | 'EV' | 'CR';
export type CriticalityLevel = 'Critical' | 'Important' | 'Baseline';
export type DifficultyLevel = 'EXPERT' | 'ADVANCED' | 'PRO' | 'BEGINNER';

export interface DashboardSkill {
  skill_set_id: number;
  skill_set_name: string;
  required_level: number;
  required_proficiency: string;
  bloom_level: BloomLevel;
  criticality: CriticalityLevel;
  difficulty: DifficultyLevel;
}

export function asString(val: any, fallback = ''): string {
  if (val === null || val === undefined) return fallback;
  return String(val).trim();
}

export function asRecord(val: any): Record<string, any> {
  if (val && typeof val === 'object' && !Array.isArray(val)) {
    return val;
  }
  return {};
}

export function splitItems(val: string): string[] {
  if (!val) return [];
  // Split on newlines, semicolons, bullets (• or - ), or commas when list-like
  return val
    .split(/[\n;•]+/)
    .map(s => s.trim().replace(/^[-*]\s*/, ''))
    .filter(Boolean);
}

export function titleCaseFromCode(code: string): string {
  if (!code) return '';
  return code
    .replace(/[_-]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, char => char.toUpperCase());
}

export function scoreToDifficulty(score: number): DifficultyLevel {
  if (score >= 8) return 'EXPERT';
  if (score >= 6) return 'ADVANCED';
  if (score >= 4) return 'PRO';
  return 'BEGINNER';
}

export function proficiencyToBloom(level: number): BloomLevel {
  if (level >= 9) return 'CR'; // Creation
  if (level >= 7) return 'EV'; // Evaluation
  if (level >= 5) return 'AS'; // Analysis
  if (level >= 3) return 'AP'; // Application
  return 'CU'; // Conceptual Understanding
}

export function scoreToCriticality(score: number): CriticalityLevel {
  if (score >= 7) return 'Critical';
  if (score >= 5) return 'Important';
  return 'Baseline';
}

export function isNullish(val: any): boolean {
  if (val === null || val === undefined) return true;
  const str = String(val).trim().toLowerCase();
  return (
    str === '' ||
    str === 'na' ||
    str === 'n/a' ||
    str === 'none' ||
    str === '-' ||
    str === 'null' ||
    str === 'undefined' ||
    str === 'not applicable'
  );
}

export function normalizeCompanySummary(short_json: any): CompanySummary {
  const raw = asRecord(short_json);
  return {
    name: asString(raw.name, 'Unnamed Company'),
    short_name: asString(raw.short_name, asString(raw.name, 'Company')),
    logo_url: asString(raw.logo_url),
    category: asString(raw.category, 'Enterprise'),
    company_type: asString(raw.company_type, 'Dream'),
    incorporation_year: Number(raw.incorporation_year) || 1990,
    employee_size: asString(raw.employee_size, 'NA'),
    headquarters_address: asString(raw.headquarters_address, 'NA'),
    operating_countries: splitItems(asString(raw.operating_countries)),
    office_locations: splitItems(asString(raw.office_locations)),
    yoy_growth_rate: asString(raw.yoy_growth_rate, '0%'),
    website_url: asString(raw.website_url, '#'),
    ...raw
  };
}

export function normalizeCompanyProfile(full_json: any, short_json?: any): CompanyProfile {
  const full = asRecord(full_json);
  const short = asRecord(short_json);
  const merged = { ...short, ...full };

  // Strict anti-leak: remove CTC, Stipend, Selection Ratio if ever accidentally present
  delete merged.ctc;
  delete merged.salary;
  delete merged.stipend;
  delete merged.selection_ratio;
  delete merged.selection_rate;

  return merged as CompanyProfile;
}

export function normalizeDashboardSkills(skillLevels: any[]): DashboardSkill[] {
  if (!Array.isArray(skillLevels)) return [];
  return skillLevels.map(item => {
    const level = Number(item.required_level) || 1;
    return {
      skill_set_id: Number(item.skill_set_id) || 0,
      skill_set_name: asString(item.skill_set_name, 'Skill'),
      required_level: level,
      required_proficiency: asString(item.required_proficiency, 'Proficient'),
      bloom_level: proficiencyToBloom(level),
      criticality: scoreToCriticality(level),
      difficulty: scoreToDifficulty(level),
    };
  });
}
