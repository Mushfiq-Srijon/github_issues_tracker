import '../../styles/StatusChart.css';

export function StatusChart({ distribution }) {
  const { open, inProgress, closed } = distribution;
  const total = open + inProgress + closed;

  const openPercent = total > 0 ? Math.round((open / total) * 100) : 0;
  const inProgressPercent = total > 0 ? Math.round((inProgress / total) * 100) : 0;
  const closedPercent = total > 0 ? Math.round((closed / total) * 100) : 0;

  return (
    <div className="status-chart">
      {/* Visual Progress Bars */}
      <div className="chart-visualization">
        <div className="status-bar-container">
          <div className="status-bar-wrapper">
            <div
              className="status-bar open"
              style={{ width: `${openPercent}%` }}
              title={`Open: ${open}`}
            />
            <div
              className="status-bar in-progress"
              style={{ width: `${inProgressPercent}%` }}
              title={`In Progress: ${inProgress}`}
            />
            <div
              className="status-bar closed"
              style={{ width: `${closedPercent}%` }}
              title={`Closed: ${closed}`}
            />
          </div>
        </div>
      </div>

      {/* Legend with Details */}
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-dot open" />
          <div className="legend-content">
            <span className="legend-label">Open</span>
            <span className="legend-value">{open} ({openPercent}%)</span>
          </div>
        </div>

        <div className="legend-item">
          <div className="legend-dot in-progress" />
          <div className="legend-content">
            <span className="legend-label">In Progress</span>
            <span className="legend-value">{inProgress} ({inProgressPercent}%)</span>
          </div>
        </div>

        <div className="legend-item">
          <div className="legend-dot closed" />
          <div className="legend-content">
            <span className="legend-label">Closed</span>
            <span className="legend-value">{closed} ({closedPercent}%)</span>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="chart-summary">
        <div className="summary-stat">
          <span className="summary-label">Total Issues</span>
          <span className="summary-value">{total}</span>
        </div>
        <div className="summary-stat">
          <span className="summary-label">Resolution Rate</span>
          <span className="summary-value">
            {total > 0 ? Math.round((closed / total) * 100) : 0}%
          </span>
        </div>
      </div>
    </div>
  );
}