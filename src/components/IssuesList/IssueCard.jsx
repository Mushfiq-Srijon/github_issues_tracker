import '../../styles/IssueCard.css';

export function IssueCard({ issue, onClick }) {
    const statusIcon = issue.status === 'Closed' ? '◉' : '✥';
    const statusClass = issue.status.toLowerCase().replace(' ', '-');

    return (
        <button className={`issue-card ${statusClass}`} onClick={onClick}>
            <div className="card-top">
                <span className="status-icon">{statusIcon}</span>
                <span className={`priority ${issue.priority.toLowerCase()}`}>
                    {issue.priority.toUpperCase()}
                </span>
            </div>

            <h3>{issue.title}</h3>
            <p>{issue.description}</p>

            <div className="labels">
                <span className="label red">
                    ◉ {issue.label === 'Bug' ? 'BUG' : issue.label.toUpperCase()}
                </span>

                {issue.label !== 'Enhancement' && (
                    <span className="label amber">◉ HELP WANTED</span>
                )}
            </div>

            <div className="card-footer">
                <span>♟ {issue.author}</span>
                <span>{issue.date}</span>
            </div>
        </button>
    );
}