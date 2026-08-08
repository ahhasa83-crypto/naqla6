export interface Vehicle {
  id: string;
  name: string;
  description: string;
  image: string;
  capacityTons: number;
  capacityVolume: string;
  maxPallets: number;
  basePrice: number;
  pricePerKm: number;
  eta: string;
  features: string[];
}

export type OrderStatus = 'pending' | 'confirmed' | 'in_transit' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  reference: string;
  customerName: string;
  customerPhone: string;
  vehicleName: string;
  pickup: string;
  dropoff: string;
  distanceKm: number;
  price: number;
  status: OrderStatus;
  createdAt: string;
  scheduledDate: string;
}

export type Route = 'home' | 'booking' | 'admin';

export interface BookingDraft {
  vehicleId: string | null;
  pickup: string;
  dropoff: string;
  distanceKm: number;
  scheduledDate: string;
  notes: string;
  customerName: string;
  customerPhone: string;
}
