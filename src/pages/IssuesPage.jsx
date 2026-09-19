import { useEffect, useState } from 'react';
import { Header } from '../components/Header/Header';
import { IssuesList } from '../components/IssuesList/IssuesList';
import { IssueModal } from '../components/Modals/IssueModal';
import { NewIssueModal } from '../components/Modals/NewIssueModal';
import { apiRequest } from '../api';
import '../styles/App.css';

export function IssuesPage({ onDashboard, onLogout }) {
    const [issues, setIssues] = useState([]);
    const [search, setSearch] = useState('');
    const [statusFilters, setStatusFilters] = useState([]);
    const [priorityFilters, setPriorityFilters] = useState([]);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [showNewIssueModal, setShowNewIssueModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadIssues = async () => {
            try {
                const data = await apiRequest('/issues');
                setIssues(data.issues);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadIssues();
    }, []);

    const toggleFilter = (value, currentFilters, setFilters) => {
        if (currentFilters.includes(value)) {
            setFilters(
                currentFilters.filter((item) => item !== value)
            );
        } else {
            setFilters([...currentFilters, value]);
        }
    };

    const filteredIssues = issues.filter((issue) => {
        const matchesSearch = issue.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesStatus =
            statusFilters.length === 0 ||
            statusFilters.includes(issue.status);

        const matchesPriority =
            priorityFilters.length === 0 ||
            priorityFilters.includes(issue.priority);

        return (
            matchesSearch &&
            matchesStatus &&
            matchesPriority
        );
    });
    const handleCreateIssue = async (newIssue) => {
        try {
            const data = await apiRequest('/issues', {
                method: 'POST',
                body: JSON.stringify(newIssue),
            });

            setIssues((currentIssues) => [
                data.issue,
                ...currentIssues,
            ]);

            setShowNewIssueModal(false);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleUpdateIssue = async (updatedIssue) => {
        if (!selectedIssue) {
            return false;
        }

        try {
            const data = await apiRequest(`/issues/${selectedIssue.id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedIssue),
            });

            setIssues((currentIssues) =>
                currentIssues.map((issue) =>
                    issue.id === selectedIssue.id
                        ? data.issue
                        : issue
                )
            );

            setSelectedIssue(data.issue);

            return true;
        } catch (error) {
            setError(error.message);
            return false;
        }
    };

    const handleDeleteIssue = async () => {
        if (!selectedIssue) {
            return;
        }

        try {
            await apiRequest(`/issues/${selectedIssue.id}`, {
                method: 'DELETE',
            });

            setIssues((currentIssues) =>
                currentIssues.filter(
                    (issue) => issue.id !== selectedIssue.id
                )
            );

            setSelectedIssue(null);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="app">
            <Header
                pageTitle="All Issues"
                onLogout={onLogout}
                onDashboard={onDashboard}
                search={search}
                onSearchChange={setSearch}
                onNewIssue={() => setShowNewIssueModal(true)}
            />

            <main className="content">

                <div className="filters">
                    <div className="filter-group">
                        <span className="filter-title">Status</span>

                        <details className="filter-dropdown">
                            <summary>
                                {statusFilters.length === 0
                                    ? 'All Statuses'
                                    : `${statusFilters.length} selected`}
                                <span>⌄</span>
                            </summary>

                            <div className="filter-menu">
                                {[
                                    'Open',
                                    'In Progress',
                                    'Closed',
                                ].map((status) => (
                                    <button
                                        type="button"
                                        key={status}
                                        className={
                                            statusFilters.includes(status)
                                                ? 'selected'
                                                : ''
                                        }
                                        onClick={() =>
                                            toggleFilter(
                                                status,
                                                statusFilters,
                                                setStatusFilters
                                            )
                                        }
                                    >
                                        <span>
                                            {statusFilters.includes(status)
                                                ? '✓'
                                                : ''}
                                        </span>
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </details>
                    </div>

                    <div className="filter-group">
                        <span className="filter-title">Priority</span>

                        <details className="filter-dropdown">
                            <summary>
                                {priorityFilters.length === 0
                                    ? 'All Priorities'
                                    : `${priorityFilters.length} selected`}
                                <span>⌄</span>
                            </summary>

                            <div className="filter-menu">
                                {[
                                    'Low',
                                    'Medium',
                                    'High',
                                    'Critical',
                                ].map((priority) => (
                                    <button
                                        type="button"
                                        key={priority}
                                        className={
                                            priorityFilters.includes(priority)
                                                ? 'selected'
                                                : ''
                                        }
                                        onClick={() =>
                                            toggleFilter(
                                                priority,
                                                priorityFilters,
                                                setPriorityFilters
                                            )
                                        }
                                    >
                                        <span>
                                            {priorityFilters.includes(priority)
                                                ? '✓'
                                                : ''}
                                        </span>
                                        {priority}
                                    </button>
                                ))}
                            </div>
                        </details>
                    </div>
                </div>

                {error && <div className="error">{error}</div>}

                {loading ? (
                    <div className="empty">Loading issues...</div>
                ) : (
                    <IssuesList
                        issues={filteredIssues}
                        onIssueClick={setSelectedIssue}
                    />
                )}
            </main>

            {selectedIssue && (
                <IssueModal
                    issue={selectedIssue}
                    onClose={() => setSelectedIssue(null)}
                    onUpdate={handleUpdateIssue}
                    onDelete={handleDeleteIssue}
                />
            )}

            {showNewIssueModal && (
                <NewIssueModal
                    onClose={() => setShowNewIssueModal(false)}
                    onCreate={handleCreateIssue}
                />
            )}
        </div>
    );
}