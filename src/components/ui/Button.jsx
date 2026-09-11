import './Button.css';

// variant: 'primary' | 'secondary' | 'ghost'
function Button({
  children,
  variant = 'primary',
  type = 'button',
  className = '',
  ...rest
}) {
  const classes = ['btn', `btn--${variant}`, className].filter(Boolean).join(' ');
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}

export default Button;
