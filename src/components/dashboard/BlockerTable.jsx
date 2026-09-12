import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';
import './BlockerTable.css';

const PRIORITY_TONE = { High: 'danger', Medium: 'warning', Low: 'info' };
const STATUS_TONE = { Open: 'info', 'In Progress': 'warning', Resolved: 'success' };

// Presentational — takes whatever blocker list the caller wants shown
// (already filtered/sorted upstream) and a row-click handler. Used by both
// the Dashboard's "Recently Detected Blockers" panel and the Blocker List
// / Active Blockers pages.
function BlockerTable({ title = 'Recently Detected Blockers', blockers, onRowClick, emptyMessage = 'No blockers match the current filter.' }) {
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
                <th>Source</th>
                <th>Priority</th>
                <th>Detected On</th>
                <th>Status</th>
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
                  <td className="blocker-table__muted">{blocker.source}</td>
                  <td>
                    <Badge tone={PRIORITY_TONE[blocker.priority] || 'neutral'}>
                      {blocker.priority}
                    </Badge>
                  </td>
                  <td className="blocker-table__muted">{blocker.detectedOn}</td>
                  <td>
                    <Badge tone={STATUS_TONE[blocker.status] || 'neutral'}>
                      {blocker.status}
                    </Badge>
                  </td>
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
