'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Card, Badge, Input } from '@/components/ui';
import {
  CalendarIcon,
  ChartIcon,
  TicketIcon,
  UsersIcon,
  SettingsIcon,
  PlusIcon,
  SearchIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  BuildingIcon,
} from '@/components/icons';
import { mockEvents, getEventSummary, mockOrganizers } from '@/data/mock-events';
import { formatCurrency, formatDate, getAvailabilityStatus, formatCompactNumber, cn } from '@/lib/utils';

// ==========================================
// Dashboard Page
// ==========================================

type Tab = 'overview' | 'events' | 'analytics' | 'settings';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const organizer = mockOrganizers[0];
  const events = mockEvents.filter(e => e.organizer.id === organizer.id).map(getEventSummary);

  // Mock stats
  const stats = {
    totalRevenue: 245780,
    ticketsSold: 8420,
    upcomingEvents: 3,
    totalAttendees: 12450,
    revenueChange: 12.5,
    ticketsChange: 8.3,
  };

  const recentSales = [
    { id: 1, event: 'Neon Horizon Festival 2025', tickets: 2, amount: 598, time: '2 minutes ago' },
    { id: 2, event: 'Neon Horizon Festival 2025', tickets: 4, amount: 1196, time: '5 minutes ago' },
    { id: 3, event: 'Midnight Pulse: Afterhours', tickets: 1, amount: 45, time: '12 minutes ago' },
    { id: 4, event: 'Spring Jazz Festival 2025', tickets: 3, amount: 597, time: '18 minutes ago' },
  ];

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
        <div className="container-full py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
                {organizer.logoUrl ? (
                  <Image
                    src={organizer.logoUrl}
                    alt={organizer.name}
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BuildingIcon size={24} className="text-[var(--text-muted)]" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-h3 text-[var(--text-primary)]">{organizer.name}</h1>
                <p className="text-sm text-[var(--text-secondary)]">Organizer Dashboard</p>
              </div>
            </div>
            <Link href="/create-event">
              <Button variant="primary" leftIcon={<PlusIcon size={18} />}>
                Create Event
              </Button>
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-6 -mb-px">
            {[
              { id: 'overview', label: 'Overview', icon: ChartIcon },
              { id: 'events', label: 'Events', icon: CalendarIcon },
              { id: 'analytics', label: 'Analytics', icon: ChartIcon },
              { id: 'settings', label: 'Settings', icon: SettingsIcon },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t-lg transition-colors',
                    activeTab === tab.id
                      ? 'bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-subtle)] border-b-[var(--bg-primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  )}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-full py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={<ChartIcon size={20} />}
                label="Total Revenue"
                value={formatCurrency(stats.totalRevenue)}
                change={`+${stats.revenueChange}%`}
                changeType="positive"
              />
              <StatCard
                icon={<TicketIcon size={20} />}
                label="Tickets Sold"
                value={formatCompactNumber(stats.ticketsSold)}
                change={`+${stats.ticketsChange}%`}
                changeType="positive"
              />
              <StatCard
                icon={<CalendarIcon size={20} />}
                label="Upcoming Events"
                value={stats.upcomingEvents.toString()}
              />
              <StatCard
                icon={<UsersIcon size={20} />}
                label="Total Attendees"
                value={formatCompactNumber(stats.totalAttendees)}
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Sales */}
              <div className="lg:col-span-2">
                <Card>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-h3 text-[var(--text-primary)]">Recent Sales</h2>
                    <Link href="/dashboard/sales">
                      <Button variant="ghost" size="sm" rightIcon={<ArrowRightIcon size={14} />}>
                        View all
                      </Button>
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {recentSales.map((sale) => (
                      <div
                        key={sale.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-tertiary)]"
                      >
                        <div>
                          <p className="font-medium text-[var(--text-primary)]">{sale.event}</p>
                          <p className="text-sm text-[var(--text-secondary)]">
                            {sale.tickets} ticket{sale.tickets > 1 ? 's' : ''} • {sale.time}
                          </p>
                        </div>
                        <span className="text-lg font-bold text-[var(--accent-success)]">
                          +{formatCurrency(sale.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Quick Actions */}
              <div>
                <Card>
                  <h2 className="text-h3 text-[var(--text-primary)] mb-6">Quick Actions</h2>
                  <div className="space-y-3">
                    <QuickAction
                      icon={<PlusIcon size={18} />}
                      label="Create New Event"
                      href="/create-event"
                    />
                    <QuickAction
                      icon={<TicketIcon size={18} />}
                      label="Manage Tickets"
                      href="/dashboard/tickets"
                    />
                    <QuickAction
                      icon={<ChartIcon size={18} />}
                      label="View Analytics"
                      onClick={() => setActiveTab('analytics')}
                    />
                    <QuickAction
                      icon={<UsersIcon size={18} />}
                      label="Attendee List"
                      href="/dashboard/attendees"
                    />
                  </div>
                </Card>
              </div>
            </div>

            {/* Upcoming Events */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-h3 text-[var(--text-primary)]">Your Events</h2>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab('events')}>
                  View all
                </Button>
              </div>

              <div className="space-y-4">
                {events.slice(0, 3).map((event) => {
                  const availability = getAvailabilityStatus(event.ticketsSold, event.totalCapacity);
                  const percentSold = Math.round((event.ticketsSold / event.totalCapacity) * 100);
                  
                  return (
                    <Link
                      key={event.id}
                      href={`/dashboard/events/${event.id}`}
                      className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-elevated)] transition-colors group"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={event.heroImage.url}
                          alt={event.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-[var(--text-primary)] truncate group-hover:text-[var(--accent-primary)] transition-colors">
                            {event.name}
                          </h3>
                          <Badge variant={event.status === 'on_sale' ? 'success' : 'secondary'} size="sm">
                            {event.status === 'on_sale' ? 'On Sale' : event.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] mb-2">
                          {formatDate(event.startDate)} • {event.venue.city}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 max-w-[200px]">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-[var(--text-muted)]">{event.ticketsSold} / {event.totalCapacity}</span>
                              <span className={availability.color}>{percentSold}%</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-[var(--bg-secondary)]">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]"
                                style={{ width: `${percentSold}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <ChevronRightIcon size={20} className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-h2 text-[var(--text-primary)]">All Events</h2>
              <div className="flex items-center gap-3">
                <Input
                  placeholder="Search events..."
                  leftIcon={<SearchIcon size={16} />}
                  className="w-64"
                />
                <Link href="/create-event">
                  <Button variant="primary" leftIcon={<PlusIcon size={16} />}>
                    Create Event
                  </Button>
                </Link>
              </div>
            </div>

            <Card padding="none">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)]">
                    <th className="text-left p-4 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Event</th>
                    <th className="text-left p-4 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Date</th>
                    <th className="text-left p-4 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Status</th>
                    <th className="text-left p-4 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Tickets</th>
                    <th className="text-left p-4 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Revenue</th>
                    <th className="text-right p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => {
                    const revenue = event.ticketsSold * event.priceRange.min;
                    return (
                      <tr 
                        key={event.id} 
                        className={cn(
                          'hover:bg-[var(--bg-tertiary)] transition-colors',
                          index !== events.length - 1 && 'border-b border-[var(--border-subtle)]'
                        )}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={event.heroImage.url}
                                alt={event.name}
                                width={40}
                                height={40}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <span className="font-medium text-[var(--text-primary)]">{event.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-[var(--text-secondary)]">
                          {formatDate(event.startDate, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="p-4">
                          <Badge variant={event.status === 'on_sale' ? 'success' : 'secondary'} size="sm">
                            {event.status === 'on_sale' ? 'On Sale' : event.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm text-[var(--text-primary)]">
                          {event.ticketsSold} / {event.totalCapacity}
                        </td>
                        <td className="p-4 text-sm font-medium text-[var(--text-primary)]">
                          {formatCurrency(revenue)}
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm">
                            Manage
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="animate-fade-in text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
              <ChartIcon size={24} className="text-[var(--text-muted)]" />
            </div>
            <h3 className="text-h3 text-[var(--text-primary)] mb-2">Analytics Coming Soon</h3>
            <p className="text-[var(--text-secondary)]">
              Detailed analytics and insights will be available here.
            </p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="animate-fade-in max-w-2xl">
            <Card>
              <h2 className="text-h3 text-[var(--text-primary)] mb-6">Organization Settings</h2>
              <div className="space-y-6">
                <Input
                  label="Organization Name"
                  defaultValue={organizer.name}
                />
                <Input
                  label="Contact Email"
                  type="email"
                  defaultValue={organizer.contactEmail}
                />
                <Input
                  label="Website"
                  type="url"
                  defaultValue={organizer.websiteUrl}
                />
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    Description
                  </label>
                  <textarea
                    defaultValue={organizer.description}
                    rows={4}
                    className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)]"
                  />
                </div>
                <Button variant="primary">Save Changes</Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// Stat Card Component
// ==========================================

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative';
}

function StatCard({ icon, label, value, change, changeType }: StatCardProps) {
  return (
    <Card className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--accent-primary)]">
          {icon}
        </div>
        {change && (
          <span className={cn(
            'text-xs font-medium px-2 py-1 rounded-full',
            changeType === 'positive' 
              ? 'bg-[var(--accent-success)]/10 text-[var(--accent-success)]' 
              : 'bg-[var(--accent-error)]/10 text-[var(--accent-error)]'
          )}>
            {change}
          </span>
        )}
      </div>
      <p className="text-sm text-[var(--text-secondary)] mb-1">{label}</p>
      <p className="text-2xl font-bold text-[var(--text-primary)]">{value}</p>
    </Card>
  );
}

// ==========================================
// Quick Action Component
// ==========================================

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

function QuickAction({ icon, label, href, onClick }: QuickActionProps) {
  const content = (
    <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-elevated)] transition-colors group cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="text-[var(--accent-primary)]">{icon}</div>
        <span className="text-sm font-medium text-[var(--text-primary)]">{label}</span>
      </div>
      <ChevronRightIcon size={16} className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return <button onClick={onClick} className="w-full text-left">{content}</button>;
}

