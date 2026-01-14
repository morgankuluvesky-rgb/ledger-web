import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../config/api';

export default function AdminPanel() {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        checkAdmin();
    }, []);

    const checkAdmin = async () => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/adminlogin');
            return;
        }

        try {
            const res = await fetch(`${API_URL}/admin/me`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                const data = await res.json();
                setAdmin(data);
            } else {
                localStorage.removeItem('adminToken');
                navigate('/adminlogin');
            }
        } catch (error) {
            navigate('/adminlogin');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/adminlogin');
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0a0a0f', color: '#fff' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '3px solid #333',
                        borderTopColor: '#9945FF',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 16px'
                    }}></div>
                    Loading Admin Panel...
                </div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    const navItems = [
        { label: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
        { label: 'Users', path: '/admin/users', icon: '👥' },
        { label: 'Transactions', path: '/admin/transactions', icon: '💸' },
        { label: 'Settings', path: '/admin/settings', icon: '⚙️' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0f' }}>
            {/* Sidebar */}
            <aside style={{
                width: '260px',
                background: 'linear-gradient(180deg, #12121a 0%, #0a0a0f 100%)',
                borderRight: '1px solid rgba(153, 69, 255, 0.2)',
                padding: '24px 0',
                position: 'fixed',
                height: '100vh',
                overflowY: 'auto'
            }}>
                {/* Logo */}
                <div style={{ padding: '0 20px', marginBottom: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, #9945FF, #14F195)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>
                        <div>
                            <div style={{ color: '#fff', fontWeight: '700', fontSize: '1.1rem' }}>Web3SafePal</div>
                            <div style={{ color: '#9945FF', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Admin Panel</div>
                        </div>
                    </div>
                </div>

                {/* Admin Info */}
                <div style={{
                    margin: '0 20px 24px',
                    padding: '16px',
                    background: 'rgba(153, 69, 255, 0.1)',
                    borderRadius: '12px',
                    border: '1px solid rgba(153, 69, 255, 0.2)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, #9945FF, #14F195)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#000',
                            fontWeight: '700'
                        }}>
                            {admin?.name?.charAt(0) || 'A'}
                        </div>
                        <div>
                            <div style={{ color: '#fff', fontWeight: '600' }}>{admin?.name || 'Admin'}</div>
                            <div style={{ color: '#666', fontSize: '0.8rem' }}>{admin?.email}</div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav style={{ padding: '0 12px' }}>
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '14px 16px',
                                color: isActive(item.path) ? '#fff' : '#888',
                                textDecoration: 'none',
                                borderRadius: '12px',
                                marginBottom: '4px',
                                background: isActive(item.path) ? 'rgba(153, 69, 255, 0.2)' : 'transparent',
                                borderLeft: isActive(item.path) ? '3px solid #9945FF' : '3px solid transparent',
                                transition: 'all 0.2s'
                            }}
                        >
                            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Logout */}
                <div style={{ position: 'absolute', bottom: '24px', left: '12px', right: '12px' }}>
                    <Link to="/dashboard" style={{
                        display: 'block',
                        padding: '12px',
                        background: 'rgba(20, 241, 149, 0.1)',
                        border: '1px solid rgba(20, 241, 149, 0.2)',
                        borderRadius: '12px',
                        color: '#14F195',
                        textDecoration: 'none',
                        textAlign: 'center',
                        marginBottom: '12px'
                    }}>
                        ← View User Dashboard
                    </Link>
                    <button
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '12px',
                            color: '#EF4444',
                            cursor: 'pointer',
                            fontSize: '0.95rem'
                        }}
                    >
                        Logout Admin
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{
                flex: 1,
                marginLeft: '260px',
                padding: '32px',
                minHeight: '100vh'
            }}>
                <Outlet context={{ admin, API_URL }} />
            </main>
        </div>
    );
}
