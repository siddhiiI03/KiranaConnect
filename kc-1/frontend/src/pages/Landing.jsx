// import { Link, useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';

// export default function Landing() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const els = document.querySelectorAll('.reveal');
//     els.forEach((el, i) => {
//       el.style.animationDelay = `${i * 0.12}s`;
//     });
//   }, []);

//   return (
//     <div className="kc-landing-page" style={s.wrapper}>
//       {/* Mesh background */}
//       <div style={s.meshBg} />
//       <div style={s.grain} />

//       {/* Navbar */}
//       <nav style={s.nav}>
//         <Link to="/" className="kc-landing-logo-link" style={s.logo} aria-label="Go to KiranaConnect home">
//           <div style={s.logoMark}>K</div>
//           <span style={s.logoText}>KiranaConnect</span>
//         </div>
//         <div style={s.navRight}>
//           <button style={s.navGhost} onClick={() => navigate('/login')}>Login</button>
//           <button style={s.navSolid} onClick={() => navigate('/register')}>Register Karein</button>
//         </div>
//       </nav>

//       {/* Hero */}
//       <section style={s.hero}>
//         <div style={s.heroPill} className="reveal">ðŸŒ¾ India's Wholesale Network</div>

//         <h1 style={s.heroH1} className="reveal">
//           Kirana aur Wholesaler<br />
//           <span style={s.heroGradient}>Ek Saath</span>
//         </h1>

//         <p style={s.heroP} className="reveal">
//           Bulk orders, live inventory, aur seamless delivery â€” sab kuch ek hi jagah.
//           Apni dukaan ko dein technology ka saath.
//         </p>

//         <div style={s.heroCtas} className="reveal">
//           <button style={s.ctaPrimary} onClick={() => navigate('/register')}>
//             Free Mein Shuru Karein â†’
//           </button>
//           <button style={s.ctaGhost} onClick={() => navigate('/login')}>
//             Login Karein
//           </button>
//         </div>

//         {/* Floating Cards */}
//         <div style={s.floatRow} className="reveal">
//           <div style={s.floatCard}>
//             <div style={s.floatIcon}>ðŸª</div>
//             <div style={s.floatTitle}>Kirana Store</div>
//             <div style={s.floatSub}>Products browse karo, bulk order do</div>
//             <div style={s.floatChip}>2,400+ stores</div>
//           </div>

//           <div style={s.floatArrow}>
//             <div style={s.arrowLine} />
//             <span style={s.arrowLabel}>Connected</span>
//             <div style={s.arrowLine} />
//           </div>

//           <div style={{ ...s.floatCard, ...s.floatCardGreen }}>
//             <div style={s.floatIcon}>ðŸ­</div>
//             <div style={s.floatTitle}>Wholesaler</div>
//             <div style={s.floatSub}>Catalog manage karo, orders fulfill karo</div>
//             <div style={{ ...s.floatChip, ...s.floatChipGreen }}>800+ wholesalers</div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Bar */}
//       <div style={s.statsBar}>
//         {[
//           { num: '3,200+', label: 'Active Users' },
//           { num: 'â‚¹2.4Cr+', label: 'Orders Processed' },
//           { num: '98%', label: 'Delivery Rate' },
//           { num: '4.9â˜…', label: 'User Rating' },
//         ].map((stat, i) => (
//           <div key={i} style={s.statItem}>
//             <div style={s.statNum}>{stat.num}</div>
//             <div style={s.statLabel}>{stat.label}</div>
//           </div>
//         ))}
//       </div>

//       {/* Features */}
//       <section style={s.features}>
//         <div style={s.sectionTag}>Features</div>
//         <h2 style={s.sectionH2}>Sab kuch ek platform par</h2>

