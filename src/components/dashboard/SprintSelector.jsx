import { useState } from 'react';
import { Calendar } from 'lucide-react';
import Dropdown from '../ui/Dropdown.jsx';
import { sprints, currentSprintId } from '../../data/dashboardData.js';

// Visually functional against mock sprint data; wiring it to a real sprint
// list/backend later is a drop-in change since it's driven entirely by props/state.
function SprintSelector() {
  const [selectedSprint, setSelectedSprint] = useState(currentSprintId);

  return (
    <Dropdown
      label="Current Sprint"
      value={selectedSprint}
      options={sprints}
      onChange={setSelectedSprint}
      icon={Calendar}
    />
  );
}

export default SprintSelector;
