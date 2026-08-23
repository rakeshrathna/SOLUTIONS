import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { GlassCard } from '../components/common/GlassCard';
import { Home, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center animate-fade-in p-4">
      <GlassCard className="max-w-md p-8 text-center space-y-4 border-brand-500/20">
        <div className="w-16 h-16 rounded-3xl bg-brand-500/10 text-brand-400 border border-brand-500/20 flex items-center justify-center mx-auto shadow-glow-teal">
          <Compass className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black text-white">404 - Page Not Found</h1>
        <p className="text-sm text-slate-300">
          The curriculum unit or interactive experiment you are looking for does not exist in the chapter directory.
        </p>
        <div className="pt-2">
          <Link to="/">
            <Button variant="primary" icon={<Home className="w-4 h-4" />}>
              Return to Chapter Overview
            </Button>
          </Link>
        </div>
      </GlassCard>
    </div>
  );
};
