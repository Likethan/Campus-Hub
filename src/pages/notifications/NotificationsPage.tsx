import React from 'react';
import { Bell, CheckCheck, Filter, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { NavLink } from 'react-router-dom';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Bell className="w-7 h-7 text-rose-500" /> Notifications & Academic Alerts
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time push updates from professors, placement cell, and club administrators.
          </p>
        </div>

        <Button size="sm" variant="outline" onClick={markAllNotificationsRead} leftIcon={<CheckCheck className="w-4 h-4" />}>
          Mark All As Read
        </Button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((n) => (
          <Card
            key={n.id}
            onClick={() => markNotificationRead(n.id)}
            className={`transition-all ${
              !n.isRead
                ? 'border-l-4 border-l-primary-500 bg-primary-50/20 dark:bg-primary-950/20'
                : 'opacity-80'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant={n.category === 'academic' ? 'danger' : n.category === 'placement' ? 'accent' : 'primary'} size="sm">
                    {n.category.toUpperCase()}
                  </Badge>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{n.title}</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{n.message}</p>
                <span className="text-[10px] text-slate-400 font-mono block mt-1">{n.timestamp}</span>
              </div>

              {n.actionUrl && (
                <NavLink to={n.actionUrl} className="shrink-0">
                  <Button size="sm" variant="ghost" className="text-primary-600 font-bold">
                    View Details <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </NavLink>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
