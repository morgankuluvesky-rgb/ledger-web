import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
    const { api } = useAuth();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const data = await api('/admin/stats');
            setStats(data);
        } catch (error) {
            console.error('Failed to load stats:', error);
        }
    };

    return (
        <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#fff', marginBottom: '32px' }}>
                Admin Dashboard
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
                <div style={{
                    background: '#12121a',
                    borderRadius: '16px',
                    padding: '24px'
                }}>
                    <div style={{ color: '#888', marginBottom: '8px' }}>Total Users</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#14F195' }}>
                        {stats?.totalUsers || 0}
                    </div>
                </div>
                <div style={{
                    background: '#12121a',
                    borderRadius: '16px',
                    padding: '24px'
                }}>
                    <div style={{ color: '#888', marginBottom: '8px' }}>New Today</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#9945FF' }}>
                        {stats?.newUsersToday || 0}
                    </div>
                </div>
                <div style={{
                    background: '#12121a',
                    borderRadius: '16px',
                    padding: '24px'
                }}>
                    <div style={{ color: '#888', marginBottom: '8px' }}>Total Transactions</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#F59E0B' }}>
                        {stats?.totalTransactions || 0}
                    </div>
                </div>
            </div>

            <div style={{
                background: '#12121a',
                borderRadius: '16px',
                padding: '24px'
            }}>
                <h2 style={{ color: '#fff', marginBottom: '16px' }}>Quick Actions</h2>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <a
                        href="/admin/users"
                        style={{
                            flex: 1,
                            padding: '20px',
                            background: 'rgba(20, 241, 149, 0.05)',
                            border: '1px solid rgba(20, 241, 149, 0.1)',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            color: '#fff',
                            textAlign: 'center'
                        }}
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#14F195" strokeWidth="2" style={{ marginBottom: '8px' }}>
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        <div style={{ fontWeight: '500' }}>Manage Users</div>
                        <div style={{ color: '#888', fontSize: '0.85rem' }}>View and edit user accounts</div>
                    </a>
                </div>
            </div>
        </div>
    );
}
