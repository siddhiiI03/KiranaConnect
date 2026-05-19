import { useEffect, useMemo, useState } from 'react';
import AppLayout from '../components/AppLayout';
import { createProduct, deleteProduct, getProducts } from '../services/api';
import { useAuth } from '../context/useAuth';
import ProductIcon from '../components/ProductIcon';
import { formatPrice, productUnitLabel } from '../utils/productMeta';

const emptyProduct = {
  name: '',
  category: '',
  description: '',
  price: '',
  stock: '',
  minimumOrderQty: 1,
  unit: '',
};

export default function Inventory() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyProduct);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  const isWholesaler = user?.role === 'wholesaler';

  const loadProducts = () => getProducts().then(({ data }) => setProducts(data));

  useEffect(() => {
    loadProducts();
  }, []);

  const myProducts = useMemo(() => {
    if (!isWholesaler) return products;
    return products.filter((product) => product.wholesaler?._id === user?.id || product.wholesaler === user?.id);
  }, [isWholesaler, products, user?.id]);

  const filteredProducts = myProducts.filter((product) => {
    const text = `${product.name} ${product.category} ${product.description}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  const lowStockCount = myProducts.filter((product) => Number(product.stock) <= 10).length;
  const inventoryValue = myProducts.reduce((sum, product) => sum + Number(product.price || 0) * Number(product.stock || 0), 0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus('');

    try {
      await createProduct({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        minimumOrderQty: Number(form.minimumOrderQty || 1),
        unit: form.unit || 'unit',
      });
      setForm(emptyProduct);
      setStatus('Product added to inventory.');
      loadProducts();
    } catch (err) {
      setStatus(err.response?.data?.message || 'Could not add product.');
    } finally {
      setSaving(false);
    }
  };

  const removeProduct = async (id) => {
    await deleteProduct(id);
    loadProducts();
  };

  return (
    <AppLayout title="Inventory" subtitle="Manage stock, pricing, categories, and low-stock visibility.">
      <section className="kc-command-grid">
        <article className="kc-command-card"><span>Total SKUs</span><strong>{myProducts.length}</strong></article>
        <article className="kc-command-card"><span>Low Stock</span><strong>{lowStockCount}</strong></article>
        <article className="kc-command-card"><span>Inventory Value</span><strong>{formatPrice(inventoryValue)}</strong></article>
      </section>

      <section className="kc-two-column kc-inventory-layout">
        {isWholesaler && (
          <div className="kc-form-panel">
            <h2>Add Product</h2>
            <form className="kc-modern-form" onSubmit={handleSubmit}>
              <label>Name<input placeholder="e.g. Basmati Rice 25 kg" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required /></label>
              <label>Category<input placeholder="Rice & Grains" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} required /></label>
              <label>Description<textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label>
              <div className="kc-form-grid">
                <label>Wholesale Price<input type="number" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} required /></label>
                <label>Stock Units<input type="number" value={form.stock} onChange={(event) => setForm({ ...form, stock: event.target.value })} required /></label>
                <label>MOQ<input type="number" value={form.minimumOrderQty} onChange={(event) => setForm({ ...form, minimumOrderQty: event.target.value })} /></label>
                <label>Unit<input placeholder="25 kg bag" value={form.unit} onChange={(event) => setForm({ ...form, unit: event.target.value })} /></label>
              </div>
              {status && <p className="kc-form-status">{status}</p>}
              <button className="kc-premium-btn" disabled={saving}>{saving ? 'Adding...' : 'Add Product'}</button>
            </form>
          </div>
        )}

        <div className="kc-form-panel kc-wide-panel">
          <div className="kc-page-toolbar">
            <h2>{isWholesaler ? 'My Products' : 'Marketplace Stock'}</h2>
            <input placeholder="Search inventory..." value={search} onChange={(event) => setSearch(event.target.value)} />
          </div>
          <div className="kc-data-table">
            <div className="kc-data-head"><span>Product</span><span>Category</span><span>Price</span><span>Stock</span><span>Action</span></div>
            {filteredProducts.map((product) => (
              <div className="kc-data-row" key={product._id}>
                <span className="kc-inventory-product">
                  <ProductIcon category={product.category} name={product.name} size={18} />
                  <span><strong>{product.name}</strong><small>{product.brand || product.description || 'No description'}</small></span>
                </span>
                <span>{product.category}</span>
                <span>{formatPrice(product.price)}<small>/{productUnitLabel(product)}</small></span>
                <span className={Number(product.stock) <= 10 ? 'kc-danger-chip' : 'kc-good-chip'}>{product.stock}</span>
                <span>{isWholesaler ? <button onClick={() => removeProduct(product._id)}>Delete</button> : <span className="kc-muted-chip">Available</span>}</span>
              </div>
            ))}
            {!filteredProducts.length && <p className="kc-empty-copy">No products found.</p>}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
