import { Truck } from 'lucide-react';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-md shadow-primary-500/30">
        <Truck className="h-5 w-5" strokeWidth={2.5} />
      </div>
      <div className="leading-none">
        <div className="text-xl font-extrabold tracking-tight text-sand-900">نَقلة</div>
        <div className="text-[10px] font-bold tracking-widest text-primary-600">NAQLA</div>
      </div>
    </div>
  );
}