//         <div style={s.featureGrid}>
//           {[
//             { icon: 'ðŸ“¦', color: '#FFF0E6', accent: '#E8701A', title: 'Bulk Ordering', desc: 'Wholesale catalog browse karo aur minutes mein order place karo. MOQ aur pricing sab clear.' },
//             { icon: 'ðŸ“Š', color: '#E8F5EE', accent: '#1A7A45', title: 'Live Inventory', desc: 'Wholesaler real-time stock update karta hai. Out-of-stock surprise nahi, pehle se pata chalega.' },
//             { icon: 'ðŸ”', color: '#EFF6FF', accent: '#1D4ED8', title: 'Secure Platform', desc: 'JWT authentication aur role-based access. Kirana aur wholesaler ke alag alag dashboards.' },
//             { icon: 'ðŸšš', color: '#F5F3FF', accent: '#6D28D9', title: 'Order Tracking', desc: 'Har order ka status â€” pending se delivered tak. Real-time updates milte rehte hain.' },
//           ].map((f, i) => (
//             <div key={i} style={{ ...s.featureCard, animationDelay: `${i * 0.1}s` }} className="reveal">
//               <div style={{ ...s.featureIconWrap, background: f.color }}>
//                 <span style={s.featureEmoji}>{f.icon}</span>
//               </div>
//               <h3 style={{ ...s.featureTitle, color: f.accent }}>{f.title}</h3>
//               <p style={s.featureDesc}>{f.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CTA */}
//       <section style={s.ctaBanner}>
//         <div style={s.ctaBannerInner}>
//           <div style={s.ctaLeft}>
//             <div style={s.ctaTag}>Limited Time</div>
//             <h2 style={s.ctaH2}>Apna account banao aaj â€” bilkul free hai</h2>
//             <p style={s.ctaP}>Koi hidden charges nahi. Setup sirf 2 minute mein.</p>
//           </div>
//           <div style={s.ctaRight}>
//             <button style={s.ctaBannerBtn} onClick={() => navigate('/register')}>
//               Abhi Join Karein ðŸŽ‰
//             </button>
//             <div style={s.ctaNote}>Already 3,200+ log join kar chuke hain</div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer style={s.footer}>
//         <Link to="/" className="kc-landing-logo-link" style={s.footerLogo} aria-label="Go to KiranaConnect home">
//           <div style={s.logoMark}>K</div>
//           <span style={s.logoText}>KiranaConnect</span>
//         </div>
//         <p style={s.footerText}>Made with â¤ï¸ for Bharat's kirana economy</p>
//         <p style={s.footerCopy}>Â© 2025 KiranaConnect. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// const s = {
//   wrapper: {
//     minHeight: '100vh',
//     background: 'var(--kc-bg)',
//     fontFamily: 'var(--font-body)',
//     color: 'var(--kc-text-primary)',
//     overflowX: 'hidden',
//     position: 'relative',
//   },
//   meshBg: {
//     position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
//     background: `
//       radial-gradient(ellipse 60% 40% at 20% 10%, rgba(232,112,26,0.08) 0%, transparent 60%),
//       radial-gradient(ellipse 50% 50% at 85% 15%, rgba(26,122,69,0.07) 0%, transparent 60%),
//       radial-gradient(ellipse 40% 60% at 50% 90%, rgba(232,112,26,0.05) 0%, transparent 60%)
//     `,
//   },
//   grain: {
//     position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.025,
//     backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
//   },
//   nav: {
//     position: 'sticky', top: 0, zIndex: 100,
//     display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//     padding: '16px 60px',
//     background: 'rgba(249,244,238,0.88)',
//     backdropFilter: 'blur(20px)',
//     borderBottom: '1px solid var(--kc-border)',
//   },
//   logo: { display: 'flex', alignItems: 'center', gap: '12px' },
//   logoMark: {
//     width: '38px', height: '38px', borderRadius: '10px',
//     background: 'var(--kc-saffron)', color: '#fff',
//     display: 'flex', alignItems: 'center', justifyContent: 'center',
//     fontFamily: 'var(--font-display)', fontWeight: '800', fontSize: '18px',
//   },
//   logoText: {
//     fontFamily: 'var(--font-display)', fontWeight: '800',
//     fontSize: '20px', color: 'var(--kc-text-primary)',
//   },
//   navRight: { display: 'flex', gap: '10px' },
//   navGhost: {
//     padding: '10px 20px', background: 'transparent',
//     border: '1.5px solid var(--kc-border-dark)',
//     borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-body)',
//     fontWeight: '700', fontSize: '14px',
//     color: 'var(--kc-text-secondary)', cursor: 'pointer',
//     transition: 'all 0.2s',
//   },
//   navSolid: {
//     padding: '10px 20px', background: 'var(--kc-saffron)',
//     border: 'none', borderRadius: 'var(--radius-md)',
//     fontFamily: 'var(--font-body)', fontWeight: '700', fontSize: '14px',
//     color: '#fff', cursor: 'pointer', boxShadow: 'var(--shadow-saffron)',
//   },
//   hero: {
//     position: 'relative', zIndex: 2,
//     maxWidth: '880px', margin: '0 auto',
//     padding: '80px 24px 40px',
//     textAlign: 'center',
//     display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px',
//   },
//   heroPill: {
//     display: 'inline-flex', alignItems: 'center', gap: '8px',
//     padding: '8px 18px',
//     background: 'var(--kc-saffron-light)', color: 'var(--kc-saffron-dark)',
//     borderRadius: 'var(--radius-full)', fontSize: '13px', fontWeight: '700',
//     border: '1px solid rgba(232,112,26,0.2)',
//   },
//   heroH1: {
//     fontFamily: 'var(--font-display)',
//     fontSize: 'clamp(36px, 6vw, 62px)',
//     fontWeight: '800', lineHeight: 1.15,
//     color: 'var(--kc-text-primary)',
//   },
//   heroGradient: {
//     background: 'linear-gradient(135deg, #E8701A 0%, #1A7A45 100%)',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     backgroundClip: 'text',
//   },
//   heroP: {
//     fontSize: '18px', lineHeight: 1.7,
//     color: 'var(--kc-text-secondary)',
//     maxWidth: '560px',
//   },
//   heroCtas: { display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' },
//   ctaPrimary: {
//     padding: '14px 30px', background: 'var(--kc-saffron)',
//     color: '#fff', border: 'none', borderRadius: 'var(--radius-md)',
//     fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: '800',
//     cursor: 'pointer', boxShadow: 'var(--shadow-saffron)',
//     transition: 'transform 0.2s',
//   },
//   ctaGhost: {
//     padding: '14px 30px', background: 'transparent',
//     color: 'var(--kc-green)', border: '2px solid var(--kc-green)',
//     borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-body)',
//     fontSize: '16px', fontWeight: '800', cursor: 'pointer',
//   },
//   floatRow: {
//     display: 'flex', alignItems: 'center', gap: '20px',
//     marginTop: '16px', flexWrap: 'wrap', justifyContent: 'center',
//     width: '100%',
//   },
//   floatCard: {
//     background: 'var(--kc-surface)', borderRadius: 'var(--radius-lg)',
//     padding: '28px 24px', textAlign: 'center',
//     border: '1px solid var(--kc-border)',
//     boxShadow: 'var(--shadow-md)',
//     minWidth: '200px', flex: '1 1 200px', maxWidth: '240px',
//   },
//   floatCardGreen: { borderTop: '3px solid var(--kc-green)' },
//   floatIcon: { fontSize: '42px', marginBottom: '10px' },
//   floatTitle: { fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '17px', marginBottom: '6px' },
//   floatSub: { fontSize: '13px', color: 'var(--kc-text-muted)', lineHeight: 1.5, marginBottom: '14px' },
//   floatChip: {
//     display: 'inline-block', padding: '4px 12px',
//     background: 'var(--kc-saffron-light)', color: 'var(--kc-saffron-dark)',
//     borderRadius: 'var(--radius-full)', fontSize: '12px', fontWeight: '700',
//   },
//   floatChipGreen: { background: 'var(--kc-green-light)', color: 'var(--kc-green-dark)' },
//   floatArrow: {
//     display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
//     color: 'var(--kc-saffron)', fontSize: '11px', fontWeight: '700',
//     letterSpacing: '0.5px',
//   },
//   arrowLine: { width: '2px', height: '30px', background: 'linear-gradient(to bottom, transparent, var(--kc-saffron), transparent)' },
//   arrowLabel: { color: 'var(--kc-text-muted)' },
//   statsBar: {
//     position: 'relative', zIndex: 2,
//     display: 'flex', justifyContent: 'center', gap: '0',
//     background: 'var(--kc-sidebar-bg)', margin: '60px 40px',
//     borderRadius: 'var(--radius-xl)', overflow: 'hidden',
//     flexWrap: 'wrap',
//   },
//   statItem: {
//     flex: '1 1 120px', padding: '32px 24px', textAlign: 'center',
//     borderRight: '1px solid rgba(255,255,255,0.06)',
//   },
//   statNum: {
//     fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '800',
//     color: 'var(--kc-saffron)', marginBottom: '6px',
//   },
//   statLabel: { fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: '600' },
//   features: {
//     position: 'relative', zIndex: 2,
//     maxWidth: '1100px', margin: '0 auto',
//     padding: '0 40px 80px',
//     textAlign: 'center',
//   },
//   sectionTag: {
//     display: 'inline-block', marginBottom: '12px',
//     padding: '6px 16px', background: 'var(--kc-green-light)',
//     color: 'var(--kc-green-dark)', borderRadius: 'var(--radius-full)',
//     fontSize: '12px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase',
//   },
//   sectionH2: {
//     fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 40px)',
//     fontWeight: '800', marginBottom: '48px', color: 'var(--kc-text-primary)',
//   },
//   featureGrid: {
//     display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
//     gap: '20px', textAlign: 'left',
//   },
//   featureCard: {
//     background: 'var(--kc-surface)', borderRadius: 'var(--radius-lg)',
//     padding: '28px 24px', border: '1px solid var(--kc-border)',
//     boxShadow: 'var(--shadow-sm)',
//     transition: 'box-shadow 0.2s, transform 0.2s',
//   },
//   featureIconWrap: {
//     width: '52px', height: '52px', borderRadius: 'var(--radius-md)',
//     display: 'flex', alignItems: 'center', justifyContent: 'center',
//     marginBottom: '18px',
//   },
//   featureEmoji: { fontSize: '26px' },
//   featureTitle: { fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: '700', marginBottom: '10px' },
//   featureDesc: { fontSize: '14px', color: 'var(--kc-text-secondary)', lineHeight: 1.7 },
//   ctaBanner: {
//     position: 'relative', zIndex: 2,
//     margin: '0 40px 80px', borderRadius: 'var(--radius-xl)',
//     background: 'linear-gradient(135deg, #E8701A 0%, #C25A10 40%, #1A7A45 100%)',
//     padding: '2px',
//   },
//   ctaBannerInner: {
//     background: 'linear-gradient(135deg, #1C110A 0%, #0F3D22 100%)',
//     borderRadius: 'calc(var(--radius-xl) - 2px)',
//     padding: '52px 56px',
//     display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//     gap: '40px', flexWrap: 'wrap',
//   },
//   ctaLeft: { flex: 1, minWidth: '240px' },
//   ctaTag: {
//     display: 'inline-block', padding: '4px 14px',
//     background: 'rgba(232,112,26,0.2)', color: 'var(--kc-saffron)',
//     borderRadius: 'var(--radius-full)', fontSize: '12px', fontWeight: '700',
//     marginBottom: '16px', letterSpacing: '0.5px',
//   },
//   ctaH2: {
//     fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 32px)',
//     fontWeight: '800', color: '#fff', marginBottom: '10px',
//   },
//   ctaP: { fontSize: '15px', color: 'rgba(255,255,255,0.6)' },
//   ctaRight: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px' },
//   ctaBannerBtn: {
//     padding: '16px 32px', background: 'var(--kc-saffron)',
//     color: '#fff', border: 'none', borderRadius: 'var(--radius-md)',
//     fontFamily: 'var(--font-body)', fontSize: '17px', fontWeight: '800',
//     cursor: 'pointer', boxShadow: 'var(--shadow-saffron)',
//     whiteSpace: 'nowrap',
//   },
//   ctaNote: { fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontWeight: '600' },
//   footer: {
//     position: 'relative', zIndex: 2,
//     borderTop: '1px solid var(--kc-border)',
//     padding: '40px 60px',
//     display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
//   },
//   footerLogo: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' },
//   footerText: { fontSize: '14px', color: 'var(--kc-text-secondary)' },
//   footerCopy: { fontSize: '12px', color: 'var(--kc-text-muted)' },
// };

