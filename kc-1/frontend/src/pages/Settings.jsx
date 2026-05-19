import { useEffect, useState } from 'react';
import AppLayout from '../components/AppLayout';
import { getSettings, updateSettings } from '../services/api';

const defaults = {
  theme: 'midnight',
  language: 'English',
  notifications: {
    orderUpdates: true,
    lowStockAlerts: true,
    marketing: false,
  },
};

export default function SettingsPage() {
  const [settings, setSettings] = useState(defaults);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSettings().then(({ data }) => {
      setSettings({ ...defaults, ...data, notifications: { ...defaults.notifications, ...data.notifications } });
    });
  }, []);

  const updateNotification = (key) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      },
    });
  };

  const save = async () => {
    setSaving(true);
    setStatus('');
    try {
      const { data } = await updateSettings(settings);
      setSettings({ ...defaults, ...data, notifications: { ...defaults.notifications, ...data.notifications } });
      setStatus('Settings updated.');
    } catch (err) {
      setStatus(err.response?.data?.message || 'Could not update settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppLayout title="Settings" subtitle="Control theme, notifications, and workspace preferences.">
      <section className="kc-settings-grid">
        <div className="kc-form-panel">
          <h2>Theme</h2>
          <div className="kc-choice-row">
            {['midnight', 'dark', 'sunrise'].map((theme) => (
              <button key={theme} className={settings.theme === theme ? 'selected' : ''} onClick={() => setSettings({ ...settings, theme })}>{theme}</button>
            ))}
          </div>
        </div>
        <div className="kc-form-panel">
          <h2>Notifications</h2>
          {[
            ['orderUpdates', 'Order updates'],
            ['lowStockAlerts', 'Low stock alerts'],
            ['marketing', 'Growth tips'],
          ].map(([key, label]) => (
            <label className="kc-toggle-row" key={key}>
              <span>{label}</span>
              <input type="checkbox" checked={settings.notifications[key]} onChange={() => updateNotification(key)} />
            </label>
          ))}
        </div>
        <div className="kc-form-panel">
          <h2>Language</h2>
          <select value={settings.language} onChange={(event) => setSettings({ ...settings, language: event.target.value })}>
            <option>English</option>
            <option>Hindi</option>
            <option>Hinglish</option>
          </select>
          {status && <p className="kc-form-status">{status}</p>}
          <button className="kc-premium-btn" onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save Settings'}</button>
        </div>
      </section>
    </AppLayout>
  );
}