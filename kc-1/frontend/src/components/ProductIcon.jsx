import { Boxes, Coffee, Cookie, Droplets, Milk, Package, ShoppingBasket, Sparkles, Wheat } from 'lucide-react';
import { getProductMeta } from '../utils/productMeta';

const icons = {
  wheat: Wheat,
  basket: ShoppingBasket,
  droplets: Droplets,
  sparkles: Sparkles,
  coffee: Coffee,
  cookie: Cookie,
  boxes: Boxes,
  milk: Milk,
  package: Package,
};

export default function ProductIcon({ category, name, size = 22 }) {
  const item = getProductMeta(category, name);
  const Icon = icons[item.icon] || Package;

  return (
    <span className="kc-product-icon" style={{ '--product-color': item.color }}>
      <Icon size={size} />
    </span>
  );
}