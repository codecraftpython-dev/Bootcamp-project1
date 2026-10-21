import React, { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import { SEED_COMPANIES, type RawCompanyRecord } from '@/src/data/seedCompanies.ts';

export interface SelectedCompanyMeta {
  companyId: number;
  companyName: string;
  logoUrl: string;
}

interface CompanyContextType {
  selectedCompany: RawCompanyRecord | null;
  selectedMeta: SelectedCompanyMeta | null;
  selectCompany: (company: RawCompanyRecord) => void;
  clearCompany: () => void;
  allCompanies: RawCompanyRecord[];
  isInitialized: boolean;
}

const LOCAL_STORAGE_KEY = 'selected-company';

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [selectedMeta, setSelectedMeta] = useState<SelectedCompanyMeta | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage on startup
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object' && parsed.companyId) {
          setSelectedMeta(parsed);
        }
      }
    } catch (e) {
      console.warn('Failed to read selected-company from localStorage', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Find full company matching the stored metadata
  const selectedCompany = useMemo<RawCompanyRecord | null>(() => {
    if (!selectedMeta) return null;
    const match = SEED_COMPANIES.find(c => c.company_id === selectedMeta.companyId);
    return match || null;
  }, [selectedMeta]);

  const selectCompany = (company: RawCompanyRecord) => {
    const meta: SelectedCompanyMeta = {
      companyId: company.company_id,
      companyName: company.short_json.name,
      logoUrl: company.short_json.logo_url,
    };
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(meta));
    } catch (e) {
      console.warn('Failed to save selected-company to localStorage', e);
    }
    setSelectedMeta(meta);
  };

  const clearCompany = () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to remove selected-company from localStorage', e);
    }
    setSelectedMeta(null);
  };

  return (
    <CompanyContext.Provider
      value={{
        selectedCompany,
        selectedMeta,
        selectCompany,
        clearCompany,
        allCompanies: SEED_COMPANIES,
        isInitialized,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
}
