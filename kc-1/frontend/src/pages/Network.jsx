import { useEffect, useMemo, useState } from 'react';
import AppLayout from '../components/AppLayout';
import { getAllOrders, getMyOrders, getProducts } from '../services/api';
import { useAuth } from '../context/useAuth';

export default function Network() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const isWholesaler = user?.role === 'wholesaler';

  useEffect(() => {
    (isWholesaler ? getAllOrders() : getMyOrders()).then(({ data }) => setOrders(data));
    getProducts().then(({ data }) => setProducts(data));
  }, [isWholesaler]);

  const partners = useMemo(() => {
    const map = new Map();

    if (isWholesaler) {
      orders.forEach((order) => {
        const partner = order.kirana;
        if (partner?._id) map.set(partner._id, { name: partner.shopName || partner.name, detail: partner.phone || 'No phone', meta: 'Buyer' });
      });
    } else {
      products.forEach((product) => {
        const partner = product.wholesaler;
        if (partner?._id) map.set(partner._id, { name: partner.shopName || partner.name, detail: partner.email || 'Wholesaler', meta: product.category || 'Supplier' });
      });
    }

    return Array.from(map.values());
  }, [isWholesaler, orders, products]);

  return (
    <AppLayout title="Network" subtitle="See the shops, suppliers, and business relationships connected to your orders.">
      <section className="kc-command-grid">
        <article className="kc-command-card"><span>{isWholesaler ? 'Buyer Accounts' : 'Suppliers'}</span><strong>{partners.length}</strong></article>
        <article className="kc-command-card"><span>Linked Orders</span><strong>{orders.length}</strong></article>
        <article className="kc-command-card"><span>Marketplace SKUs</span><strong>{products.length}</strong></article>
      </section>

      <section className="kc-form-panel">
        <h2>{isWholesaler ? 'Retailer Accounts' : 'Supplier Directory'}</h2>
        <div className="kc-partner-grid">
          {partners.map((partner) => (
            <article className="kc-partner-card" key={`${partner.name}-${partner.detail}`}>
              <span>{partner.name?.slice(0, 1)?.toUpperCase() || 'K'}</span>
              <div>
                <strong>{partner.name}</strong>
                <p>{partner.detail}</p>
                <small>{partner.meta}</small>
              </div>
            </article>
          ))}
          {!partners.length && <p className="kc-empty-copy">Your network will appear after orders or supplier listings are available.</p>}
        </div>
      </section>
    </AppLayout>
  );
}