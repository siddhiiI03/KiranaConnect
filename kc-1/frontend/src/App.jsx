import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/useAuth';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import KiranaDashboard from './pages/KiranaDashboard';
import WholesalerDashboard from './pages/WholesalerDashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import Support from './pages/Support';
import OrdersPage from './pages/Orders';
import Inventory from './pages/Inventory';
import Network from './pages/Network';

const dashboardFor = (role) => (role === 'kirana' ? '/kirana-dashboard' : '/wholesaler-dashboard');

const ProtectedRoute = ({ children, role }) => {
  const { user, token } = useAuth();
  if (!token || !user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to={dashboardFor(user.role)} replace />;
  return children;
};

function AppRoutes() {
  const { user, token } = useAuth();
  const dashboard = dashboardFor(user?.role);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={token ? <Navigate to={dashboard} /> : <Login />} />
      <Route path="/register" element={token ? <Navigate to={dashboard} /> : <Register />} />
      <Route path="/kirana-dashboard" element={<ProtectedRoute role="kirana"><KiranaDashboard /></ProtectedRoute>} />
      <Route path="/wholesaler-dashboard" element={<ProtectedRoute role="wholesaler"><WholesalerDashboard /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
      <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
      <Route path="/network" element={<ProtectedRoute><Network /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}