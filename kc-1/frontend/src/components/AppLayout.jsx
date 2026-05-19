import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BarChart3, Headphones, LayoutDashboard, LogOut, Package, Settings, ShoppingBag, Store, UserRound, UsersRound } from 'lucide-react';
import { useAuth } from '../context/useAuth';

const dashboardFor = (role) => (role === 'wholesaler' ? '/wholesaler-dashboard' : '/kirana-dashboard');

export default function AppLayout({ children, eyebrow = 'KiranaConnect', title, subtitle }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const links = [
    { to: dashboardFor(user?.role), label: 'Dashboard', icon: LayoutDashboard },
    { to: '/orders', label: 'Orders', icon: ShoppingBag },
    { to: '/inventory', label: 'Inventory', icon: Package },
    { to: '/network', label: 'Network', icon: UsersRound },
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/profile', label: 'Profile', icon: UserRound },
    { to: '/settings', label: 'Settings', icon: Settings },
    { to: '/support', label: 'Support', icon: Headphones },
  ];

  return (
    <div className="kc-app-shell">
      <aside className="kc-app-sidebar">
        <Link to="/" className="kc-app-brand" aria-label="Go to KiranaConnect home">
          <span className="kc-app-brand-mark"><Store size={20} /></span>
          <span>KiranaConnect</span>
        </Link>

        <nav className="kc-app-nav" aria-label="Main navigation">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `kc-app-nav-link${isActive ? ' active' : ''}`}>
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <button className="kc-app-logout" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <div className="kc-app-main">
        <header className="kc-app-topbar">
          <div>
            <p className="kc-page-eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <Link to="/profile" className="kc-user-pill" aria-label="Open profile page" title="Open profile">
            <span>{user?.name?.slice(0, 1)?.toUpperCase() || 'K'}</span>
            <div>
              <strong>{user?.name || 'User'}</strong>
              <small>{user?.role || 'member'}</small>
            </div>
          </Link>
        </header>

        <main className="kc-page-content">{children}</main>

        <footer className="kc-app-footer">
          <span>KiranaConnect marketplace suite</span>
          <span>Orders, inventory, settings, support, profile, and growth analytics.</span>
        </footer>
      </div>
    </div>
  );
}