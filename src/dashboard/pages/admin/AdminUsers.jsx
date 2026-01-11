import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function AdminUsers() {
    const { api } = useAuth();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [balanceForm, setBalanceForm] = useState({ coin: 'BTC', network: 'mainnet', balance: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await api('/admin/users');
            setUsers(data);
        } catch (error) {
            console.error('Failed to load users:', error);
        }
    };

    const updateBalance = async (e) => {
        e.preventDefault();
        try {
            await api(`/admin/users/${selectedUser.id}/balance`, {
                method: 'PUT',
                body: JSON.stringify(balanceForm)
            });
            setMessage('Balance updated successfully!');
            loadUsers();
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Failed to update balance');
        }
    };

    const deleteUser = async (userId) => {
        if (!confirm('Are you sure you want to delete this user?')) return;
        try {
            await api(`/admin/users/${userId}`, { method: 'DELETE' });
            loadUsers();
            if (selectedUser?.id === userId) setSelectedUser(null);
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    return (
        <div style={{ display: 'flex', gap: '32px' }}>
            {/* User List */}
            <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#fff', marginBottom: '24px' }}>
                    Users ({users.length})
                </h1>

                <div style={{
                    background: '#12121a',
                    borderRadius: '16px',
                    overflow: 'hidden'
                }}>
                    {users.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => setSelectedUser(user)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '16px 20px',
                                borderBottom: '1px solid rgba(255,255,255,0.03)',
                                cursor: 'pointer',
                                background: selectedUser?.id === user.id ? 'rgba(20, 241, 149, 0.05)' : 'transparent'
                            }}
                        >
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #14F195 0%, #9945FF 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '16px',
                                color: '#000',
                                fontWeight: '600'
                            }}>
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ color: '#fff', fontWeight: '500' }}>
                                    {user.name}
                                    {user.isAdmin && (
                                        <span style={{
                                            marginLeft: '8px',
                                            padding: '2px 8px',
                                            background: 'rgba(20, 241, 149, 0.1)',
                                            borderRadius: '4px',
                                            color: '#14F195',
                                            fontSize: '0.7rem'
                                        }}>
                                            ADMIN
                                        </span>
                                    )}
                                </div>
                                <div style={{ color: '#666', fontSize: '0.85rem' }}>{user.email}</div>
                            </div>
                            <div style={{ color: '#666', fontSize: '0.85rem' }}>
                                {new Date(user.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* User Details */}
            {selectedUser && (
                <div style={{ width: '400px' }}>
                    <div style={{
                        background: '#12121a',
                        borderRadius: '16px',
                        padding: '24px'
                    }}>
                        <h2 style={{ color: '#fff', marginBottom: '16px' }}>{selectedUser.name}</h2>
                        <p style={{ color: '#888', marginBottom: '24px' }}>{selectedUser.email}</p>

                        {/* Wallets */}
                        <h3 style={{ color: '#fff', marginBottom: '12px', fontSize: '0.9rem' }}>Balances</h3>
                        <div style={{ marginBottom: '24px' }}>
                            {selectedUser.wallets?.map((wallet, i) => (
                                <div
                                    key={i}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '8px 12px',
                                        background: 'rgba(255,255,255,0.02)',
                                        borderRadius: '8px',
                                        marginBottom: '4px'
                                    }}
                                >
                                    <span style={{ color: '#888' }}>{wallet.coin} ({wallet.network})</span>
                                    <span style={{ color: '#fff', fontWeight: '500' }}>{parseFloat(wallet.balance).toFixed(4)}</span>
                                </div>
                            ))}
                        </div>

                        {/* Update Balance Form */}
                        <h3 style={{ color: '#fff', marginBottom: '12px', fontSize: '0.9rem' }}>Set Balance</h3>

                        {message && (
                            <div style={{
                                padding: '12px',
                                borderRadius: '8px',
                                marginBottom: '16px',
                                background: message.includes('success') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                color: message.includes('success') ? '#10B981' : '#EF4444'
                            }}>
                                {message}
                            </div>
                        )}

                        <form onSubmit={updateBalance}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                                <select
                                    value={balanceForm.coin}
                                    onChange={(e) => setBalanceForm({ ...balanceForm, coin: e.target.value })}
                                    style={{
                                        padding: '12px',
                                        background: '#0a0a0f',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                >
                                    <option value="BTC">BTC</option>
                                    <option value="ETH">ETH</option>
                                    <option value="USDT">USDT</option>
                                    <option value="SOL">SOL</option>
                                </select>
                                <select
                                    value={balanceForm.network}
                                    onChange={(e) => setBalanceForm({ ...balanceForm, network: e.target.value })}
                                    style={{
                                        padding: '12px',
                                        background: '#0a0a0f',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                >
                                    <option value="mainnet">mainnet</option>
                                    <option value="ERC20">ERC20</option>
                                    <option value="TRC20">TRC20</option>
                                    <option value="BEP20">BEP20</option>
                                </select>
                            </div>
                            <input
                                type="number"
                                step="0.0001"
                                placeholder="New balance"
                                value={balanceForm.balance}
                                onChange={(e) => setBalanceForm({ ...balanceForm, balance: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: '#0a0a0f',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    color: '#fff',
                                    marginBottom: '12px'
                                }}
                            />
                            <button
                                type="submit"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: '#14F195',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: '#000',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                Update Balance
                            </button>
                        </form>

                        {/* Delete User */}
                        {!selectedUser.isAdmin && (
                            <button
                                onClick={() => deleteUser(selectedUser.id)}
                                style={{
                                    width: '100%',
                                    marginTop: '16px',
                                    padding: '12px',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                    borderRadius: '8px',
                                    color: '#EF4444',
                                    cursor: 'pointer'
                                }}
                            >
                                Delete User
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
