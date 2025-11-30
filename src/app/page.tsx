'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Badge } from '@/components/ui';
import { EventCard } from '@/components/events';
import { 
  SearchIcon, 
  CalendarIcon, 
  MapPinIcon, 
  ArrowRightIcon,
  SparklesIcon,
  TicketIcon,
  ChartIcon,
  UsersIcon,
  ChevronRightIcon 
} from '@/components/icons';
import { mockEvents, getEventSummary, getFeaturedEvents } from '@/data/mock-events';
import { EventCategory } from '@/types';
import { getCategoryDisplayName, getCategoryEmoji } from '@/lib/utils';
import { cn } from '@/lib/utils';

// ==========================================
// Homepage
// ==========================================

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();
  const allEvents = mockEvents.map(getEventSummary);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Events */}
      <section className="py-20">
        <div className="container-full">
          <div className="flex items-end justify-between mb-10">
            <div>
              <Badge variant="primary" className="mb-4" leftIcon={<SparklesIcon size={12} />}>
                Featured
              </Badge>
              <h2 className="text-h1 text-[var(--text-primary)]">
                Don't miss these events
              </h2>
            </div>
            <Link href="/events?featured=true">
              <Button variant="ghost" rightIcon={<ArrowRightIcon size={16} />}>
                View all
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.slice(0, 3).map((event, index) => (
              <div
                key={event.id}
                className="animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <EventCard event={event} variant="featured" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <CategoriesSection />

      {/* All Events */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="container-full">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-h1 text-[var(--text-primary)]">
                Upcoming events
              </h2>
              <p className="text-body-lg text-[var(--text-secondary)] mt-2">
                Find your next unforgettable experience
              </p>
            </div>
            <Link href="/events">
              <Button variant="secondary" rightIcon={<ArrowRightIcon size={16} />}>
                Browse all events
              </Button>
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allEvents.slice(0, 8).map((event, index) => (
              <div
                key={event.id}
                className="animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* For Organizers CTA */}
      <OrganizersCTASection />

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
}

// ==========================================
// Hero Section
// ==========================================

function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]" />
        <div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{ background: 'var(--gradient-primary)' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]"
          style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}
        />
      </div>

      {/* Content */}
      <div className="relative container-full py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-success)] animate-pulse" />
            <span className="text-sm text-[var(--text-secondary)]">
              Over <span className="text-[var(--text-primary)] font-semibold">10,000+</span> events happening this month
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-display mb-6 animate-fade-in-up opacity-0 stagger-1" style={{ animationFillMode: 'forwards' }}>
            Discover experiences
            <br />
            <span className="gradient-text">worth remembering</span>
          </h1>

          {/* Subheadline */}
          <p className="text-body-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 animate-fade-in-up opacity-0 stagger-2" style={{ animationFillMode: 'forwards' }}>
            Find and book tickets to concerts, festivals, conferences, and more. 
            Your next unforgettable moment starts here.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto animate-fade-in-up opacity-0 stagger-3" style={{ animationFillMode: 'forwards' }}>
            <div className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
              <div className="flex-1 relative">
                <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="text"
                  placeholder="Search events, artists, venues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] transition-colors">
                  <MapPinIcon size={18} />
                  <span className="hidden sm:inline">Location</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] transition-colors">
                  <CalendarIcon size={18} />
                  <span className="hidden sm:inline">Date</span>
                </button>
                <Button variant="primary" size="lg">
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8 animate-fade-in-up opacity-0 stagger-4" style={{ animationFillMode: 'forwards' }}>
            <span className="text-sm text-[var(--text-muted)]">Popular:</span>
            {['Concerts', 'Festivals', 'Sports', 'Comedy'].map((tag) => (
              <Link
                key={tag}
                href={`/events?category=${tag.toLowerCase()}`}
                className="px-3 py-1.5 rounded-full text-sm text-[var(--text-secondary)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Floating Event Cards Preview */}
        <div className="absolute left-10 top-1/3 hidden xl:block animate-float" style={{ animationDelay: '0s' }}>
          <div className="w-48 rounded-2xl overflow-hidden shadow-2xl rotate-[-8deg] opacity-60 hover:opacity-100 transition-opacity">
            <Image
              src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop"
              alt="Concert"
              width={192}
              height={144}
              className="object-cover"
            />
          </div>
        </div>
        <div className="absolute right-10 top-1/2 hidden xl:block animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-52 rounded-2xl overflow-hidden shadow-2xl rotate-[6deg] opacity-60 hover:opacity-100 transition-opacity">
            <Image
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop"
              alt="Conference"
              width={208}
              height={156}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)]">
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-[var(--border-default)] p-1">
          <div className="w-1.5 h-2 rounded-full bg-[var(--accent-primary)] mx-auto animate-bounce" />
        </div>
      </div>
    </section>
  );
}

// ==========================================
// Categories Section
// ==========================================

