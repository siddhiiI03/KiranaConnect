import { useEffect, useState } from 'react';
import AppLayout from '../components/AppLayout';
import { StatCard } from '../components/DashboardCards';
import { getAnalytics } from '../services/api';

const money = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value || 0);

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    getAnalytics().then(({ data }) => setAnalytics(data));
  }, []);

  const stats = analytics?.stats || {};

  return (
    <AppLayout title="Analytics" subtitle="Track order health, inventory pressure, and recent movement.">
      <section className="kc-stat-grid">
        <StatCard label="Total Orders" value={stats.totalOrders || 0} detail="All time" tone="purple" />
        <StatCard label="Revenue / Spend" value={money(stats.totalRevenue)} detail="Across orders" tone="green" />
        <StatCard label="Pending" value={stats.pendingOrders || 0} detail="Needs attention" tone="amber" />
        <StatCard label="Low Stock" value={stats.lowStockCount || 0} detail="Restock soon" tone="coral" />
      </section>

      <section className="kc-two-column">
        <div className="kc-form-panel">
          <h2>Recent Orders</h2>
          <div className="kc-list-stack">
            {(analytics?.recentOrders || []).map((order) => (
              <article key={order._id}>
                <strong>{money(order.totalAmount)}</strong>
                <span>{order.status}</span>
              </article>
            ))}
            {!analytics?.recentOrders?.length && <p>No orders yet.</p>}
          </div>
        </div>
        <div className="kc-form-panel">
          <h2>Categories</h2>
          <div className="kc-list-stack">
            {(analytics?.categories || []).map((category) => (
              <article key={category.name}>
                <strong>{category.name}</strong>
                <span>{category.count} products</span>
              </article>
            ))}
            {!analytics?.categories?.length && <p>No product categories yet.</p>}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}