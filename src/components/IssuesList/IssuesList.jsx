import { IssueCard } from './IssueCard';
import '../../styles/IssuesList.css';

export function IssuesList({ issues, onIssueClick }) {
    return (
        <section className="issues-panel">
            <div className="panel-heading">
                <div className="heading-title">
                    <span className="purple-icon">✥</span>
                    <div>
                        <strong>{issues.length} Issues</strong>
                        <small>Track and manage your project issues</small>
                    </div>
                </div>

                <div className="legend">
                    <span>
                        <i className="dot green" /> Open
                    </span>
                    <span>
                        <i className="dot purple" /> Closed
                    </span>
                </div>
            </div>

            <div className="grid">
                {issues.length > 0 ? (
                    issues.map((issue) => (
                        <IssueCard
                            key={issue.id}
                            issue={issue}
                            onClick={() => onIssueClick(issue)}
                        />
                    ))
                ) : (
                    <div className="empty">No issues match your search.</div>
                )}
            </div>
        </section>
    );
}