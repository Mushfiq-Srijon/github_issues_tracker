import { useEffect, useState } from 'react';
import { StatsCard } from './StatsCard';
import { RecentActivityFeed } from './RecentActivityFeed';
import { StatusChart } from './StatusChart';
import { Header } from '../Header/Header';
import { apiRequest } from '../../api';
import '../../styles/Dashboard.css';

export function Dashboard({ onNavigateToIssues, onLogout }) {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const data = await apiRequest('/dashboard');

                setDashboard(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    if (loading) {
        return (
            <div className="dashboard">
                <Header
                    pageTitle="Dashboard"
                    onNavigateToIssues={onNavigateToIssues}
                    onLogout={onLogout}
                />

                <main className="dashboard-content">
                    <div className="empty-activity">
                        <p>Loading dashboard...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard">
                <Header
                    pageTitle="Dashboard"
                    onNavigateToIssues={onNavigateToIssues}
                    onLogout={onLogout}
                />

                <main className="dashboard-content">
                    <div className="empty-activity">
                        <p>{error}</p>
                    </div>
                </main>
            </div>
        );
    }

    const totalIssues = dashboard.stats.total;
    const openIssues = dashboard.stats.open;
    const inProgressIssues = dashboard.stats.inProgress;
    const closedIssues = dashboard.stats.closed;

    const recentActivity = dashboard.recentIssues.map((issue) => ({
        ...issue,
        author: issue.user?.name || 'Unknown User',
        date: new Date(issue.updated_at).toLocaleDateString(),
    }));

    const statusDistribution = dashboard.statusDistribution;

    return (
        <div className="dashboard">
            <Header
                pageTitle="Dashboard"
                onNavigateToIssues={onNavigateToIssues}
                onLogout={onLogout}
            />

            <main className="dashboard-content">
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

                <div className="dashboard-grid">
                    <section className="recent-activity-section">
                        <h2 className="section-title">Recent Activity</h2>

                        <RecentActivityFeed
                            activities={recentActivity}
                        />
                    </section>

                    <section className="chart-section">
                        <h2 className="section-title">
                            Status Distribution
                        </h2>

                        <StatusChart
                            distribution={statusDistribution}
                        />
                    </section>
                </div>
            </main>
        </div>
    );
}