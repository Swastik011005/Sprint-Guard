import { Calendar } from 'lucide-react';
import Dropdown from '../ui/Dropdown.jsx';
import { useBlockers } from '../../context/BlockerContext.jsx';

// Driven by BlockerContext now, not local state — changing the sprint here
// updates every derived dashboard number (summary cards, both charts, the
// blocker table, and sprint health) since they all read from the same
// context.
function SprintSelector() {
  const { sprints, sprintId, setSprintId } = useBlockers();

  return (
    <Dropdown
      label="Current Sprint"
      value={sprintId}
      options={sprints}
      onChange={setSprintId}
      icon={Calendar}
    />
  );
}

export default SprintSelector;
