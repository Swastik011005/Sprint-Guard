import './Badge.css';

// tone: 'danger' | 'warning' | 'success' | 'info' | 'neutral'
function Badge({ children, tone = 'neutral', className = '' }) {
  const classes = ['badge', `badge--${tone}`, className].filter(Boolean).join(' ');
  return <span className={classes}>{children}</span>;
}

export default Badge;
