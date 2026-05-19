// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/useAuth';
// import { loginUser } from '../services/api';

// export default function Login() {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     try {
//       const { data } = await loginUser(form);
//       login(data.user, data.token);
//       navigate(data.user.role === 'kirana' ? '/kirana-dashboard' : '/wholesaler-dashboard');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={s.wrapper}>
//       {/* Left panel */}
//       <div style={s.leftPanel}>
//         <div style={s.leftContent}>
//           <Link to="/" style={s.backLink}>â† Wapas Home</Link>
//           <div style={s.brandMark}>K</div>
//           <h2 style={s.brandName}>KiranaConnect</h2>
//           <p style={s.brandTagline}>India's wholesale network for kirana stores</p>

//           <div style={s.testimonial}>
//             <div style={s.testimonialText}>
//               "KiranaConnect ne humara ordering process completely change kar diya. Ab sab kuch ek click mein hota hai."
//             </div>
//             <div style={s.testimonialAuthor}>
//               <div style={s.testimonialAvatar}>R</div>
//               <div>
//                 <div style={s.testimonialName}>Ramesh Agarwal</div>
//                 <div style={s.testimonialRole}>Agarwal General Store, Jaipur</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right panel */}
//       <div style={s.rightPanel}>
//         <div style={s.formContainer}>
//           <div style={s.formHeader}>
//             <h1 style={s.formTitle}>Wapas Aaye! ðŸ‘‹</h1>
//             <p style={s.formSubtitle}>Apne account mein login karein</p>
//           </div>

//           {error && (
//             <div style={s.errorBox}>
//               <span style={s.errorIcon}>âš </span> {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} style={s.form}>
//             <div style={s.field}>
//               <label style={s.label}>Email Address</label>
//               <input
//                 name="email" type="email" required
//                 value={form.email} onChange={handleChange}
//                 style={s.input} placeholder="aapka@email.com"
//               />
//             </div>

//             <div style={s.field}>
//               <label style={s.label}>Password</label>
//               <input
//                 name="password" type="password" required
//                 value={form.password} onChange={handleChange}
//                 style={s.input} placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
//               />
//             </div>

//             <button type="submit" style={s.submitBtn} disabled={loading}>
//               {loading ? (
//                 <span style={s.loadingSpan}>
//                   <span style={s.spinner} /> Logging in...
//                 </span>
//               ) : 'Login Karein â†’'}
//             </button>
//           </form>

//           <div style={s.divider}>
//             <div style={s.dividerLine} />
//             <span style={s.dividerText}>ya phir</span>
//             <div style={s.dividerLine} />
//           </div>

//           <p style={s.switchText}>
//             Account nahi hai?{' '}
//             <Link to="/register" style={s.link}>Register Karein</Link>
//           </p>
//         </div>
//       </div>

//       <style>{`
//         input:focus { outline: none; border-color: var(--kc-saffron) !important; box-shadow: 0 0 0 3px rgba(232,112,26,0.15) !important; }
//         @keyframes spin { to { transform: rotate(360deg); } }
//       `}</style>
//     </div>
//   );
// }

