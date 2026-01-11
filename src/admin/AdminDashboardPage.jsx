import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function AdminDashboardPage() {
    const { admin, API_URL } = useOutletContext();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${API_URL}/admin/stats`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setStats(data);
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { label: 'Total Users', value: stats?.totalUsers || 0, icon: '👥', color: '#14F195' },
        { label: 'New Today', value: stats?.newUsersToday || 0, icon: '📈', color: '#9945FF' },
        { label: 'Verified Users', value: stats?.verifiedUsers || 0, icon: '✓', color: '#00D4FF' },
        { label: 'Total Transactions', value: stats?.totalTransactions || 0, icon: '💸', color: '#FF6B6B' },
    ];

    return (
        <div>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ color: '#fff', fontSize: '2rem', marginBottom: '8px' }}>
                    Welcome back, {admin?.name} 👋
                </h1>
                <p style={{ color: '#666' }}>
                    Here's what's happening with your platform today.
                </p>
            </div>

            {/* Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '24px',
                marginBottom: '32px'
            }}>
                {statCards.map((stat, index) => (
                    <div key={index} style={{
                        background: '#12121a',
                        borderRadius: '16px',
                        padding: '24px',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <p style={{ color: '#666', marginBottom: '8px', fontSize: '0.9rem' }}>{stat.label}</p>
                                <p style={{ color: '#fff', fontSize: '2rem', fontWeight: '700' }}>
                                    {loading ? '...' : stat.value.toLocaleString()}
                                </p>
                            </div>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: `${stat.color}20`,
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem'
                            }}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div style={{
                background: '#12121a',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <h2 style={{ color: '#fff', marginBottom: '20px', fontSize: '1.2rem' }}>Quick Actions</h2>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <a href="/admin/users" style={{
                        padding: '16px 24px',
                        background: 'linear-gradient(135deg, #9945FF20, #14F19520)',
                        border: '1px solid rgba(153, 69, 255, 0.3)',
                        borderRadius: '12px',
                        color: '#fff',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <span style={{ fontSize: '1.5rem' }}>👥</span>
                        <span>Manage Users</span>
                    </a>
                    <a href="/admin/users" style={{
                        padding: '16px 24px',
                        background: 'rgba(20, 241, 149, 0.1)',
                        border: '1px solid rgba(20, 241, 149, 0.3)',
                        borderRadius: '12px',
                        color: '#14F195',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <span style={{ fontSize: '1.5rem' }}>💰</span>
                        <span>Edit Balances</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
