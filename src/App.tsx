import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Home } from '@/pages/Home';
import { Booking } from '@/pages/Booking';
import { Admin } from '@/pages/Admin';
import { mockOrders } from '@/data/mockData';
import { getVehicle } from '@/data/vehicles';
import type { BookingDraft, Order, Route } from '@/types';

function App() {
  const [route, setRoute] = useState<Route>('home');
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const navigate = (r: Route) => {
    setRoute(r);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirm = (draft: BookingDraft): string => {
    const vehicle = getVehicle(draft.vehicleId);
    const price = vehicle
      ? Math.round(vehicle.basePrice + vehicle.pricePerKm * draft.distanceKm)
      : 0;
    const ref = `NQL-${1025 + orders.length}`;
    const newOrder: Order = {
      id: String(orders.length + 1),
      reference: ref,
      customerName: draft.customerName,
      customerPhone: draft.customerPhone,
      vehicleName: vehicle?.name ?? '',
      pickup: draft.pickup,
      dropoff: draft.dropoff,
      distanceKm: draft.distanceKm,
      price,
      status: 'pending',
      createdAt: new Date().toISOString(),
      scheduledDate: new Date(draft.scheduledDate).toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    return ref;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar route={route} onNavigate={navigate} />
      <main className="flex-1">
        {route === 'home' && <Home onNavigate={navigate} />}
        {route === 'booking' && <Booking onNavigate={navigate} onConfirm={handleConfirm} />}
        {route === 'admin' && <Admin orders={orders} onNavigate={navigate} />}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;
