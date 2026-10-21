import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-amber-500" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
        404 - Page Not Found
      </h1>
      <p className="mt-2 text-sm text-slate-500 max-w-md">
        The requested URL does not exist in the JSSATEN Placement Intelligence Hub.
      </p>
      <div className="mt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-2xs"
        >
          <Home className="w-4 h-4" />
          <span>Return to Companies Portal</span>
        </Link>
      </div>
    </div>
  );
};
