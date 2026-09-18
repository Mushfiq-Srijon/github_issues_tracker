import { useState } from 'react';
import { GitHubMark } from '../Common/GitHubMark';
import '../../styles/Login.css';

export function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            return setError('Please enter your username and password.');
        }

        onLogin();
    };

    return (
        <main className="login-page">
            <section className="login-card">
                <GitHubMark large />

                <h1>GitHub Issues Tracker</h1>
                <p>Sign in to manage your issues</p>

                <form onSubmit={handleSubmit}>
                    <label>
                        Username
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Username"
                        />
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                        />
                    </label>

                    {error && <span className="error">{error}</span>}

                    <button className="primary full">Sign In</button>
                </form>
            </section>
        </main>
    );
}