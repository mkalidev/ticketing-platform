'use client';

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

// ==========================================
// Button Component
// ==========================================

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-medium rounded-xl
      transition-all duration-200 ease-out
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]
      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
      active:scale-[0.98]
    `;

    const variants = {
      primary: `
        bg-gradient-to-r from-[#ff6b4a] to-[#ff4757]
        text-white
        shadow-[0_2px_12px_rgba(255,107,74,0.3)]
        hover:shadow-[0_4px_20px_rgba(255,107,74,0.4)]
        hover:-translate-y-0.5
        focus-visible:ring-[#ff6b4a]
      `,
      secondary: `
        bg-[var(--bg-elevated)]
        text-[var(--text-primary)]
        border border-[var(--border-default)]
        hover:bg-[var(--bg-hover)]
        hover:border-[var(--border-strong)]
        focus-visible:ring-[var(--border-strong)]
      `,
      ghost: `
        bg-transparent
        text-[var(--text-secondary)]
        hover:bg-[var(--bg-elevated)]
        hover:text-[var(--text-primary)]
        focus-visible:ring-[var(--border-default)]
      `,
      outline: `
        bg-transparent
        text-[var(--accent-primary)]
        border border-[var(--accent-primary)]
        hover:bg-[rgba(255,107,74,0.1)]
        focus-visible:ring-[var(--accent-primary)]
      `,
      danger: `
        bg-[var(--accent-error)]
        text-white
        hover:bg-[#dc2626]
        focus-visible:ring-[var(--accent-error)]
      `,
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-8 py-3.5 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <LoadingSpinner size={size} />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// ==========================================
// Loading Spinner
// ==========================================

function LoadingSpinner({ size }: { size: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <svg
      className={cn('animate-spin', sizeClasses[size])}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export { Button };

