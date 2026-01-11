import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0a0a0f',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '420px',
                background: '#12121a',
                borderRadius: '24px',
                padding: '48px 40px',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                        <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
                            <defs>
                                <linearGradient id="loginLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#14F195" />
                                    <stop offset="100%" stopColor="#9945FF" />
                                </linearGradient>
                            </defs>
                            <path d="M32 4L8 16v16c0 14.4 10.24 27.84 24 32 13.76-4.16 24-17.6 24-32V16L32 4z" fill="url(#loginLogoGrad)" />
                            <path d="M32 12L16 20v12c0 10.8 6.88 20.88 16 24 9.12-3.12 16-13.2 16-24V20L32 12z" fill="#0A0A0F" />
                        </svg>
                        <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff' }}>Web3SafePal</span>
                    </Link>
                </div>

                <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#fff', textAlign: 'center', marginBottom: '8px' }}>
                    Welcome Back
                </h1>
                <p style={{ color: '#666', textAlign: 'center', marginBottom: '32px' }}>
                    Sign in to your account
                </p>

                {error && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        color: '#EF4444',
                        marginBottom: '24px',
                        fontSize: '0.9rem'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '0.9rem' }}>
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '14px 16px',
                                background: '#0a0a0f',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                color: '#fff',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '0.9rem' }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '14px 16px',
                                background: '#0a0a0f',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                color: '#fff',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '16px',
                            background: 'linear-gradient(135deg, #14F195 0%, #9945FF 100%)',
                            border: 'none',
                            borderRadius: '12px',
                            color: '#000',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '24px', color: '#666' }}>
                    Don't have an account?{' '}
                    <Link to="/register" style={{ color: '#14F195', textDecoration: 'none' }}>
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
