import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MapPin,
  Truck,
  Calendar,
  User,
  Phone,
  StickyNote,
  CheckCircle2,
  PartyPopper,
  Navigation,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/Button';
import { VehicleCard } from '@/components/VehicleCard';
import { vehicles, getVehicle } from '@/data/vehicles';
import type { BookingDraft, Route } from '@/types';

interface BookingProps {
  onNavigate: (route: Route) => void;
  onConfirm: (draft: BookingDraft) => string;
}

const steps = ['المسار', 'المركبة', 'التفاصيل', 'تأكيد'] as const;

const riyadhAreas = [
  'حي العليا',
  'حي الملقا',
  'حي النرجس',
  'حي الياسمين',
  'حي الورود',
  'حي الصحافة',
  'حي قرطبة',
  'حي السلي',
  'حي الديرة',
  'حي الربيع',
  'طريق التخصصي',
  'طريق الملك فهد',
  'طريق الأمير محمد بن سلمان',
  'طريق الخرج',
];

export function Booking({ onNavigate, onConfirm }: BookingProps) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<BookingDraft>({
    vehicleId: null,
    pickup: '',
    dropoff: '',
    distanceKm: 0,
    scheduledDate: '',
    notes: '',
    customerName: '',
    customerPhone: '',
  });
  const [confirmationRef, setConfirmationRef] = useState<string | null>(null);

  const vehicle = getVehicle(draft.vehicleId);
  const price = useMemo(() => {
    if (!vehicle || draft.distanceKm <= 0) return 0;
    return Math.round(vehicle.basePrice + vehicle.pricePerKm * draft.distanceKm);
  }, [vehicle, draft.distanceKm]);

  const canProceed = useMemo(() => {
    if (step === 0) return draft.pickup && draft.dropoff && draft.distanceKm > 0;
    if (step === 1) return draft.vehicleId !== null;
    if (step === 2)
      return draft.scheduledDate && draft.customerName && draft.customerPhone.length >= 9;
    return true;
  }, [step, draft]);

  const update = (patch: Partial<BookingDraft>) => setDraft((d) => ({ ...d, ...patch }));

  const next = () => {
    if (step < 3) setStep((s) => s + 1);
    else {
      const ref = onConfirm(draft);
      setConfirmationRef(ref);
    }
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  if (confirmationRef) {
    return <Success ref={confirmationRef} vehicleName={vehicle?.name ?? ''} onNavigate={onNavigate} />;
  }

  return (
    <div className="bg-sand-50 pb-20 pt-8">
      <div className="container-app">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-sand-900">حجز مركبة</h1>
          <p className="mt-2 text-sand-600">أكمل الخطوات التالية لحجز مركبتك</p>
        </div>

        {/* Stepper */}
        <Stepper current={step} />

        <div className="mx-auto mt-8 max-w-3xl">
          {/* Step 0: Route */}
          {step === 0 && (
            <div className="animate-fade-in space-y-5 rounded-2xl bg-white p-6 shadow-card ring-1 ring-sand-200 sm:p-8">
              <SectionTitle icon={MapPin} title="نقطة الانطلاق والوصول" />
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label-field">مكان الانطلاق</label>
                  <select
                    className="input-field"
                    value={draft.pickup}
                    onChange={(e) => update({ pickup: e.target.value })}
                  >
                    <option value="">اختر المنطقة...</option>
                    {riyadhAreas.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label-field">مكان الوصول</label>
                  <select
                    className="input-field"
                    value={draft.dropoff}
                    onChange={(e) => update({ dropoff: e.target.value })}
                  >
                    <option value="">اختر المنطقة...</option>
                    {riyadhAreas.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="label-field">المسافة التقديرية (كم)</label>
                <input
                  type="number"
                  min={1}
                  max={200}
                  className="input-field"
                  placeholder="مثال: 15"
                  value={draft.distanceKm || ''}
                  onChange={(e) => update({ distanceKm: Number(e.target.value) || 0 })}
                />
                <p className="mt-2 text-xs text-sand-400">
                  أدخل المسافة التقديرية لحساب السعر. يمكنك استخدام خرائط جوجل لتحديدها.
                </p>
              </div>

              {draft.pickup && draft.dropoff && (
                <div className="flex items-center gap-3 rounded-xl bg-primary-50 p-4 text-sm">
                  <Navigation className="h-5 w-5 shrink-0 text-primary-600" />
                  <div className="text-sand-700">
                    <span className="font-bold">{draft.pickup}</span>
                    <ArrowLeft className="mx-1.5 inline h-3.5 w-3.5" />
                    <span className="font-bold">{draft.dropoff}</span>
                    {draft.distanceKm > 0 && (
                      <span className="mr-2 text-primary-600">· {draft.distanceKm} كم</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 1: Vehicle */}
          {step === 1 && (
            <div className="animate-fade-in space-y-4">
              <SectionTitle icon={Truck} title="اختر المركبة المناسبة" />
              {vehicles.map((v) => (
                <VehicleCard
                  key={v.id}
                  vehicle={v}
                  selected={draft.vehicleId === v.id}
                  onSelect={(id) => update({ vehicleId: id })}
                />
              ))}
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="animate-fade-in space-y-5 rounded-2xl bg-white p-6 shadow-card ring-1 ring-sand-200 sm:p-8">
              <SectionTitle icon={User} title="بيانات الحجز" />
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label-field">الاسم الكامل</label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-400" />
                    <input
                      className="input-field pr-10"
                      placeholder="أدخل اسمك"
                      value={draft.customerName}
                      onChange={(e) => update({ customerName: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="label-field">رقم الجوال</label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-400" />
                    <input
                      type="tel"
                      className="input-field pr-10"
                      placeholder="05xxxxxxxx"
                      value={draft.customerPhone}
                      onChange={(e) => update({ customerPhone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="label-field">تاريخ ووقت الحجز</label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-400" />
                  <input
                    type="datetime-local"
                    className="input-field pr-10"
                    value={draft.scheduledDate}
                    onChange={(e) => update({ scheduledDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="label-field">ملاحظات (اختياري)</label>
                <div className="relative">
                  <StickyNote className="absolute right-3 top-4 h-4 w-4 text-sand-400" />
                  <textarea
                    rows={3}
                    className="input-field pr-10 resize-none"
                    placeholder="أي تفاصيل إضافية عن الشحنة..."
                    value={draft.notes}
                    onChange={(e) => update({ notes: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div className="animate-fade-in space-y-5">
              <SectionTitle icon={CheckCircle2} title="مراجعة وتأكيد الطلب" />

              {vehicle && (
                <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-sand-200">
                  <div className="flex flex-col sm:flex-row">
                    <img src={vehicle.image} alt={vehicle.name} className="h-40 w-full object-cover sm:h-auto sm:w-48" />
                    <div className="flex flex-1 flex-col gap-2 p-5">
                      <h3 className="text-lg font-extrabold text-sand-900">{vehicle.name}</h3>
                      <p className="text-sm text-sand-600">{vehicle.description}</p>
                      <div className="mt-1 flex items-center gap-1.5 text-xs font-bold text-primary-600">
                        <Clock className="h-3.5 w-3.5" />
                        وصول خلال {vehicle.eta}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-sand-200 sm:p-8">
                <h4 className="mb-4 text-sm font-extrabold text-sand-900">تفاصيل الرحلة</h4>
                <dl className="space-y-3 text-sm">
                  <Row label="من" value={draft.pickup} />
                  <Row label="إلى" value={draft.dropoff} />
                  <Row label="المسافة" value={`${draft.distanceKm} كم`} />
                  <Row label="المركبة" value={vehicle?.name ?? ''} />
                  <Row
                    label="موعد الحجز"
                    value={new Date(draft.scheduledDate).toLocaleString('ar-SA', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  />
                  <Row label="الاسم" value={draft.customerName} />
                  <Row label="الجوال" value={draft.customerPhone} dir="ltr" />
                  {draft.notes && <Row label="ملاحظات" value={draft.notes} />}
                </dl>

                <div className="mt-5 space-y-2 border-t border-sand-100 pt-5">
                  <PriceRow label="السعر الأساسي" value={vehicle?.basePrice ?? 0} />
                  <PriceRow
                    label={`الكم (${vehicle?.pricePerKm ?? 0} ر.س × ${draft.distanceKm} كم)`}
                    value={vehicle ? Math.round(vehicle.pricePerKm * draft.distanceKm) : 0}
                  />
                  <div className="flex items-center justify-between border-t border-sand-100 pt-3">
                    <span className="text-base font-black text-sand-900">الإجمالي</span>
                    <span className="text-2xl font-black text-primary-600">
                      {price}
                      <span className="text-sm font-bold text-sand-500"> ر.س</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between">
            <Button variant="outline" onClick={back} disabled={step === 0}>
              <ArrowRight className="h-4 w-4" />
              السابق
            </Button>
            <span className="text-sm font-bold text-sand-400">
              الخطوة {step + 1} من {steps.length}
            </span>
            <Button onClick={next} disabled={!canProceed}>
              {step === 3 ? 'تأكيد الحجز' : 'التالي'}
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stepper({ current }: { current: number }) {
  return (
    <div className="mx-auto flex max-w-2xl items-center">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={[
                  'flex h-10 w-10 items-center justify-center rounded-full text-sm font-black transition-all duration-300',
                  done
                    ? 'bg-primary-600 text-white'
                    : active
                      ? 'bg-primary-50 text-primary-700 ring-2 ring-primary-500'
                      : 'bg-sand-100 text-sand-400',
                ].join(' ')}
              >
                {done ? <Check className="h-5 w-5" strokeWidth={3} /> : i + 1}
              </div>
              <span
                className={[
                  'hidden text-xs font-bold sm:block',
                  active ? 'text-primary-700' : done ? 'text-sand-700' : 'text-sand-400',
                ].join(' ')}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={[
                  'mx-2 h-0.5 flex-1 rounded-full transition-all duration-500',
                  i < current ? 'bg-primary-500' : 'bg-sand-200',
                ].join(' ')}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function SectionTitle({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="text-xl font-extrabold text-sand-900">{title}</h2>
    </div>
  );
}

function Row({ label, value, dir }: { label: string; value: string; dir?: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="shrink-0 font-bold text-sand-500">{label}</dt>
      <dd className="text-left font-bold text-sand-900" dir={dir}>
        {value}
      </dd>
    </div>
  );
}

function PriceRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-sand-500">{label}</span>
      <span className="font-bold text-sand-700">{value} ر.س</span>
    </div>
  );
}

function Success({
  ref,
  vehicleName,
  onNavigate,
}: {
  ref: string;
  vehicleName: string;
  onNavigate: (r: Route) => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-sand-50 px-4 py-16">
      <div className="animate-scale-in w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-card-hover ring-1 ring-sand-200">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-50">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-white">
            <PartyPopper className="h-9 w-9" />
          </div>
        </div>
        <h2 className="mt-6 text-2xl font-black text-sand-900">تم تأكيد حجزك!</h2>
        <p className="mt-2 text-sand-600">
          تم استلام طلبك بنجاح. سيتواصل معك السائق قريباً لتأكيد الموعد.
        </p>

        <div className="mt-6 rounded-2xl bg-sand-50 p-5 text-right">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-sand-500">رقم الطلب</span>
            <span className="rounded-lg bg-primary-50 px-3 py-1 font-black text-primary-700">
              {ref}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm font-bold text-sand-500">المركبة</span>
            <span className="font-bold text-sand-900">{vehicleName}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Button onClick={() => onNavigate('admin')}>تتبع الطلب في لوحة التحكم</Button>
          <Button variant="ghost" onClick={() => onNavigate('home')}>
            العودة للرئيسية
          </Button>
        </div>
      </div>
    </div>
  );
}
