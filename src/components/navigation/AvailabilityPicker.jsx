import { useAuth } from '../../auth/AuthContext.jsx';
import './AvailabilityPicker.css';

const OPTIONS = [
  { id: 'Available', dotClass: 'availability-picker__dot--available' },
  { id: 'Away', dotClass: 'availability-picker__dot--away' },
  { id: 'Do Not Disturb', dotClass: 'availability-picker__dot--dnd' },
];

// Shared by the profile dropdown and the Settings page. Persists via
// AuthContext (which writes it to localStorage alongside the rest of the
// mock account).
function AvailabilityPicker({ onSelect }) {
  const { user, setAvailability } = useAuth();

  return (
    <div className="availability-picker">
      {OPTIONS.map((option) => (
        <button
          type="button"
          key={option.id}
          className={`availability-picker__option ${
            user?.availability === option.id ? 'availability-picker__option--active' : ''
          }`}
          onClick={() => {
            setAvailability(option.id);
            onSelect?.();
          }}
        >
          <span className={`availability-picker__dot ${option.dotClass}`} />
          {option.id}
        </button>
      ))}
    </div>
  );
}

export default AvailabilityPicker;
