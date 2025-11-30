'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Card, Input, Badge } from '@/components/ui';
import {
  ArrowLeftIcon,
  CalendarIcon,
  MapPinIcon,
  TicketIcon,
  PlusIcon,
  CloseIcon,
  CheckIcon,
} from '@/components/icons';
import { EventCategory, SeatingType, AgeRestriction } from '@/types';
import { getCategoryDisplayName, cn } from '@/lib/utils';

// ==========================================
// Create Event Page
// ==========================================

type Step = 'basics' | 'details' | 'tickets' | 'review';

export default function CreateEventPage() {
  const [currentStep, setCurrentStep] = useState<Step>('basics');
  const [formData, setFormData] = useState({
    // Basics
    name: '',
    category: '' as EventCategory | '',
    shortDescription: '',
    
    // Date & Location
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    venueName: '',
    venueAddress: '',
    venueCity: '',
    venueState: '',
    venueZip: '',
    
    // Tickets
    tickets: [
      { id: '1', name: 'General Admission', price: '', quantity: '', description: '' },
    ],
    
    // Settings
    ageRestriction: AgeRestriction.ALL_AGES,
    seatingType: SeatingType.GENERAL_ADMISSION,
  });

  const steps: { id: Step; label: string; icon: React.ReactNode }[] = [
    { id: 'basics', label: 'Basics', icon: <CalendarIcon size={18} /> },
    { id: 'details', label: 'Details', icon: <MapPinIcon size={18} /> },
    { id: 'tickets', label: 'Tickets', icon: <TicketIcon size={18} /> },
    { id: 'review', label: 'Review', icon: <CheckIcon size={18} /> },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTicketChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      tickets: prev.tickets.map((ticket, i) => 
        i === index ? { ...ticket, [field]: value } : ticket
      ),
    }));
  };

  const addTicketType = () => {
    setFormData(prev => ({
      ...prev,
      tickets: [
        ...prev.tickets,
        { id: Date.now().toString(), name: '', price: '', quantity: '', description: '' },
      ],
    }));
  };

  const removeTicketType = (index: number) => {
    if (formData.tickets.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      tickets: prev.tickets.filter((_, i) => i !== index),
    }));
  };

  const goToNextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id);
    }
  };

  const goToPrevStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id);
    }
  };

  const categories = Object.values(EventCategory);

  return (
    <div className="min-h-screen py-8">
      <div className="container-default">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" leftIcon={<ArrowLeftIcon size={16} />}>
              Dashboard
            </Button>
          </Link>
          <div className="h-6 w-px bg-[var(--border-subtle)]" />
          <h1 className="text-h2 text-[var(--text-primary)]">Create Event</h1>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Steps */}
          <div className="lg:col-span-1">
            <nav className="sticky top-24 space-y-1">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all',
                    currentStep === step.id
                      ? 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]'
                      : index < currentStepIndex
                      ? 'text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
                      : 'text-[var(--text-muted)] hover:bg-[var(--bg-tertiary)]'
                  )}
                >
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                    currentStep === step.id
                      ? 'bg-[var(--accent-primary)] text-white'
                      : index < currentStepIndex
                      ? 'bg-[var(--accent-success)] text-white'
                      : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
                  )}>
                    {index < currentStepIndex ? <CheckIcon size={14} /> : index + 1}
                  </div>
                  <span className="font-medium">{step.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Basics Step */}
            {currentStep === 'basics' && (
              <Card className="animate-fade-in">
                <h2 className="text-h3 text-[var(--text-primary)] mb-6">Event Basics</h2>
                
                <div className="space-y-6">
                  <Input
                    label="Event Name"
                    placeholder="e.g., Summer Music Festival 2025"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
                      Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleInputChange('category', category)}
                          className={cn(
                            'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                            formData.category === category
                              ? 'bg-[var(--accent-primary)] text-white'
                              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'
                          )}
                        >
                          {getCategoryDisplayName(category)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Short Description
                    </label>
                    <textarea
                      placeholder="A brief description that will appear in event listings..."
                      value={formData.shortDescription}
                      onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)]"
                      maxLength={500}
                    />
                    <p className="mt-1.5 text-xs text-[var(--text-muted)]">
                      {formData.shortDescription.length}/500 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
                      Event Image
                    </label>
                    <div className="border-2 border-dashed border-[var(--border-default)] rounded-2xl p-8 text-center hover:border-[var(--accent-primary)] transition-colors cursor-pointer">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center">
                        <PlusIcon size={24} className="text-[var(--text-muted)]" />
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">
                        PNG, JPG up to 5MB. Recommended: 1920x1080
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button variant="primary" onClick={goToNextStep}>
                    Continue
                  </Button>
                </div>
              </Card>
            )}

            {/* Details Step */}
            {currentStep === 'details' && (
              <Card className="animate-fade-in">
                <h2 className="text-h3 text-[var(--text-primary)] mb-6">Date & Location</h2>
                
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Start Date"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                    />
                    <Input
                      label="Start Time"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => handleInputChange('startTime', e.target.value)}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="End Date"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                    />
                    <Input
                      label="End Time"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                    />
                  </div>

                  <div className="pt-6 border-t border-[var(--border-subtle)]">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Venue</h3>
                    
                    <div className="space-y-4">
                      <Input
                        label="Venue Name"
                        placeholder="e.g., Madison Square Garden"
                        value={formData.venueName}
                        onChange={(e) => handleInputChange('venueName', e.target.value)}
                      />
                      <Input
                        label="Street Address"
                        placeholder="123 Main Street"
                        value={formData.venueAddress}
                        onChange={(e) => handleInputChange('venueAddress', e.target.value)}
                      />
                      <div className="grid sm:grid-cols-3 gap-4">
                        <Input
                          label="City"
                          placeholder="New York"
                          value={formData.venueCity}
                          onChange={(e) => handleInputChange('venueCity', e.target.value)}
                        />
                        <Input
                          label="State"
                          placeholder="NY"
                          value={formData.venueState}
                          onChange={(e) => handleInputChange('venueState', e.target.value)}
                        />
                        <Input
                          label="ZIP Code"
                          placeholder="10001"
                          value={formData.venueZip}
                          onChange={(e) => handleInputChange('venueZip', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
                      Age Restriction
                    </label>
                    <div className="flex gap-2">
                      {Object.values(AgeRestriction).map((age) => (
                        <button
                          key={age}
                          onClick={() => setFormData(prev => ({ ...prev, ageRestriction: age }))}
                          className={cn(
                            'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                            formData.ageRestriction === age
                              ? 'bg-[var(--accent-primary)] text-white'
                              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'
                          )}
                        >
                          {age === 'all_ages' ? 'All Ages' : age}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <Button variant="secondary" onClick={goToPrevStep}>
                    Back
                  </Button>
                  <Button variant="primary" onClick={goToNextStep}>
                    Continue
                  </Button>
                </div>
              </Card>
            )}

            {/* Tickets Step */}
            {currentStep === 'tickets' && (
              <Card className="animate-fade-in">
                <h2 className="text-h3 text-[var(--text-primary)] mb-6">Ticket Types</h2>
                
                <div className="space-y-4">
                  {formData.tickets.map((ticket, index) => (
                    <div
                      key={ticket.id}
                      className="p-6 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)]"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-[var(--text-primary)]">
                          Ticket Type {index + 1}
                        </h4>
                        {formData.tickets.length > 1 && (
                          <button
                            onClick={() => removeTicketType(index)}
                            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent-error)] hover:bg-[var(--bg-elevated)] transition-colors"
                          >
                            <CloseIcon size={16} />
                          </button>
                        )}
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input
                          label="Name"
                          placeholder="e.g., General Admission, VIP"
                          value={ticket.name}
                          onChange={(e) => handleTicketChange(index, 'name', e.target.value)}
                        />
                        <Input
                          label="Price"
                          type="number"
                          placeholder="0.00"
                          leftIcon={<span className="text-[var(--text-muted)]">$</span>}
                          value={ticket.price}
                          onChange={(e) => handleTicketChange(index, 'price', e.target.value)}
                        />
                        <Input
                          label="Quantity"
                          type="number"
                          placeholder="100"
                          value={ticket.quantity}
                          onChange={(e) => handleTicketChange(index, 'quantity', e.target.value)}
                        />
                        <Input
                          label="Description"
                          placeholder="What's included..."
                          value={ticket.description}
                          onChange={(e) => handleTicketChange(index, 'description', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={addTicketType}
                  className="mt-4 w-full p-4 rounded-xl border-2 border-dashed border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors flex items-center justify-center gap-2"
                >
                  <PlusIcon size={18} />
                  Add Another Ticket Type
                </button>

                <div className="mt-8 flex justify-between">
                  <Button variant="secondary" onClick={goToPrevStep}>
                    Back
                  </Button>
                  <Button variant="primary" onClick={goToNextStep}>
                    Continue
                  </Button>
                </div>
              </Card>
            )}

            {/* Review Step */}
            {currentStep === 'review' && (
              <div className="space-y-6 animate-fade-in">
                <Card>
                  <h2 className="text-h3 text-[var(--text-primary)] mb-6">Review Your Event</h2>
                  
                  <div className="space-y-6">
                    {/* Basics */}
                    <div className="flex justify-between items-start pb-6 border-b border-[var(--border-subtle)]">
                      <div>
                        <h3 className="text-sm font-medium text-[var(--text-muted)] mb-2">Event Basics</h3>
                        <p className="text-lg font-semibold text-[var(--text-primary)]">{formData.name || 'Untitled Event'}</p>
                        {formData.category && <Badge variant="primary" className="mt-2">{getCategoryDisplayName(formData.category)}</Badge>}
                        {formData.shortDescription && (
                          <p className="mt-2 text-sm text-[var(--text-secondary)]">{formData.shortDescription}</p>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep('basics')}>
                        Edit
                      </Button>
                    </div>

                    {/* Date & Location */}
                    <div className="flex justify-between items-start pb-6 border-b border-[var(--border-subtle)]">
                      <div>
                        <h3 className="text-sm font-medium text-[var(--text-muted)] mb-2">Date & Location</h3>
                        <div className="space-y-1">
                          <p className="text-[var(--text-primary)]">
                            {formData.startDate || 'No date set'} {formData.startTime && `at ${formData.startTime}`}
                          </p>
                          <p className="text-[var(--text-secondary)]">
                            {formData.venueName || 'No venue set'}
                            {formData.venueCity && `, ${formData.venueCity}`}
                            {formData.venueState && `, ${formData.venueState}`}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep('details')}>
                        Edit
                      </Button>
                    </div>

                    {/* Tickets */}
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-[var(--text-muted)] mb-3">Tickets</h3>
                        <div className="space-y-2">
                          {formData.tickets.map((ticket, index) => (
                            <div key={ticket.id} className="flex justify-between p-3 rounded-lg bg-[var(--bg-tertiary)]">
                              <span className="text-[var(--text-primary)]">{ticket.name || `Ticket ${index + 1}`}</span>
                              <span className="text-[var(--text-secondary)]">
                                ${ticket.price || '0'} × {ticket.quantity || '0'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep('tickets')} className="ml-4">
                        Edit
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="bg-gradient-to-r from-[var(--accent-primary)]/10 to-transparent border-[var(--accent-primary)]/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center">
                      <CheckIcon size={24} className="text-[var(--accent-primary)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)]">Ready to publish?</h3>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Your event will be reviewed and go live within 24 hours.
                      </p>
                    </div>
                  </div>
                </Card>

                <div className="flex justify-between">
                  <Button variant="secondary" onClick={goToPrevStep}>
                    Back
                  </Button>
                  <div className="flex gap-3">
                    <Button variant="secondary">
                      Save as Draft
                    </Button>
                    <Button variant="primary">
                      Publish Event
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

