import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
    const { user, logout, loading } = useAuth();
    const location = useLocation();

    // Debug: Log what we're getting
    console.log('AdminLayout - loading:', loading, 'user:', user);

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0a0a0f', color: '#fff' }}>
                Loading...
            </div>
        );
    }

    // Debug: Show what's happening
    if (!user) {
        console.log('AdminLayout - No user, redirecting to login');
        return <Navigate to="/login" replace />;
    }

    if (!user.isAdmin) {
        console.log('AdminLayout - User is not admin:', user);
        return <Navigate to="/login" replace />;
    }

    const navItems = [
        { label: 'Dashboard', path: '/admin' },
        { label: 'Users', path: '/admin/users' },
    ];

    const isActive = (path) => {
        if (path === '/admin') return location.pathname === '/admin';
        return location.pathname.startsWith(path);
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0f' }}>
            {/* Sidebar */}
            <aside style={{
                width: '240px',
                background: '#12121a',
                borderRight: '1px solid rgba(255,255,255,0.05)',
                padding: '24px 0'
            }}>
                <div style={{ padding: '0 20px', marginBottom: '32px' }}>
                    <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
                            <defs>
                                <linearGradient id="adminLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#14F195" />
                                    <stop offset="100%" stopColor="#9945FF" />
                                </linearGradient>
                            </defs>
                            <path d="M32 4L8 16v16c0 14.4 10.24 27.84 24 32 13.76-4.16 24-17.6 24-32V16L32 4z" fill="url(#adminLogoGrad)" />
                        </svg>
                        <span style={{ color: '#fff', fontWeight: '600' }}>Admin Panel</span>
                    </Link>
                </div>

                <nav>
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                display: 'block',
                                padding: '12px 20px',
                                color: isActive(item.path) ? '#14F195' : '#888',
                                textDecoration: 'none',
                                borderLeft: isActive(item.path) ? '3px solid #14F195' : '3px solid transparent',
                                background: isActive(item.path) ? 'rgba(20, 241, 149, 0.05)' : 'transparent'
                            }}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div style={{ position: 'absolute', bottom: '24px', left: '0', right: '0', padding: '0 20px' }}>
                    <Link to="/dashboard" style={{
                        display: 'block',
                        padding: '12px',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '8px',
                        color: '#888',
                        textDecoration: 'none',
                        textAlign: 'center',
                        marginBottom: '12px'
                    }}>
                        ← Back to Dashboard
                    </Link>
                    <button
                        onClick={logout}
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '8px',
                            color: '#EF4444',
                            cursor: 'pointer'
                        }}
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '32px' }}>
                <Outlet />
            </main>
        </div>
    );
}
