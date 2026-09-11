import './Input.css';

// Simple labelled input with an optional leading icon and trailing adornment
// (e.g. the password visibility toggle on the Login page).
function Input({ icon: Icon, trailing, className = '', ...rest }) {
  return (
    <div className={`input ${className}`}>
      {Icon && <Icon size={18} className="input__icon" />}
      <input className="input__field" {...rest} />
      {trailing && <span className="input__trailing">{trailing}</span>}
    </div>
  );
}

export default Input;
