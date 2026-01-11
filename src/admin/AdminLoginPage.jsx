import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/api';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Store admin token separately
            localStorage.setItem('adminToken', data.token);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #0a0a0f 100%)',
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
                border: '1px solid rgba(153, 69, 255, 0.3)',
                boxShadow: '0 0 60px rgba(153, 69, 255, 0.2)'
            }}>
                {/* Admin Badge */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 24px',
                        background: 'linear-gradient(135deg, rgba(153, 69, 255, 0.2) 0%, rgba(20, 241, 149, 0.2) 100%)',
                        borderRadius: '50px',
                        marginBottom: '24px'
                    }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9945FF" strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        <span style={{ color: '#fff', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>
                            Admin Panel
                        </span>
                    </div>
                </div>

                <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#fff', textAlign: 'center', marginBottom: '8px' }}>
                    Administrator Access
                </h1>
                <p style={{ color: '#666', textAlign: 'center', marginBottom: '32px' }}>
                    Authorized personnel only
                </p>

                {error && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        color: '#EF4444',
                        marginBottom: '24px',
                        fontSize: '0.9rem',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '0.9rem' }}>
                            Admin Email
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
                                border: '1px solid rgba(153, 69, 255, 0.3)',
                                borderRadius: '12px',
                                color: '#fff',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                            placeholder="admin@example.com"
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
                                border: '1px solid rgba(153, 69, 255, 0.3)',
                                borderRadius: '12px',
                                color: '#fff',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '16px',
                            background: 'linear-gradient(135deg, #9945FF 0%, #14F195 100%)',
                            border: 'none',
                            borderRadius: '12px',
                            color: '#000',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Authenticating...' : 'Access Admin Panel'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '24px', color: '#444', fontSize: '0.8rem' }}>
                    🔒 This is a restricted area
                </p>
            </div>
        </div>
    );
}
