import React, { useState } from 'react';

interface CompanyLogoProps {
  name: string;
  logoUrl?: string;
  domain?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  name,
  logoUrl,
  domain,
  className = '',
  size = 'md',
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-10 h-10 text-sm font-semibold',
    lg: 'w-12 h-12 text-base font-semibold',
    xl: 'w-16 h-16 text-xl font-bold',
  }[size];

  const publishableKey = import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY;

  // Determine source
  let resolvedUrl = logoUrl;
  if (!resolvedUrl && domain && publishableKey) {
    resolvedUrl = `https://img.logo.dev/${domain}?token=${publishableKey}&format=svg`;
  }

  // Get initial letters (up to 2)
  const initials = (name || 'CO')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');

  if (resolvedUrl && !hasError) {
    return (
      <div
        className={`relative inline-flex items-center justify-center rounded-lg bg-white border border-slate-200 overflow-hidden shrink-0 shadow-xs ${sizeClasses} ${className}`}
      >
        <img
          src={resolvedUrl}
          alt={`${name} logo`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain p-1.5"
          onError={() => setHasError(true)}
          loading="lazy"
        />
      </div>
    );
  }

  // Initial letter fallback in clean enterprise aesthetic
  return (
    <div
      className={`inline-flex items-center justify-center rounded-lg bg-slate-900 text-white shrink-0 tracking-wider font-heading select-none shadow-xs ${sizeClasses} ${className}`}
      aria-label={`${name} avatar`}
    >
      {initials || 'C'}
    </div>
  );
};
