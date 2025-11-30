// ==========================================
// TIXLY - Ticketing Platform Type Definitions
// ==========================================

// ==========================================
// Enums
// ==========================================

export enum EventCategory {
  CONCERT = 'concert',
  SPORTS = 'sports',
  CONFERENCE = 'conference',
  FESTIVAL = 'festival',
  THEATER = 'theater',
  COMEDY = 'comedy',
  WORKSHOP = 'workshop',
  OTHER = 'other',
}

export enum EventStatus {
  DRAFT = 'draft',
  PENDING_APPROVAL = 'pending',
  REJECTED = 'rejected',
  SCHEDULED = 'scheduled',
  ON_SALE = 'on_sale',
  PAUSED = 'paused',
  SOLD_OUT = 'sold_out',
  ENDED = 'ended',
  CANCELLED = 'cancelled',
  POSTPONED = 'postponed',
}

export enum VenueType {
  PHYSICAL = 'physical',
  ONLINE = 'online',
  TBD = 'tbd',
}

export enum SeatingType {
  GENERAL_ADMISSION = 'general',
  RESERVED = 'reserved',
  SECTION = 'section',
  HYBRID = 'hybrid',
}

export enum AgeRestriction {
  ALL_AGES = 'all_ages',
  EIGHTEEN_PLUS = '18+',
  TWENTY_ONE_PLUS = '21+',
}

export enum TicketDeliveryMethod {
  DIGITAL = 'digital',
  WILL_CALL = 'will_call',
  PHYSICAL = 'physical',
}

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded',
  CANCELLED = 'cancelled',
}

export enum DiscountType {
  PERCENTAGE = 'percentage',
  FIXED_AMOUNT = 'fixed',
  BUY_X_GET_Y = 'buy_x_get_y',
}

// ==========================================
// Base Types
// ==========================================

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface DateRange {
  start: string; // ISO date string
  end: string;
}

export interface PriceRange {
  min: number;
  max: number;
  currency: string;
}

export interface Image {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
}

// ==========================================
// Venue Types
// ==========================================

export interface Venue {
  id: string;
  name: string;
  type: VenueType;
  address?: Address;
  coordinates?: Coordinates;
  capacity: number;
  amenities: string[];
  accessibilityInfo?: string;
  parkingInfo?: string;
  imageUrl?: string;
}

// ==========================================
// Organizer Types
// ==========================================

export interface Organizer {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  websiteUrl?: string;
  contactEmail?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  verified: boolean;
  totalEvents: number;
  totalTicketsSold: number;
  createdAt: string;
}

// ==========================================
// Event Types
// ==========================================

export interface Event {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: EventCategory;
  status: EventStatus;
  
  // Media
  heroImage: Image;
  galleryImages?: Image[];
  
  // Dates
  startDate: string;
  endDate: string;
  doorsOpenTime?: string;
  timezone: string;
  
  // Location
  venue: Venue;
  isOnline: boolean;
  
  // Details
  ageRestriction: AgeRestriction;
  tags: string[];
  
  // Ticketing
  seatingType: SeatingType;
  priceRange: PriceRange;
  ticketTypes: TicketType[];
  totalCapacity: number;
  ticketsSold: number;
  
  // Organizer
  organizer: Organizer;
  
  // Settings
  refundPolicy?: string;
  accessibilityInfo?: string;
  faq?: FAQItem[];
  
