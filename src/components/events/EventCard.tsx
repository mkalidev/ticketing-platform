'use client';

import Link from 'next/link';
import Image from 'next/image';
import { EventSummary } from '@/types';
import { Badge } from '@/components/ui';
import { CalendarIcon, MapPinIcon, HeartIcon, FireIcon } from '@/components/icons';
import { formatCurrency, formatDate, getAvailabilityStatus, getCategoryDisplayName } from '@/lib/utils';
import { cn } from '@/lib/utils';

// ==========================================
// Event Card Component
// ==========================================

interface EventCardProps {
  event: EventSummary;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

export function EventCard({ event, variant = 'default', className }: EventCardProps) {
  const availability = getAvailabilityStatus(event.ticketsSold, event.totalCapacity);
  const isSoldOut = event.ticketsSold >= event.totalCapacity;
  const isSellingFast = event.ticketsSold / event.totalCapacity > 0.75 && !isSoldOut;

  if (variant === 'featured') {
    return (
      <Link href={`/events/${event.slug}`} className={cn('block group', className)}>
        <article className="relative overflow-hidden rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] transition-all duration-300 hover:border-[var(--border-strong)] hover:-translate-y-1 hover:shadow-2xl">
          {/* Image */}
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={event.heroImage.url}
              alt={event.heroImage.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              {event.isFeatured && (
                <Badge variant="primary" leftIcon={<SparklesIconSmall />}>
                  Featured
                </Badge>
              )}
              <Badge variant="secondary">
                {getCategoryDisplayName(event.category)}
              </Badge>
            </div>

            {/* Like Button */}
            <button 
              className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/60 transition-all"
              onClick={(e) => {
                e.preventDefault();
                // Toggle like
              }}
            >
              <HeartIcon size={18} />
            </button>

            {/* Bottom Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                {event.name}
              </h3>
              <p className="text-white/70 text-sm line-clamp-2 mb-3">
                {event.shortDescription}
              </p>
              <div className="flex items-center gap-4 text-sm text-white/80">
                <span className="flex items-center gap-1.5">
                  <CalendarIcon size={14} />
                  {formatDate(event.startDate, { month: 'short', day: 'numeric' })}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPinIcon size={14} />
                  {event.venue.city}, {event.venue.state}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--text-muted)]">Starting from</p>
              <p className="text-xl font-bold text-[var(--text-primary)]">
                {formatCurrency(event.priceRange.min, event.priceRange.currency)}
              </p>
            </div>
            <div className="text-right">
              {isSellingFast && (
                <div className="flex items-center gap-1.5 text-[var(--accent-warning)] mb-1">
                  <FireIcon size={14} />
                  <span className="text-xs font-medium">Selling fast</span>
                </div>
              )}
              <span className={cn('text-sm font-medium', availability.color)}>
                {availability.text}
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={`/events/${event.slug}`} className={cn('block group', className)}>
        <article className="flex gap-4 p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] transition-all duration-200 hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated)]">
          {/* Image */}
          <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-xl">
            <Image
              src={event.heroImage.url}
              alt={event.heroImage.alt}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-[var(--text-primary)] truncate group-hover:text-[var(--accent-primary)] transition-colors">
                {event.name}
              </h3>
              <span className="text-sm font-bold text-[var(--text-primary)] flex-shrink-0">
                {formatCurrency(event.priceRange.min)}
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] flex items-center gap-1.5 mb-2">
              <CalendarIcon size={12} />
              {formatDate(event.startDate, { weekday: 'short', month: 'short', day: 'numeric' })}
            </p>
            <p className="text-sm text-[var(--text-muted)] flex items-center gap-1.5">
              <MapPinIcon size={12} />
              {event.venue.name}
            </p>
          </div>
        </article>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={`/events/${event.slug}`} className={cn('block group', className)}>
      <article className="overflow-hidden rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] transition-all duration-300 hover:border-[var(--border-strong)] hover:-translate-y-1 hover:shadow-xl">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={event.heroImage.url}
            alt={event.heroImage.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" size="sm">
              {getCategoryDisplayName(event.category)}
            </Badge>
          </div>

          {/* Status indicators */}
          {(isSoldOut || isSellingFast) && (
            <div className="absolute top-3 right-3">
              {isSoldOut ? (
                <Badge variant="error" size="sm">Sold Out</Badge>
              ) : (
                <Badge variant="warning" size="sm" leftIcon={<FireIcon size={10} />}>
                  Selling fast
                </Badge>
              )}
            </div>
          )}

          {/* Date overlay */}
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
            <p className="text-xs font-bold text-[var(--accent-primary)] uppercase">
              {formatDate(event.startDate, { month: 'short' })}
            </p>
            <p className="text-lg font-bold text-gray-900 leading-none">
              {formatDate(event.startDate, { day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-[var(--text-primary)] mb-2 line-clamp-2 group-hover:text-[var(--accent-primary)] transition-colors">
            {event.name}
          </h3>
          
          <p className="text-sm text-[var(--text-secondary)] flex items-center gap-1.5 mb-3">
            <MapPinIcon size={14} className="flex-shrink-0" />
            <span className="truncate">{event.venue.name} • {event.venue.city}</span>
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)]">
            <div>
              <p className="text-xs text-[var(--text-muted)]">From</p>
              <p className="text-lg font-bold text-[var(--text-primary)]">
                {formatCurrency(event.priceRange.min, event.priceRange.currency)}
              </p>
            </div>
            <span className={cn('text-xs font-medium', availability.color)}>
              {availability.text}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ==========================================
// Event Card Skeleton
// ==========================================

export function EventCardSkeleton({ variant = 'default' }: { variant?: 'default' | 'featured' | 'compact' }) {
  if (variant === 'featured') {
    return (
      <div className="rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] overflow-hidden">
        <div className="aspect-[16/9] skeleton" />
        <div className="p-6 flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-3 w-16 skeleton rounded" />
            <div className="h-6 w-24 skeleton rounded" />
          </div>
          <div className="h-4 w-20 skeleton rounded" />
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex gap-4 p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
        <div className="w-24 h-24 skeleton rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 skeleton rounded" />
          <div className="h-3 w-1/2 skeleton rounded" />
          <div className="h-3 w-2/3 skeleton rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] overflow-hidden">
      <div className="aspect-[4/3] skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 skeleton rounded" />
        <div className="h-4 w-1/2 skeleton rounded" />
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)]">
          <div className="h-6 w-20 skeleton rounded" />
          <div className="h-4 w-16 skeleton rounded" />
        </div>
      </div>
    </div>
  );
}

// Small sparkles icon for badge
function SparklesIconSmall() {
  return (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

