import { useEffect, useState } from 'react';
import { Header } from '../components/Header/Header';
import { Tabs } from '../components/Tabs/Tabs';
import { IssuesList } from '../components/IssuesList/IssuesList';
import { IssueModal } from '../components/Modals/IssueModal';
import { NewIssueModal } from '../components/Modals/NewIssueModal';
import { apiRequest } from '../api';
import '../styles/App.css';

export function IssuesPage({ onDashboard, onLogout }) {
    const [issues, setIssues] = useState([]);
    const [tab, setTab] = useState('All');
    const [search, setSearch] = useState('');
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

    const filteredIssues = issues.filter((issue) => {
        const matchesTab =
            tab === 'All' ||
            issue.status === tab ||
            (tab === 'Open' && issue.status === 'In Progress');

        const matchesSearch = issue.title
            .toLowerCase()
            .includes(search.toLowerCase());

        return matchesTab && matchesSearch;
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
                <Tabs activeTab={tab} onTabChange={setTab} />

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