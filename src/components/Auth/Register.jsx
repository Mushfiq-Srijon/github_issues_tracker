import { useState } from 'react';
import { GitHubMark } from '../Common/GitHubMark';
import '../../styles/Auth.css';

export function Register({ onRegister, onSwitchToLogin }) {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.fullName.trim()) {
            return setError('Full name is required.');
        }

        if (!form.email.trim()) {
            return setError('Email is required.');
        }

        if (!form.email.includes('@')) {
            return setError('Please enter a valid email.');
        }

        if (form.password.length < 6) {
            return setError('Password must be at least 6 characters.');
        }

        if (form.password !== form.confirmPassword) {
            return setError('Passwords do not match.');
        }

        setSuccess('Registration successful! Redirecting to login...');
        setError('');

        setTimeout(() => {
            onRegister(form);
        }, 1500);
    };

    return (
        <main className="auth-page">
            <section className="auth-card">
                <GitHubMark large />

                <h1>Create Account</h1>
                <p>Join the development team</p>

                <form onSubmit={handleSubmit}>
                    <label>
                        Full Name
                        <input
                            name="fullName"
                            type="text"
                            value={form.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                        />
                    </label>

                    <label>
                        Email Address
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </label>

                    <label>
                        Password
                        <input
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="At least 6 characters"
                        />
                    </label>

                    <label>
                        Confirm Password
                        <input
                            name="confirmPassword"
                            type="password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                        />
                    </label>

                    {error && <span className="error">{error}</span>}
                    {success && <span className="success">{success}</span>}

                    <button className="primary full">Register</button>
                </form>

                <p className="switch-auth">
                    Already have an account?{' '}
                    <button className="link-btn" onClick={onSwitchToLogin}>
                        Sign In
                    </button>
                </p>
            </section>
        </main>
    );
}