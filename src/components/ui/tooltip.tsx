import React, { createContext, useContext, type ReactNode } from 'react';

const TooltipContext = createContext<Record<string, any>>({});

export const TooltipProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <TooltipContext.Provider value={{}}>
      {children}
    </TooltipContext.Provider>
  );
};
