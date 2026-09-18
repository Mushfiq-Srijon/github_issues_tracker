import { StatsCard } from './StatsCard';
import { RecentActivityFeed } from './RecentActivityFeed';
import { StatusChart } from './StatusChart';
import { Header } from '../Header/Header';
import '../../styles/Dashboard.css';

export function Dashboard({ issues, onNavigateToIssues, onLogout }) {
    // Calculate metrics
    const totalIssues = issues.length;
    const openIssues = issues.filter((i) => i.status === 'Open').length;
    const inProgressIssues = issues.filter((i) => i.status === 'In Progress').length;
    const closedIssues = issues.filter((i) => i.status === 'Closed').length;

    // Get recent activity (last 5 issues sorted by date)
    const recentActivity = [...issues]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    // Status distribution for chart
    const statusDistribution = {
        open: openIssues,
        inProgress: inProgressIssues,
        closed: closedIssues,
    };

    return (
        <div className="dashboard">
            <Header
                pageTitle="Dashboard"
                onNavigateToIssues={onNavigateToIssues}
                onLogout={onLogout}
            />

            <main className="dashboard-content">
                {/* Overview Metrics Section */}
                <section className="metrics-section">
                    <h2 className="section-title">Overview</h2>
                    <div className="stats-grid">
                        <StatsCard
                            title="Total Issues"
                            value={totalIssues}
                            icon="📋"
                            color="#5000f5"
                        />
                        <StatsCard
                            title="Open"
                            value={openIssues}
                            icon="✥"
                            color="#00a875"
                        />
                        <StatsCard
                            title="In Progress"
                            value={inProgressIssues}
                            icon="⚙"
                            color="#ff9500"
                        />
                        <StatsCard
                            title="Closed"
                            value={closedIssues}
                            icon="◉"
                            color="#7419ed"
                        />
                    </div>
                </section>

                {/* Main Content Grid */}
                <div className="dashboard-grid">
                    {/* Recent Activity */}
                    <section className="recent-activity-section">
                        <h2 className="section-title">Recent Activity</h2>
                        <RecentActivityFeed activities={recentActivity} />
                    </section>

                    {/* Status Distribution Chart */}
                    <section className="chart-section">
                        <h2 className="section-title">Status Distribution</h2>
                        <StatusChart distribution={statusDistribution} />
                    </section>
                </div>
            </main>
        </div>
    );
}