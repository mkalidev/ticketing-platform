'use client';

import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

// ==========================================
// Badge Component
// ==========================================

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

function Badge({
  className,
  variant = 'secondary',
  size = 'md',
  leftIcon,
  rightIcon,
  children,
  ...props
}: BadgeProps) {
  const baseStyles = `
    inline-flex items-center gap-1.5
    font-medium rounded-full
    whitespace-nowrap
  `;

  const variants = {
    primary: 'bg-[rgba(255,107,74,0.15)] text-[var(--accent-primary)]',
    secondary: 'bg-[var(--bg-elevated)] text-[var(--text-secondary)]',
    success: 'bg-[rgba(34,197,94,0.15)] text-[var(--accent-success)]',
    warning: 'bg-[rgba(234,179,8,0.15)] text-[var(--accent-warning)]',
    error: 'bg-[rgba(239,68,68,0.15)] text-[var(--accent-error)]',
    outline: 'bg-transparent border border-[var(--border-default)] text-[var(--text-secondary)]',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </span>
  );
}

export { Badge };

