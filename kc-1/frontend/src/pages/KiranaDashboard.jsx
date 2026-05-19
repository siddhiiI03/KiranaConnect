// frontend/src/pages/KiranaDashboard.jsx

import { useState, useEffect, useMemo } from "react";
import { Store } from "lucide-react";
import ProductIcon from "../components/ProductIcon";
import { formatPrice, productUnitLabel } from "../utils/productMeta";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/useAuth";

import {
  getProducts,
  createOrder,
  getMyOrders,
  getProfile,
  updateProfile,
} from "../services/api";

export default function KiranaDashboard() {
  const { logout } = useAuth();

  const navigate = useNavigate();

  // ================= STATES =================
  const [tab, setTab] = useState("browse");

  const [products, setProducts] = useState([]);

  const [orders, setOrders] = useState([]);

  const [cart, setCart] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [toast, setToast] = useState("");

  const [placingOrder, setPlacingOrder] = useState(false);

  // ================= PROFILE =================
  const [profile, setProfile] = useState({
    shopName: "",

    phone: "",

    address: "",

    city: "",

    state: "",

    pincode: "",
  });

  // ================= FETCH =================
  useEffect(() => {
    fetchProducts();

    fetchProfile();
  }, []);

  useEffect(() => {
    if (tab === "orders") {
      fetchOrders();
    }
  }, [tab]);

  // ================= PRODUCTS =================
  async function fetchProducts() {
    try {
      const { data } = await getProducts();

      setProducts(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  // ================= ORDERS =================
  async function fetchOrders() {
    try {
      const { data } = await getMyOrders();

      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  }

  // ================= PROFILE =================
  async function fetchProfile() {
    try {
      const { data } = await getProfile();

      setProfile(data);
    } catch (err) {
      console.log(err);
    }
  }

  // ================= TOAST =================
  const showToast = (msg) => {
    setToast(msg);

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  // ================= LOGOUT =================
  const handleLogout = () => {
    logout();

    navigate("/");
  };

  // ================= ADD TO CART =================
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product._id === product._id);

      if (existing) {
        return prev.map((item) =>
          item.product._id === product._id
            ? {
                ...item,

                qty: item.qty + 1,
              }
            : item,
        );
      }

      return [
        ...prev,

        {
          product,

          qty: 1,
        },
      ];
    });

    showToast(`${product.name} added to cart’`);
  };

  // ================= REMOVE =================
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.product._id !== id));
  };

  // ================= QTY =================
  const changeQty = (id, value) => {
    if (value < 1) return;

    setCart((prev) =>
      prev.map((item) =>
        item.product._id === id
          ? {
              ...item,

              qty: value,
            }
          : item,
      ),
    );
  };

  // ================= TOTAL =================
  const subtotal = useMemo(() => {
    return cart.reduce(
      (acc, item) => {
        return acc + item.product.price * item.qty;
      },

      0,
    );
  }, [cart]);

  const gst = subtotal * 0.18;

  const total = subtotal + gst;

  // ================= PLACE ORDER =================
  const placeOrder = async () => {
    try {
      setPlacingOrder(true);

      const items = cart.map((item) => ({
        product: item.product._id,

        quantity: item.qty,

        price: item.product.price,
      }));

      await createOrder({
        items,

        wholesaler: cart[0]?.product?.wholesaler?._id,

        subtotal,

        gst,

        totalAmount: total,
      });

      showToast("Order placed successfully");

      setCart([]);

      fetchOrders();

      setTab("orders");
    } catch (err) {
      console.log(err);

      showToast("Order failed");
    } finally {
      setPlacingOrder(false);
    }
  };

  // ================= ETA =================
  const getETA = (eta) => {
    if (!eta) {
      return "Not dispatched yet";
    }

    const diff = new Date(eta) - new Date();

    if (diff <= 0) {
      return "Arriving Soon";
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));

    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  // ================= FILTER =================
  const filteredProducts = products.filter(
    (product) =>
      product.name

        ?.toLowerCase()

        .includes(search.toLowerCase()) ||
      product.category

        ?.toLowerCase()

        .includes(search.toLowerCase()),
  );

  return (
    <div className="kc-dashboard-shell kc-kirana-theme" style={styles.wrapper}>
      {/* TOAST */}
      {toast && <div style={styles.toast}>{toast}</div>}

      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>
            <Store size={20} />
          </div>

          <h1 style={styles.logo}>KiranaConnect</h1>
        </div>

        <button
          style={tab === "browse" ? styles.activeBtn : styles.sideBtn}
          onClick={() => setTab("browse")}
        >
           Products
        </button>

        <button
          style={tab === "cart" ? styles.activeBtn : styles.sideBtn}
          onClick={() => setTab("cart")}
        >
          Cart ({cart.length})
        </button>

        <button
          style={tab === "orders" ? styles.activeBtn : styles.sideBtn}
          onClick={() => setTab("orders")}
        >
           Orders
        </button>
        <button style={styles.sideBtn} onClick={() => navigate("/analytics")}>Analytics</button>
        <button style={styles.sideBtn} onClick={() => navigate("/profile")}>Profile</button>
        <button style={styles.sideBtn} onClick={() => navigate("/settings")}>Settings</button>
        <button style={styles.sideBtn} onClick={() => navigate("/support")}>Support</button>


        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <main style={styles.main}>
        {/* TOP BAR */}
        <div style={styles.topBar}>
          <h1 style={styles.heading}>
            {tab === "browse"
              ? "Products"
              : tab === "cart"
                ? "My Cart"
                : tab === "orders"
                  ? "Orders"
                  : "My Profile"}
          </h1>

          <div style={styles.topRight}>
            {tab !== "profile" && (
              <input
                style={styles.search}
                placeholder="Search Products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            )}

            <div style={styles.profileCircle} onClick={() => setTab("profile")}>
              
            </div>
          </div>
        </div>

        {/* PRODUCTS */}

        {tab === "browse" && (
          <div>
            {loading ? (
              <h2>Loading...</h2>
            ) : (
              <div style={styles.grid}>
                {filteredProducts.map((product) => (
                  <div key={product._id} className="kc-product-card" style={styles.card}>
                    <div className="kc-product-card-head">
                      <ProductIcon category={product.category} name={product.name} size={24} />
                      <div>
                        <h2>{product.name}</h2>
                        <p>{product.brand || product.category}</p>
                      </div>
                    </div>

                    <div className="kc-product-meta-row">
                      <span>{product.category}</span>
                      <span>MOQ {product.minimumOrderQty || 1}</span>
                    </div>

                    <h3>{formatPrice(product.price)}</h3>

                    <p>{productUnitLabel(product)} - Stock: {product.stock}</p>

                    <button
                      style={styles.addBtn}
                      onClick={() => addToCart(product)}
                    >
                      Add To Cart
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CART */}
        {tab === "cart" && (
          <div>
            {cart.length === 0 ? (
              <h2>Cart Empty›’</h2>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.product._id} style={styles.cartCard}>
                    <div>
                      <h2>{item.product.name}</h2>

                      <p>{formatPrice(item.product.price)} / {productUnitLabel(item.product)}</p>
                    </div>

                    <div style={styles.qtyBox}>
                      <button
                        style={styles.qtyBtn}
                        onClick={() =>
                          changeQty(
                            item.product._id,

                            item.qty - 1,
                          )
                        }
                      >
                        -
                      </button>

                      <span>{item.qty}</span>

                      <button
                        style={styles.qtyBtn}
                        onClick={() =>
                          changeQty(
                            item.product._id,

                            item.qty + 1,
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      style={styles.removeBtn}
                      onClick={() => removeFromCart(item.product._id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <div style={styles.billBox}>
                  <h3>Subtotal: {formatPrice(subtotal)}</h3>

                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    GST (18%): {formatPrice(gst)}
                  </h3>

                  <h2>Total: {formatPrice(total)}</h2>

                  <button style={styles.orderBtn} onClick={placeOrder}>
                    {placingOrder ? "Placing..." : "Place Order"}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ORDERS */}
        {tab === "orders" && (
          <div>
            {orders.map((order) => (
              <div key={order._id} style={styles.orderCard}>
                <h3>{formatPrice(order.totalAmount)}</h3>

                <p>Status: {order.status}</p>

                <p>ETA: {getETA(order.deliveryETA)}</p>
              </div>
            ))}
          </div>
        )}

        {/* PROFILE */}
        {tab === "profile" && (
          <div>
            <form
              style={styles.profileForm}
              onSubmit={async (e) => {
                e.preventDefault();

                try {
                  await updateProfile(profile);

                  showToast("Profile Updated");
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              <input
                style={styles.profileInput}
                placeholder="Shop Name"
                value={profile.shopName || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,

                    shopName: e.target.value,
                  })
                }
              />

              <input
                style={styles.profileInput}
                placeholder="Phone"
                value={profile.phone || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,

                    phone: e.target.value,
                  })
                }
              />

              <input
                style={styles.profileInput}
                placeholder="Address"
                value={profile.address || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,

                    address: e.target.value,
                  })
                }
              />

              <input
                style={styles.profileInput}
                placeholder="City"
                value={profile.city || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,

                    city: e.target.value,
                  })
                }
              />

              <input
                style={styles.profileInput}
                placeholder="State"
                value={profile.state || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,

                    state: e.target.value,
                  })
                }
              />

              <input
                style={styles.profileInput}
                placeholder="Pincode"
                value={profile.pincode || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,

                    pincode: e.target.value,
                  })
                }
              />

              <button type="submit" style={styles.saveBtn}>
                Save Profile
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

// ================= STYLES =================
const styles = {
  wrapper: {
    display: "flex",

    minHeight: "100vh",

    background: "#f6f1e8",

    fontFamily: "sans-serif",
  },

  toast: {
    position: "fixed",

    top: "20px",

    right: "20px",

    background: "#16a34a",

    color: "#fff",

    padding: "14px 20px",

    borderRadius: "10px",

    zIndex: 999,
  },

  sidebar: {
    width: "250px",

    background: "#24170f",

    padding: "30px 20px",

    display: "flex",

    flexDirection: "column",

    gap: "14px",
  },

  logo: {
    color: "#fff",
    fontSize: "18px",
    fontWeight: "700",
    margin: 0,
    whiteSpace: "nowrap",
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "34px",
  },
  logoIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "16px",
    background: "#6f4e37",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    flexShrink: 0,
  },

  sideBtn: {
    padding: "14px",

    border: "none",

    borderRadius: "10px",

    background: "#2b1d14",

    color: "#fff",

    cursor: "pointer",

    textAlign: "left",
  },

  activeBtn: {
    padding: "14px",

    border: "none",

    borderRadius: "10px",

    background: "#6f4e37",

    color: "#fff",

    cursor: "pointer",

    textAlign: "left",
  },

  logoutBtn: {
    marginTop: "auto",

    padding: "14px",

    border: "none",

    borderRadius: "10px",

    background: "#dc2626",

    color: "#fff",

    cursor: "pointer",
  },

  main: {
    flex: 1,

    padding: "40px",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "14px",
    fontWeight: "600",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  topRight: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  search: {
    padding: "12px",

    width: "260px",

    borderRadius: "10px",

    border: "1px solid #e6d8c8",
  },

  grid: {
    display: "grid",

    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",

    gap: "20px",
  },

  card: {
    background: "#fff",

    padding: "24px",

    borderRadius: "20px",
    border: "1px solid #e6d8c8",

    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  },

  addBtn: {
    width: "100%",

    padding: "12px",

    border: "none",

    borderRadius: "10px",

    background: "#6f4e37",

    color: "#fff",

    cursor: "pointer",

    marginTop: "14px",
  },

  cartCard: {
    background: "#fff",

    padding: "12px 20px",
    border: "1px solid #e6d8c8",

    borderRadius: "20px",

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: "20px",
  },

  qtyBox: {
    display: "flex",

    alignItems: "center",

    gap: "10px",
  },

  qtyBtn: {
    width: "32px",

    height: "32px",

    border: "none",

    borderRadius: "8px",

    background: "#efe3d6",

    cursor: "pointer",
  },

  removeBtn: {
    padding: "10px 16px",

    border: "none",

    borderRadius: "10px",

    background: "#dc2626",

    color: "#fff",

    cursor: "pointer",
  },

  billBox: {
    background: "#fff",

    padding: "30px",

    borderRadius: "20px",
    border: "1px solid #e6d8c8",

    marginTop: "30px",
  },

  orderBtn: {
    width: "100%",

    padding: "14px",

    border: "none",

    borderRadius: "10px",

    background: "#6f4e37",

    color: "#fff",

    cursor: "pointer",

    marginTop: "20px",
  },

  orderCard: {
    background: "#fff",

    padding: "24px",

    borderRadius: "20px",
    border: "1px solid #e6d8c8",

    marginBottom: "20px",
  },
  profileCircle: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "18px",
  },

  profileForm: {
    background: "#fff",

    padding: "30px",
    border: "1px solid #e6d8c8",

    borderRadius: "20px",

    display: "flex",

    flexDirection: "column",

    gap: "16px",

    maxWidth: "500px",
  },

  profileInput: {
    padding: "14px",

    borderRadius: "10px",

    border: "1px solid #e6d8c8",
  },

  saveBtn: {
    padding: "14px",

    border: "none",

    borderRadius: "10px",

    background: "#6f4e37",

    color: "#fff",

    cursor: "pointer",
  },
};
