import './Card.css';

// Generic surface used by every card-shaped block in the app.
// `padded={false}` lets a consumer (e.g. BlockerTable) control its own padding.
function Card({ children, className = '', padded = true, as: Component = 'div', ...rest }) {
  const classes = ['card', padded ? 'card--padded' : '', className].filter(Boolean).join(' ');
  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}

export default Card;
