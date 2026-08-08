import { Check, Weight, Ruler, Clock, MapPin } from 'lucide-react';
import type { Vehicle } from '@/types';

interface VehicleCardProps {
  vehicle: Vehicle;
  selected: boolean;
  onSelect: (id: string) => void;
}

export function VehicleCard({ vehicle, selected, onSelect }: VehicleCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(vehicle.id)}
      aria-pressed={selected}
      aria-label={`اختيار ${vehicle.name}`}
      className={[
        'group relative flex w-full flex-col overflow-hidden rounded-2xl bg-white text-right transition-all duration-300',
        'sm:flex-row sm:items-stretch',
        selected
          ? 'shadow-card-hover ring-2 ring-primary-500'
          : 'shadow-card ring-1 ring-sand-200 hover:-translate-y-0.5 hover:shadow-card-hover hover:ring-sand-300',
      ].join(' ')}
    >
      {/* Selection checkmark */}
      <div
        className={[
          'absolute left-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 sm:left-4 sm:top-4',
          selected
            ? 'animate-check-pop bg-primary-500 text-white shadow-md shadow-primary-500/40'
            : 'bg-white/80 text-transparent ring-2 ring-sand-200 backdrop-blur-sm group-hover:ring-sand-300',
        ].join(' ')}
      >
        <Check className="h-4 w-4" strokeWidth={3} />
      </div>

      {/* LEFT: Vehicle image */}
      <div className="relative h-44 w-full shrink-0 overflow-hidden bg-sand-100 sm:h-auto sm:w-56 md:w-64">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <div className="absolute bottom-2 right-2 rounded-lg bg-black/55 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
          {vehicle.eta}
        </div>
      </div>

      {/* RIGHT: Details */}
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-extrabold text-sand-900 sm:text-xl">
              {vehicle.name}
            </h3>
            <div className="mt-0.5 flex items-center gap-1 text-xs font-bold text-primary-600">
              <Clock className="h-3.5 w-3.5" />
              وصول خلال {vehicle.eta}
            </div>
          </div>
          <div className="shrink-0 text-left">
            <div className="text-xs font-bold text-sand-400">يبدأ من</div>
            <div className="text-lg font-extrabold text-sand-900">
              {vehicle.basePrice}
              <span className="text-xs font-bold text-sand-500"> ر.س</span>
            </div>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-sand-600">{vehicle.description}</p>

        {/* Capacity info */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
          <CapacityChip icon={<Weight className="h-3.5 w-3.5" />} label={`${vehicle.capacityTons} طن`} />
          <CapacityChip icon={<Ruler className="h-3.5 w-3.5" />} label={vehicle.capacityVolume} />
          <CapacityChip
            icon={<MapPin className="h-3.5 w-3.5" />}
            label={`${vehicle.maxPallets} منصات`}
          />
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 border-t border-sand-100 pt-3">
          {vehicle.features.map((f) => (
            <span
              key={f}
              className="rounded-lg bg-primary-50 px-2.5 py-1 text-[11px] font-bold text-primary-700"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

function CapacityChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-lg bg-sand-100 px-2.5 py-1 text-xs font-bold text-sand-700">
      {icon}
      {label}
    </span>
  );
}
