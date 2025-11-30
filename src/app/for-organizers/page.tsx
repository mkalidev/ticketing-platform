'use client';

import Link from 'next/link';
import { Button, Card, Badge } from '@/components/ui';
import {
  TicketIcon,
  ChartIcon,
  UsersIcon,
  CreditCardIcon,
  CheckIcon,
  ArrowRightIcon,
  SparklesIcon,
} from '@/components/icons';

// ==========================================
// For Organizers Page
// ==========================================

export default function ForOrganizersPage() {
  const features = [
    {
      icon: TicketIcon,
      title: 'Easy Ticket Management',
      description: 'Create multiple ticket types, set prices, and manage inventory with our intuitive dashboard.',
    },
    {
      icon: ChartIcon,
      title: 'Real-time Analytics',
      description: 'Track sales, revenue, and attendee data with comprehensive analytics and reporting.',
    },
    {
      icon: UsersIcon,
      title: 'Attendee Management',
      description: 'Manage your guest list, send updates, and check-in attendees seamlessly.',
    },
    {
      icon: CreditCardIcon,
      title: 'Fast Payouts',
      description: 'Get paid quickly with our streamlined payment processing and fast payout schedule.',
    },
  ];

  const pricing = [
    {
      name: 'Starter',
      description: 'For small events and venues',
      price: '2.5%',
      priceNote: '+ $0.99 per ticket',
      features: [
        'Up to 500 attendees',
        'Basic analytics',
        'Email support',
        'Standard payouts (7 days)',
      ],
      cta: 'Get Started',
      featured: false,
    },
    {
      name: 'Professional',
      description: 'For growing event organizers',
      price: '2%',
      priceNote: '+ $0.79 per ticket',
      features: [
        'Unlimited attendees',
        'Advanced analytics',
        'Priority support',
        'Fast payouts (3 days)',
        'Custom branding',
        'Promo codes',
      ],
      cta: 'Start Free Trial',
      featured: true,
    },
    {
      name: 'Enterprise',
      description: 'For large venues and festivals',
      price: 'Custom',
      priceNote: 'Volume-based pricing',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Same-day payouts',
        'API access',
        'White-label solution',
        'SLA guarantee',
      ],
      cta: 'Contact Sales',
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
            style={{ background: 'var(--gradient-primary)' }}
          />
        </div>

        <div className="relative container-wide">
          <div className="max-w-3xl">
            <Badge variant="primary" className="mb-6" leftIcon={<SparklesIcon size={12} />}>
              For Organizers
            </Badge>
            <h1 className="text-display mb-6 animate-fade-in-up">
              Sell tickets
              <br />
              <span className="gradient-text">your way</span>
            </h1>
            <p className="text-body-lg text-[var(--text-secondary)] mb-8 max-w-2xl animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Everything you need to create, promote, and manage successful events. 
              From intimate workshops to massive festivals, Tixly scales with you.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <Link href="/create-event">
                <Button variant="primary" size="lg" rightIcon={<ArrowRightIcon size={18} />}>
                  Create Your First Event
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="secondary" size="lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-h1 text-[var(--text-primary)] mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Powerful tools designed to help you create amazing events and grow your audience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="animate-fade-in-up opacity-0"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)]/10 flex items-center justify-center mb-4">
                    <Icon size={24} className="text-[var(--accent-primary)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container-wide">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { value: '$100M+', label: 'Tickets Sold' },
              { value: '50K+', label: 'Events Hosted' },
              { value: '99.9%', label: 'Platform Uptime' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <p className="text-5xl font-bold gradient-text mb-2">{stat.value}</p>
                <p className="text-[var(--text-secondary)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-h1 text-[var(--text-primary)] mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              No hidden fees. Pay only when you sell. Start for free and upgrade as you grow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricing.map((plan, index) => (
              <Card
                key={plan.name}
                className={`animate-fade-in-up opacity-0 ${
                  plan.featured 
                    ? 'ring-2 ring-[var(--accent-primary)] relative' 
                    : ''
                }`}
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="primary">Most Popular</Badge>
                  </div>
                )}
                <div className="text-center pb-6 border-b border-[var(--border-subtle)]">
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">
                    {plan.description}
                  </p>
                  <p className="text-4xl font-bold text-[var(--text-primary)]">
                    {plan.price}
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    {plan.priceNote}
                  </p>
                </div>
                <ul className="py-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <CheckIcon size={16} className="flex-shrink-0 mt-0.5 text-[var(--accent-success)]" />
                      <span className="text-[var(--text-secondary)]">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.featured ? 'primary' : 'secondary'}
                  fullWidth
                >
                  {plan.cta}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-narrow text-center">
          <h2 className="text-h1 text-[var(--text-primary)] mb-4">
            Ready to get started?
          </h2>
          <p className="text-body-lg text-[var(--text-secondary)] mb-8">
            Create your first event in minutes. No credit card required.
          </p>
          <Link href="/create-event">
            <Button variant="primary" size="lg" rightIcon={<ArrowRightIcon size={18} />}>
              Create Your Event
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

