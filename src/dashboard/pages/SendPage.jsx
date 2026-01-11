import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import CryptoIcon from '../components/CryptoIcon';

export default function SendPage() {
    const { api } = useAuth();
    const [wallets, setWallets] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [step, setStep] = useState(1);

    useEffect(() => {
        loadWallets();
    }, []);

    const loadWallets = async () => {
        try {
            const data = await api('/wallet/balances');
            setWallets(data);
        } catch (error) {
            console.error('Failed to load wallets:', error);
        }
    };



    if (step === 1) {
        return (
            <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', marginBottom: '24px' }}>
                    Send Crypto
                </h1>

                <div style={{
                    background: '#12121a',
                    borderRadius: '16px',
                    padding: '24px',
                    marginBottom: '24px'
                }}>
                    <h3 style={{ color: '#888', fontSize: '0.9rem', marginBottom: '16px' }}>
                        Select Asset
                    </h3>

                    {wallets.map((wallet) => (
                        <div
                            key={`${wallet.coin}-${wallet.network}`}
                            onClick={() => {
                                setSelectedCoin(wallet);
                                setStep(2);
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '16px',
                                borderRadius: '12px',
                                marginBottom: '8px',
                                cursor: 'pointer',
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                transition: 'all 0.2s'
                            }}
                        >
                            <CryptoIcon coin={wallet.coin} size={40} style={{ marginRight: '16px' }} />
                            <div style={{ flex: 1 }}>
                                <div style={{ color: '#fff', fontWeight: '500' }}>{wallet.coin}</div>
                                <div style={{ color: '#666', fontSize: '0.85rem' }}>{wallet.network}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ color: '#fff' }}>{parseFloat(wallet.balance).toFixed(4)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <button
                onClick={() => setStep(1)}
                style={{
                    background: 'none',
                    border: 'none',
                    color: '#14F195',
                    cursor: 'pointer',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}
            >
                ← Back
            </button>

            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', marginBottom: '24px' }}>
                Send {selectedCoin?.coin}
            </h1>

            <div style={{
                background: '#12121a',
                borderRadius: '16px',
                padding: '24px'
            }}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', color: '#888', marginBottom: '8px' }}>
                        Recipient Address
                    </label>
                    <input
                        type="text"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="Enter wallet address"
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

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', color: '#888', marginBottom: '8px' }}>
                        Amount
                    </label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            style={{
                                width: '100%',
                                padding: '14px 16px',
                                paddingRight: '80px',
                                background: '#0a0a0f',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                color: '#fff',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                        <button
                            onClick={() => setAmount(selectedCoin?.balance || '0')}
                            style={{
                                position: 'absolute',
                                right: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(20, 241, 149, 0.1)',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '6px 12px',
                                color: '#14F195',
                                fontSize: '0.8rem',
                                cursor: 'pointer'
                            }}
                        >
                            MAX
                        </button>
                    </div>
                    <div style={{ color: '#666', fontSize: '0.85rem', marginTop: '8px' }}>
                        Balance: {parseFloat(selectedCoin?.balance || 0).toFixed(4)} {selectedCoin?.coin}
                    </div>
                </div>

                <button
                    style={{
                        width: '100%',
                        padding: '16px',
                        background: 'linear-gradient(135deg, #14F195 0%, #9945FF 100%)',
                        border: 'none',
                        borderRadius: '12px',
                        color: '#000',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    Send {selectedCoin?.coin}
                </button>
            </div>
        </div>
    );
}
