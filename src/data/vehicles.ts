import type { Vehicle } from '@/types';

export const vehicles: Vehicle[] = [
  {
    id: 'pickup-ghamara',
    name: 'بيك أب غمارة',
    description: 'بيك أب بقمرة جانبية واحدة — مثالي لنقل الأثاث والأغراض المتوسطة داخل المدينة.',
    image:
      'https://images.pexels.com/photos/7873720/pexels-photo-7873720.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    capacityTons: 1,
    capacityVolume: '6 م³',
    maxPallets: 4,
    basePrice: 80,
    pricePerKm: 2.5,
    eta: '30–45 دقيقة',
    features: ['حمولة حتى 1 طن', 'مناسب للأثاث', 'تغطية داخل المدينة'],
  },
  {
    id: 'pickup-ghamartain',
    name: 'بيك أب غمارتين',
    description: 'بيك أب بقمرتين جانبيتين — حمولة أكبر لنقل البضائع والأجهزة الثقيلة.',
    image:
      'https://images.pexels.com/photos/1015555/pexels-photo-1015555.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    capacityTons: 1.5,
    capacityVolume: '9 م³',
    maxPallets: 6,
    basePrice: 110,
    pricePerKm: 3,
    eta: '30–45 دقيقة',
    features: ['حمولة حتى 1.5 طن', 'قمرتان جانبيتان', 'مناسب للبضائع الكثيرة'],
  },
  {
    id: 'van',
    name: 'فان',
    description: 'فان مغلق — الحل الأمثل للتوصيل السريع والنقل الآمن للبضائع الصغيرة.',
    image:
      'https://images.pexels.com/photos/18434074/pexels-photo-18434074.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    capacityTons: 1.2,
    capacityVolume: '10 م³',
    maxPallets: 5,
    basePrice: 90,
    pricePerKm: 2.8,
    eta: '20–35 دقيقة',
    features: ['مغلق ومأمون', 'توصيل سريع', 'حماية من العوامل الجوية'],
  },
  {
    id: 'dina-open',
    name: 'دينا مفتوحة',
    description: 'شاحنة دينا مفتوحة — لنقل المواد الإنشائية والمعدات كبيرة الحجم.',
    image:
      'https://images.pexels.com/photos/6407553/pexels-photo-6407553.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    capacityTons: 3,
    capacityVolume: '18 م³',
    maxPallets: 10,
    basePrice: 180,
    pricePerKm: 4.5,
    eta: '45–60 دقيقة',
    features: ['حمولة حتى 3 أطنان', 'منصة مفتوحة', 'مثالي للمواد الإنشائية'],
  },
  {
    id: 'dina-closed',
    name: 'دينا مغلقة',
    description: 'شاحنة دينا مغلقة — نقل آمن للبضائع الكبيرة مع حماية كاملة من العوامل الخارجية.',
    image:
      'https://images.pexels.com/photos/6940962/pexels-photo-6940962.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    capacityTons: 3,
    capacityVolume: '20 م³',
    maxPallets: 12,
    basePrice: 210,
    pricePerKm: 5,
    eta: '45–60 دقيقة',
    features: ['حمولة حتى 3 أطنان', 'مغلقة بالكامل', 'حماية كاملة للبضائع'],
  },
];

export const getVehicle = (id: string | null) =>
  id ? vehicles.find((v) => v.id === id) ?? null : null;
