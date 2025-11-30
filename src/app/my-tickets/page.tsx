'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Card, Badge } from '@/components/ui';
import {
  TicketIcon,
  CalendarIcon,
  MapPinIcon,
  QrCodeIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from '@/components/icons';
import { mockEvents } from '@/data/mock-events';
import { formatDate, formatTime, cn } from '@/lib/utils';

// ==========================================
// My Tickets Page
// ==========================================

type Tab = 'upcoming' | 'past';

// Mock purchased tickets
const mockTickets = [
  {
    id: 'tkt-1',
    orderId: 'TXL-ABC123',
    event: mockEvents[0],
    ticketType: mockEvents[0].ticketTypes[0],
    quantity: 2,
    purchasedAt: '2025-01-15T10:30:00Z',
    status: 'valid' as const,
    qrCode: 'TXL-ABC123-001',
  },
  {
    id: 'tkt-2',
    orderId: 'TXL-DEF456',
    event: mockEvents[1],
    ticketType: mockEvents[1].ticketTypes[1],
    quantity: 1,
    purchasedAt: '2025-01-10T14:00:00Z',
    status: 'valid' as const,
    qrCode: 'TXL-DEF456-001',
  },
  {
    id: 'tkt-3',
    orderId: 'TXL-GHI789',
    event: mockEvents[2],
    ticketType: mockEvents[2].ticketTypes[1],
    quantity: 3,
    purchasedAt: '2024-12-20T09:15:00Z',
    status: 'used' as const,
    qrCode: 'TXL-GHI789-001',
  },
];

export default function MyTicketsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('upcoming');
  const [selectedTicket, setSelectedTicket] = useState<typeof mockTickets[0] | null>(null);

  const now = new Date();
  const upcomingTickets = mockTickets.filter(
    (ticket) => new Date(ticket.event.startDate) > now && ticket.status === 'valid'
  );
  const pastTickets = mockTickets.filter(
    (ticket) => new Date(ticket.event.startDate) <= now || ticket.status === 'used'
  );

  const tickets = activeTab === 'upcoming' ? upcomingTickets : pastTickets;

  return (
    <div className="min-h-screen py-8">
      <div className="container-wide">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-h1 text-[var(--text-primary)] mb-2">My Tickets</h1>
            <p className="text-body-lg text-[var(--text-secondary)]">
              View and manage your event tickets
            </p>
          </div>
          <Link href="/events">
            <Button variant="primary" rightIcon={<ArrowRightIcon size={16} />}>
              Find Events
            </Button>
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 mb-8 rounded-xl bg-[var(--bg-secondary)] w-fit">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={cn(
              'px-6 py-2.5 rounded-lg text-sm font-medium transition-all',
              activeTab === 'upcoming'
                ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            )}
          >
            Upcoming ({upcomingTickets.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={cn(
              'px-6 py-2.5 rounded-lg text-sm font-medium transition-all',
              activeTab === 'past'
                ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            )}
          >
            Past ({pastTickets.length})
          </button>
        </div>

        {/* Tickets List */}
        {tickets.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket, index) => (
              <div
                key={ticket.id}
                className="animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
              >
                <TicketCard
                  ticket={ticket}
                  onClick={() => setSelectedTicket(ticket)}
                  isPast={activeTab === 'past'}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
              <TicketIcon size={24} className="text-[var(--text-muted)]" />
            </div>
            <h3 className="text-h3 text-[var(--text-primary)] mb-2">
              No {activeTab} tickets
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              {activeTab === 'upcoming'
                ? "You don't have any upcoming events. Browse events to find something exciting!"
                : "You haven't attended any events yet."}
            </p>
            <Link href="/events">
              <Button variant="primary">Browse Events</Button>
            </Link>
          </div>
        )}

        {/* Ticket Detail Modal */}
        {selectedTicket && (
          <TicketModal
            ticket={selectedTicket}
            onClose={() => setSelectedTicket(null)}
          />
        )}
      </div>
    </div>
  );
}

// ==========================================
// Ticket Card Component
// ==========================================

interface TicketCardProps {
  ticket: typeof mockTickets[0];
  onClick: () => void;
  isPast: boolean;
}

