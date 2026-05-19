// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/useAuth';
// import { registerUser } from '../services/api';

// export default function Register() {
//   const [form, setForm] = useState({
//     name: '', email: '', password: '', role: 'kirana', shopName: '', phone: '',
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     if (form.password.length < 6) { setError('Password kam se kam 6 characters ka hona chahiye.'); return; }
//     setLoading(true);
//     try {
//       const { data } = await registerUser(form);
//       login(data.user, data.token);
//       navigate(data.user.role === 'kirana' ? '/kirana-dashboard' : '/wholesaler-dashboard');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.wrapper}>
//       <div style={styles.bgLeft} />
//       <div style={styles.bgRight} />

//       <div style={styles.card}>
//         <div style={styles.logoRow}>
//           <span style={styles.logoIcon}>ðŸ›’</span>
//           <span style={styles.logoText}>KiranaConnect</span>
//         </div>
//         <h2 style={styles.title}>Account Banayein</h2>
//         <p style={styles.subtitle}>Apna role chunein aur shuru karein</p>

//         {/* Role Selector */}
//         <div style={styles.roleSelector}>
//           {[
//             { value: 'kirana', label: 'ðŸª Kirana Store', sub: 'Products order karein' },
//             { value: 'wholesaler', label: 'ðŸ­ Wholesaler', sub: 'Products sell karein' },
//           ].map((r) => (
//             <div
//               key={r.value}
//               style={{ ...styles.roleCard, ...(form.role === r.value ? styles.roleCardActive : {}) }}
//               onClick={() => setForm({ ...form, role: r.value })}
//             >
//               <div style={styles.roleLabel}>{r.label}</div>
//               <div style={styles.roleSub}>{r.sub}</div>
//             </div>
//           ))}
//         </div>

//         {error && <div style={styles.errorBox}>{error}</div>}

//         <form onSubmit={handleSubmit} style={styles.form}>
//           <label style={styles.label}>Poora Naam</label>
//           <input name="name" required value={form.name} onChange={handleChange}
//             style={styles.input} placeholder="Ramesh Kumar" />

//           <label style={styles.label}>Dukaan / Business Ka Naam</label>
//           <input name="shopName" required value={form.shopName} onChange={handleChange}
//             style={styles.input} placeholder="Ramesh General Store" />

//           <label style={styles.label}>Phone Number</label>
//           <input name="phone" type="tel" value={form.phone} onChange={handleChange}
//             style={styles.input} placeholder="9876543210" />

//           <label style={styles.label}>Email</label>
//           <input name="email" type="email" required value={form.email} onChange={handleChange}
//             style={styles.input} placeholder="aapka@email.com" />

//           <label style={styles.label}>Password</label>
//           <input name="password" type="password" required value={form.password} onChange={handleChange}
//             style={styles.input} placeholder="Min. 6 characters" />

//           <button type="submit" style={styles.btn} disabled={loading}>
//             {loading ? 'Creating account...' : 'Register Karein â†’'}
//           </button>
//         </form>

//         <p style={styles.switchText}>
//           Pehle se account hai?{' '}
//           <Link to="/login" style={styles.link}>Login Karein</Link>
//         </p>
//         <p style={styles.switchText}>
//           <Link to="/" style={styles.link}>â† Wapas Home</Link>
//         </p>
//       </div>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
//         input:focus { outline: none; border-color: #92400e !important; box-shadow: 0 0 0 3px #92400e22; }
//       `}</style>
//     </div>
//   );
// }

// const styles = {
//   wrapper: {
//     minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
//     background: '#fdf6ec', fontFamily: "'DM Sans', sans-serif",
//     position: 'relative', overflow: 'hidden', padding: '40px 16px',
//   },
//   bgLeft: {
//     position: 'fixed', bottom: '-100px', left: '-100px',
//     width: '400px', height: '400px', borderRadius: '50%',
//     background: 'radial-gradient(circle, #fbbf2430 0%, transparent 70%)', pointerEvents: 'none',
//   },
//   bgRight: {
//     position: 'fixed', top: '-100px', right: '-100px',
//     width: '400px', height: '400px', borderRadius: '50%',
//     background: 'radial-gradient(circle, #16a34a20 0%, transparent 70%)', pointerEvents: 'none',
//   },
//   card: {
//     position: 'relative', zIndex: 1,
//     background: '#fff', borderRadius: '24px',
//     padding: '48px 40px', width: '100%', maxWidth: '460px',
//     boxShadow: '0 20px 80px #92400e14', border: '1px solid #f0e4d0',
//   },
//   logoRow: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' },
//   logoIcon: { fontSize: '28px' },
//   logoText: { fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: '900', color: '#92400e' },
//   title: { fontFamily: "'Playfair Display', serif", fontSize: '30px', fontWeight: '900', color: '#1a1008', margin: '0 0 6px' },
//   subtitle: { color: '#6b4c2a', fontSize: '14px', marginBottom: '24px' },
//   roleSelector: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' },
//   roleCard: {
//     padding: '16px', borderRadius: '12px', border: '2px solid #e5d8c5',
//     cursor: 'pointer', transition: 'all 0.2s', background: '#fffbf5',
//   },
//   roleCardActive: { border: '2px solid #92400e', background: '#fef3c7' },
//   roleLabel: { fontWeight: '700', fontSize: '14px', color: '#1a1008', marginBottom: '4px' },
//   roleSub: { fontSize: '12px', color: '#8b6543' },
//   errorBox: {
//     background: '#fef2f2', border: '1px solid #fca5a5', color: '#b91c1c',
//     borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', fontSize: '14px',
//   },
//   form: { display: 'flex', flexDirection: 'column', gap: '4px' },
//   label: { fontSize: '13px', fontWeight: '600', color: '#5c3d1a', marginTop: '12px' },
//   input: {
//     padding: '12px 16px', border: '1.5px solid #e5d8c5',
//     borderRadius: '10px', fontSize: '15px', background: '#fffbf5', color: '#1a1008',
//     transition: 'border-color 0.2s, box-shadow 0.2s',
//   },
//   btn: {
//     marginTop: '24px', padding: '14px', background: '#92400e',
//     color: '#fff', border: 'none', borderRadius: '10px',
//     fontSize: '16px', fontWeight: '700', cursor: 'pointer',
//     boxShadow: '0 4px 20px #92400e44',
//   },
//   switchText: { textAlign: 'center', fontSize: '14px', color: '#6b4c2a', marginTop: '14px' },
//   link: { color: '#16a34a', fontWeight: '700', textDecoration: 'none' },
// };

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Store } from 'lucide-react';

