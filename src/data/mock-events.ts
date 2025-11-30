import {
  Event,
  EventSummary,
  EventCategory,
  EventStatus,
  VenueType,
  SeatingType,
  AgeRestriction,
  Organizer,
} from '@/types';

// ==========================================
// Mock Organizers
// ==========================================

export const mockOrganizers: Organizer[] = [
  {
    id: 'org-1',
    name: 'Neon Nights Entertainment',
    slug: 'neon-nights',
    description: 'Premium electronic music experiences since 2015',
    logoUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
    websiteUrl: 'https://neonnights.com',
    contactEmail: 'info@neonnights.com',
    socialLinks: {
      instagram: '@neonnights',
      twitter: '@neonnightsent',
    },
    verified: true,
    totalEvents: 127,
    totalTicketsSold: 284500,
    createdAt: '2015-03-15T00:00:00Z',
  },
  {
    id: 'org-2',
    name: 'TechConf Global',
    slug: 'techconf-global',
    description: 'Connecting technology leaders worldwide',
    logoUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&h=200&fit=crop',
    websiteUrl: 'https://techconf.io',
    contactEmail: 'hello@techconf.io',
    verified: true,
    totalEvents: 45,
    totalTicketsSold: 98000,
    createdAt: '2018-01-01T00:00:00Z',
  },
  {
    id: 'org-3',
    name: 'Laugh Factory',
    slug: 'laugh-factory',
    description: 'Bringing joy through stand-up comedy',
    logoUrl: 'https://images.unsplash.com/photo-1527224538127-2104bb71c51b?w=200&h=200&fit=crop',
    verified: true,
    totalEvents: 892,
    totalTicketsSold: 156000,
    createdAt: '2010-06-20T00:00:00Z',
  },
];

// ==========================================
// Mock Events
// ==========================================

