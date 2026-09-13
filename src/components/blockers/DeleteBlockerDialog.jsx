import { AlertTriangle } from 'lucide-react';
import Button from '../ui/Button.jsx';
import './DeleteBlockerDialog.css';

// Simple, reusable confirm dialog. The caller owns the "are we showing
// this" state and passes onConfirm/onCancel — this component has no
// knowledge of BlockerContext itself, so it stays reusable for any
// destructive confirmation, not just blockers.
function DeleteBlockerDialog({ blockerTitle, onCancel, onConfirm }) {
  return (
    <div className="delete-dialog__overlay" onClick={onCancel}>
      <div className="delete-dialog" onClick={(event) => event.stopPropagation()}>
        <div className="delete-dialog__icon">
          <AlertTriangle size={24} />
        </div>
        <h2 className="delete-dialog__title">Delete this blocker?</h2>
        <p className="delete-dialog__message">
          Are you sure you want to delete{blockerTitle ? ` "${blockerTitle}"` : ' this blocker'}?
          This can't be undone.
        </p>
        <div className="delete-dialog__actions">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" className="delete-dialog__confirm" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteBlockerDialog;
