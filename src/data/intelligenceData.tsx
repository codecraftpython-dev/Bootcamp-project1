import React from 'react';
import {
  Building2,
  Compass,
  Users,
  DollarSign,
  Globe,
  Package,
  Cpu,
  Network,
  Swords,
  TrendingUp,
  Leaf,
  HeartHandshake,
  Newspaper,
  BarChart3,
  ShieldAlert,
  Navigation,
  ShieldCheck,
  GraduationCap,
  Award,
  Gift,
  Star,
  Mail,
  type LucideIcon,
} from 'lucide-react';
import type { CompanyProfile } from '@/src/lib/companyData.ts';

export interface IntelligenceField {
  key: string;
  label: string;
  value?: any;
  type?: 'text' | 'url' | 'video' | 'rating' | 'list' | 'email';
}

export interface IntelligenceSection {
  id: string;
  index: number;
  title: string;
  icon: LucideIcon;
  fields: IntelligenceField[];
}

export function buildIntelligenceSections(profile?: Partial<CompanyProfile>): IntelligenceSection[] {
  const p = profile || {};

  const get = (key: string, type: IntelligenceField['type'] = 'text'): IntelligenceField => {
    return {
      key,
      label: formatFieldLabel(key),
      value: p[key] ?? null,
      type: type || detectType(key, p[key]),
    };
  };

  const sectionsRaw: Array<{
    id: string;
    title: string;
    icon: LucideIcon;
    fieldKeys: Array<{ key: string; type?: IntelligenceField['type'] }>;
  }> = [
    {
      id: 'company-identity',
      title: 'Company Identity',
      icon: Building2,
      fieldKeys: [
        { key: 'name' },
        { key: 'short_name' },
        { key: 'category' },
        { key: 'nature_of_company' },
        { key: 'incorporation_year' },
        { key: 'website_url', type: 'url' },
      ],
    },
    {
      id: 'overview-vision',
      title: 'Overview & Vision',
      icon: Compass,
      fieldKeys: [
        { key: 'overview_text' },
        { key: 'vision_statement' },
        { key: 'mission_statement' },
        { key: 'core_values' },
        { key: 'history_timeline' },
      ],
    },
    {
      id: 'leadership',
      title: 'Leadership',
      icon: Users,
      fieldKeys: [
        { key: 'ceo_name' },
        { key: 'ceo_linkedin_url', type: 'url' },
        { key: 'key_leaders' },
        { key: 'board_members' },
        { key: 'warm_intro_pathways' },
        { key: 'decision_maker_access' },
      ],
    },
    {
      id: 'funding-financials',
      title: 'Funding & Financials',
      icon: DollarSign,
      fieldKeys: [
        { key: 'annual_revenue' },
        { key: 'annual_profit' },
        { key: 'valuation' },
        { key: 'revenue_mix' },
        { key: 'yoy_growth_rate' },
        { key: 'profitability_status' },
        { key: 'key_investors' },
        { key: 'recent_funding_rounds' },
        { key: 'total_capital_raised' },
      ],
    },
    {
      id: 'global-presence',
      title: 'Global Presence',
      icon: Globe,
      fieldKeys: [
        { key: 'headquarters_address' },
        { key: 'office_count' },
        { key: 'operating_countries' },
        { key: 'office_locations' },
      ],
    },
    {
      id: 'products-services',
      title: 'Products & Services',
      icon: Package,
      fieldKeys: [
        { key: 'offerings_description' },
        { key: 'focus_sectors' },
        { key: 'pain_points_addressed' },
        { key: 'top_customers' },
        { key: 'product_pipeline' },
        { key: 'case_studies' },
      ],
    },
    {
      id: 'technology-stack',
      title: 'Technology Stack',
      icon: Cpu,
      fieldKeys: [
        { key: 'tech_stack' },
        { key: 'technology_partners' },
        { key: 'ai_ml_adoption_level' },
        { key: 'intellectual_property' },
        { key: 'r_and_d_investment' },
        { key: 'cybersecurity_posture' },
        { key: 'tech_adoption_rating' },
      ],
    },
    {
      id: 'partnerships-ecosystem',
      title: 'Partnerships & Ecosystem',
      icon: Network,
      fieldKeys: [
        { key: 'partnership_ecosystem' },
        { key: 'industry_associations' },
        { key: 'strategic_priorities' },
      ],
    },
    {
      id: 'competitive-landscape',
      title: 'Competitive Landscape',
      icon: Swords,
      fieldKeys: [
        { key: 'key_competitors' },
        { key: 'market_share_percentage' },
        { key: 'benchmark_vs_peers' },
        { key: 'competitive_advantages' },
        { key: 'weaknesses_gaps' },
        { key: 'key_challenges_needs' },
      ],
    },
    {
      id: 'market-opportunity',
      title: 'Market Opportunity',
      icon: TrendingUp,
      fieldKeys: [
        { key: 'tam' },
        { key: 'sam' },
        { key: 'som' },
        { key: 'future_projections' },
        { key: 'innovation_roadmap' },
        { key: 'go_to_market_strategy' },
      ],
    },
    {
      id: 'core-value-proposition-esg',
      title: 'Core Value Proposition & ESG',
      icon: Leaf,
      fieldKeys: [
        { key: 'core_value_proposition' },
        { key: 'unique_differentiators' },
        { key: 'esg_ratings' },
        { key: 'carbon_footprint' },
        { key: 'ethical_sourcing' },
        { key: 'sustainability_csr' },
      ],
    },
    {
      id: 'culture-work-life',
      title: 'Culture & Work Life',
      icon: HeartHandshake,
      fieldKeys: [
        { key: 'work_culture_summary' },
        { key: 'manager_quality' },
        { key: 'psychological_safety' },
        { key: 'feedback_culture' },
        { key: 'diversity_metrics' },
        { key: 'diversity_inclusion_score' },
        { key: 'burnout_risk' },
        { key: 'layoff_history' },
        { key: 'mission_clarity' },
      ],
    },
    {
      id: 'recent-news-milestones',
      title: 'Recent News & Milestones',
      icon: Newspaper,
      fieldKeys: [
        { key: 'recent_news' },
        { key: 'awards_recognitions' },
        { key: 'customer_testimonials' },
        { key: 'event_participation' },
      ],
    },
    {
      id: 'sales-customer-metrics',
      title: 'Sales & Customer Metrics',
      icon: BarChart3,
      fieldKeys: [
        { key: 'sales_motion' },
        { key: 'customer_acquisition_cost' },
        { key: 'customer_lifetime_value' },
        { key: 'cac_ltv_ratio' },
        { key: 'churn_rate' },
        { key: 'net_promoter_score' },
        { key: 'customer_concentration_risk' },
      ],
    },
    {
      id: 'risk-compliance',
      title: 'Risk & Compliance',
      icon: ShieldAlert,
      fieldKeys: [
        { key: 'regulatory_status' },
        { key: 'legal_issues' },
        { key: 'geopolitical_risks' },
        { key: 'macro_risks' },
        { key: 'supply_chain_dependencies' },
        { key: 'crisis_behavior' },
      ],
    },
    {
      id: 'work-location-commute',
      title: 'Work Location & Commute',
      icon: Navigation,
      fieldKeys: [
        { key: 'remote_policy_details' },
        { key: 'typical_hours' },
        { key: 'overtime_expectations' },
        { key: 'weekend_work' },
        { key: 'flexibility_level' },
        { key: 'location_centrality' },
        { key: 'office_zone_type' },
        { key: 'public_transport_access' },
        { key: 'cab_policy' },
        { key: 'airport_commute_time' },
      ],
    },
    {
      id: 'safety-wellbeing',
      title: 'Safety & Wellbeing',
      icon: ShieldCheck,
      fieldKeys: [
        { key: 'area_safety' },
        { key: 'safety_policies' },
        { key: 'infrastructure_safety' },
        { key: 'emergency_preparedness' },
        { key: 'ethical_standards' },
      ],
    },
    {
      id: 'career-growth-learning',
      title: 'Career Growth & Learning',
      icon: GraduationCap,
      fieldKeys: [
        { key: 'training_spend' },
        { key: 'onboarding_quality' },
        { key: 'learning_culture' },
        { key: 'exposure_quality' },
        { key: 'mentorship_availability' },
        { key: 'internal_mobility' },
        { key: 'promotion_clarity' },
        { key: 'tools_access' },
        { key: 'role_clarity' },
        { key: 'early_ownership' },
        { key: 'work_impact' },
        { key: 'execution_thinking_balance' },
        { key: 'automation_level' },
        { key: 'cross_functional_exposure' },
        { key: 'company_maturity' },
      ],
    },
    {
      id: 'brand-reputation',
      title: 'Brand & Reputation',
      icon: Award,
      fieldKeys: [
        { key: 'brand_value' },
        { key: 'client_quality' },
        { key: 'exit_opportunities' },
        { key: 'skill_relevance' },
        { key: 'external_recognition' },
        { key: 'network_strength' },
        { key: 'global_exposure' },
        { key: 'brand_sentiment_score' },
        { key: 'website_quality' },
      ],
    },
    {
      id: 'compensation-benefits',
      title: 'Compensation & Benefits',
      icon: Gift,
      fieldKeys: [
        { key: 'leave_policy' },
        { key: 'health_support' },
        { key: 'fixed_vs_variable_pay' },
        { key: 'bonus_predictability' },
        { key: 'esops_incentives' },
        { key: 'family_health_insurance' },
        { key: 'relocation_support' },
        { key: 'lifestyle_benefits' },
        { key: 'hiring_velocity' },
        { key: 'employee_turnover' },
        { key: 'avg_retention_tenure' },
      ],
    },
    {
      id: 'digital-presence-ratings',
      title: 'Digital Presence & Ratings',
      icon: Star,
      fieldKeys: [
        { key: 'glassdoor_rating', type: 'rating' },
        { key: 'indeed_rating', type: 'rating' },
        { key: 'google_rating', type: 'rating' },
        { key: 'website_rating', type: 'rating' },
        { key: 'website_traffic_rank' },
        { key: 'social_media_followers' },
        { key: 'linkedin_url', type: 'url' },
        { key: 'twitter_handle' },
        { key: 'facebook_url', type: 'url' },
        { key: 'instagram_url', type: 'url' },
        { key: 'marketing_video_url', type: 'video' },
      ],
    },
    {
      id: 'contact-information',
      title: 'Contact Information',
      icon: Mail,
      fieldKeys: [
        { key: 'primary_contact_email', type: 'email' },
        { key: 'primary_phone_number' },
        { key: 'contact_person_name' },
        { key: 'contact_person_title' },
        { key: 'contact_person_email', type: 'email' },
        { key: 'contact_person_phone' },
      ],
    },
  ];

  return sectionsRaw.map((s, idx) => ({
    id: s.id,
    index: idx + 1,
    title: s.title,
    icon: s.icon,
    fields: s.fieldKeys.map(fk => get(fk.key, fk.type)),
  }));
}

function formatFieldLabel(key: string): string {
  const map: Record<string, string> = {
    tam: 'Total Addressable Market (TAM)',
    sam: 'Serviceable Addressable Market (SAM)',
    som: 'Serviceable Obtainable Market (SOM)',
    esg_ratings: 'ESG Ratings & Standards',
    cac_ltv_ratio: 'CAC to LTV Ratio',
    yoy_growth_rate: 'YoY Growth Rate',
    ceo_linkedin_url: 'CEO LinkedIn Profile',
    ai_ml_adoption_level: 'AI / ML Adoption Level',
    r_and_d_investment: 'R&D Investment',
    esops_incentives: 'ESOPs & Stock Incentives',
  };
  if (map[key]) return map[key];

  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function detectType(key: string, val: any): IntelligenceField['type'] {
  if (key.includes('url') || key.includes('link')) return 'url';
  if (key.includes('email')) return 'email';
  if (key.includes('video')) return 'video';
  if (key.includes('rating') || key.includes('score')) return 'rating';
  return 'text';
}
