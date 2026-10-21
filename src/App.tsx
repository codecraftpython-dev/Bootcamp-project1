import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/src/components/ui/tooltip.tsx';
import { Toaster, Sonner } from '@/src/components/ui/toaster.tsx';
import { CompanyProvider } from '@/src/context/CompanyContext.tsx';
import { AppLayout } from '@/src/components/layout/AppLayout.tsx';
import { Index } from '@/src/pages/Index.tsx';
import { CompanyIntelligence } from '@/src/pages/CompanyIntelligence.tsx';
import { SkillIntelligence } from '@/src/pages/SkillIntelligence.tsx';
import { NotFound } from '@/src/pages/NotFound.tsx';

// QueryClient with specific caching rules
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min
      gcTime: 10 * 60 * 1000, // 10 min
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CompanyProvider>
          <BrowserRouter>
            <Suspense
              fallback={
                <div className="min-h-screen bg-white flex items-center justify-center">
                  <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Index />} />

                <Route path="/company" element={<AppLayout />}>
                  <Route index element={<Navigate to="intelligence" replace />} />
                  <Route path="intelligence" element={<CompanyIntelligence />} />
                  <Route path="skills" element={<SkillIntelligence />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CompanyProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
