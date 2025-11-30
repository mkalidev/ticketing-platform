import Link from 'next/link';
import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center px-4">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bold text-[var(--text-primary)]/5 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-6xl">🎫</span>
            </div>
          </div>
        </div>

        <h2 className="text-h1 text-[var(--text-primary)] mb-4">
          Page not found
        </h2>
        <p className="text-body-lg text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
          Looks like this ticket got lost in the crowd. 
          Let's get you back to the main stage.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="primary" size="lg">
              Back to Home
            </Button>
          </Link>
          <Link href="/events">
            <Button variant="secondary" size="lg">
              Browse Events
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

