import React, { useState } from 'react';
import { CalendarRange, MapPin, Ticket, QrCode, CheckCircle2, Users, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import type { EventItem } from '../../types';

export const EventsPage: React.FC = () => {
  const { events, registerEvent } = useApp();
  const [selectedTicket, setSelectedTicket] = useState<EventItem | null>(null);

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <CalendarRange className="w-7 h-7 text-purple-500" /> Campus Events & Digital QR Tickets
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Hackathons, design workshops, cultural fests, and guest speaker keynotes.
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((evt) => (
          <Card key={evt.id} padding="none" className="overflow-hidden flex flex-col justify-between">
            <div>
              {/* Event Image Banner */}
              <div className="relative h-44 w-full overflow-hidden">
                <img src={evt.banner} alt={evt.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <Badge variant="primary" className="absolute top-3 left-3">
                  {evt.category}
                </Badge>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] uppercase font-bold text-accent-300 block">{evt.organizer}</span>
                  <h3 className="font-bold text-sm line-clamp-1">{evt.title}</h3>
                </div>
              </div>

              {/* Event Info */}
              <div className="p-5 space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {evt.description}
                </p>

                <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <CalendarRange className="w-3.5 h-3.5 text-primary-500" />
                    <span>{evt.date} • {evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{evt.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-amber-500" />
                    <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{evt.seatsRemaining} Seats Left</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Action */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
              {evt.isRegistered ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedTicket(evt)}
                  leftIcon={<QrCode className="w-4 h-4 text-emerald-500" />}
                >
                  View Entry Pass QR
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={() => registerEvent(evt.id)}
                  leftIcon={<Ticket className="w-4 h-4" />}
                >
                  Register Free
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Entry Pass QR Modal */}
      {selectedTicket && (
        <Modal
          isOpen={!!selectedTicket}
          onClose={() => setSelectedTicket(null)}
          title={`Entry Ticket Pass: ${selectedTicket.title}`}
        >
          <div className="text-center space-y-4 py-2">
            <div className="p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-ch-lg inline-block shadow-inner">
              {/* QR Box */}
              <div className="w-48 h-48 bg-slate-900 text-white rounded-lg flex items-center justify-center mx-auto p-4 flex-col gap-2">
                <QrCode className="w-24 h-24 text-accent-400" />
                <span className="text-[10px] font-mono tracking-widest text-slate-300">
                  {selectedTicket.ticketQrCode}
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{selectedTicket.title}</h4>
              <p className="text-xs text-slate-500 mt-1">{selectedTicket.venue} • {selectedTicket.date}</p>
            </div>

            <Button size="sm" onClick={() => setSelectedTicket(null)}>
              Done
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
