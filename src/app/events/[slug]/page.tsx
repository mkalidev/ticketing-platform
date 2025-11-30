'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button, Badge, Card } from '@/components/ui';
import { 
  CalendarIcon, 
  MapPinIcon, 
  ClockIcon,
  ShareIcon,
  HeartIcon,
  HeartFilledIcon,
  ChevronRightIcon,
  TicketIcon,
  UserIcon,
  PlusIcon,
  MinusIcon,
  ArrowLeftIcon,
  CheckIcon
} from '@/components/icons';
import { getEventBySlug } from '@/data/mock-events';
import { TicketType, AgeRestriction } from '@/types';
import { 
  formatCurrency, 
  formatDate, 
  formatTime, 
  getCategoryDisplayName,
  getAvailabilityStatus,
  cn 
} from '@/lib/utils';

// ==========================================
// Event Detail Page
// ==========================================

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function EventDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const [isLiked, setIsLiked] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});

  const totalTickets = Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0);
  const totalPrice = Object.entries(selectedTickets).reduce((sum, [ticketId, qty]) => {
    const ticket = event.ticketTypes.find(t => t.id === ticketId);
    return sum + (ticket?.price || 0) * qty;
  }, 0);

  const handleQuantityChange = (ticketId: string, delta: number) => {
    const ticket = event.ticketTypes.find(t => t.id === ticketId);
    if (!ticket) return;

    const current = selectedTickets[ticketId] || 0;
    const newQty = Math.max(0, Math.min(current + delta, ticket.maxPerOrder, ticket.quantityTotal - ticket.quantitySold));
    
    setSelectedTickets(prev => ({
      ...prev,
      [ticketId]: newQty
    }));
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px] max-h-[600px]">
        <Image
          src={event.heroImage.url}
          alt={event.heroImage.alt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/50 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <Link href="/events">
            <Button variant="secondary" size="sm" leftIcon={<ArrowLeftIcon size={16} />}>
              Back to events
            </Button>
          </Link>
        </div>

        {/* Actions */}
        <div className="absolute top-6 right-6 z-10 flex items-center gap-2">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="p-3 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors"
          >
            {isLiked ? <HeartFilledIcon size={20} className="text-red-500" /> : <HeartIcon size={20} />}
          </button>
          <button className="p-3 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors">
            <ShareIcon size={20} />
          </button>
        </div>
      </div>

      <div className="container-wide -mt-32 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Header */}
            <div className="animate-fade-in-up">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="primary">{getCategoryDisplayName(event.category)}</Badge>
                {event.ageRestriction !== AgeRestriction.ALL_AGES && (
                  <Badge variant="secondary">{event.ageRestriction}</Badge>
                )}
                {event.isFeatured && (
                  <Badge variant="warning">Featured</Badge>
                )}
              </div>
              
              <h1 className="text-h1 text-[var(--text-primary)] mb-4">
                {event.name}
              </h1>
              
              <p className="text-body-lg text-[var(--text-secondary)]">
                {event.shortDescription}
              </p>
            </div>

            {/* Quick Info Cards */}
            <div className="grid sm:grid-cols-3 gap-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <InfoCard 
                icon={<CalendarIcon size={20} />}
                label="Date"
                value={formatDate(event.startDate, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
              />
              <InfoCard 
                icon={<ClockIcon size={20} />}
                label="Time"
                value={`${formatTime(event.startDate)}${event.doorsOpenTime ? ` (Doors: ${formatTime(event.doorsOpenTime)})` : ''}`}
              />
              <InfoCard 
                icon={<MapPinIcon size={20} />}
                label="Venue"
                value={`${event.venue.name}, ${event.venue.address?.city}`}
              />
            </div>

            {/* Description */}
            <Card className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <h2 className="text-h3 text-[var(--text-primary)] mb-4">About this event</h2>
              <div 
                className="prose prose-invert max-w-none text-[var(--text-secondary)]"
                dangerouslySetInnerHTML={{ __html: event.fullDescription.replace(/\n/g, '<br />') }}
              />
            </Card>

            {/* Venue Info */}
            <Card className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <h2 className="text-h3 text-[var(--text-primary)] mb-4">Venue</h2>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--bg-tertiary)] flex items-center justify-center flex-shrink-0">
                  <MapPinIcon size={24} className="text-[var(--accent-primary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-1">{event.venue.name}</h3>
                  {event.venue.address && (
                    <p className="text-sm text-[var(--text-secondary)] mb-3">
                      {event.venue.address.street}<br />
                      {event.venue.address.city}, {event.venue.address.state} {event.venue.address.zip}
                    </p>
                  )}
                  {event.venue.amenities && event.venue.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {event.venue.amenities.map((amenity) => (
                        <Badge key={amenity} variant="outline" size="sm">{amenity}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {event.venue.coordinates && (
                <div className="mt-4 h-48 rounded-xl bg-[var(--bg-tertiary)] overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)]">
                    <span>Map view</span>
                  </div>
                </div>
              )}
            </Card>

            {/* Organizer */}
            <Card className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <h2 className="text-h3 text-[var(--text-primary)] mb-4">Organizer</h2>
              <Link href={`/organizers/${event.organizer.slug}`} className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-full bg-[var(--bg-tertiary)] overflow-hidden flex-shrink-0">
                  {event.organizer.logoUrl ? (
                    <Image
                      src={event.organizer.logoUrl}
                      alt={event.organizer.name}
                      width={56}
                      height={56}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <UserIcon size={24} className="text-[var(--text-muted)]" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                      {event.organizer.name}
                    </h3>
                    {event.organizer.verified && (
                      <div className="w-5 h-5 rounded-full bg-[var(--accent-secondary)] flex items-center justify-center">
                        <CheckIcon size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {event.organizer.totalEvents} events • {event.organizer.totalTicketsSold.toLocaleString()} tickets sold
                  </p>
                </div>
                <ChevronRightIcon size={20} className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
              </Link>
            </Card>

            {/* FAQ */}
            {event.faq && event.faq.length > 0 && (
              <Card className="animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                <h2 className="text-h3 text-[var(--text-primary)] mb-4">FAQs</h2>
                <div className="space-y-4">
                  {event.faq.map((item, index) => (
                    <div key={index} className="pb-4 border-b border-[var(--border-subtle)] last:border-0 last:pb-0">
                      <h3 className="font-medium text-[var(--text-primary)] mb-2">{item.question}</h3>
                      <p className="text-sm text-[var(--text-secondary)]">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Refund Policy */}
            {event.refundPolicy && (
              <Card className="animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                <h2 className="text-h3 text-[var(--text-primary)] mb-4">Refund Policy</h2>
                <p className="text-sm text-[var(--text-secondary)]">{event.refundPolicy}</p>
              </Card>
            )}
          </div>

          {/* Ticket Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <Card padding="lg">
                <h2 className="text-h3 text-[var(--text-primary)] mb-6">Select Tickets</h2>
                
                <div className="space-y-4 mb-6">
                  {event.ticketTypes.map((ticket) => (
                    <TicketTypeCard
                      key={ticket.id}
                      ticket={ticket}
                      quantity={selectedTickets[ticket.id] || 0}
                      onQuantityChange={(delta) => handleQuantityChange(ticket.id, delta)}
                    />
                  ))}
                </div>

                {/* Summary */}
                {totalTickets > 0 && (
                  <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--text-secondary)]">Subtotal ({totalTickets} tickets)</span>
                      <span className="text-[var(--text-primary)] font-medium">
                        {formatCurrency(totalPrice, event.priceRange.currency)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--text-secondary)]">Fees</span>
                      <span className="text-[var(--text-secondary)]">Calculated at checkout</span>
                    </div>
                  </div>
                )}

                <Link href={totalTickets > 0 ? `/checkout?event=${event.id}&tickets=${encodeURIComponent(JSON.stringify(selectedTickets))}` : '#'}>
                  <Button 
                    variant="primary" 
                    size="lg" 
                    fullWidth 
                    disabled={totalTickets === 0}
                    rightIcon={<TicketIcon size={18} />}
                  >
                    {totalTickets > 0 
                      ? `Get ${totalTickets} Ticket${totalTickets > 1 ? 's' : ''} - ${formatCurrency(totalPrice, event.priceRange.currency)}`
                      : 'Select tickets'
                    }
                  </Button>
                </Link>
              </Card>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-6 py-4 text-[var(--text-muted)]">
                <div className="flex items-center gap-2 text-xs">
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Secure checkout
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  Verified event
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] lg:hidden z-50">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-[var(--text-secondary)]">
              {totalTickets > 0 ? `${totalTickets} ticket${totalTickets > 1 ? 's' : ''}` : 'From'}
            </p>
            <p className="text-xl font-bold text-[var(--text-primary)]">
              {totalTickets > 0 
                ? formatCurrency(totalPrice, event.priceRange.currency)
                : formatCurrency(event.priceRange.min, event.priceRange.currency)
              }
            </p>
          </div>
          <Link href={totalTickets > 0 ? `/checkout?event=${event.id}` : '#'}>
            <Button 
              variant="primary" 
              size="lg" 
              disabled={totalTickets === 0}
            >
              {totalTickets > 0 ? 'Checkout' : 'Select tickets'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Info Card Component
// ==========================================

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoCard({ icon, label, value }: InfoCardProps) {
  return (
    <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
      <div className="flex items-center gap-3 mb-2 text-[var(--accent-primary)]">
        {icon}
        <span className="text-xs uppercase tracking-wider text-[var(--text-muted)]">{label}</span>
      </div>
      <p className="text-sm font-medium text-[var(--text-primary)]">{value}</p>
    </div>
  );
}

// ==========================================
// Ticket Type Card Component
// ==========================================

interface TicketTypeCardProps {
  ticket: TicketType;
  quantity: number;
  onQuantityChange: (delta: number) => void;
}

function TicketTypeCard({ ticket, quantity, onQuantityChange }: TicketTypeCardProps) {
  const available = ticket.quantityTotal - ticket.quantitySold - ticket.quantityHeld;
  const isSoldOut = available <= 0;
  const isLowStock = available > 0 && available <= 10;
  const availability = getAvailabilityStatus(ticket.quantitySold, ticket.quantityTotal);

  return (
    <div 
      className={cn(
        'p-4 rounded-xl border transition-all',
        quantity > 0 
          ? 'bg-[rgba(255,107,74,0.05)] border-[var(--accent-primary)]' 
          : 'bg-[var(--bg-tertiary)] border-[var(--border-subtle)]',
        isSoldOut && 'opacity-60'
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-[var(--text-primary)]">{ticket.name}</h3>
            {ticket.featured && <Badge variant="primary" size="sm">Popular</Badge>}
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-1">{ticket.description}</p>
        </div>
        <p className="text-lg font-bold text-[var(--text-primary)] ml-4">
          {formatCurrency(ticket.price, ticket.currency)}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className={cn('text-xs font-medium', availability.color)}>
          {isSoldOut ? 'Sold out' : isLowStock ? `Only ${available} left!` : availability.text}
        </span>
        
        {!isSoldOut && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => onQuantityChange(-1)}
              disabled={quantity === 0}
              className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                quantity === 0 
                  ? 'bg-[var(--bg-elevated)] text-[var(--text-disabled)] cursor-not-allowed'
                  : 'bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
              )}
            >
              <MinusIcon size={16} />
            </button>
            <span className="w-8 text-center font-medium text-[var(--text-primary)]">
              {quantity}
            </span>
            <button
              onClick={() => onQuantityChange(1)}
              disabled={quantity >= ticket.maxPerOrder || quantity >= available}
              className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                quantity >= ticket.maxPerOrder || quantity >= available
                  ? 'bg-[var(--bg-elevated)] text-[var(--text-disabled)] cursor-not-allowed'
                  : 'bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary-hover)]'
              )}
            >
              <PlusIcon size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