export const mockEvents: Event[] = [
  {
    id: 'evt-1',
    slug: 'neon-horizon-festival-2025',
    name: 'Neon Horizon Festival 2025',
    shortDescription: 'Three days of electronic music, art installations, and unforgettable experiences under the desert stars.',
    fullDescription: `
# Neon Horizon Festival 2025

Prepare yourself for the most immersive electronic music experience of the year. Neon Horizon brings together world-renowned DJs, stunning visual art installations, and a community of passionate music lovers.

## What to Expect

- **4 Stages** featuring over 100 artists across electronic genres
- **Immersive Art** installations and interactive experiences
- **Premium Camping** options with exclusive amenities
- **Gourmet Food** from top local vendors
- **Wellness Zone** with yoga, meditation, and recovery services

## Featured Artists

- Deadmau5
- Rezz
- Charlotte de Witte
- Fred Again..
- And many more to be announced!

Join us for three magical nights under the stars. This is more than a festival—it's a journey.
    `.trim(),
    category: EventCategory.FESTIVAL,
    status: EventStatus.ON_SALE,
    heroImage: {
      id: 'img-1',
      url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&h=1080&fit=crop',
      alt: 'Neon Horizon Festival main stage',
      width: 1920,
      height: 1080,
    },
    galleryImages: [
      {
        id: 'img-1-1',
        url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop',
        alt: 'Festival crowd',
        width: 800,
        height: 600,
      },
      {
        id: 'img-1-2',
        url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop',
        alt: 'Stage lights',
        width: 800,
        height: 600,
      },
    ],
    startDate: '2025-06-20T16:00:00Z',
    endDate: '2025-06-22T23:59:00Z',
    doorsOpenTime: '2025-06-20T14:00:00Z',
    timezone: 'America/Los_Angeles',
    venue: {
      id: 'venue-1',
      name: 'Desert Dreams Valley',
      type: VenueType.PHYSICAL,
      address: {
        street: '1000 Festival Road',
        city: 'Palm Springs',
        state: 'CA',
        zip: '92262',
        country: 'USA',
      },
      coordinates: {
        latitude: 33.8303,
        longitude: -116.5453,
      },
      capacity: 35000,
      amenities: ['Parking', 'Camping', 'Food Vendors', 'Medical Tent', 'Lockers'],
      parkingInfo: 'Free parking available. VIP parking closer to entrance.',
    },
    isOnline: false,
    ageRestriction: AgeRestriction.EIGHTEEN_PLUS,
    tags: ['electronic', 'festival', 'edm', 'camping', 'art'],
    seatingType: SeatingType.GENERAL_ADMISSION,
    priceRange: {
      min: 299,
      max: 1499,
      currency: 'USD',
    },
    ticketTypes: [
      {
        id: 'tt-1-1',
        eventId: 'evt-1',
        name: 'General Admission',
        description: '3-day festival access with general camping',
        price: 299,
        currency: 'USD',
        quantityTotal: 25000,
        quantitySold: 18750,
        quantityHeld: 125,
        saleStart: '2025-01-15T10:00:00Z',
        saleEnd: '2025-06-19T23:59:00Z',
        minPerOrder: 1,
        maxPerOrder: 6,
        seatingType: SeatingType.GENERAL_ADMISSION,
        hidden: false,
        featured: true,
        sortOrder: 1,
        color: '#22c55e',
      },
      {
        id: 'tt-1-2',
        eventId: 'evt-1',
        name: 'VIP Experience',
        description: 'Premium viewing areas, exclusive lounge, free drinks, VIP camping',
        price: 749,
        currency: 'USD',
        quantityTotal: 5000,
        quantitySold: 3200,
        quantityHeld: 50,
        saleStart: '2025-01-15T10:00:00Z',
        saleEnd: '2025-06-19T23:59:00Z',
        minPerOrder: 1,
        maxPerOrder: 4,
        seatingType: SeatingType.GENERAL_ADMISSION,
        hidden: false,
        featured: false,
        sortOrder: 2,
        color: '#a855f7',
      },
      {
        id: 'tt-1-3',
        eventId: 'evt-1',
        name: 'Platinum All-Access',
        description: 'Backstage access, artist meet & greets, luxury glamping, concierge service',
        price: 1499,
        currency: 'USD',
        quantityTotal: 500,
        quantitySold: 485,
        quantityHeld: 5,
        saleStart: '2025-01-10T10:00:00Z',
        saleEnd: '2025-06-15T23:59:00Z',
        minPerOrder: 1,
        maxPerOrder: 2,
        seatingType: SeatingType.GENERAL_ADMISSION,
        hidden: false,
        featured: false,
        sortOrder: 3,
        color: '#f59e0b',
      },
    ],
    totalCapacity: 30500,
    ticketsSold: 22435,
    organizer: mockOrganizers[0],
    refundPolicy: 'Full refund available until 30 days before event. 50% refund until 7 days before.',
    accessibilityInfo: 'ADA accessible viewing areas, accessible camping, and shuttle service available.',
    faq: [
      {
        question: 'What can I bring?',
        answer: 'Small bags, sunscreen, reusable water bottles. No outside food, alcohol, or professional cameras.',
      },
      {
        question: 'Is re-entry allowed?',
        answer: 'Yes, with a wristband. Your hand will be stamped for re-entry.',
      },
    ],
    isFeatured: true,
    viewCount: 125000,
    createdAt: '2024-11-01T00:00:00Z',
    updatedAt: '2025-01-20T12:00:00Z',
  },
  {
    id: 'evt-2',
    slug: 'future-tech-summit-2025',
    name: 'Future Tech Summit 2025',
    shortDescription: 'Join 5,000+ tech leaders for two days of innovation, networking, and breakthrough insights.',
    fullDescription: `
# Future Tech Summit 2025

The premier technology conference bringing together founders, developers, and industry leaders to shape the future of technology.

## Conference Highlights

- **50+ Speakers** from leading tech companies
- **Hands-on Workshops** on AI, Web3, and emerging tech
- **Startup Pitch Competition** with $500K in prizes
- **Networking Events** with industry leaders
- **Career Fair** featuring top tech employers

## Featured Speakers

- CEO of Major Tech Company
- Leading AI Researchers
- Successful Founders & VCs

Don't miss your chance to be part of the conversation shaping tomorrow's technology.
    `.trim(),
    category: EventCategory.CONFERENCE,
    status: EventStatus.ON_SALE,
    heroImage: {
      id: 'img-2',
      url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=1080&fit=crop',
      alt: 'Tech conference main hall',
      width: 1920,
      height: 1080,
    },
    startDate: '2025-03-15T09:00:00Z',
    endDate: '2025-03-16T18:00:00Z',
    doorsOpenTime: '2025-03-15T08:00:00Z',
    timezone: 'America/New_York',
    venue: {
      id: 'venue-2',
      name: 'Moscone Center',
      type: VenueType.PHYSICAL,
      address: {
        street: '747 Howard St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94103',
        country: 'USA',
      },
      coordinates: {
        latitude: 37.7842,
        longitude: -122.4016,
      },
      capacity: 5000,
      amenities: ['WiFi', 'Charging Stations', 'Food Court', 'Parking Garage'],
    },
    isOnline: false,
    ageRestriction: AgeRestriction.ALL_AGES,
    tags: ['technology', 'conference', 'networking', 'AI', 'startups'],
    seatingType: SeatingType.GENERAL_ADMISSION,
    priceRange: {
      min: 199,
      max: 999,
      currency: 'USD',
    },
    ticketTypes: [
      {
        id: 'tt-2-1',
        eventId: 'evt-2',
        name: 'Early Bird Pass',
        description: 'Full conference access - limited availability',
        price: 199,
        currency: 'USD',
        quantityTotal: 1000,
        quantitySold: 1000,
        quantityHeld: 0,
        saleStart: '2024-12-01T10:00:00Z',
        saleEnd: '2025-01-31T23:59:00Z',
        minPerOrder: 1,
        maxPerOrder: 5,
        seatingType: SeatingType.GENERAL_ADMISSION,
        hidden: false,
        featured: false,
        sortOrder: 1,
        color: '#22c55e',
      },
      {
        id: 'tt-2-2',
        eventId: 'evt-2',
        name: 'Standard Pass',
        description: 'Full conference access, all sessions and networking events',
        price: 349,
        currency: 'USD',
        quantityTotal: 3000,
        quantitySold: 1850,
        quantityHeld: 45,
        saleStart: '2025-02-01T10:00:00Z',
        saleEnd: '2025-03-14T23:59:00Z',
        minPerOrder: 1,
        maxPerOrder: 10,
        seatingType: SeatingType.GENERAL_ADMISSION,
        hidden: false,
        featured: true,
        sortOrder: 2,
        color: '#3b82f6',
      },
      {
        id: 'tt-2-3',
        eventId: 'evt-2',
        name: 'VIP All-Access',
        description: 'Front-row seating, exclusive workshops, speaker dinner, 1-on-1 mentorship sessions',
        price: 999,
        currency: 'USD',
        quantityTotal: 200,
        quantitySold: 142,
        quantityHeld: 8,
        saleStart: '2024-12-01T10:00:00Z',
        saleEnd: '2025-03-10T23:59:00Z',
        minPerOrder: 1,
        maxPerOrder: 2,
        seatingType: SeatingType.RESERVED,
        hidden: false,
        featured: false,
        sortOrder: 3,
        color: '#f59e0b',
      },
    ],
    totalCapacity: 4200,
    ticketsSold: 2992,
    organizer: mockOrganizers[1],
    refundPolicy: 'Full refund until 14 days before event. No refunds after.',
    faq: [
      {
        question: 'Is there virtual attendance?',
        answer: 'Yes, we offer a livestream pass for $99 that includes access to all main stage sessions.',
      },
      {
        question: 'Are meals included?',
        answer: 'Lunch and refreshments are included with all passes. VIP includes exclusive dinner.',
      },
    ],
    isFeatured: true,
    viewCount: 45000,
    createdAt: '2024-10-15T00:00:00Z',
    updatedAt: '2025-01-18T09:00:00Z',
  },
  {
    id: 'evt-3',
    slug: 'comedy-night-live-sarah-silverman',
    name: 'Sarah Silverman: Someone You Love Tour',
    shortDescription: 'Emmy-winning comedian Sarah Silverman brings her critically acclaimed tour to Chicago.',
    fullDescription: `
# Sarah Silverman: Someone You Love Tour

Don't miss Emmy-winning comedian Sarah Silverman as she brings her brand new hour of material to Chicago!

Fresh from rave reviews, this tour showcases Sarah at her most personal and hilarious. Expect sharp observations, controversial takes, and her signature boundary-pushing humor.

**Note:** This show contains adult language and mature themes.
    `.trim(),
    category: EventCategory.COMEDY,
    status: EventStatus.ON_SALE,
    heroImage: {
      id: 'img-3',
      url: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=1920&h=1080&fit=crop',
      alt: 'Comedy stage with spotlight',
      width: 1920,
      height: 1080,
    },
    startDate: '2025-02-28T20:00:00Z',
    endDate: '2025-02-28T22:00:00Z',
    doorsOpenTime: '2025-02-28T19:00:00Z',
    timezone: 'America/Chicago',
    venue: {
      id: 'venue-3',
      name: 'The Chicago Theatre',
      type: VenueType.PHYSICAL,
      address: {
        street: '175 N State St',
        city: 'Chicago',
        state: 'IL',
        zip: '60601',
        country: 'USA',
      },
      coordinates: {
        latitude: 41.8854,
        longitude: -87.6272,
      },
      capacity: 3600,
      amenities: ['Bar', 'Concessions', 'Coat Check', 'Accessible Seating'],
    },
    isOnline: false,
    ageRestriction: AgeRestriction.EIGHTEEN_PLUS,
    tags: ['comedy', 'stand-up', 'live'],
    seatingType: SeatingType.RESERVED,
    priceRange: {
      min: 59,
      max: 199,
      currency: 'USD',
    },
    ticketTypes: [
      {
        id: 'tt-3-1',
        eventId: 'evt-3',
        name: 'Balcony',
        description: 'Balcony seating with great sightlines',
        price: 59,
        currency: 'USD',
        quantityTotal: 1200,
        quantitySold: 1180,
        quantityHeld: 12,
        minPerOrder: 1,
        maxPerOrder: 6,
        seatingType: SeatingType.RESERVED,
        allowedSections: ['Balcony Left', 'Balcony Center', 'Balcony Right'],
        hidden: false,
        featured: false,
        sortOrder: 1,
        color: '#22c55e',
      },
      {
        id: 'tt-3-2',
        eventId: 'evt-3',
        name: 'Orchestra',
        description: 'Main floor seating',
        price: 99,
        currency: 'USD',
        quantityTotal: 1800,
        quantitySold: 1650,
        quantityHeld: 25,
        minPerOrder: 1,
        maxPerOrder: 6,
        seatingType: SeatingType.RESERVED,
        allowedSections: ['Orchestra Left', 'Orchestra Center', 'Orchestra Right'],
        hidden: false,
        featured: true,
        sortOrder: 2,
        color: '#3b82f6',
      },
      {
        id: 'tt-3-3',
        eventId: 'evt-3',
        name: 'Premium Front',
        description: 'First 10 rows, best seats in the house',
        price: 199,
        currency: 'USD',
        quantityTotal: 400,
        quantitySold: 375,
        quantityHeld: 8,
        minPerOrder: 1,
        maxPerOrder: 4,
        seatingType: SeatingType.RESERVED,
        allowedSections: ['Premium Left', 'Premium Center', 'Premium Right'],
        hidden: false,
        featured: false,
        sortOrder: 3,
        color: '#f59e0b',
      },
    ],
    totalCapacity: 3400,
    ticketsSold: 3205,
    organizer: mockOrganizers[2],
    refundPolicy: 'No refunds. Tickets may be transferred to another person.',
    isFeatured: false,
    viewCount: 28000,
    createdAt: '2024-11-20T00:00:00Z',
    updatedAt: '2025-01-15T14:00:00Z',
  },
  {
    id: 'evt-4',
    slug: 'midnight-pulse-afterhours',
    name: 'Midnight Pulse: Afterhours',
    shortDescription: 'An intimate techno experience featuring underground artists in a secret downtown location.',
    fullDescription: `
# Midnight Pulse: Afterhours

Descend into the underground for an intimate night of dark, driving techno. Location revealed 24 hours before the event.

## Lineup

- **Amelie Lens** (B2B set)
- **999999999**
- **Local Support TBA**

Strictly limited capacity. 21+ only. No photos or videos.
    `.trim(),
    category: EventCategory.CONCERT,
    status: EventStatus.ON_SALE,
    heroImage: {
      id: 'img-4',
      url: 'https://images.unsplash.com/photo-1571266028243-d220c6a8b0e9?w=1920&h=1080&fit=crop',
      alt: 'Underground club with red lighting',
      width: 1920,
      height: 1080,
    },
    startDate: '2025-02-15T23:00:00Z',
    endDate: '2025-02-16T06:00:00Z',
    timezone: 'America/New_York',
    venue: {
      id: 'venue-4',
      name: 'Secret Location',
      type: VenueType.PHYSICAL,
      address: {
        street: 'TBA',
        city: 'Brooklyn',
        state: 'NY',
        zip: '11211',
        country: 'USA',
      },
      capacity: 400,
      amenities: ['Bar', 'Coat Check'],
    },
    isOnline: false,
    ageRestriction: AgeRestriction.TWENTY_ONE_PLUS,
    tags: ['techno', 'underground', 'afterhours', 'electronic'],
    seatingType: SeatingType.GENERAL_ADMISSION,
    priceRange: {
      min: 45,
      max: 45,
      currency: 'USD',
    },
    ticketTypes: [
      {
        id: 'tt-4-1',
        eventId: 'evt-4',
        name: 'General Admission',
        description: 'Entry to the event',
        price: 45,
        currency: 'USD',
        quantityTotal: 400,
        quantitySold: 380,
        quantityHeld: 10,
        minPerOrder: 1,
        maxPerOrder: 2,
        seatingType: SeatingType.GENERAL_ADMISSION,
        hidden: false,
        featured: true,
        sortOrder: 1,
        color: '#ef4444',
      },
    ],
    totalCapacity: 400,
    ticketsSold: 380,
    organizer: mockOrganizers[0],
    refundPolicy: 'No refunds.',
    isFeatured: false,
    viewCount: 8500,
    createdAt: '2025-01-05T00:00:00Z',
    updatedAt: '2025-01-22T10:00:00Z',
  },
  {
    id: 'evt-5',
    slug: 'spring-jazz-festival-2025',
    name: 'Spring Jazz Festival 2025',
    shortDescription: 'Three days of world-class jazz in the heart of New Orleans.',
    fullDescription: `
# Spring Jazz Festival 2025

Experience the magic of jazz in the city where it all began. Three days of incredible performances across multiple stages.

## Featured Artists
- Herbie Hancock
- Esperanza Spalding
- Kamasi Washington
- And 50+ more artists!

Join us for the celebration of jazz music, culture, and community.
    `.trim(),
    category: EventCategory.FESTIVAL,
    status: EventStatus.ON_SALE,
    heroImage: {
      id: 'img-5',
      url: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=1920&h=1080&fit=crop',
      alt: 'Jazz festival crowd',
      width: 1920,
      height: 1080,
    },
    startDate: '2025-04-25T12:00:00Z',
    endDate: '2025-04-27T23:00:00Z',
    timezone: 'America/Chicago',
    venue: {
      id: 'venue-5',
      name: 'Congo Square',
      type: VenueType.PHYSICAL,
      address: {
        street: '701 N Rampart St',
        city: 'New Orleans',
        state: 'LA',
        zip: '70116',
        country: 'USA',
      },
      coordinates: {
        latitude: 29.9622,
        longitude: -90.0698,
      },
      capacity: 15000,
      amenities: ['Food Vendors', 'Art Market', 'VIP Areas', 'First Aid'],
    },
    isOnline: false,
    ageRestriction: AgeRestriction.ALL_AGES,
    tags: ['jazz', 'festival', 'music', 'new orleans'],
    seatingType: SeatingType.GENERAL_ADMISSION,
    priceRange: {
      min: 75,
      max: 450,
      currency: 'USD',
    },
    ticketTypes: [
      {
        id: 'tt-5-1',
        eventId: 'evt-5',
        name: 'Single Day Pass',
        description: 'Access to one day of your choice',
        price: 75,
        currency: 'USD',
        quantityTotal: 5000,
        quantitySold: 2100,
        quantityHeld: 50,
        minPerOrder: 1,
        maxPerOrder: 8,
        seatingType: SeatingType.GENERAL_ADMISSION,
        hidden: false,
        featured: false,
        sortOrder: 1,
        color: '#22c55e',
      },
      {
        id: 'tt-5-2',
        eventId: 'evt-5',
        name: '3-Day Pass',
        description: 'Full festival access all three days',
        price: 199,
        currency: 'USD',
        quantityTotal: 8000,
        quantitySold: 5600,
        quantityHeld: 120,
        minPerOrder: 1,
        maxPerOrder: 6,
        seatingType: SeatingType.GENERAL_ADMISSION,
        hidden: false,
        featured: true,
        sortOrder: 2,
        color: '#3b82f6',
      },
      {
        id: 'tt-5-3',
        eventId: 'evt-5',
        name: 'VIP 3-Day Pass',
        description: 'Premium viewing, VIP lounge, meet & greets, exclusive merchandise',
        price: 450,
        currency: 'USD',
        quantityTotal: 1000,
        quantitySold: 650,
        quantityHeld: 30,
        minPerOrder: 1,
        maxPerOrder: 4,
        seatingType: SeatingType.GENERAL_ADMISSION,
        hidden: false,
        featured: false,
        sortOrder: 3,
        color: '#f59e0b',
      },
    ],
    totalCapacity: 14000,
    ticketsSold: 8350,
    organizer: mockOrganizers[0],
    isFeatured: true,
    viewCount: 52000,
    createdAt: '2024-12-01T00:00:00Z',
    updatedAt: '2025-01-20T08:00:00Z',
  },
  {
    id: 'evt-6',
    slug: 'startup-pitch-night-february',
    name: 'Startup Pitch Night: February Edition',
    shortDescription: 'Watch 10 promising startups pitch to top VCs. Network with founders and investors.',
    fullDescription: `
# Startup Pitch Night: February Edition

Join us for an evening of innovation and entrepreneurship. Ten carefully selected startups will pitch their ideas to a panel of top venture capitalists.

## What to Expect
- 10 startup pitches (5 minutes each)
- VC panel feedback
- Networking reception
- Drinks and appetizers included

Whether you're a founder, investor, or tech enthusiast, this is the perfect opportunity to discover the next big thing.
    `.trim(),
    category: EventCategory.CONFERENCE,
    status: EventStatus.ON_SALE,
    heroImage: {
      id: 'img-6',
      url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1920&h=1080&fit=crop',
      alt: 'Startup pitch presentation',
      width: 1920,
      height: 1080,
    },
    startDate: '2025-02-20T18:00:00Z',
    endDate: '2025-02-20T21:00:00Z',
    doorsOpenTime: '2025-02-20T17:30:00Z',
    timezone: 'America/Los_Angeles',
    venue: {
      id: 'venue-6',
      name: 'WeWork SOMA',
      type: VenueType.PHYSICAL,
      address: {
        street: '535 Mission St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94105',
        country: 'USA',
      },
      capacity: 150,
      amenities: ['WiFi', 'Drinks', 'Food'],
    },
    isOnline: false,
    ageRestriction: AgeRestriction.TWENTY_ONE_PLUS,
    tags: ['startups', 'pitch', 'networking', 'vc', 'tech'],
    seatingType: SeatingType.GENERAL_ADMISSION,
    priceRange: {
      min: 25,
      max: 25,
      currency: 'USD',
    },
    ticketTypes: [
      {
        id: 'tt-6-1',
        eventId: 'evt-6',
        name: 'General Admission',
        description: 'Event entry with drinks and appetizers',
        price: 25,
        currency: 'USD',
        quantityTotal: 150,
        quantitySold: 98,
        quantityHeld: 5,
        minPerOrder: 1,
        maxPerOrder: 3,
        seatingType: SeatingType.GENERAL_ADMISSION,
        hidden: false,
        featured: true,
        sortOrder: 1,
        color: '#3b82f6',
      },
    ],
    totalCapacity: 150,
    ticketsSold: 98,
    organizer: mockOrganizers[1],
    isFeatured: false,
    viewCount: 3200,
    createdAt: '2025-01-10T00:00:00Z',
    updatedAt: '2025-01-21T16:00:00Z',
  },
];