function CategoriesSection() {
  const categories = [
    { id: EventCategory.CONCERT, emoji: '🎵', gradient: 'from-pink-500 to-rose-500' },
    { id: EventCategory.FESTIVAL, emoji: '🎪', gradient: 'from-orange-500 to-amber-500' },
    { id: EventCategory.SPORTS, emoji: '⚽', gradient: 'from-green-500 to-emerald-500' },
    { id: EventCategory.CONFERENCE, emoji: '💼', gradient: 'from-blue-500 to-cyan-500' },
    { id: EventCategory.COMEDY, emoji: '😂', gradient: 'from-purple-500 to-violet-500' },
    { id: EventCategory.THEATER, emoji: '🎭', gradient: 'from-red-500 to-pink-500' },
  ];

  return (
    <section className="py-20">
      <div className="container-full">
        <div className="text-center mb-12">
          <h2 className="text-h1 text-[var(--text-primary)] mb-4">
            Explore by category
          </h2>
          <p className="text-body-lg text-[var(--text-secondary)]">
            Find events that match your interests
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/events?category=${category.id}`}
              className={cn(
                'group relative p-6 rounded-2xl overflow-hidden',
                'bg-[var(--bg-secondary)] border border-[var(--border-subtle)]',
                'transition-all duration-300 hover:border-[var(--border-strong)] hover:-translate-y-1 hover:shadow-xl',
                'animate-fade-in-up opacity-0'
              )}
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
            >
              {/* Gradient Background on Hover */}
              <div className={cn(
                'absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300',
                `bg-gradient-to-br ${category.gradient}`
              )} />
              
              <div className="relative text-center">
                <span className="text-4xl mb-3 block">{category.emoji}</span>
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  {getCategoryDisplayName(category.id)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// Stats Section
// ==========================================

function StatsSection() {
  const stats = [
    { label: 'Events Hosted', value: '50K+', icon: CalendarIcon },
    { label: 'Tickets Sold', value: '2.5M+', icon: TicketIcon },
    { label: 'Active Organizers', value: '10K+', icon: UsersIcon },
    { label: 'Customer Satisfaction', value: '98%', icon: ChartIcon },
  ];

  return (
    <section className="py-20">
      <div className="container-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={cn(
                  'p-8 rounded-2xl text-center',
                  'bg-[var(--bg-secondary)] border border-[var(--border-subtle)]',
                  'animate-fade-in-up opacity-0'
                )}
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--bg-elevated)] mb-4">
                  <Icon size={24} className="text-[var(--accent-primary)]" />
                </div>
                <p className="text-3xl font-bold text-[var(--text-primary)] mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// Organizers CTA Section
// ==========================================

function OrganizersCTASection() {
  return (
    <section className="py-20 bg-[var(--bg-secondary)]">
      <div className="container-full">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#ff6b4a]/10 via-[#ff4757]/5 to-transparent border border-[var(--border-subtle)]">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-[var(--accent-primary)] blur-[100px]" />
            <div className="absolute bottom-10 right-40 w-32 h-32 rounded-full bg-[var(--accent-secondary)] blur-[80px]" />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-12 p-12 lg:p-16">
            {/* Content */}
            <div>
              <Badge variant="primary" className="mb-6">For Organizers</Badge>
              <h2 className="text-h1 text-[var(--text-primary)] mb-6">
                Create and sell tickets in minutes
              </h2>
              <p className="text-body-lg text-[var(--text-secondary)] mb-8">
                Join thousands of event organizers who trust Tixly to power their events. 
                From small workshops to large festivals, we've got you covered.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'Easy event creation with customizable ticket types',
                  'Real-time analytics and sales tracking',
                  'Secure payments with fast payouts',
                  'Built-in marketing tools to boost sales',
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--accent-primary)] flex items-center justify-center mt-0.5">
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3}>
                        <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-[var(--text-secondary)]">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <Link href="/create-event">
                  <Button variant="primary" size="lg" rightIcon={<ArrowRightIcon size={18} />}>
                    Start selling tickets
                  </Button>
                </Link>
                <Link href="/for-organizers">
                  <Button variant="secondary" size="lg">
                    Learn more
                  </Button>
                </Link>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="relative hidden lg:block">
              <div className="absolute top-0 right-0 w-72 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-6 shadow-xl rotate-3 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary)]/20 flex items-center justify-center">
                    <ChartIcon size={20} className="text-[var(--accent-primary)]" />
                  </div>
                  <span className="font-semibold text-[var(--text-primary)]">Analytics</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--text-secondary)]">Tickets sold</span>
                    <span className="text-[var(--text-primary)] font-medium">1,234</span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--bg-tertiary)]">
                    <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-64 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-6 shadow-xl -rotate-3 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent-success)]/20 flex items-center justify-center">
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth={2}>
                      <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-sm text-[var(--text-primary)]">Payment received</span>
                </div>
                <p className="text-2xl font-bold text-[var(--accent-success)]">+$2,450.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// Newsletter Section
// ==========================================

function NewsletterSection() {
  return (
    <section className="py-20">
      <div className="container-narrow text-center">
        <h2 className="text-h2 text-[var(--text-primary)] mb-4">
          Never miss an event
        </h2>
        <p className="text-body text-[var(--text-secondary)] mb-8">
          Subscribe to get personalized event recommendations and exclusive offers.
        </p>

        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)]"
          />
          <Button variant="primary">
            Subscribe
          </Button>
        </form>

        <p className="text-caption text-[var(--text-muted)] mt-4">
          By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
