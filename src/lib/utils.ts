import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// ==========================================
// Utility Functions
// ==========================================

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency amount
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date for display
 */
export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }
): string {
  return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Format time for display
 */
export function formatTime(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }
): string {
  return new Date(dateString).toLocaleTimeString('en-US', options);
}

/**
 * Format date and time together
 */
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return `${formatDate(dateString)} • ${formatTime(dateString)}`;
}

/**
 * Get relative time string (e.g., "in 3 days", "2 hours ago")
 */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));

  if (diffMs < 0) {
    // Past
    const absDays = Math.abs(diffDays);
    const absHours = Math.abs(diffHours);
    if (absHours < 24) return `${absHours} hour${absHours !== 1 ? 's' : ''} ago`;
    if (absDays < 30) return `${absDays} day${absDays !== 1 ? 's' : ''} ago`;
    return formatDate(dateString);
  } else {
    // Future
    if (diffHours < 24) return `in ${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
    if (diffDays < 30) return `in ${diffDays} day${diffDays !== 1 ? 's' : ''}`;
    return formatDate(dateString);
  }
}

/**
 * Calculate percentage sold
 */
export function getPercentageSold(sold: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((sold / total) * 100);
}

/**
 * Get availability status text
 */
export function getAvailabilityStatus(
  sold: number,
  total: number
): { text: string; color: string } {
  const percentage = getPercentageSold(sold, total);
  const remaining = total - sold;

  if (remaining === 0) {
    return { text: 'Sold Out', color: 'text-[var(--accent-error)]' };
  }
  if (remaining <= 10) {
    return { text: `Only ${remaining} left!`, color: 'text-[var(--accent-warning)]' };
  }
  if (percentage >= 75) {
    return { text: 'Selling fast', color: 'text-[var(--accent-warning)]' };
  }
  if (percentage >= 50) {
    return { text: 'Popular', color: 'text-[var(--accent-primary)]' };
  }
  return { text: 'Available', color: 'text-[var(--accent-success)]' };
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Generate a slug from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
}

/**
 * Generate a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Check if a date is in the past
 */
export function isPast(dateString: string): boolean {
  return new Date(dateString) < new Date();
}

/**
 * Check if a date is today
 */
export function isToday(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * Check if a date is this weekend
 */
export function isThisWeekend(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  const dayOfWeek = today.getDay();
  const saturday = new Date(today);
  saturday.setDate(today.getDate() + (6 - dayOfWeek));
  const sunday = new Date(today);
  sunday.setDate(today.getDate() + (7 - dayOfWeek));

  return (
    date.toDateString() === saturday.toDateString() ||
    date.toDateString() === sunday.toDateString()
  );
}

/**
 * Format number with K/M suffix
 */
export function formatCompactNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}

/**
 * Get category display name
 */
export function getCategoryDisplayName(category: string): string {
  const names: Record<string, string> = {
    concert: 'Concert',
    sports: 'Sports',
    conference: 'Conference',
    festival: 'Festival',
    theater: 'Theater',
    comedy: 'Comedy',
    workshop: 'Workshop',
    other: 'Other',
  };
  return names[category] || category;
}

/**
 * Get category icon/emoji
 */
export function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    concert: '🎵',
    sports: '⚽',
    conference: '💼',
    festival: '🎪',
    theater: '🎭',
    comedy: '😂',
    workshop: '🔧',
    other: '🎟️',
  };
  return emojis[category] || '🎟️';
}