// ==========================================
// Helper Functions
// ==========================================

export function getEventSummary(event: Event): EventSummary {
  return {
    id: event.id,
    slug: event.slug,
    name: event.name,
    shortDescription: event.shortDescription,
    category: event.category,
    status: event.status,
    heroImage: event.heroImage,
    startDate: event.startDate,
    venue: {
      name: event.venue.name,
      city: event.venue.address?.city || 'TBA',
      state: event.venue.address?.state || '',
    },
    priceRange: event.priceRange,
    isFeatured: event.isFeatured,
    ticketsSold: event.ticketsSold,
    totalCapacity: event.totalCapacity,
  };
}

export function getFeaturedEvents(): EventSummary[] {
  return mockEvents
    .filter((event) => event.isFeatured)
    .map(getEventSummary);
}

export function getUpcomingEvents(): EventSummary[] {
  return mockEvents
    .filter((event) => new Date(event.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .map(getEventSummary);
}

export function getEventBySlug(slug: string): Event | undefined {
  return mockEvents.find((event) => event.slug === slug);
}

export function getEventById(id: string): Event | undefined {
  return mockEvents.find((event) => event.id === id);
}

export function getEventsByCategory(category: EventCategory): EventSummary[] {
  return mockEvents
    .filter((event) => event.category === category)
    .map(getEventSummary);
}

export function searchEvents(query: string): EventSummary[] {
  const lowerQuery = query.toLowerCase();
  return mockEvents
    .filter(
      (event) =>
        event.name.toLowerCase().includes(lowerQuery) ||
        event.shortDescription.toLowerCase().includes(lowerQuery) ||
        event.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
        event.venue.name.toLowerCase().includes(lowerQuery) ||
        event.venue.address?.city.toLowerCase().includes(lowerQuery)
    )
    .map(getEventSummary);
}

