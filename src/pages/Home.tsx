import {
  Truck,
  ShieldCheck,
  Clock,
  MapPin,
  ArrowLeft,
  Star,
  Package,
  Building2,
  Sofa,
  Zap,
  CheckCircle2,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/Button';
import { vehicles } from '@/data/vehicles';
import type { Route } from '@/types';

interface HomeProps {
  onNavigate: (route: Route) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div>
      <Hero onNavigate={onNavigate} />
      <Stats />
      <Services />
      <VehiclesPreview onNavigate={onNavigate} />
      <HowItWorks />
      <CTA onNavigate={onNavigate} />
    </div>
  );
}

function Hero({ onNavigate }: { onNavigate: (r: Route) => void }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/50 to-sand-50">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-accent-200/20 blur-3xl" />

      <div className="container-app relative grid gap-10 py-16 lg:grid-cols-2 lg:py-24">
        <div className="flex flex-col justify-center text-right">
          <div className="animate-slide-up">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-primary-700 shadow-card ring-1 ring-primary-100">
              <span className="flex h-2 w-2 rounded-full bg-primary-500" />
              منصة النقل الأولى في المملكة
            </span>
          </div>

          <h1 className="animate-slide-up mt-5 text-4xl font-black leading-tight text-sand-900 sm:text-5xl lg:text-6xl" style={{ animationDelay: '0.05s' }}>
            انقل أي شيء،
            <br />
            <span className="text-primary-600">في أي وقت</span>
          </h1>

          <p className="animate-slide-up mt-5 max-w-md text-lg leading-relaxed text-sand-600" style={{ animationDelay: '0.1s' }}>
            من الأثاث المنزلي إلى المواد الإنشائية — احجز المركبة المناسبة في دقائق، وتتبع شحنتك لحظة بلحظة.
          </p>

          <div className="animate-slide-up mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '0.15s' }}>
            <Button size="lg" onClick={() => onNavigate('booking')}>
              احجز مركبتك الآن
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => onNavigate('admin')}>
              لوحة التحكم
            </Button>
          </div>

          <div className="animate-slide-up mt-8 flex items-center gap-5 text-sm text-sand-500" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent-400 text-accent-400" />
                ))}
              </div>
              <span className="font-bold text-sand-700">4.9</span>
              <span>تقييم العملاء</span>
            </div>
            <div className="h-4 w-px bg-sand-300" />
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary-600" />
              <span>دفع آمن</span>
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div className="animate-scale-in relative">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-primary-900/10 ring-1 ring-sand-200">
            <img
              src="https://images.pexels.com/photos/18434074/pexels-photo-18434074.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="مركبة نقل"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sand-900/40 via-transparent to-transparent" />
          </div>

          {/* Floating card */}
          <div className="absolute -bottom-5 right-5 left-5 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-card-hover ring-1 ring-sand-100 sm:left-auto sm:w-64">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-sand-900">وصول سريع</div>
              <div className="text-xs text-sand-500">متوسط 30 دقيقة</div>
            </div>
            <div className="mr-auto text-left">
              <div className="text-xs font-bold text-primary-600">+12%</div>
              <div className="text-[10px] text-sand-400">هذا الشهر</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: '+15,000', label: 'رحلة مكتملة' },
    { value: '+3,200', label: 'عميل نشط' },
    { value: '500+', label: 'مركبة مسجلة' },
    { value: '24/7', label: 'دعم متواصل' },
  ];
  return (
    <section className="border-y border-sand-200 bg-white">
      <div className="container-app grid grid-cols-2 gap-6 py-10 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl font-black text-primary-600 lg:text-4xl">{s.value}</div>
            <div className="mt-1 text-sm font-bold text-sand-500">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: Sofa,
      title: 'نقل الأثاث',
      desc: 'نقل آمن للأثاث المنزلي والمكتبي مع خدمة تغليف احترافية.',
    },
    {
      icon: Package,
      title: 'شحن البضائع',
      desc: 'حلول شحن للشركات والمتاجر بأسعار تنافسية وتتبع مباشر.',
    },
    {
      icon: Building2,
      title: 'المواد الإنشائية',
      desc: 'نقل المواد الخام ومستلزمات البناء بكفاءة وسرعة.',
    },
    {
      icon: Zap,
      title: 'التوصيل السريع',
      desc: 'توصيل في نفس اليوم داخل المدينة مع وصول خلال 30 دقيقة.',
    },
  ];
  return (
    <section className="container-app py-16 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-bold text-primary-600">خدماتنا</span>
        <h2 className="mt-2 text-3xl font-black text-sand-900 sm:text-4xl">
          حلول نقل متكاملة لكل احتياجاتك
        </h2>
        <p className="mt-4 text-sand-600">
          سواء كنت تنقل أثاث منزلك أو تشحن بضاعة تجارية، لدينا المركبة المناسبة.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <div
            key={s.title}
            className="group rounded-2xl bg-white p-6 shadow-card ring-1 ring-sand-200 transition hover:-translate-y-1 hover:shadow-card-hover hover:ring-primary-200"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 transition group-hover:bg-primary-600 group-hover:text-white">
              <s.icon className="h-7 w-7" />
            </div>
            <h3 className="mt-5 text-lg font-extrabold text-sand-900">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-sand-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function VehiclesPreview({ onNavigate }: { onNavigate: (r: Route) => void }) {
  return (
    <section className="bg-gradient-to-b from-sand-100/60 to-sand-50 py-16 lg:py-24">
      <div className="container-app">
        <div className="flex flex-col items-end justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="text-sm font-bold text-primary-600">أسطولنا</span>
            <h2 className="mt-2 text-3xl font-black text-sand-900 sm:text-4xl">
              اختر المركبة المناسبة
            </h2>
          </div>
          <Button variant="outline" onClick={() => onNavigate('booking')}>
            عرض الكل والحجز
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.slice(0, 3).map((v) => (
            <div
              key={v.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-sand-200 transition hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={v.image}
                  alt={v.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-2 right-2 rounded-lg bg-black/55 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                  {v.eta}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-extrabold text-sand-900">{v.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-sand-600">{v.description}</p>
                <div className="mt-4 flex items-center justify-between border-t border-sand-100 pt-4">
                  <span className="text-xs font-bold text-sand-400">يبدأ من</span>
                  <span className="text-lg font-extrabold text-primary-600">
                    {v.basePrice} ر.س
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: MapPin,
      title: 'حدد نقطة الانطلاق والوصول',
      desc: 'أدخل عنوان الاستلام والتوصيل لتحديد المسافة.',
    },
    {
      icon: Truck,
      title: 'اختر مركبتك',
      desc: 'تصفح أسطولنا واختر المركبة المناسبة لاحتياجك.',
    },
    {
      icon: CheckCircle2,
      title: 'أكّد الحجز',
      desc: 'أدخل بياناتك وأكّد الحجز، وسنتولى الباقي.',
    },
  ];
  return (
    <section className="container-app py-16 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-bold text-primary-600">كيف نعمل</span>
        <h2 className="mt-2 text-3xl font-black text-sand-900 sm:text-4xl">احجز في 3 خطوات</h2>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.title} className="relative text-center">
            <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-lg shadow-primary-600/30">
              <s.icon className="h-8 w-8" />
              <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent-400 text-sm font-black text-sand-900 ring-4 ring-sand-50">
                {i + 1}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-extrabold text-sand-900">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-sand-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA({ onNavigate }: { onNavigate: (r: Route) => void }) {
  return (
    <section className="container-app pb-16 lg:pb-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 to-primary-900 px-6 py-14 text-center shadow-2xl shadow-primary-900/30 sm:px-12">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-accent-400/20 blur-2xl" />

        <div className="relative">
          <h2 className="text-3xl font-black text-white sm:text-4xl">جاهز لبدء رحلتك؟</h2>
          <p className="mx-auto mt-4 max-w-md text-primary-100">
            انضم لآلاف العملاء الذين يعتمدون على نَقلة لنقل بضائعهم يومياً.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="bg-white text-primary-700 hover:bg-sand-100"
              onClick={() => onNavigate('booking')}
            >
              احجز الآن
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <a
              href="tel:+966551234567"
              className="inline-flex h-13 items-center gap-2 rounded-xl px-5 text-base font-bold text-white ring-1 ring-white/30 transition hover:bg-white/10"
            >
              <Phone className="h-5 w-5" />
              <span dir="ltr">+966 55 123 4567</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