// const s = {
//   wrapper: {
//     minHeight: '100vh', display: 'flex',
//     fontFamily: 'var(--font-body)',
//   },
//   leftPanel: {
//     flex: '1', background: 'linear-gradient(160deg, #1C110A 0%, #0F3D22 100%)',
//     display: 'flex', alignItems: 'center', justifyContent: 'center',
//     padding: '60px 48px', position: 'relative', overflow: 'hidden',
//     minWidth: '340px',
//   },
//   leftContent: {
//     position: 'relative', zIndex: 1, maxWidth: '380px', width: '100%',
//   },
//   backLink: {
//     display: 'inline-block', marginBottom: '48px',
//     color: 'rgba(255,255,255,0.4)', fontSize: '14px',
//     fontWeight: '600', textDecoration: 'none',
//     transition: 'color 0.2s',
//   },
//   brandMark: {
//     width: '56px', height: '56px', borderRadius: '14px',
//     background: 'var(--kc-saffron)', color: '#fff',
//     display: 'flex', alignItems: 'center', justifyContent: 'center',
//     fontFamily: 'var(--font-display)', fontWeight: '800', fontSize: '26px',
//     marginBottom: '16px',
//   },
//   brandName: {
//     fontFamily: 'var(--font-display)', fontSize: '28px',
//     fontWeight: '800', color: '#fff', marginBottom: '8px',
//   },
//   brandTagline: {
//     fontSize: '15px', color: 'rgba(255,255,255,0.5)',
//     marginBottom: '56px', lineHeight: 1.6,
//   },
//   testimonial: {
//     background: 'rgba(255,255,255,0.06)',
//     border: '1px solid rgba(255,255,255,0.1)',
//     borderRadius: 'var(--radius-lg)', padding: '24px',
//   },
//   testimonialText: {
//     fontSize: '15px', color: 'rgba(255,255,255,0.8)',
//     lineHeight: 1.7, marginBottom: '20px', fontStyle: 'italic',
//   },
//   testimonialAuthor: { display: 'flex', alignItems: 'center', gap: '12px' },
//   testimonialAvatar: {
//     width: '40px', height: '40px', borderRadius: '50%',
//     background: 'var(--kc-saffron)', color: '#fff',
//     display: 'flex', alignItems: 'center', justifyContent: 'center',
//     fontWeight: '800', fontSize: '16px', flexShrink: 0,
//   },
//   testimonialName: { color: '#fff', fontWeight: '700', fontSize: '14px' },
//   testimonialRole: { color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '2px' },
//   rightPanel: {
//     flex: '1', background: 'var(--kc-bg)',
//     display: 'flex', alignItems: 'center', justifyContent: 'center',
//     padding: '60px 48px',
//   },
//   formContainer: { width: '100%', maxWidth: '400px' },
//   formHeader: { marginBottom: '36px' },
//   formTitle: {
//     fontFamily: 'var(--font-display)', fontSize: '34px',
//     fontWeight: '800', color: 'var(--kc-text-primary)', marginBottom: '8px',
//   },
//   formSubtitle: { fontSize: '15px', color: 'var(--kc-text-secondary)' },
//   errorBox: {
//     background: '#FEF2F2', border: '1px solid #FECACA',
//     color: '#B91C1C', borderRadius: 'var(--radius-md)',
//     padding: '14px 16px', marginBottom: '24px',
//     fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px',
//   },
//   errorIcon: { fontSize: '16px' },
//   form: { display: 'flex', flexDirection: 'column', gap: '20px' },
//   field: { display: 'flex', flexDirection: 'column', gap: '8px' },
//   label: {
//     fontSize: '13px', fontWeight: '700',
//     color: 'var(--kc-text-secondary)', letterSpacing: '0.2px',
//   },
//   input: {
//     padding: '13px 16px',
//     border: '1.5px solid var(--kc-border)',
//     borderRadius: 'var(--radius-sm)',
//     fontSize: '15px', background: 'var(--kc-surface)',
//     color: 'var(--kc-text-primary)',
//     transition: 'border-color 0.2s, box-shadow 0.2s',
//   },
//   submitBtn: {
//     marginTop: '8px', padding: '15px',
//     background: 'var(--kc-saffron)', color: '#fff', border: 'none',
//     borderRadius: 'var(--radius-md)', fontSize: '16px', fontWeight: '800',
//     cursor: 'pointer', boxShadow: 'var(--shadow-saffron)',
//     fontFamily: 'var(--font-body)', transition: 'transform 0.2s',
//   },
//   loadingSpan: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' },
//   spinner: {
//     display: 'inline-block', width: '16px', height: '16px',
//     border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff',
//     borderRadius: '50%', animation: 'spin 0.7s linear infinite',
//   },
//   divider: { display: 'flex', alignItems: 'center', gap: '12px', margin: '28px 0' },
//   dividerLine: { flex: 1, height: '1px', background: 'var(--kc-border)' },
//   dividerText: { fontSize: '13px', color: 'var(--kc-text-muted)', fontWeight: '600', whiteSpace: 'nowrap' },
//   switchText: { textAlign: 'center', fontSize: '15px', color: 'var(--kc-text-secondary)' },
//   link: { color: 'var(--kc-green)', fontWeight: '800', textDecoration: 'none' },
// };

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Store } from 'lucide-react';

import { useAuth } from '../context/useAuth';
import { loginUser } from '../services/api';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const { data } = await loginUser(form);

      login(data.user, data.token);

      navigate(
        data.user.role === 'kirana'
          ? '/kirana-dashboard'
          : '/wholesaler-dashboard'
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="kc-auth-page">

      <div className="kc-card kc-auth-card animate-fade-up">

        {/* Logo */}

        <div className="kc-auth-logo">

          <div className="kc-auth-logo-box">
            <Store size={22} />
          </div>

          <h2>KiranaConnect</h2>

        </div>

        {/* Heading */}

        <div className="kc-auth-heading">

          <p className="kc-auth-tag">
            KIRANA SIGN IN
          </p>

          <h1 className="kc-auth-title">
            Welcome back
          </h1>

          <p className="kc-auth-subtitle">
            Sign in to continue managing your shop.
          </p>

        </div>

        {/* Error */}

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

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="kc-auth-form"
        >

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
              placeholder="Enter your password"
              className="kc-input"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="kc-btn kc-btn-primary"
            style={{
              width: '100%',
              marginTop: '6px',
            }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

        </form>

        {/* Footer */}

        <div className="kc-auth-footer">

          New here?{' '}

          <Link
            to="/register"
            className="kc-auth-link"
          >
            Create account
          </Link>

        </div>

      </div>

    </div>
  );
}