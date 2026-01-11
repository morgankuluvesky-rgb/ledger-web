import { useState, useEffect } from 'react';
import { Link, useLocation, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import './DashboardLayout.css';

export default function DashboardLayout() {
    const { user, api, logout, loading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);
    const [pinChecked, setPinChecked] = useState(false);
    const [pinLoading, setPinLoading] = useState(true);

    // Check PIN status on mount
    useEffect(() => {
        const checkPin = async () => {
            if (!user) return;

            try {
                const response = await api('/user/has-pin');
                const pinVerified = sessionStorage.getItem('pinVerified') === 'true';

                if (!response.hasPin) {
                    // No PIN set, redirect to setup
                    navigate('/pin-setup', { replace: true });
                } else if (!pinVerified) {
                    // Has PIN but not verified this session
                    navigate('/pin', { replace: true });
                } else {
                    setPinChecked(true);
                }
            } catch (error) {
                console.error('PIN check error:', error);
                setPinChecked(true); // Allow access on error
            } finally {
                setPinLoading(false);
            }
        };

        checkPin();
    }, [user]);

    if (loading || pinLoading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0a0a0f', color: '#fff' }}>
                Loading...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!pinChecked) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0a0a0f', color: '#fff' }}>
                Checking security...
            </div>
        );
    }

    const menuItems = [
        { label: 'Wallet', path: '/dashboard', icon: 'wallet' },
        { label: 'DEX', path: '/dashboard/swap', icon: 'swap' },
        { label: 'Send', path: '/dashboard/send', icon: 'send' },
        { label: 'Receive', path: '/dashboard/receive', icon: 'receive' },
        { label: 'Referrals', path: '/dashboard/referrals', icon: 'users' },
        { label: 'Settings', path: '/dashboard/settings', icon: 'settings' },
    ];

    const cryptoItems = [
        { label: 'Manage Crypto', path: '/dashboard/manage-crypto', icon: 'coins' },
        { label: 'Crypto Address', path: '/dashboard/addresses', icon: 'address' },
        { label: 'Notifications', path: '/dashboard/notifications', icon: 'bell' },
    ];

    // Mobile bottom nav items
    const mobileNavItems = [
        { label: 'Home', path: '/dashboard', icon: 'home' },
        { label: 'Cards', path: '/dashboard/cards', icon: 'cards' },
        { label: 'Swap', path: '/dashboard/swap', icon: 'swap' },
        { label: 'Me', path: '/dashboard/settings', icon: 'me' },
    ];

    const isActive = (path) => {
        if (path === '/dashboard') {
            return location.pathname === '/dashboard';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <aside className="dashboard-sidebar">
                <div className="sidebar-header">
                    <Link to="/" className="sidebar-logo">
                        <svg className="sidebar-logo-icon" viewBox="0 0 64 64" fill="none">
                            <defs>
                                <linearGradient id="dashLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#14F195" />
                                    <stop offset="100%" stopColor="#9945FF" />
                                </linearGradient>
                            </defs>
                            <path d="M32 4L8 16v16c0 14.4 10.24 27.84 24 32 13.76-4.16 24-17.6 24-32V16L32 4z" fill="url(#dashLogoGrad)" />
                            <path d="M32 12L16 20v12c0 10.8 6.88 20.88 16 24 9.12-3.12 16-13.2 16-24V20L32 12z" fill="#0A0A0F" />
                        </svg>
                        <span className="sidebar-logo-text">Web3SafePal</span>
                    </Link>
                </div>

                <div className="sidebar-user">
                    <div className="sidebar-user-info">
                        <div className="sidebar-user-avatar">
                            {user.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                            <div className="sidebar-user-name">{user.name}</div>
                            <div className="sidebar-user-status">Connected</div>
                        </div>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <div className="sidebar-section">
                        <div className="sidebar-section-title">Menu</div>
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
                            >
                                <SidebarIcon name={item.icon} />
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="sidebar-section">
                        <div className="sidebar-section-title">Crypto</div>
                        {cryptoItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
                            >
                                <SidebarIcon name={item.icon} />
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </nav>

                <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <button
                        onClick={logout}
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '8px',
                            color: '#EF4444',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                        }}
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="dashboard-header-left">
                        {/* Wallet Selector with Dropdown */}
                        <div className="wallet-dropdown-container">
                            <div
                                className="dashboard-wallet-selector"
                                onClick={() => setWalletDropdownOpen(!walletDropdownOpen)}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                </svg>
                                My Wallet
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: walletDropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </div>

                            {/* Dropdown Menu */}
                            {walletDropdownOpen && (
                                <div className="wallet-dropdown-menu">
                                    <Link to="/dashboard/settings" className="wallet-dropdown-item" onClick={() => setWalletDropdownOpen(false)}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="3" />
                                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4" />
                                        </svg>
                                        Settings
                                    </Link>
                                    <Link to="/dashboard/addresses" className="wallet-dropdown-item" onClick={() => setWalletDropdownOpen(false)}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                            <line x1="3" y1="9" x2="21" y2="9" />
                                        </svg>
                                        Wallet Addresses
                                    </Link>
                                    <div className="wallet-dropdown-divider"></div>
                                    <button className="wallet-dropdown-item logout" onClick={() => { setWalletDropdownOpen(false); logout(); }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                            <polyline points="16 17 21 12 16 7" />
                                            <line x1="21" y1="12" x2="9" y2="12" />
                                        </svg>
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="dashboard-header-right">
                        <Link to="/dashboard/notifications" className="dashboard-notification-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                            <span className="notification-badge"></span>
                        </Link>
                    </div>
                </header>

                <div className="dashboard-content">
                    <Outlet />
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="mobile-bottom-nav">
                {mobileNavItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`mobile-nav-item ${isActive(item.path) ? 'active' : ''}`}
                    >
                        <MobileNavIcon name={item.icon} />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
}

// Sidebar Icons Component
function SidebarIcon({ name }) {
    const icons = {
        wallet: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /></svg>,
        swap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></svg>,
        send: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>,
        receive: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></svg>,
        users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
        settings: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
        coins: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="8" cy="8" r="6" /><path d="M18.09 10.37A6 6 0 1 1 10.34 18" /><path d="M7 6h1v4" /><path d="M16.71 13.88l.7.71-2.82 2.82" /></svg>,
        address: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>,
        bell: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
    };

    return (
        <span className="sidebar-link-icon">
            {icons[name] || null}
        </span>
    );
}

// Mobile Navigation Icons Component
function MobileNavIcon({ name }) {
    const icons = {
        home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
        cards: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>,
        swap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></svg>,
        me: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    };

    return (
        <span className="mobile-nav-icon">
            {icons[name] || null}
        </span>
    );
}