import { useAuth } from '../context/useAuth';
import { registerUser } from '../services/api';

export default function Register() {

  const initialForm = {
    name: '',
    email: '',
    password: '',
    role: 'kirana',
    shopName: '',
    phone: '',
  };

  const [form, setForm] = useState(initialForm);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  /* RESET FORM */

  const resetForm = (newRole) => {

    setForm({
      ...initialForm,
      role: newRole,
    });

    setError('');
  };

  /* HANDLE CHANGE */

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  /* HANDLE SUBMIT */

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError('');

    if (form.password.length < 6) {

      setError(
        'Password must contain at least 6 characters.'
      );

      return;
    }

    setLoading(true);

    try {

      const { data } = await registerUser(form);

      login(data.user, data.token);

      navigate(
        data.user.role === 'kirana'
          ? '/kirana-dashboard'
          : '/wholesaler-dashboard'
      );

    } catch (err) {

      setError(
        err.response?.data?.message ||
          'Registration failed. Please try again.'
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="kc-auth-page">

      <div
        className="kc-card kc-auth-card animate-fade-up"
        style={{
          maxWidth: '520px',
        }}
      >

        {/* LOGO */}

        <div className="kc-auth-logo">

          <div className="kc-auth-logo-box">
            <Store size={22} />
          </div>

          <h2>KiranaConnect</h2>

        </div>

        {/* HEADING */}

        <div className="kc-auth-heading">

          <p className="kc-auth-tag">
            CREATE ACCOUNT
          </p>

          <h1 className="kc-auth-title">
            Join KiranaConnect
          </h1>

          <p className="kc-auth-subtitle">
            Start ordering smarter today.
          </p>

        </div>

        {/* ROLE SELECTOR */}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '14px',
            marginBottom: '24px',
          }}
        >

          {[
            {
              value: 'kirana',
              label: 'Kirana Store',
              sub: 'Order products easily',
            },

            {
              value: 'wholesaler',
              label: 'Wholesaler',
              sub: 'Sell products in bulk',
            },

          ].map((role) => (

            <div
              key={role.value}

              onClick={() =>
                resetForm(role.value)
              }

              style={{
                padding: '18px',

                borderRadius: '18px',

                cursor: 'pointer',

                transition: '0.3s ease',

                border:
                  form.role === role.value
                    ? '1.5px solid var(--kc-saffron)'
                    : '1.5px solid var(--kc-border)',

                background:
                  form.role === role.value
                    ? 'var(--kc-saffron-light)'
                    : '#fff',
              }}
            >

              <div
                style={{
                  fontWeight: '700',
                  color: 'var(--kc-text-primary)',
                  marginBottom: '4px',
                }}
              >
                {role.label}
              </div>

              <div
                style={{
                  fontSize: '13px',
                  color: 'var(--kc-text-muted)',
                }}
              >
                {role.sub}
              </div>

            </div>

          ))}

        </div>

        {/* ERROR */}

        {error && (

          <div
            style={{
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              color: '#B91C1C',
              padding: '14px 16px',
              borderRadius: '16px',
              marginBottom: '20px',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            {error}
          </div>

        )}

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="kc-auth-form"
        >

          <div>

            <label className="kc-label">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="kc-input"
            />

          </div>

          <div>

            <label className="kc-label">
              Shop / Business Name
            </label>

            <input
              type="text"
              name="shopName"
              required
              value={form.shopName}
              onChange={handleChange}
              placeholder="Your business name"
              className="kc-input"
            />

          </div>

          <div>

            <label className="kc-label">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className="kc-input"
            />

          </div>

          <div>

            <label className="kc-label">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="kc-input"
            />

          </div>

          <div>

            <label className="kc-label">
              Password
            </label>

            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              className="kc-input"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="kc-btn kc-btn-primary"
            style={{
              width: '100%',
              marginTop: '8px',
            }}
          >
            {loading
              ? 'Creating account...'
              : 'Create account'}
          </button>

        </form>

        {/* FOOTER */}

        <div className="kc-auth-footer">

          Already have an account?{' '}

          <Link
            to="/login"
            className="kc-auth-link"
          >
            Sign in
          </Link>

        </div>

      </div>

    </div>
  );
}