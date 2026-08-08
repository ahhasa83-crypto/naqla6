import { useMemo, useState } from 'react';
import {
  TrendingUp,
  Truck,
  Clock,
  CheckCircle2,
  Search,
  X,
  MapPin,
  Phone,
  User,
  Calendar,
  Package,
  Filter,
  ArrowUpDown,
} from 'lucide-react';
import { Button } from '@/components/Button';
import { statusLabels, statusColors } from '@/data/mockData';
import type { Order, OrderStatus, Route } from '@/types';

interface AdminProps {
  orders: Order[];
  onNavigate: (route: Route) => void;
}

type SortKey = 'createdAt' | 'price' | 'distanceKm';

export function Admin({ orders, onNavigate }: AdminProps) {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('createdAt');
  const [sortDesc, setSortDesc] = useState(true);
  const [selected, setSelected] = useState<Order | null>(null);

  const filtered = useMemo(() => {
    let result = [...orders];
    if (statusFilter !== 'all') result = result.filter((o) => o.status === statusFilter);
    if (query.trim()) {
      const q = query.trim();
      result = result.filter(
        (o) =>
          o.reference.includes(q) ||
          o.customerName.includes(q) ||
          o.vehicleName.includes(q) ||
          o.pickup.includes(q) ||
          o.dropoff.includes(q),
      );
    }
    result.sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'price') cmp = a.price - b.price;
      else if (sortKey === 'distanceKm') cmp = a.distanceKm - b.distanceKm;
      else cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return sortDesc ? -cmp : cmp;
    });
    return result;
  }, [orders, query, statusFilter, sortKey, sortDesc]);

  const stats = useMemo(() => {
    const revenue = orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.price, 0);
    const active = orders.filter((o) => o.status === 'in_transit' || o.status === 'confirmed').length;
    const pending = orders.filter((o) => o.status === 'pending').length;
    const completed = orders.filter((o) => o.status === 'completed').length;
    return { revenue, active, pending, completed };
  }, [orders]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDesc((v) => !v);
    else {
      setSortKey(key);
      setSortDesc(true);
    }
  };

  return (
    <div className="bg-sand-50 pb-20 pt-8">
      <div className="container-app">
        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-black text-sand-900 sm:text-3xl">لوحة التحكم</h1>
            <p className="mt-1 text-sm text-sand-500">إدارة طلبات النقل والشحن</p>
          </div>
          <Button onClick={() => onNavigate('booking')}>
            <Truck className="h-4 w-4" />
            حجز جديد
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={TrendingUp}
            label="إجمالي الإيرادات"
            value={`${stats.revenue.toLocaleString('ar-SA')} ر.س`}
            tint="primary"
          />
          <StatCard
            icon={Truck}
            label="رحلات نشطة"
            value={String(stats.active)}
            tint="blue"
          />
          <StatCard
            icon={Clock}
            label="بانتظار التأكيد"
            value={String(stats.pending)}
            tint="accent"
          />
          <StatCard
            icon={CheckCircle2}
            label="رحلات مكتملة"
            value={String(stats.completed)}
            tint="emerald"
          />
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-card ring-1 ring-sand-200 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-400" />
            <input
              className="input-field pr-10"
              placeholder="ابحث برقم الطلب، الاسم، المركبة..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter className="h-4 w-4 shrink-0 text-sand-400" />
            {(['all', 'pending', 'confirmed', 'in_transit', 'completed', 'cancelled'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={[
                  'whitespace-nowrap rounded-lg px-3 py-2 text-xs font-bold transition',
                  statusFilter === s
                    ? 'bg-primary-600 text-white'
                    : 'bg-sand-100 text-sand-600 hover:bg-sand-200',
                ].join(' ')}
              >
                {s === 'all' ? 'الكل' : statusLabels[s]}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-sand-200">
          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-right text-sm">
              <thead>
                <tr className="border-b border-sand-200 bg-sand-50 text-xs font-bold text-sand-500">
                  <th className="px-4 py-3">رقم الطلب</th>
                  <th className="px-4 py-3">العميل</th>
                  <th className="px-4 py-3">المركبة</th>
                  <th className="px-4 py-3">المسار</th>
                  <th className="cursor-pointer px-4 py-3 hover:text-sand-700" onClick={() => toggleSort('distanceKm')}>
                    <span className="flex items-center gap-1">
                      المسافة
                      <ArrowUpDown className="h-3 w-3" />
                    </span>
                  </th>
                  <th className="cursor-pointer px-4 py-3 hover:text-sand-700" onClick={() => toggleSort('price')}>
                    <span className="flex items-center gap-1">
                      السعر
                      <ArrowUpDown className="h-3 w-3" />
                    </span>
                  </th>
                  <th className="cursor-pointer px-4 py-3 hover:text-sand-700" onClick={() => toggleSort('createdAt')}>
                    <span className="flex items-center gap-1">
                      التاريخ
                      <ArrowUpDown className="h-3 w-3" />
                    </span>
                  </th>
                  <th className="px-4 py-3">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr
                    key={o.id}
                    onClick={() => setSelected(o)}
                    className="cursor-pointer border-b border-sand-100 transition hover:bg-primary-50/40"
                  >
                    <td className="px-4 py-3 font-black text-primary-700">{o.reference}</td>
                    <td className="px-4 py-3 font-bold text-sand-900">{o.customerName}</td>
                    <td className="px-4 py-3 text-sand-600">{o.vehicleName}</td>
                    <td className="px-4 py-3">
                      <div className="max-w-[200px] truncate text-sand-600">{o.pickup}</div>
                      <div className="max-w-[200px] truncate text-sand-400">{o.dropoff}</div>
                    </td>
                    <td className="px-4 py-3 text-sand-600">{o.distanceKm} كم</td>
                    <td className="px-4 py-3 font-bold text-sand-900">{o.price} ر.س</td>
                    <td className="px-4 py-3 text-sand-500">
                      {new Date(o.createdAt).toLocaleDateString('ar-SA')}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={o.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="divide-y divide-sand-100 md:hidden">
            {filtered.map((o) => (
              <button
                key={o.id}
                onClick={() => setSelected(o)}
                className="flex w-full flex-col gap-2 p-4 text-right transition hover:bg-sand-50"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-primary-700">{o.reference}</span>
                  <StatusBadge status={o.status} />
                </div>
                <div className="font-bold text-sand-900">{o.customerName}</div>
                <div className="text-xs text-sand-500">{o.vehicleName} · {o.distanceKm} كم</div>
                <div className="flex items-center justify-between">
                  <span className="truncate text-xs text-sand-400">{o.pickup}</span>
                  <span className="font-bold text-sand-700">{o.price} ر.س</span>
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center text-sand-400">
              <Package className="mx-auto h-10 w-10" />
              <p className="mt-3 text-sm font-bold">لا توجد طلبات مطابقة</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail drawer */}
      {selected && <OrderDrawer order={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tint,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  tint: 'primary' | 'blue' | 'accent' | 'emerald';
}) {
  const tints: Record<string, string> = {
    primary: 'bg-primary-50 text-primary-600',
    blue: 'bg-blue-50 text-blue-600',
    accent: 'bg-accent-50 text-accent-600',
    emerald: 'bg-emerald-50 text-emerald-600',
  };
  return (
    <div className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-sand-200">
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${tints[tint]}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="mt-4 text-2xl font-black text-sand-900">{value}</div>
      <div className="mt-0.5 text-xs font-bold text-sand-500">{label}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${statusColors[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {statusLabels[status]}
    </span>
  );
}

function OrderDrawer({ order, onClose }: { order: Order; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-sand-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="animate-slide-up relative mr-auto h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-sand-200 bg-white/90 px-5 py-4 backdrop-blur">
          <div>
            <h3 className="text-lg font-black text-sand-900">تفاصيل الطلب</h3>
            <p className="text-sm font-bold text-primary-600">{order.reference}</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-sand-500 hover:bg-sand-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 p-5">
          <StatusBadge status={order.status} />

          <div className="space-y-4 rounded-2xl bg-sand-50 p-5">
            <DetailRow icon={User} label="العميل" value={order.customerName} />
            <DetailRow icon={Phone} label="الجوال" value={order.customerPhone} dir="ltr" />
            <DetailRow icon={Truck} label="المركبة" value={order.vehicleName} />
            <DetailRow icon={Calendar} label="موعد الحجز" value={new Date(order.scheduledDate).toLocaleString('ar-SA', { dateStyle: 'medium', timeStyle: 'short' })} />
            <DetailRow icon={Calendar} label="تاريخ الإنشاء" value={new Date(order.createdAt).toLocaleString('ar-SA', { dateStyle: 'medium', timeStyle: 'short' })} />
          </div>

          <div className="rounded-2xl border border-sand-200 p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-extrabold text-sand-900">
              <MapPin className="h-4 w-4 text-primary-600" />
              المسار
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-3 w-3 shrink-0 rounded-full bg-primary-500 ring-4 ring-primary-100" />
                <div>
                  <div className="text-xs font-bold text-sand-400">انطلاق</div>
                  <div className="text-sm font-bold text-sand-900">{order.pickup}</div>
                </div>
              </div>
              <div className="mr-1.5 h-6 w-px bg-sand-200" />
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-3 w-3 shrink-0 rounded-full bg-accent-500 ring-4 ring-accent-100" />
                <div>
                  <div className="text-xs font-bold text-sand-400">وصول</div>
                  <div className="text-sm font-bold text-sand-900">{order.dropoff}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-primary-600 p-5 text-white">
            <div>
              <div className="text-xs font-bold text-primary-100">الإجمالي</div>
              <div className="text-sm text-primary-200">{order.distanceKm} كم</div>
            </div>
            <div className="text-3xl font-black">
              {order.price}
              <span className="text-sm font-bold text-primary-200"> ر.س</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
  dir,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  dir?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="flex items-center gap-2 text-sm font-bold text-sand-500">
        <Icon className="h-4 w-4 text-sand-400" />
        {label}
      </span>
      <span className="text-left text-sm font-bold text-sand-900" dir={dir}>
        {value}
      </span>
    </div>
  );
}
