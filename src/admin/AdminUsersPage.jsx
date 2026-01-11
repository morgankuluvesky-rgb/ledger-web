import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function AdminUsersPage() {
    const { API_URL } = useOutletContext();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editingBalance, setEditingBalance] = useState(null);
    const [newBalance, setNewBalance] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${API_URL}/admin/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false);
        }
    };

    const selectUser = async (userId) => {
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${API_URL}/admin/users/${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setSelectedUser(data);
        } catch (error) {
            console.error('Failed to fetch user:', error);
        }
    };

    const updateBalance = async (walletId, coin, network) => {
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${API_URL}/admin/users/${selectedUser.id}/balance`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    coin,
                    network,
                    balance: parseFloat(newBalance)
                })
            });

            if (res.ok) {
                setMessage(`✅ ${coin} balance updated to ${newBalance}`);
                selectUser(selectedUser.id); // Refresh user data
                setEditingBalance(null);
                setNewBalance('');
                setTimeout(() => setMessage(''), 3000);
            }
        } catch (error) {
            setMessage('❌ Failed to update balance');
        }
    };

    const deleteUser = async (userId) => {
        if (!confirm('Are you sure you want to delete this user?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            await fetch(`${API_URL}/admin/users/${userId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setUsers(users.filter(u => u.id !== userId));
            setSelectedUser(null);
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    return (
        <div>
            <h1 style={{ color: '#fff', fontSize: '1.75rem', marginBottom: '24px' }}>
                User Management
            </h1>

            {message && (
                <div style={{
                    padding: '16px',
                    background: message.includes('✅') ? 'rgba(20, 241, 149, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    border: `1px solid ${message.includes('✅') ? 'rgba(20, 241, 149, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                    borderRadius: '12px',
                    color: message.includes('✅') ? '#14F195' : '#EF4444',
                    marginBottom: '24px'
                }}>
                    {message}
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Users List */}
                <div style={{
                    background: '#12121a',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    overflow: 'hidden'
                }}>
                    <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <h2 style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>
                            All Users ({users.length})
                        </h2>
                    </div>
                    <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                        {loading ? (
                            <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>Loading...</div>
                        ) : (
                            users.map(user => (
                                <div
                                    key={user.id}
                                    onClick={() => selectUser(user.id)}
                                    style={{
                                        padding: '16px 20px',
                                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                                        cursor: 'pointer',
                                        background: selectedUser?.id === user.id ? 'rgba(153, 69, 255, 0.1)' : 'transparent',
                                        transition: 'background 0.2s'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{
                                            width: '36px',
                                            height: '36px',
                                            background: 'linear-gradient(135deg, #9945FF, #14F195)',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#000',
                                            fontWeight: '600',
                                            fontSize: '0.9rem'
                                        }}>
                                            {user.name?.charAt(0) || '?'}
                                        </div>
                                        <div>
                                            <div style={{ color: '#fff', fontWeight: '500' }}>{user.name}</div>
                                            <div style={{ color: '#666', fontSize: '0.85rem' }}>{user.email}</div>
                                        </div>
                                        {user.isAdmin && (
                                            <span style={{
                                                marginLeft: 'auto',
                                                padding: '4px 8px',
                                                background: 'rgba(153, 69, 255, 0.2)',
                                                borderRadius: '4px',
                                                color: '#9945FF',
                                                fontSize: '0.75rem'
                                            }}>
                                                ADMIN
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* User Details */}
                <div style={{
                    background: '#12121a',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    overflow: 'hidden'
                }}>
                    {selectedUser ? (
                        <>
                            <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h2 style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>
                                        User Details
                                    </h2>
                                    <button
                                        onClick={() => deleteUser(selectedUser.id)}
                                        style={{
                                            padding: '8px 16px',
                                            background: 'rgba(239, 68, 68, 0.1)',
                                            border: '1px solid rgba(239, 68, 68, 0.3)',
                                            borderRadius: '8px',
                                            color: '#EF4444',
                                            cursor: 'pointer',
                                            fontSize: '0.85rem'
                                        }}
                                    >
                                        Delete User
                                    </button>
                                </div>
                            </div>
                            <div style={{ padding: '20px' }}>
                                <div style={{ marginBottom: '20px' }}>
                                    <p style={{ color: '#666', marginBottom: '4px' }}>Name</p>
                                    <p style={{ color: '#fff', fontSize: '1.1rem' }}>{selectedUser.name}</p>
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <p style={{ color: '#666', marginBottom: '4px' }}>Email</p>
                                    <p style={{ color: '#fff' }}>{selectedUser.email}</p>
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <p style={{ color: '#666', marginBottom: '4px' }}>Joined</p>
                                    <p style={{ color: '#fff' }}>{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                                </div>

                                <h3 style={{ color: '#fff', marginBottom: '16px', marginTop: '32px' }}>
                                    💰 Wallet Balances
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {selectedUser.wallets?.map(wallet => (
                                        <div
                                            key={wallet.id}
                                            style={{
                                                padding: '16px',
                                                background: '#0a0a0f',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <div>
                                                <span style={{ color: '#fff', fontWeight: '600' }}>{wallet.coin}</span>
                                                <span style={{ color: '#666', marginLeft: '8px', fontSize: '0.85rem' }}>
                                                    ({wallet.network})
                                                </span>
                                            </div>
                                            {editingBalance === wallet.id ? (
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <input
                                                        type="number"
                                                        value={newBalance}
                                                        onChange={(e) => setNewBalance(e.target.value)}
                                                        placeholder="0.00"
                                                        style={{
                                                            width: '120px',
                                                            padding: '8px 12px',
                                                            background: '#12121a',
                                                            border: '1px solid #9945FF',
                                                            borderRadius: '8px',
                                                            color: '#fff',
                                                            outline: 'none'
                                                        }}
                                                    />
                                                    <button
                                                        onClick={() => updateBalance(wallet.id, wallet.coin, wallet.network)}
                                                        style={{
                                                            padding: '8px 16px',
                                                            background: '#14F195',
                                                            border: 'none',
                                                            borderRadius: '8px',
                                                            color: '#000',
                                                            cursor: 'pointer',
                                                            fontWeight: '600'
                                                        }}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingBalance(null)}
                                                        style={{
                                                            padding: '8px 12px',
                                                            background: 'transparent',
                                                            border: '1px solid #666',
                                                            borderRadius: '8px',
                                                            color: '#666',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ) : (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <span style={{ color: '#14F195', fontWeight: '600' }}>
                                                        {parseFloat(wallet.balance).toFixed(6)}
                                                    </span>
                                                    <button
                                                        onClick={() => {
                                                            setEditingBalance(wallet.id);
                                                            setNewBalance(wallet.balance);
                                                        }}
                                                        style={{
                                                            padding: '6px 12px',
                                                            background: 'rgba(153, 69, 255, 0.2)',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            color: '#9945FF',
                                                            cursor: 'pointer',
                                                            fontSize: '0.85rem'
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                            Select a user to view details
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
