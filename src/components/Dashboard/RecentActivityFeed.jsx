import '../../styles/RecentActivityFeed.css';

export function RecentActivityFeed({ activities }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Open':
                return '#00a875';
            case 'In Progress':
                return '#ff9500';
            case 'Closed':
                return '#7419ed';
            default:
                return '#59708e';
        }
    };

    const getPriorityBg = (priority) => {
        switch (priority) {
            case 'Low':
                return '#eef1f4';
            case 'Medium':
                return '#fff0bc';
            case 'High':
                return '#ffe4e4';
            case 'Critical':
                return '#f15159';
            default:
                return '#eef1f4';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Low':
                return '#8d96a3';
            case 'Medium':
                return '#d49300';
            case 'High':
                return '#f05c63';
            case 'Critical':
                return '#fff';
            default:
                return '#8d96a3';
        }
    };

    return (
        <div className="activity-feed">
            {activities.length === 0 ? (
                <div className="empty-activity">
                    <p>No recent activity yet.</p>
                </div>
            ) : (
                <ul className="activity-list">
                    {activities.map((activity) => (
                        <li key={activity.id} className="activity-item">
                            <div className="activity-header">
                                <h4 className="activity-title">{activity.title}</h4>
                                <span
                                    className="activity-status"
                                    style={{ color: getStatusColor(activity.status) }}
                                >
                                    {activity.status}
                                </span>
                            </div>

                            <div className="activity-meta">
                                <span
                                    className="activity-priority"
                                    style={{
                                        background: getPriorityBg(activity.priority),
                                        color: getPriorityColor(activity.priority),
                                    }}
                                >
                                    {activity.priority}
                                </span>

                                <span className="activity-label">
                                    ◉ {activity.label}
                                </span>

                                <span className="activity-author">
                                    by {activity.author}
                                </span>

                                <span className="activity-date">{activity.date}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}