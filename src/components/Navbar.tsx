import { useState } from 'react';
import { Menu, X, LayoutDashboard, Truck } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/Button';
import type { Route } from '@/types';

interface NavbarProps {
  route: Route;
  onNavigate: (route: Route) => void;
}

const links: { label: string; route: Route }[] = [
  { label: 'الرئيسية', route: 'home' },
  { label: 'لوحة التحكم', route: 'admin' },
];

export function Navbar({ route, onNavigate }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const go = (r: Route) => {
    onNavigate(r);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-sand-200/70 bg-white/80 backdrop-blur-lg">
      <div className="container-app flex h-16 items-center justify-between">
        <button onClick={() => go('home')} className="transition hover:opacity-80">
          <Logo />
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <button
              key={l.route}
              onClick={() => go(l.route)}
              className={[
                'rounded-lg px-4 py-2 text-sm font-bold transition',
                route === l.route
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-sand-600 hover:bg-sand-100 hover:text-sand-900',
              ].join(' ')}
            >
              {l.label}
            </button>
          ))}
          <Button size="sm" className="mr-2" onClick={() => go('booking')}>
            <Truck className="h-4 w-4" />
            احجز الآن
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-sand-700 hover:bg-sand-100 md:hidden"
          aria-label="القائمة"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="animate-fade-in border-t border-sand-200 bg-white md:hidden">
          <div className="container-app flex flex-col gap-1 py-3">
            {links.map((l) => (
              <button
                key={l.route}
                onClick={() => go(l.route)}
                className={[
                  'flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition',
                  route === l.route
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-sand-700 hover:bg-sand-100',
                ].join(' ')}
              >
                {l.route === 'admin' && <LayoutDashboard className="h-4 w-4" />}
                {l.label}
              </button>
            ))}
            <Button size="md" className="mt-2" onClick={() => go('booking')}>
              <Truck className="h-4 w-4" />
              احجز الآن
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
