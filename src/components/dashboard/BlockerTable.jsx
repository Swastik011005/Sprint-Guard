import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';
import './BlockerTable.css';

const PRIORITY_TONE = { High: 'danger', Medium: 'warning', Low: 'info' };
const STATUS_TONE = {
  Open: 'info',
  'In Progress': 'warning',
  Blocked: 'danger',
  Resolved: 'success',
  Closed: 'neutral',
};

// Presentational — takes whatever blocker list the caller wants shown
// (already filtered/sorted upstream) and a row-click handler. `detailed`
// adds the Description/Reporter/Assignee/Last Updated columns used by the
// full Blocker List / Active Blockers pages; the Dashboard's "Recently
// Detected Blockers" panel keeps the leaner original column set.
function BlockerTable({
  title = 'Recently Detected Blockers',
  blockers,
  onRowClick,
  emptyMessage = 'No blockers match the current filter.',
  detailed = false,
}) {
  return (
    <Card padded={false} className="blocker-table">
      <div className="blocker-table__header">{title}</div>

      {blockers.length === 0 ? (
        <div className="blocker-table__empty">{emptyMessage}</div>
      ) : (
        <div className="blocker-table__scroll">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                {detailed && <th>Description</th>}
                <th>Source</th>
                <th>Priority</th>
                <th>Status</th>
                {detailed && <th>Reporter</th>}
                {detailed && <th>Assignee</th>}
                <th>Detected On</th>
                {detailed && <th>Last Updated</th>}
              </tr>
            </thead>
            <tbody>
              {blockers.map((blocker) => (
                <tr
                  key={blocker.id}
                  className={onRowClick ? 'blocker-table__row--clickable' : ''}
                  onClick={onRowClick ? () => onRowClick(blocker.id) : undefined}
                >
                  <td className="blocker-table__id">{blocker.id}</td>
                  <td>{blocker.title}</td>
                  {detailed && (
                    <td className="blocker-table__description">{blocker.description}</td>
                  )}
                  <td className="blocker-table__muted">{blocker.source}</td>
                  <td>
                    <Badge tone={PRIORITY_TONE[blocker.priority] || 'neutral'}>
                      {blocker.priority}
                    </Badge>
                  </td>
                  <td>
                    <Badge tone={STATUS_TONE[blocker.status] || 'neutral'}>
                      {blocker.status}
                    </Badge>
                  </td>
                  {detailed && <td className="blocker-table__muted">{blocker.reportedBy}</td>}
                  {detailed && <td className="blocker-table__muted">{blocker.assignedTo}</td>}
                  <td className="blocker-table__muted">{blocker.detectedOn}</td>
                  {detailed && (
                    <td className="blocker-table__muted">{blocker.lastUpdated}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

export default BlockerTable;
