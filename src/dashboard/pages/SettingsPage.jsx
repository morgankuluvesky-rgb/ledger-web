import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SettingsPage() {
    const { user, api, logout } = useAuth();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match' });
            return;
        }

        try {
            await api('/user/password', {
                method: 'PUT',
                body: JSON.stringify({ currentPassword, newPassword })
            });
            setMessage({ type: 'success', text: 'Password updated successfully!' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', marginBottom: '24px' }}>
                Settings
            </h1>

            {/* Quick Links */}
            <div style={{
                background: '#12121a',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px'
            }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <Link to="/dashboard/manage-crypto" style={{
                        padding: '16px',
                        background: 'rgba(255,255,255,0.02)',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14F195" strokeWidth="2">
                            <circle cx="8" cy="8" r="6" />
                            <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
                        </svg>
                        Manage Crypto
                    </Link>
                    <Link to="/dashboard/addresses" style={{
                        padding: '16px',
                        background: 'rgba(255,255,255,0.02)',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14F195" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <line x1="3" y1="9" x2="21" y2="9" />
                        </svg>
                        Crypto Address
                    </Link>
                    <Link to="/dashboard/referrals" style={{
                        padding: '16px',
                        background: 'rgba(255,255,255,0.02)',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14F195" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                        </svg>
                        Referrals
                    </Link>
                    <Link to="/dashboard/notifications" style={{
                        padding: '16px',
                        background: 'rgba(255,255,255,0.02)',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14F195" strokeWidth="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        </svg>
                        Notifications
                    </Link>
                </div>
            </div>

            {/* Security Section */}
            <div style={{
                background: '#12121a',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px'
            }}>
                <h3 style={{ color: '#fff', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14F195" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Security
                </h3>

                {message.text && (
                    <div style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        marginBottom: '16px',
                        background: message.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                        color: message.type === 'error' ? '#EF4444' : '#10B981'
                    }}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handlePasswordChange}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '0.9rem' }}>
                            Current Password
                        </label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
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
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '0.9rem' }}>
                            New Password
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
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
                        />
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '0.9rem' }}>
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: 'linear-gradient(135deg, #14F195 0%, #9945FF 100%)',
                            border: 'none',
                            borderRadius: '12px',
                            color: '#000',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        Update Password
                    </button>
                </form>
            </div>

            {/* Logout */}
            <button
                onClick={logout}
                style={{
                    width: '100%',
                    padding: '16px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '12px',
                    color: '#EF4444',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                }}
            >
                Logout
            </button>
        </div>
    );
}
