import React from 'react';
import { Users, Sparkles, Check, ArrowRight } from 'lucide-react';
import { mockClubs } from '../../data/mockData';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const ClubsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <Users className="w-7 h-7 text-teal-500" /> Clubs & Student Communities
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Join tech societies, design chapters, and robotics guilds to build real projects.
        </p>
      </div>

      {/* Clubs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockClubs.map((club) => (
          <Card key={club.id} padding="none" className="overflow-hidden flex flex-col justify-between">
            <div>
              {/* Banner & Logo */}
              <div className="relative h-36 w-full">
                <img src={club.banner} alt={club.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-950/40" />
                <img
                  src={club.logo}
                  alt={club.name}
                  className="absolute -bottom-5 left-4 w-12 h-12 rounded-ch border-2 border-white dark:border-slate-800 object-cover shadow-md"
                />
              </div>

              {/* Club Info */}
              <div className="p-5 pt-8 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="accent" size="sm">{club.category}</Badge>
                  <span className="text-xs font-mono font-bold text-slate-500">{club.memberCount} Members</span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">{club.name}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {club.description}
                </p>

                <p className="text-[11px] text-slate-500 font-mono">Lead: {club.lead}</p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
              {club.isMember ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Active Member
                </span>
              ) : (
                <Button size="sm" variant="outline" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Join Community
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
