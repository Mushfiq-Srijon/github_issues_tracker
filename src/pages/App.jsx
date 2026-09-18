import { useState } from 'react';
import { Login } from '../components/Auth/Login';
import { Header } from '../components/Header/Header';
import { Tabs } from '../components/Tabs/Tabs';
import { IssuesList } from '../components/IssuesList/IssuesList';
import { IssueModal } from '../components/Modals/IssueModal';
import { NewIssueModal } from '../components/Modals/NewIssueModal';
import { filteredIssues } from '../utils/issueFilters';
import { seedIssues } from '../data/seedData';
import '../styles/App.css';

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [issues, setIssues] = useState(seedIssues);
    const [tab, setTab] = useState('All');
    const [search, setSearch] = useState('');
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [showNewIssueModal, setShowNewIssueModal] = useState(false);

    if (!loggedIn) {
        return <Login onLogin={() => setLoggedIn(true)} />;
    }

    const filtered = filteredIssues(issues, tab, search);

    const handleCreateIssue = (newIssue) => {
        setIssues([
            {
                ...newIssue,
                id: Date.now(),
                author: 'jhon.doe',
                date: '09/18/2026',
                description: newIssue.description || 'No description provided.',
            },
            ...issues,
        ]);

        setShowNewIssueModal(false);
    };

    const handleDeleteIssue = () => {
        setIssues(issues.filter((i) => i.id !== selectedIssue.id));
        setSelectedIssue(null);
    };

    return (
        <div className="app">
            <Header
                onLogout={() => setLoggedIn(false)}
                search={search}
                onSearchChange={setSearch}
                onNewIssue={() => setShowNewIssueModal(true)}
            />

            <main className="content">
                <Tabs activeTab={tab} onTabChange={setTab} />

                <IssuesList issues={filtered} onIssueClick={setSelectedIssue} />
            </main>

            {selectedIssue && (
                <IssueModal
                    issue={selectedIssue}
                    onClose={() => setSelectedIssue(null)}
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