import { GitHubMark } from '../Common/GitHubMark';
import '../../styles/Header.css';

export function Header({ onLogout, search, onSearchChange, onNewIssue }) {
    return (
        <header>
            <div className="brand">
                <GitHubMark />
                <span>GitHub Issues Tracker</span>
            </div>

            <div className="header-actions">
                <input
                    className="search"
                    placeholder="⌕  Search issues..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />

                <button className="primary" onClick={onNewIssue}>
                    ＋ New Issue
                </button>

                <button className="logout" onClick={onLogout}>
                    Log out
                </button>
            </div>
        </header>
    );
}