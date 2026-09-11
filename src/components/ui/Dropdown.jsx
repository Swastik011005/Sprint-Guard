import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './Dropdown.css';

// A small, self-contained "select"-style dropdown. Used by SprintSelector and
// anywhere else a labelled trigger needs to reveal a short list of options.
function Dropdown({ label, value, options, onChange, icon: Icon, className = '' }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = options.find((option) => option.id === value);

  return (
    <div className={`dropdown ${className}`} ref={rootRef}>
      <button
        type="button"
        className="dropdown__trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {Icon && <Icon size={16} className="dropdown__icon" />}
        <span className="dropdown__text">
          {label && <span className="dropdown__label">{label}</span>}
          <span className="dropdown__value">{selected ? selected.label : ''}</span>
        </span>
        <ChevronDown size={16} className="dropdown__chevron" />
      </button>

      {open && (
        <ul className="dropdown__menu" role="listbox">
          {options.map((option) => (
            <li key={option.id}>
              <button
                type="button"
                className={`dropdown__option ${option.id === value ? 'dropdown__option--active' : ''}`}
                onClick={() => {
                  onChange(option.id);
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