import { Link, useNavigate } from 'react-router-dom';
import { Store, ArrowRight } from 'lucide-react';

export default function Landing() {

  const navigate = useNavigate();

  return (

    <div className="kc-landing-page" style={s.wrapper}>

      {/* NAVBAR */}

      <nav style={s.nav}>

        <Link to="/" className="kc-landing-logo-link" style={s.logo} aria-label="Go to KiranaConnect home">

          <div style={s.logoMark}>
            <Store size={18} />
          </div>

          <span style={s.logoText}>
            KiranaConnect
          </span>

        </Link>

        <div style={s.navActions}>

          <button
            style={s.navGhost}
            onClick={() => navigate('/login')}
          >
            Sign in
          </button>

          <button
            style={s.navBtn}
            onClick={() => navigate('/register')}
          >
            Get Started
          </button>

        </div>

      </nav>

      {/* HERO */}

      <section style={s.hero}>

        <div style={s.heroBadge}>
          India's B2B Wholesale Platform
        </div>

        <h1 style={s.heroTitle}>
          Wholesale,
          <br />

          <span style={s.heroAccent}>
            simplified
          </span>

          {' '}for every shop.
        </h1>

        <p style={s.heroText}>
          Connect kirana stores with trusted wholesalers,
          manage bulk orders, and simplify inventory â€”
          all in one platform.
        </p>

        <div style={s.heroActions}>

          <button
            style={s.primaryBtn}
            onClick={() => navigate('/register')}
          >
            Start Free

            <ArrowRight size={18} />
          </button>

          <button
            style={s.secondaryBtn}
            onClick={() => navigate('/login')}
          >
            Sign in
          </button>

        </div>

      </section>

      {/* CARDS */}

      <section style={s.cardsSection}>

        <div style={s.card}>

          <div style={s.cardIcon}>
            
          </div>

          <h3 style={s.cardTitle}>
            Kirana Stores
          </h3>

          <p style={s.cardText}>
            Browse products, place bulk orders,
            and track deliveries easily.
          </p>

          <div style={s.cardChip}>
            2,400+ stores
          </div>

        </div>

        <div style={s.card}>

          <div style={s.cardIcon}>
            
          </div>

          <h3 style={s.cardTitle}>
            Wholesalers
          </h3>

          <p style={s.cardText}>
            Manage inventory, fulfill orders,
            and grow your network.
          </p>

          <div style={s.cardChip}>
            800+ wholesalers
          </div>

        </div>

      </section>

      {/* STATS */}

      <section style={s.stats}>

        {[
          ['12K+', 'Orders'],
          ['98%', 'Delivery Success'],
          ['48 hrs', 'Average Delivery'],
          ['4.9â˜…', 'User Rating'],
        ].map((item, i) => (

          <div key={i} style={s.statBox}>

            <div style={s.statNum}>
              {item[0]}
            </div>

            <div style={s.statLabel}>
              {item[1]}
            </div>

          </div>

        ))}

      </section>

      {/* FEATURES */}

      <section style={s.features}>

        <div style={s.sectionTag}>
          FEATURES
        </div>

        <h2 style={s.sectionTitle}>
          Everything you need,
          in one platform.
        </h2>

        <div style={s.featureGrid}>

          {[
            {
              icon: '📦',
              title: 'Bulk Ordering',
              desc: 'Place large wholesale orders in minutes.',
            },

            {
              icon: '📊',
              title: 'Inventory Tracking',
              desc: 'Real-time inventory visibility for better planning.',
            },

            {
              icon: '🚚',
              title: 'Fast Delivery',
              desc: 'Reliable logistics and delivery updates.',
            },

            {
              icon: '🔒',
              title: 'Secure Platform',
              desc: 'Protected accounts with role-based access.',
            },

          ].map((f, i) => (

            <div key={i} style={s.featureCard}>

              <div style={s.featureIcon}>
                {f.icon}
              </div>

              <h3 style={s.featureTitle}>
                {f.title}
              </h3>

              <p style={s.featureDesc}>
                {f.desc}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* FOOTER */}

      <footer style={s.footer}>

        <Link to="/" className="kc-landing-logo-link" style={s.footerLogo} aria-label="Go to KiranaConnect home">

          <div style={s.logoMark}>
            <Store size={16} />
          </div>

          <span style={s.logoText}>
            KiranaConnect
          </span>

        </Link>

        <p style={s.footerText}>
          Â© 2025 KiranaConnect. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

const s = {

  wrapper: {
    minHeight: '100vh',
    background: 'var(--kc-bg)',
    color: 'var(--kc-text-primary)',
    fontFamily: 'var(--font-body)',
  },

  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '22px 60px',
    borderBottom: '1px solid var(--kc-border)',
    // background: 'rgba(255,255,255,0.6)',
    background: 'var(--kc-surface)',
    backdropFilter: 'blur(12px)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },

  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  logoMark: {
    width: '42px',
    height: '42px',
    borderRadius: '14px',
    background: 'var(--kc-primary)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoText: {
    fontFamily: 'var(--font-display)',
    fontSize: '28px',
    fontWeight: '700',
  },

  navActions: {
    display: 'flex',
    gap: '12px',
  },

  navGhost: {
    height: '44px',
    padding: '0 22px',
    borderRadius: '14px',
    border: '1px solid var(--kc-border)',
    background: 'transparent',
    cursor: 'pointer',
    fontWeight: '600',
  },

  // navBtn: {
  //   height: '44px',
  //   padding: '0 22px',
  //   borderRadius: '14px',
  //   border: 'none',
  //   background: 'var(--kc-primary)',
  //   color: 'white',
  //   cursor: 'pointer',
  //   fontWeight: '600',
  // },

  navBtn: {
  height: '46px',

  padding: '0 24px',

  borderRadius: '16px',

  border: 'none',

  background: 'var(--kc-saffron)',

  color: '#fff',

  cursor: 'pointer',

  fontWeight: '700',

  fontSize: '15px',

  boxShadow: 'var(--shadow-saffron)',

  transition: '0.3s ease',
},

  hero: {
    maxWidth: '900px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '120px 24px 80px',
  },

  heroBadge: {
    display: 'inline-flex',
    padding: '10px 18px',
    borderRadius: '999px',
    border: '1px solid var(--kc-border)',
    // background: 'var(--kc-primary-light)',
    background: '#efe3d6',
    color: 'var(--kc-primary)',
    fontSize: '13px',
    fontWeight: '700',
    marginBottom: '30px',
  },

  heroTitle: {
    fontSize: 'clamp(44px, 7vw, 72px)',
    lineHeight: '1',
    marginBottom: '28px',
  },

  heroAccent: {
    color: 'var(--kc-primary)',
    fontStyle: 'italic',
  },

  heroText: {
    maxWidth: '700px',
    margin: '0 auto',
    fontSize: '18px',
    lineHeight: '1.7',
    color: 'var(--kc-text-secondary)',
  },

  heroActions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginTop: '40px',
    flexWrap: 'wrap',
  },

  // primaryBtn: {
  //   height: '54px',
  //   padding: '0 28px',
  //   borderRadius: '16px',
  //   border: 'none',
  //   background: 'var(--kc-primary)',
  //   color: 'white',
  //   fontWeight: '700',
  //   fontSize: '15px',
  //   display: 'flex',
  //   alignItems: 'center',
  //   gap: '10px',
  //   cursor: 'pointer',
  // },

  primaryBtn: {
  height: '54px',

  padding: '0 28px',

  borderRadius: '16px',

  border: 'none',

  background: 'var(--kc-saffron)',

  color: '#fff',

  fontWeight: '700',

  fontSize: '15px',

  display: 'flex',

  alignItems: 'center',

  justifyContent: 'center',

  gap: '10px',

  cursor: 'pointer',

  boxShadow: 'var(--shadow-saffron)',

  transition: '0.3s ease',
},

  secondaryBtn: {
    height: '54px',
    padding: '0 28px',
    borderRadius: '16px',
    border: '1px solid var(--kc-border)',
    background: 'white',
    fontWeight: '700',
    fontSize: '15px',
    cursor: 'pointer',
  },

  cardsSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
    gap: '24px',
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 24px',
  },

  card: {
    // background: 'rgba(255,255,255,0.75)',
    background: 'var(--kc-surface)',
    // backdropFilter: 'blur(10px)',
    border: '1px solid var(--kc-border)',
    borderRadius: '28px',
    padding: '36px',
    boxShadow: 'var(--shadow-sm)',
    transition: '0.3s',
  },

  cardIcon: {
    fontSize: '42px',
    marginBottom: '18px',
  },

  cardTitle: {
    fontSize: '30px',
    marginBottom: '12px',
  },

  cardText: {
    fontSize: '15px',
    lineHeight: '1.8',
    color: 'var(--kc-text-secondary)',
    marginBottom: '18px',
  },

  cardChip: {
    display: 'inline-flex',
    padding: '8px 14px',
    borderRadius: '999px',
    background: 'var(--kc-primary-light)',
    color: 'var(--kc-primary)',
    fontWeight: '700',
    fontSize: '13px',
  },

  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
    gap: '18px',
    maxWidth: '1100px',
    margin: '90px auto',
    padding: '0 24px',
  },

  statBox: {
    background: 'white',
    border: '1px solid var(--kc-border)',
    borderRadius: '24px',
    padding: '30px',
    textAlign: 'center',
  },

  statNum: {
    fontSize: '38px',
    fontFamily: 'var(--font-display)',
    marginBottom: '8px',
  },

  statLabel: {
    color: 'var(--kc-text-muted)',
    fontSize: '14px',
  },

  features: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 24px 100px',
    textAlign: 'center',
  },

  sectionTag: {
    fontSize: '12px',
    letterSpacing: '0.18em',
    color: 'var(--kc-text-muted)',
    marginBottom: '16px',
    fontWeight: '700',
  },

  sectionTitle: {
    fontSize: '56px',
    marginBottom: '60px',
  },

  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
    gap: '22px',
  },

  featureCard: {
    // background: 'white',
    background: 'var(--kc-surface)',
    border: '1px solid var(--kc-border)',
    borderRadius: '28px',
    padding: '34px',
    textAlign: 'left',
  },

  featureIcon: {
    fontSize: '34px',
    marginBottom: '18px',
  },

  featureTitle: {
    fontSize: '24px',
    marginBottom: '10px',
  },

  featureDesc: {
    color: 'var(--kc-text-secondary)',
    lineHeight: '1.8',
    fontSize: '15px',
  },

  footer: {
    borderTop: '1px solid var(--kc-border)',
    padding: '36px 24px',
    textAlign: 'center',
  },

  footerLogo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '14px',
  },

  footerText: {
    color: 'var(--kc-text-muted)',
    fontSize: '14px',
  },

};