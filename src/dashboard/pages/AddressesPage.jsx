import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import CryptoIcon from '../components/CryptoIcon';

export default function AddressesPage() {
    const { api } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [filter, setFilter] = useState('all');
    const [copiedId, setCopiedId] = useState(null);

    const networks = ['all', 'mainnet', 'ERC20', 'TRC20'];

    useEffect(() => {
        loadAddresses();
    }, []);

    const loadAddresses = async () => {
        try {
            const data = await api('/wallet/addresses');
            setAddresses(data);
        } catch (error) {
            console.error('Failed to load addresses:', error);
        }
    };

    const filteredAddresses = filter === 'all'
        ? addresses
        : addresses.filter(a => a.network === filter);

    const copyAddress = (id, address) => {
        navigator.clipboard.writeText(address);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };



    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
                Crypto Addresses
            </h1>
            <p style={{ color: '#888', marginBottom: '24px' }}>
                Your wallet addresses across different networks
            </p>

            {/* Network Filter */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
                {networks.map(network => (
                    <button
                        key={network}
                        onClick={() => setFilter(network)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: 'none',
                            background: filter === network ? '#14F195' : 'rgba(255,255,255,0.05)',
                            color: filter === network ? '#000' : '#888',
                            cursor: 'pointer',
                            fontWeight: filter === network ? '600' : '400',
                            textTransform: 'capitalize'
                        }}
                    >
                        {network}
                    </button>
                ))}
            </div>

            {/* Address List */}
            <div style={{
                background: '#12121a',
                borderRadius: '16px',
                overflow: 'hidden'
            }}>
                {filteredAddresses.map((wallet) => (
                    <div
                        key={wallet.id}
                        style={{
                            padding: '20px',
                            borderBottom: '1px solid rgba(255,255,255,0.03)'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                            <CryptoIcon coin={wallet.coin} size={32} style={{ marginRight: '12px' }} />
                            <div style={{ flex: 1 }}>
                                <span style={{ color: '#fff', fontWeight: '500' }}>{wallet.coin}</span>
                                <span style={{
                                    marginLeft: '8px',
                                    padding: '2px 8px',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '4px',
                                    color: '#888',
                                    fontSize: '0.75rem'
                                }}>
                                    {wallet.network}
                                </span>
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            background: '#0a0a0f',
                            borderRadius: '8px',
                            padding: '12px'
                        }}>
                            <div style={{
                                flex: 1,
                                color: '#888',
                                fontSize: '0.85rem',
                                fontFamily: 'monospace',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>
                                {wallet.address}
                            </div>
                            <button
                                onClick={() => copyAddress(wallet.id, wallet.address)}
                                style={{
                                    padding: '8px 16px',
                                    background: copiedId === wallet.id ? '#10B981' : 'rgba(20, 241, 149, 0.1)',
                                    border: 'none',
                                    borderRadius: '6px',
                                    color: copiedId === wallet.id ? '#fff' : '#14F195',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem'
                                }}
                            >
                                {copiedId === wallet.id ? '✓' : 'Copy'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
