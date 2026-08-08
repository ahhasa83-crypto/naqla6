import { Phone, Mail, MapPin, Truck } from 'lucide-react';
import { Logo } from '@/components/Logo';
import type { Route } from '@/types';

interface FooterProps {
  onNavigate: (route: Route) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="mt-20 border-t border-sand-200 bg-white">
      <div className="container-app grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-sand-500">
            منصة النقل والشحن الأولى في المملكة. نربطك بمركبات موثوقة في دقائق.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-extrabold text-sand-900">روابط سريعة</h4>
          <ul className="space-y-2 text-sm text-sand-600">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-primary-600">
                الرئيسية
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('booking')} className="hover:text-primary-600">
                احجز مركبة
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('admin')} className="hover:text-primary-600">
                لوحة التحكم
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-extrabold text-sand-900">خدماتنا</h4>
          <ul className="space-y-2 text-sm text-sand-600">
            <li>نقل الأثاث المنزلي</li>
            <li>شحن البضائع التجارية</li>
            <li>نقل المواد الإنشائية</li>
            <li>التوصيل السريع</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-extrabold text-sand-900">تواصل معنا</h4>
          <ul className="space-y-3 text-sm text-sand-600">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary-600" />
              <span dir="ltr">+966 55 123 4567</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary-600" />
              info@naqla.sa
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary-600" />
              الرياض، المملكة العربية السعودية
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sand-200">
        <div className="container-app flex flex-col items-center justify-between gap-2 py-5 sm:flex-row">
          <p className="flex items-center gap-1.5 text-xs text-sand-400">
            <Truck className="h-3.5 w-3.5" />
            © 2026 نَقلة — جميع الحقوق محفوظة
          </p>
          <p className="text-xs text-sand-400">صُنع في المملكة العربية السعودية</p>
        </div>
      </div>
    </footer>
  );
}
