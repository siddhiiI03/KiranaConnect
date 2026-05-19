import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, Building2, Headphones, MapPin, Settings, UserRound } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import { updateProfile, getProfile } from '../services/api';

const emptyProfile = {
  name: '',
  email: '',
  role: '',
  shopName: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
};

export default function Profile() {
  const [profile, setProfile] = useState(emptyProfile);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getProfile().then(({ data }) => setProfile({ ...emptyProfile, ...data }));
  }, []);

  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus('');

    try {
      const { data } = await updateProfile(profile);
      setProfile({ ...emptyProfile, ...data });
      setStatus('Profile saved successfully.');
    } catch (err) {
      setStatus(err.response?.data?.message || 'Could not save profile.');
    } finally {
      setSaving(false);
    }
  };

  const initials = (profile.shopName || profile.name || 'KC').slice(0, 2).toUpperCase();
  const fullAddress = [profile.address, profile.city, profile.state, profile.pincode].filter(Boolean).join(', ');

  return (
    <AppLayout title="Profile" subtitle="Your business identity, delivery address, contact details, and account shortcuts.">
      <section className="kc-profile-hero">
        <div className="kc-profile-avatar">{initials}</div>
        <div>
          <p className="kc-page-eyebrow">Verified workspace</p>
          <h2>{profile.shopName || 'Your business name'}</h2>
          <p>{profile.name || 'Owner name'} - {profile.role || 'member'}</p>
          <div className="kc-profile-pills">
            <span><BadgeCheck size={16} /> Active account</span>
            <span><Building2 size={16} /> {profile.email || 'Email not added'}</span>
            <span><MapPin size={16} /> {profile.city || 'City pending'}</span>
          </div>
        </div>
      </section>

      <section className="kc-profile-grid">
        <form onSubmit={handleSubmit} className="kc-form-panel kc-modern-form">
          <h2>Edit Profile</h2>
          <div className="kc-form-grid">
            <label>Owner Name<input name="name" value={profile.name || ''} onChange={handleChange} /></label>
            <label>Shop / Business Name<input name="shopName" value={profile.shopName || ''} onChange={handleChange} /></label>
          </div>
          <div className="kc-form-grid">
            <label>Phone<input name="phone" value={profile.phone || ''} onChange={handleChange} /></label>
            <label>Email<input value={profile.email || ''} disabled /></label>
          </div>
          <label>Address<input name="address" value={profile.address || ''} onChange={handleChange} /></label>
          <div className="kc-form-grid">
            <label>City<input name="city" value={profile.city || ''} onChange={handleChange} /></label>
            <label>State<input name="state" value={profile.state || ''} onChange={handleChange} /></label>
            <label>Pincode<input name="pincode" value={profile.pincode || ''} onChange={handleChange} /></label>
          </div>
          {status && <p className="kc-form-status">{status}</p>}
          <button className="kc-premium-btn" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Profile'}</button>
        </form>

        <aside className="kc-form-panel kc-profile-side">
          <h2>Account Center</h2>
          <article><UserRound size={18} /><div><strong>Role</strong><span>{profile.role || 'Not available'}</span></div></article>
          <article><MapPin size={18} /><div><strong>Delivery Address</strong><span>{fullAddress || 'Add your complete address'}</span></div></article>
          <Link to="/settings"><Settings size={18} /> Open Settings</Link>
          <Link to="/support"><Headphones size={18} /> Contact Support</Link>
        </aside>
      </section>
    </AppLayout>
  );
}