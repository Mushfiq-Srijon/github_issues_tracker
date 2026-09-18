import '../../styles/StatsCard.css';

export function StatsCard({ title, value, icon, color }) {
    return (
        <div className="stats-card" style={{ borderTopColor: color }}>
            <div className="stats-icon" style={{ backgroundColor: color }}>
                {icon}
            </div>
            <div className="stats-content">
                <p className="stats-title">{title}</p>
                <p className="stats-value">{value}</p>
            </div>
        </div>
    );
}