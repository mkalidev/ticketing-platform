'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAppKit } from '@reown/appkit/react';
import { Button, Card, Input, Badge } from '@/components/ui';
import {
  ArrowLeftIcon,
  CalendarIcon,
  MapPinIcon,
  TicketIcon,
  CreditCardIcon,
  CheckIcon,
  ClockIcon,
} from '@/components/icons';
import { getEventById } from '@/data/mock-events';
import { TicketType } from '@/types';
import { formatCurrency, formatDate, formatTime, cn } from '@/lib/utils';

// ==========================================
// Checkout Page
// ==========================================

function CheckoutContent() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('event');
  const ticketsParam = searchParams.get('tickets');
  
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const { open } = useAppKit();
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    confirmEmail: '',
    firstName: '',
    lastName: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    billingZip: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const event = eventId ? getEventById(eventId) : null;

  let selectedTickets: Record<string, number> = {};
  if (ticketsParam) {
    try {
      selectedTickets = JSON.parse(decodeURIComponent(ticketsParam));
    } catch {
      selectedTickets = {};
    }
  }

  type CheckoutItem = { ticketType: TicketType; quantity: number; subtotal: number };

  // Calculate totals
  const items: CheckoutItem[] = event
    ? Object.entries(selectedTickets)
        .map(([ticketId, quantity]) => {
          const ticketType = event.ticketTypes.find((t) => t.id === ticketId);
          if (!ticketType || quantity === 0) return null;
          return {
            ticketType,
            quantity,
            subtotal: ticketType.price * quantity,
          };
        })
        .filter((item): item is CheckoutItem => item !== null)
    : [];

  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const serviceFee = subtotal * 0.025 + items.reduce((sum, item) => sum + item.quantity, 0) * 0.99;
  const tax = (subtotal + serviceFee) * 0.08;
  const total = subtotal + serviceFee + tax;
  const totalTickets = items.reduce((sum, item) => sum + item.quantity, 0);

  // Timer for cart expiration
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes

  useEffect(() => {
    if (orderComplete) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [orderComplete]);

  const formatTimeLeft = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    if (!formData.confirmEmail) newErrors.confirmEmail = 'Please confirm your email';
    else if (formData.email !== formData.confirmEmail) newErrors.confirmEmail = 'Emails do not match';
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
    else if (formData.cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = 'Invalid card number';
    
    if (!formData.expiry) newErrors.expiry = 'Expiry date is required';
    if (!formData.cvc) newErrors.cvc = 'CVC is required';
    if (!formData.billingZip) newErrors.billingZip = 'Billing ZIP is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setOrderComplete(true);
  };

  if (!event || items.length === 0) {
    return (
      <div className="min-h-screen py-20">
        <div className="container-narrow text-center">
          <h1 className="text-h2 text-[var(--text-primary)] mb-4">No items in cart</h1>
          <p className="text-[var(--text-secondary)] mb-8">
            Please select tickets from an event to checkout.
          </p>
          <Link href="/events">
            <Button variant="primary">Browse Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen py-20">
        <div className="container-narrow text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--accent-success)]/20 flex items-center justify-center animate-fade-in">
            <CheckIcon size={40} className="text-[var(--accent-success)]" />
          </div>
          <h1 className="text-h1 text-[var(--text-primary)] mb-4 animate-fade-in-up">
            Order Confirmed!
          </h1>
          <p className="text-body-lg text-[var(--text-secondary)] mb-2 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Your tickets have been sent to <span className="text-[var(--text-primary)]">{formData.email}</span>
          </p>
          <p className="text-sm text-[var(--text-muted)] mb-8 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            Order #TXL-{Date.now().toString(36).toUpperCase()}
          </p>
          
          <Card className="text-left mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={event.heroImage.url}
                  alt={event.name}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-1">{event.name}</h3>
                <p className="text-sm text-[var(--text-secondary)] flex items-center gap-1.5 mb-1">
                  <CalendarIcon size={14} />
                  {formatDate(event.startDate)} at {formatTime(event.startDate)}
                </p>
                <p className="text-sm text-[var(--text-secondary)] flex items-center gap-1.5">
                  <MapPinIcon size={14} />
                  {event.venue.name}
                </p>
              </div>
            </div>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <Link href="/my-tickets">
              <Button variant="primary" size="lg" leftIcon={<TicketIcon size={18} />}>
                View My Tickets
              </Button>
            </Link>
            <Link href="/events">
              <Button variant="secondary" size="lg">
                Browse More Events
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container-wide">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href={`/events/${event.slug}`}>
            <Button variant="ghost" size="sm" leftIcon={<ArrowLeftIcon size={16} />}>
              Back to event
            </Button>
          </Link>
          
          {/* Timer */}
          <div className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-full',
            timeLeft <= 60 ? 'bg-[var(--accent-error)]/10 text-[var(--accent-error)]' : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
          )}>
            <ClockIcon size={16} />
            <span className="text-sm font-medium">
              {timeLeft > 0 ? `Tickets held for ${formatTimeLeft(timeLeft)}` : 'Time expired'}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="flex items-center gap-4 mb-8">
              <StepIndicator number={1} label="Contact Info" isActive={step === 1} isComplete={step > 1} />
              <div className="flex-1 h-px bg-[var(--border-subtle)]" />
              <StepIndicator number={2} label="Payment" isActive={step === 2} isComplete={orderComplete} />
            </div>

            {/* Step 1: Contact Info */}
            {step === 1 && (
              <Card className="animate-fade-in">
                <h2 className="text-h3 text-[var(--text-primary)] mb-6">Contact Information</h2>
                
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      error={errors.firstName}
                    />
                    <Input
                      label="Last Name"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      error={errors.lastName}
                    />
                  </div>
                  
                  <Input
                    label="Email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={errors.email}
                    hint="Tickets will be sent to this email"
                  />
                  
                  <Input
                    label="Confirm Email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.confirmEmail}
                    onChange={(e) => handleInputChange('confirmEmail', e.target.value)}
                    error={errors.confirmEmail}
                  />
                  
                  <Input
                    label="Phone (optional)"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    hint="For important event updates only"
                  />
                </div>

                <div className="mt-8">
                  <Button variant="primary" size="lg" fullWidth onClick={handleContinue}>
                    Continue to Payment
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <Card className="animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-h3 text-[var(--text-primary)]">Payment Details</h2>
                  <button
                    onClick={() => setStep(1)}
                    className="text-sm text-[var(--accent-primary)] hover:underline"
                  >
                    Edit contact info
                  </button>
                </div>

                {/* Contact Summary */}
                <div className="p-4 rounded-xl bg-[var(--bg-tertiary)] mb-6">
                  <p className="text-sm text-[var(--text-secondary)]">
                    Tickets for <span className="text-[var(--text-primary)]">{formData.firstName} {formData.lastName}</span>
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">{formData.email}</p>
                </div>

                {/* Connect Wallet */}
                <div className="mb-6 space-y-2">
                  <Button
                    variant="secondary"
                    size="lg"
                    fullWidth
                    type="button"
                    onClick={() => open()}
                  >
                    Connect Wallet
                  </Button>
                  <p className="text-xs text-center text-[var(--text-muted)]">
                    Connect your wallet to complete this purchase using Web3.
                  </p>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Card Number"
                    placeholder="4242 4242 4242 4242"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    error={errors.cardNumber}
                    leftIcon={<CreditCardIcon size={18} />}
                  />
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <Input
                        label="Expiry"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={(e) => handleInputChange('expiry', e.target.value)}
                        error={errors.expiry}
                      />
                    </div>
                    <div className="col-span-1">
                      <Input
                        label="CVC"
                        placeholder="123"
                        value={formData.cvc}
                        onChange={(e) => handleInputChange('cvc', e.target.value)}
                        error={errors.cvc}
                      />
                    </div>
                    <div className="col-span-1">
                      <Input
                        label="Billing ZIP"
                        placeholder="12345"
                        value={formData.billingZip}
                        onChange={(e) => handleInputChange('billingZip', e.target.value)}
                        error={errors.billingZip}
                      />
                    </div>
                  </div>
                </div>

                {/* Security Note */}
                <div className="flex items-center gap-2 mt-6 p-4 rounded-xl bg-[var(--bg-tertiary)]">
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-[var(--accent-success)]">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Your payment info is encrypted and secure. We never store your card details.
                  </p>
                </div>

                <div className="mt-8 space-y-4">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    fullWidth 
                    onClick={handleSubmit}
                    isLoading={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Pay ${formatCurrency(total, 'USD')}`}
                  </Button>
                  <p className="text-xs text-center text-[var(--text-muted)]">
                    By completing this purchase you agree to our Terms of Service and Refund Policy
                  </p>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <h3 className="text-h3 text-[var(--text-primary)] mb-4">Order Summary</h3>
                
                {/* Event Info */}
                <div className="flex gap-4 pb-4 border-b border-[var(--border-subtle)]">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={event.heroImage.url}
                      alt={event.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-[var(--text-primary)] text-sm line-clamp-2">{event.name}</h4>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      {formatDate(event.startDate, { weekday: 'short', month: 'short', day: 'numeric' })}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">{event.venue.name}</p>
                  </div>
                </div>

                {/* Tickets */}
                <div className="py-4 border-b border-[var(--border-subtle)] space-y-3">
                  {items.map((item) => (
                    <div key={item.ticketType.id} className="flex justify-between text-sm">
                      <span className="text-[var(--text-secondary)]">
                        {item.quantity}x {item.ticketType.name}
                      </span>
                      <span className="text-[var(--text-primary)]">
                        {formatCurrency(item.subtotal, 'USD')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="py-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--text-secondary)]">Subtotal</span>
                    <span className="text-[var(--text-primary)]">{formatCurrency(subtotal, 'USD')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--text-secondary)]">Service Fee</span>
                    <span className="text-[var(--text-primary)]">{formatCurrency(serviceFee, 'USD')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--text-secondary)]">Tax</span>
                    <span className="text-[var(--text-primary)]">{formatCurrency(tax, 'USD')}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-[var(--border-subtle)] flex justify-between items-center">
                  <span className="font-semibold text-[var(--text-primary)]">Total</span>
                  <span className="text-xl font-bold text-[var(--text-primary)]">
                    {formatCurrency(total, 'USD')}
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Step Indicator Component
// ==========================================

interface StepIndicatorProps {
  number: number;
  label: string;
  isActive: boolean;
  isComplete: boolean;
}

function StepIndicator({ number, label, isActive, isComplete }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
          isComplete
            ? 'bg-[var(--accent-success)] text-white'
            : isActive
            ? 'bg-[var(--accent-primary)] text-white'
            : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
        )}
      >
        {isComplete ? <CheckIcon size={16} /> : number}
      </div>
      <span
        className={cn(
          'text-sm font-medium',
          isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'
        )}
      >
        {label}
      </span>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent-primary)]"></div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}

