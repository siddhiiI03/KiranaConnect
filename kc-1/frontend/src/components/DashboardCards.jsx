export function StatCard({ label, value, tone = 'purple', detail }) {
  return (
    <article className={`kc-stat-card tone-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      {detail && <p>{detail}</p>}
    </article>
  );
}

export function FeaturePanel({ title, children, action }) {
  return (
    <section className="kc-feature-panel">
      <div>
        <h2>{title}</h2>
        {children}
      </div>
      {action}
    </section>
  );
}