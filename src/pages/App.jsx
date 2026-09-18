import { useEffect, useState } from 'react';
import { Login } from '../components/Auth/Login';
import { Register } from '../components/Auth/Register';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { IssuesPage } from './IssuesPage';
import { seedIssues } from '../data/seedData';

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [path, setPath] = useState(() => window.location.pathname || '/login');
    const [issues, setIssues] = useState(seedIssues);

    useEffect(() => {
        const handlePopState = () => setPath(window.location.pathname || '/login');
        window.addEventListener('popstate', handlePopState);

        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const navigate = (nextPath) => {
        window.history.pushState({}, '', nextPath);
        setPath(nextPath);
    };

    const handleLogin = () => {
        setLoggedIn(true);
        navigate('/dashboard');
    };

    const handleLogout = () => {
        setLoggedIn(false);
        navigate('/login');
    };

    if (path === '/register') {
        return (
            <Register
                onRegister={() => navigate('/login')}
                onSwitchToLogin={() => navigate('/login')}
            />
        );
    }

    if (!loggedIn || path === '/login') {
        return (
            <Login
                onLogin={handleLogin}
                onSwitchToRegister={() => navigate('/register')}
            />
        );
    }

    if (path === '/dashboard') {
        return (
            <Dashboard
                issues={issues}
                onNavigateToIssues={() => navigate('/issues')}
                onLogout={handleLogout}
            />
        );
    }

    return (
        <IssuesPage
            issues={issues}
            setIssues={setIssues}
            onDashboard={() => navigate('/dashboard')}
            onLogout={handleLogout}
        />
    );
}