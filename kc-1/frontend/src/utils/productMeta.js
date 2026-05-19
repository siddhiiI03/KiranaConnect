export const productMeta = [
  { match: ['flour', 'grain', 'rice'], color: '#fbbf24', label: 'Grains', icon: 'wheat' },
  { match: ['pulse', 'dal'], color: '#34d399', label: 'Pulses', icon: 'basket' },
  { match: ['oil'], color: '#fb7185', label: 'Oil', icon: 'droplets' },
  { match: ['spice', 'chilli', 'turmeric'], color: '#f97316', label: 'Spices', icon: 'sparkles' },
  { match: ['beverage', 'tea', 'coffee'], color: '#60a5fa', label: 'Beverages', icon: 'coffee' },
  { match: ['snack', 'biscuit', 'packaged'], color: '#c084fc', label: 'Packaged', icon: 'cookie' },
  { match: ['home', 'care', 'detergent', 'dishwash'], color: '#22d3ee', label: 'Home Care', icon: 'boxes' },
  { match: ['dairy', 'milk'], color: '#93c5fd', label: 'Dairy', icon: 'milk' },
];

export const getProductMeta = (category = '', name = '') => {
  const text = `${category} ${name}`.toLowerCase();
  return productMeta.find((item) => item.match.some((term) => text.includes(term))) || {
    color: '#a78bfa',
    label: category || 'Product',
    icon: 'package',
  };
};

export const formatPrice = (value) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
}).format(value || 0);

export const productUnitLabel = (product) => product?.unit || 'unit';