import { useState } from 'react';
import { GitHubMark } from '../Common/GitHubMark';
import '../../styles/Auth.css';

export function Login({ onLogin, onSwitchToRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            return setError('Please enter your email and password.');
        }

        if (!email.includes('@')) {
            return setError('Please enter a valid email.');
        }

        setError('');
        onLogin();
    };

    return (
        <main className="auth-page">
            <section className="auth-card">
                <GitHubMark large />

                <h1>GitHub Issues Tracker</h1>
                <p>Sign in to manage your issues</p>

                <form onSubmit={handleSubmit}>
                    <label>
                        Email Address
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError('');
                            }}
                            placeholder="Enter your email"
                        />
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                            placeholder="Enter your password"
                        />
                    </label>

                    {error && <span className="error">{error}</span>}

                    <button className="primary full">Sign In</button>
                </form>

                <p className="switch-auth">
                    Don't have an account?{' '}
                    <button className="link-btn" onClick={onSwitchToRegister}>
                        Create one
                    </button>
                </p>
            </section>
        </main>
    );
}