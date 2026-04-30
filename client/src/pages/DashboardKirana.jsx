import { useState, useMemo, useEffect } from "react";
import products from "../data/products.json";
import wholesalers from "../data/wholesalers.json";

export default function DashboardKirana() {
  const [showWholesalers, setShowWholesalers] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(13200);
  const [profileOpen, setProfileOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const fetchOrders = async () => {
    const res = await fetch("http://localhost:5000/api/orders");
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 21600));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const placeOrder = async () => {
    try {
      for (const item of cartItems) {
        await fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            shopName: user?.name || "Kirana Store",
            product: item.name,
            quantity: item.quantity,
            price: item.price * item.quantity
          })
        });
      }

      setOrderSuccess(true);

      setTimeout(() => {
        setOrderSuccess(false);
      }, 2500);

      setCartItems([]);
      setCartOpen(false);
      fetchOrders();
    } catch (error) {
      console.error(error);
      alert("Order failed");
    }
  };

  return (
    <div className="dashboard">

      <div className="dashboard-topbar">
        <div className="dashboard-title">
          <h2>Kirana Dashboard</h2>
          <p>Browse products from wholesalers and place bulk orders.</p>
        </div>

        <div className="dashboard-actions">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div
            className="profile-box"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
        </div>
      </div>

      {profileOpen && (
        <div className="profile-dropdown">
          <h4>{user?.name || "User"}</h4>
          <p>Kirana Owner</p>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      )}

      <div className="batch-strip">
        <span>
          ⏰ Next batch dispatch at 12:00 AM — your orders will be grouped and sent together
        </span>

        <strong>
          {Math.floor(secondsLeft / 3600)}h{" "}
          {Math.floor((secondsLeft % 3600) / 60)}m{" "}
          {secondsLeft % 60}s
        </strong>
      </div>

      {orderSuccess && (
        <div className="success-strip">
          Order placed successfully ✓
        </div>
      )}

      <div className="dashboard-cards">

        <div
          className="dashboard-card"
          onClick={() => setShowWholesalers(true)}
        >
          <h3>Nearby Wholesalers</h3>
          <p>View wholesalers available in your district.</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() =>
            document.getElementById("orders").scrollIntoView({
              behavior: "smooth"
            })
          }
        >
          <h3>Pending Orders</h3>
          <p>Track active and batched orders.</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() =>
            document.getElementById("products").scrollIntoView({
              behavior: "smooth"
            })
          }
        >
          <h3>Quick Reorder</h3>
          <p>Order frequently purchased products faster.</p>
        </div>

      </div>

      <div className="products-section" id="products">
        <h3>Product Catalogue</h3>

        <div className="products-row">
          {products
            .filter((product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((product, index) => (
              <div className="product-card" key={index}>
                <h4>{product.name}</h4>
                <p>{product.label}</p>
                <span>{product.moq}</span>
                <span className="seller-name">{product.seller}</span>

                <button
                  className="cart-btn"
                  onClick={() => {
                    setCartItems((prev) => {
                      const existing = prev.find(
                        (item) => item.name === product.name
                      );

                      if (existing) {
                        return prev.map((item) =>
                          item.name === product.name
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                        );
                      }

                      return [...prev, { ...product, quantity: 1 }];
                    });

                    setCartOpen(true);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
        </div>
      </div>

      <div className="orders-section" id="orders">
        <h3>Pending Orders</h3>

        {orders.map((order, index) => (
          <div className="order-card" key={index}>
            <h4>{order.product}</h4>
            <p>{order.shopName} × {order.quantity}</p>
            <span>₹{order.price}</span>
          </div>
        ))}
      </div>

      {showWholesalers && (
        <>
          <div
            className="overlay"
            onClick={() => setShowWholesalers(false)}
          ></div>

          <div className="wholesaler-panel">
            <h3>Nearby Wholesalers</h3>

            {wholesalers.map((item, index) => (
  <div className="wholesaler-item" key={index}>
    <h4>{item.name}</h4>
    <p>{item.location}</p>
  </div>
))}
          </div>
        </>
      )}

      {cartOpen && (
        <>
          <div
            className="overlay"
            onClick={() => setCartOpen(false)}
          ></div>

          <div className="cart-sidebar">
            <h3>My Cart</h3>

            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>

                <div className="quantity-box">
                  <button
                    onClick={() =>
                      setCartItems((prev) =>
                        prev
                          .map((cartItem) =>
                            cartItem.name === item.name
                              ? {
                                  ...cartItem,
                                  quantity: cartItem.quantity - 1
                                }
                              : cartItem
                          )
                          .filter((cartItem) => cartItem.quantity > 0)
                      )
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      setCartItems((prev) =>
                        prev.map((cartItem) =>
                          cartItem.name === item.name
                            ? {
                                ...cartItem,
                                quantity: cartItem.quantity + 1
                              }
                            : cartItem
                        )
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-total">
              <p>
                Total Items:{" "}
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </p>

              <h4>Subtotal: ₹{subtotal}</h4>
            </div>

            <button
              className="place-order-btn"
              onClick={placeOrder}
            >
              Place Order
            </button>
          </div>
        </>
      )}

    </div>
  );
}