function TicketCard({ ticket, onClick, isPast }: TicketCardProps) {
  return (
    <Card
      interactive
      onClick={onClick}
      className={cn(isPast && 'opacity-75')}
      padding="none"
    >
      {/* Event Image */}
      <div className="relative h-32">
        <Image
          src={ticket.event.heroImage.url}
          alt={ticket.event.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="font-semibold text-white truncate">{ticket.event.name}</h3>
        </div>
        <div className="absolute top-3 right-3">
          <Badge
            variant={ticket.status === 'valid' && !isPast ? 'success' : 'secondary'}
            size="sm"
          >
            {isPast ? 'Past' : ticket.quantity > 1 ? `${ticket.quantity} Tickets` : '1 Ticket'}
          </Badge>
        </div>
      </div>

      {/* Ticket Info */}
      <div className="p-4">
        <div className="space-y-2 mb-4">
          <p className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
            <CalendarIcon size={14} className="text-[var(--accent-primary)]" />
            {formatDate(ticket.event.startDate)} at {formatTime(ticket.event.startDate)}
          </p>
          <p className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
            <MapPinIcon size={14} className="text-[var(--accent-primary)]" />
            {ticket.event.venue.name}
          </p>
          <p className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
            <TicketIcon size={14} className="text-[var(--accent-primary)]" />
            {ticket.ticketType.name}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
          <span className="text-xs text-[var(--text-muted)]">Order #{ticket.orderId}</span>
          <ChevronRightIcon size={16} className="text-[var(--text-muted)]" />
        </div>
      </div>
    </Card>
  );
}

// ==========================================
// Ticket Modal Component
// ==========================================

interface TicketModalProps {
  ticket: typeof mockTickets[0];
  onClose: () => void;
}

function TicketModal({ ticket, onClose }: TicketModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md animate-fade-in-up">
        <Card padding="none" className="overflow-hidden">
          {/* Header Image */}
          <div className="relative h-40">
            <Image
              src={ticket.event.heroImage.url}
              alt={ticket.event.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 -mt-8 relative">
            <h2 className="text-h3 text-[var(--text-primary)] mb-4">{ticket.event.name}</h2>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <CalendarIcon size={16} className="text-[var(--accent-primary)]" />
                <span className="text-[var(--text-primary)]">
                  {formatDate(ticket.event.startDate, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-[var(--accent-primary)]">
                  <path d="M12 6v6h4.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                <span className="text-[var(--text-primary)]">
                  {formatTime(ticket.event.startDate)}
                  {ticket.event.doorsOpenTime && (
                    <span className="text-[var(--text-secondary)]">
                      {' '}(Doors: {formatTime(ticket.event.doorsOpenTime)})
                    </span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPinIcon size={16} className="text-[var(--accent-primary)]" />
                <span className="text-[var(--text-primary)]">
                  {ticket.event.venue.name}
                </span>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="p-4 rounded-xl bg-[var(--bg-tertiary)] mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[var(--text-secondary)]">Ticket Type</span>
                <span className="text-sm font-medium text-[var(--text-primary)]">{ticket.ticketType.name}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[var(--text-secondary)]">Quantity</span>
                <span className="text-sm font-medium text-[var(--text-primary)]">{ticket.quantity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--text-secondary)]">Order ID</span>
                <span className="text-sm font-mono text-[var(--text-primary)]">{ticket.orderId}</span>
              </div>
            </div>

            {/* QR Code Placeholder */}
            <div className="text-center mb-6">
              <div className="inline-flex flex-col items-center p-6 rounded-2xl bg-white">
                <div className="w-40 h-40 bg-[#f0f0f0] rounded-xl flex items-center justify-center mb-3">
                  <QrCodeIcon size={80} className="text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 font-mono">{ticket.qrCode}</p>
              </div>
            </div>

            <p className="text-xs text-center text-[var(--text-muted)] mb-6">
              Present this QR code at the venue entrance
            </p>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="secondary" fullWidth>
                Add to Wallet
              </Button>
              <Button variant="primary" fullWidth>
                Download PDF
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

