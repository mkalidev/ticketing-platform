'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { LogoIcon, SearchIcon, UserIcon, TicketIcon, MenuIcon, CloseIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

// ==========================================
// Header Component
// ==========================================

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Glassmorphism backdrop */}
      <div className="absolute inset-0 bg-[rgba(9,9,11,0.8)] backdrop-blur-xl border-b border-[var(--border-subtle)]" />
      
      <nav className="relative container-full">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 group"
          >
            <LogoIcon size={32} className="transition-transform group-hover:scale-105" />
            <span className="text-xl font-bold tracking-tight">
              tix<span className="gradient-text">ly</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/events">Browse Events</NavLink>
            <NavLink href="/categories">Categories</NavLink>
            <NavLink href="/for-organizers">For Organizers</NavLink>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/search">
              <Button variant="ghost" size="sm">
                <SearchIcon size={18} />
                <span>Search</span>
              </Button>
            </Link>
            <Link href="/my-tickets">
              <Button variant="ghost" size="sm">
                <TicketIcon size={18} />
                <span>My Tickets</span>
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="sm">
                <UserIcon size={18} />
                <span>Sign In</span>
              </Button>
            </Link>
            <Link href="/create-event">
              <Button variant="primary" size="sm">
                Create Event
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden absolute top-full left-0 right-0 bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)]',
          'transition-all duration-300 ease-out overflow-hidden',
          isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="container-full py-4 space-y-1">
          <MobileNavLink href="/events" onClick={() => setIsMenuOpen(false)}>
            Browse Events
          </MobileNavLink>
          <MobileNavLink href="/categories" onClick={() => setIsMenuOpen(false)}>
            Categories
          </MobileNavLink>
          <MobileNavLink href="/for-organizers" onClick={() => setIsMenuOpen(false)}>
            For Organizers
          </MobileNavLink>
          <MobileNavLink href="/my-tickets" onClick={() => setIsMenuOpen(false)}>
            My Tickets
          </MobileNavLink>
          
          <div className="pt-4 space-y-2">
            <Link href="/login" className="block">
              <Button variant="secondary" fullWidth>
                Sign In
              </Button>
            </Link>
            <Link href="/create-event" className="block">
              <Button variant="primary" fullWidth>
                Create Event
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// ==========================================
// Nav Link Components
// ==========================================

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'px-4 py-2 rounded-lg',
        'text-sm font-medium text-[var(--text-secondary)]',
        'transition-colors duration-200',
        'hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
      )}
    >
      {children}
    </Link>
  );
}

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

function MobileNavLink({ href, children, onClick }: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'block px-4 py-3 rounded-xl',
        'text-base font-medium text-[var(--text-secondary)]',
        'transition-colors duration-200',
        'hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
      )}
    >
      {children}
    </Link>
  );
}