  // Meta
  isFeatured: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface EventSummary {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  category: EventCategory;
  status: EventStatus;
  heroImage: Image;
  startDate: string;
  venue: {
    name: string;
    city: string;
    state: string;
  };
  priceRange: PriceRange;
  isFeatured: boolean;
  ticketsSold: number;
  totalCapacity: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// ==========================================
// Ticket Types
// ==========================================

export interface TicketType {
  id: string;
  eventId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  
  // Inventory
  quantityTotal: number;
  quantitySold: number;
  quantityHeld: number;
  
  // Sales Window
  saleStart?: string;
  saleEnd?: string;
  
  // Restrictions
  minPerOrder: number;
  maxPerOrder: number;
  maxPerCustomer?: number;
  
  // Seating
  seatingType: SeatingType;
  allowedSections?: string[];
  
  // Visibility
  hidden: boolean;
  featured: boolean;
  sortOrder: number;
  
  // Styling
  color?: string;
}

export interface TicketTypeWithAvailability extends TicketType {
  quantityAvailable: number;
  isOnSale: boolean;
  saleStatus: 'upcoming' | 'active' | 'ended' | 'sold_out';
}

// ==========================================
// Pricing Types
// ==========================================

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  startDate?: string;
  endDate?: string;
  quantityLimit?: number;
}

export interface PromoCode {
  id: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  applicableTicketTypes?: string[];
  applicableEvents?: string[];
  usageLimit?: number;
  usageCount: number;
  perCustomerLimit?: number;
  validFrom?: string;
  validUntil?: string;
  minimumPurchase?: number;
  minimumAmount?: number;
  active: boolean;
}

// ==========================================
// Cart Types
// ==========================================

export interface CartItem {
  id: string;
  ticketTypeId: string;
  ticketTypeName: string;
  quantity: number;
  pricePerTicket: number;
  seatAssignments?: SeatAssignment[];
  subtotal: number;
}

export interface Cart {
  id: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  items: CartItem[];
  promoCode?: string;
  promoDiscount: number;
  itemsSubtotal: number;
  fees: number;
  tax: number;
  total: number;
  expiresAt: string;
  createdAt: string;
}

export interface SeatAssignment {
  seatId: string;
  section: string;
  row: string;
  seatNumber: string;
}

// ==========================================
// Order Types
// ==========================================

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  eventId: string;
  organizerId: string;
  
  // Customer
  customerEmail: string;
  customerFirstName: string;
  customerLastName: string;
  customerPhone?: string;
  billingAddress?: Address;
  
  // Items
  items: OrderItem[];
  
  // Pricing
  itemsSubtotal: number;
  promoCode?: string;
  promoDiscount: number;
  subtotalAfterPromo: number;
  fees: number;
  tax: number;
  total: number;
  currency: string;
  
  // Status
  status: OrderStatus;
  
  // Delivery
  deliveryMethod: TicketDeliveryMethod;
  
  // Payment
  paymentMethod?: string;
  paymentIntentId?: string;
  
  // Dates
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface OrderItem {
  id: string;
  ticketTypeId: string;
  ticketTypeName: string;
  quantity: number;
  pricePerTicket: number;
  seatAssignments?: SeatAssignment[];
  subtotal: number;
  tickets: Ticket[];
}

export interface OrderSummary {
  id: string;
  orderNumber: string;
  eventName: string;
  eventDate: string;
  venueName: string;
  totalTickets: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

// ==========================================
// Ticket Types
// ==========================================

export interface Ticket {
  id: string;
  orderId: string;
  orderItemId: string;
  ticketTypeId: string;
  ticketTypeName: string;
  eventId: string;
  
  // Attendee
  attendeeName?: string;
  attendeeEmail?: string;
  
  // Seating
  seatAssignment?: SeatAssignment;
  
  // Access
  qrCode: string;
  barcode: string;
  accessToken: string;
  
  // Status
  isUsed: boolean;
  usedAt?: string;
  
  // Dates
  issuedAt: string;
}

// ==========================================
// User Types
// ==========================================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatarUrl?: string;
  
  // Preferences
  preferredCurrency: string;
  preferredTimezone: string;
  
  // Status
  emailVerified: boolean;
  
  // Dates
  createdAt: string;
  lastLoginAt?: string;
}

export interface UserProfile extends User {
  savedEvents: string[];
  recentlyViewed: string[];
  orderHistory: OrderSummary[];
}

// ==========================================
// Search & Filter Types
// ==========================================

export interface SearchFilters {
  query?: string;
  categories?: EventCategory[];
  dateRange?: DateRange;
  priceRange?: PriceRange;
  location?: {
    city?: string;
    state?: string;
    country?: string;
    radius?: number;
    coordinates?: Coordinates;
  };
  onlineOnly?: boolean;
  availableOnly?: boolean;
  sortBy?: 'date_asc' | 'date_desc' | 'price_asc' | 'price_desc' | 'relevance' | 'popularity';
}

export interface SearchResults {
  events: EventSummary[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
  facets?: {
    categories: { value: EventCategory; count: number }[];
    cities: { value: string; count: number }[];
    priceRanges: { value: string; count: number }[];
  };
}

// ==========================================
// Analytics Types
// ==========================================

export interface EventAnalytics {
  eventId: string;
  views: number;
  uniqueVisitors: number;
  ticketsSold: number;
  revenue: number;
  conversionRate: number;
  averageOrderValue: number;
  salesByDay: { date: string; sales: number; revenue: number }[];
  salesByTicketType: { ticketTypeId: string; name: string; quantity: number; revenue: number }[];
  topReferrers: { source: string; count: number }[];
}

// ==========================================
// API Response Types
// ==========================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

