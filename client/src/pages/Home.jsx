import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero fade-in">
        <h1>Bulk Orders Made Simple</h1>
        <p>Connect with trusted wholesalers and order in bulk easily</p>

        <button className="btn-primary" onClick={() => navigate("/kirana-login")}>
          Order as Kirana
        </button>

        <button className="btn-outline" onClick={() => navigate("/wholesaler-login")}>
          Join as Wholesaler
        </button>
      </section>

      {/* FEATURES */}
      <section id="features" className="section fade-in">
        <h2>Platform Features</h2>

        <div className="features-grid">
          <div className="feature-card float">
            <h3>Bulk Ordering</h3>
            <p>Order large quantities with better pricing</p>
          </div>

          <div className="feature-card float">
            <h3>Smart Cart</h3>
            <p>Combine products from multiple wholesalers</p>
          </div>

          <div className="feature-card float">
            <h3>Fast Delivery</h3>
            <p>Efficient dispatch and delivery system</p>
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section id="about" className="section roles fade-in">
        <h2>Built for Both Sides</h2>

        <div className="role-grid">
          <div className="role-card float">
            <h3>Kirana Owner</h3>
            <p>Browse products and place orders easily</p>
          </div>

          <div className="role-card float">
            <h3>Wholesaler</h3>
            <p>List products and manage inventory</p>
          </div>
        </div>
      </section>
{/* 
      HOW IT WORKS
      <section className="section how-it-works">
        <h4>HOW IT WORKS</h4>
        <h2>From browsing to delivery in four simple steps.</h2>

        <div className="timeline">
          <div className="step">
            <span>1</span>
            <h3>Create Account</h3>
            <p>Sign up as shop owner or wholesaler</p>
          </div>

          <div className="step">
            <span>2</span>
            <h3>Browse Products</h3>
            <p>Explore catalogues across wholesalers</p>
          </div>

          <div className="step">
            <span>3</span>
            <h3>Place Bulk Order</h3>
            <p>Add to cart and confirm your order</p>
          </div>

          <div className="step">
            <span>4</span>
            <h3>Track & Receive</h3>
            <p>Follow your delivery till it arrives</p>
          </div>
        </div>
      </section> */}

      {/* HOW IT WORKS */}
<section className="section how-it-works fade-in">
  <h4>HOW IT WORKS</h4>
  <h2>From browsing to delivery in four simple steps.</h2>

  <div className="timeline-line">
    <div className="timeline">
      <div className="step">
        <span>1</span>
        <h3>Create Account</h3>
        <p>Sign up as shop owner or wholesaler</p>
      </div>

      <div className="step">
        <span>2</span>
        <h3>Browse Products</h3>
        <p>Explore catalogues across wholesalers</p>
      </div>

      <div className="step">
        <span>3</span>
        <h3>Place Bulk Order</h3>
        <p>Add to cart and confirm your order</p>
      </div>

      <div className="step">
        <span>4</span>
        <h3>Track & Receive</h3>
        <p>Follow your delivery till it arrives</p>
      </div>
    </div>
  </div>
</section>

      {/* CTA SECTION */}
      <section className="cta-section fade-in">
        <h2>Start ordering wholesale today.</h2>
        <p>Join thousands of kirana shops already saving time and money on every order.</p>
      </section>
      

      {/* FOOTER */}
      <div className="footer">
        © 2026 KiranaConnect — B2B Platform
      </div>
    </>
  );
}