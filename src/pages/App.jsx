import { useEffect, useState } from 'react';
import { Login } from '../components/Auth/Login';
import { Register } from '../components/Auth/Register';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { IssuesPage } from './IssuesPage';
import { apiRequest } from '../api';

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [path, setPath] = useState(() => window.location.pathname || '/login');

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const data = await apiRequest('/user');

                setUser(data.user);
                setLoggedIn(true);
            } catch {
                setUser(null);
                setLoggedIn(false);
            } finally {
                setCheckingAuth(false);
            }
        };

        checkAuthentication();
    }, []);

    useEffect(() => {
        const handlePopState = () => {
            setPath(window.location.pathname || '/login');
        };

        window.addEventListener('popstate', handlePopState);

        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const navigate = (nextPath) => {
        window.history.pushState({}, '', nextPath);
        setPath(nextPath);
    };

    const handleLogin = (loggedInUser) => {
        setUser(loggedInUser);
        setLoggedIn(true);
        navigate('/dashboard');
    };

    const handleRegister = () => {
        navigate('/login');
    };

    const handleLogout = async () => {
        try {
            await apiRequest('/logout', {
                method: 'POST',
            });
        } catch {
        }

        setUser(null);
        setLoggedIn(false);
        navigate('/login');
    };

    if (checkingAuth) {
        return (
            <main className="auth-page">
                <section className="auth-card">
                    <p>Checking authentication...</p>
                </section>
            </main>
        );
    }

    if (path === '/register') {
        return (
            <Register
                onRegister={handleRegister}
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
                onNavigateToIssues={() => navigate('/issues')}
                onLogout={handleLogout}
            />
        );
    }

    return (
        <IssuesPage
            onDashboard={() => navigate('/dashboard')}
            onLogout={handleLogout}
        />
    );
}