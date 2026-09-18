import { GitHubMark } from '../Common/GitHubMark';
import '../../styles/Header.css';

export function Header({
    onLogout,
    onDashboard,
    onNavigateToIssues,
    pageTitle,
    search,
    onSearchChange,
    onNewIssue,
}) {
    return (
        <header>
            <div className="brand">
                <GitHubMark />
                <span>GitHub Issues Tracker</span>
            </div>

            {pageTitle && <span className="page-title">{pageTitle}</span>}

            <div className="header-actions">
                {onDashboard && (
                    <button className="dashboard-link" onClick={onDashboard}>
                        Dashboard
                    </button>
                )}

                {onNavigateToIssues && (
                    <button className="view-issues-link" onClick={onNavigateToIssues}>
                        View All Issues
                    </button>
                )}

                {onSearchChange && (
                    <input
                        className="search"
                        placeholder="⌕  Search issues..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                )}

                {onNewIssue && (
                    <button className="primary" onClick={onNewIssue}>
                        ＋ New Issue
                    </button>
                )}

                <button className="logout" onClick={onLogout}>
                    Log out
                </button>
            </div>
        </header>
    );
}