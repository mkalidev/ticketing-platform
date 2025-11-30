'use client';

import { useState, useMemo } from 'react';
import { Button, Badge, Input } from '@/components/ui';
import { EventCard } from '@/components/events';
import { 
  SearchIcon, 
  CalendarIcon, 
  MapPinIcon,
  ChevronDownIcon,
  CloseIcon
} from '@/components/icons';
import { mockEvents, getEventSummary } from '@/data/mock-events';
import { EventCategory } from '@/types';
import { getCategoryDisplayName, getCategoryEmoji, cn } from '@/lib/utils';

// ==========================================
// Events Listing Page
// ==========================================

type SortOption = 'date_asc' | 'date_desc' | 'price_asc' | 'price_desc' | 'popularity';

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('date_asc');
  const [showFilters, setShowFilters] = useState(false);

  const allEvents = useMemo(() => mockEvents.map(getEventSummary), []);

  const filteredEvents = useMemo(() => {
    let events = [...allEvents];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      events = events.filter(
        (event) =>
          event.name.toLowerCase().includes(query) ||
          event.shortDescription.toLowerCase().includes(query) ||
          event.venue.name.toLowerCase().includes(query) ||
          event.venue.city.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      events = events.filter((event) => selectedCategories.includes(event.category));
    }

    // Sort
    switch (sortBy) {
      case 'date_asc':
        events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        break;
      case 'date_desc':
        events.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
        break;
      case 'price_asc':
        events.sort((a, b) => a.priceRange.min - b.priceRange.min);
        break;
      case 'price_desc':
        events.sort((a, b) => b.priceRange.min - a.priceRange.min);
        break;
      case 'popularity':
        events.sort((a, b) => b.ticketsSold - a.ticketsSold);
        break;
    }

    return events;
  }, [allEvents, searchQuery, selectedCategories, sortBy]);

  const toggleCategory = (category: EventCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSortBy('date_asc');
  };

  const hasActiveFilters = searchQuery || selectedCategories.length > 0;

  const categories = Object.values(EventCategory);

  return (
    <div className="min-h-screen py-8">
      <div className="container-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-h1 text-[var(--text-primary)] mb-2">Browse Events</h1>
          <p className="text-body-lg text-[var(--text-secondary)]">
            Discover {filteredEvents.length} upcoming events
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1">
            <Input
              placeholder="Search events, venues, cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<SearchIcon size={18} />}
              rightIcon={
                searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="hover:text-[var(--text-primary)]">
                    <CloseIcon size={16} />
                  </button>
                )
              }
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
              leftIcon={<CalendarIcon size={16} />}
              rightIcon={<ChevronDownIcon size={14} className={cn('transition-transform', showFilters && 'rotate-180')} />}
            >
              Filters {selectedCategories.length > 0 && `(${selectedCategories.length})`}
            </Button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-primary)]"
            >
              <option value="date_asc">Date: Soonest</option>
              <option value="date_desc">Date: Latest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="mb-8 p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[var(--text-primary)]">Categories</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-[var(--accent-primary)] hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                    selectedCategories.includes(category)
                      ? 'bg-[var(--accent-primary)] text-white'
                      : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]'
                  )}
                >
                  <span className="mr-2">{getCategoryEmoji(category)}</span>
                  {getCategoryDisplayName(category)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active Filters Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-[var(--text-muted)]">Active filters:</span>
            {searchQuery && (
              <Badge
                variant="secondary"
                rightIcon={
                  <button onClick={() => setSearchQuery('')}>
                    <CloseIcon size={12} />
                  </button>
                }
              >
                "{searchQuery}"
              </Badge>
            )}
            {selectedCategories.map((category) => (
              <Badge
                key={category}
                variant="primary"
                rightIcon={
                  <button onClick={() => toggleCategory(category)}>
                    <CloseIcon size={12} />
                  </button>
                }
              >
                {getCategoryDisplayName(category)}
              </Badge>
            ))}
          </div>
        )}

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className="animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
              <SearchIcon size={24} className="text-[var(--text-muted)]" />
            </div>
            <h3 className="text-h3 text-[var(--text-primary)] mb-2">No events found</h3>
            <p className="text-[var(--text-secondary)] mb-6">
              Try adjusting your filters or search terms
            </p>
            <Button variant="secondary" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

