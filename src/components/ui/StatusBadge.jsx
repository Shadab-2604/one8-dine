const STATUS_STYLES = {
  pending:   { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  label: 'Pending' },
  confirmed: { color: '#10b981', bg: 'rgba(16,185,129,0.12)',  label: 'Confirmed' },
  completed: { color: '#3b82f6', bg: 'rgba(59,130,246,0.12)',  label: 'Completed' },
  cancelled: { color: '#ef4444', bg: 'rgba(239,68,68,0.12)',   label: 'Cancelled' },
  served:    { color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)',  label: 'Served' },
  preparing: { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  label: 'Preparing' },
  ready:     { color: '#3b82f6', bg: 'rgba(59,130,246,0.12)',  label: 'Ready' },
};

const StatusBadge = ({ status }) => {
  const key = status?.toLowerCase();
  const cfg = STATUS_STYLES[key] || { color: '#9ca3af', bg: 'rgba(156,163,175,0.12)', label: status };
  return (
    <span
      style={{
        color: cfg.color,
        backgroundColor: cfg.bg,
        border: `1px solid ${cfg.color}30`,
        padding: '2px 10px',
        borderRadius: '9999px',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.05em',
        textTransform: 'lowercase',
        display: 'inline-block',
      }}
    >
      {cfg.label}
    </span>
  );
};

export default StatusBadge;
