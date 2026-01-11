import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function SwapPage() {
    const { api } = useAuth();
    const [prices, setPrices] = useState({});
    const [fromCoin, setFromCoin] = useState('BTC');
    const [toCoin, setToCoin] = useState('ETH');
    const [amount, setAmount] = useState('');

    const coins = ['BTC', 'ETH', 'USDT', 'SOL', 'BNB'];

    useEffect(() => {
        loadPrices();
    }, []);

    const loadPrices = async () => {
        try {
            const data = await api('/prices');
            setPrices(data);
        } catch (error) {
            console.error('Failed to load prices:', error);
        }
    };

    const calculateOutput = () => {
        if (!amount || !prices[fromCoin] || !prices[toCoin]) return '0';
        const fromValue = parseFloat(amount) * prices[fromCoin].usd;
        const toAmount = fromValue / prices[toCoin].usd;
        return toAmount.toFixed(6);
    };

    const setPercentage = (percent) => {
        // Placeholder - would use actual balance
        setAmount((100 * percent / 100).toString());
    };

    const swapCoins = () => {
        const temp = fromCoin;
        setFromCoin(toCoin);
        setToCoin(temp);
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', marginBottom: '24px' }}>
                Swap
            </h1>

            <div style={{
                background: '#12121a',
                borderRadius: '16px',
                padding: '24px'
            }}>
                {/* From */}
                <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ color: '#888', fontSize: '0.9rem' }}>From</span>
                        <span style={{ color: '#666', fontSize: '0.85rem' }}>Balance: 0.00</span>
                    </div>
                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        background: '#0a0a0f',
                        borderRadius: '12px',
                        padding: '16px'
                    }}>
                        <select
                            value={fromCoin}
                            onChange={(e) => setFromCoin(e.target.value)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#fff',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                outline: 'none'
                            }}
                        >
                            {coins.map(coin => (
                                <option key={coin} value={coin} style={{ background: '#12121a' }}>{coin}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            style={{
                                flex: 1,
                                background: 'transparent',
                                border: 'none',
                                color: '#fff',
                                fontSize: '1.25rem',
                                textAlign: 'right',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                        {[25, 50, 75, 100].map(percent => (
                            <button
                                key={percent}
                                onClick={() => setPercentage(percent)}
                                style={{
                                    flex: 1,
                                    padding: '8px',
                                    background: 'rgba(20, 241, 149, 0.1)',
                                    border: '1px solid rgba(20, 241, 149, 0.2)',
                                    borderRadius: '8px',
                                    color: '#14F195',
                                    cursor: 'pointer'
                                }}
                            >
                                {percent}%
                            </button>
                        ))}
                    </div>
                </div>

                {/* Swap Button */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
                    <button
                        onClick={swapCoins}
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: '#14F195',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                            <polyline points="17 1 21 5 17 9" />
                            <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                            <polyline points="7 23 3 19 7 15" />
                            <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                        </svg>
                    </button>
                </div>

                {/* To */}
                <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ color: '#888', fontSize: '0.9rem' }}>To</span>
                    </div>
                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        background: '#0a0a0f',
                        borderRadius: '12px',
                        padding: '16px'
                    }}>
                        <select
                            value={toCoin}
                            onChange={(e) => setToCoin(e.target.value)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#fff',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                outline: 'none'
                            }}
                        >
                            {coins.map(coin => (
                                <option key={coin} value={coin} style={{ background: '#12121a' }}>{coin}</option>
                            ))}
                        </select>
                        <div style={{
                            flex: 1,
                            color: '#666',
                            fontSize: '1.25rem',
                            textAlign: 'right'
                        }}>
                            {calculateOutput()}
                        </div>
                    </div>
                </div>

                {/* Rate Info */}
                {prices[fromCoin] && prices[toCoin] && (
                    <div style={{
                        background: 'rgba(255,255,255,0.02)',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        marginBottom: '24px',
                        color: '#888',
                        fontSize: '0.9rem'
                    }}>
                        1 {fromCoin} ≈ {(prices[fromCoin].usd / prices[toCoin].usd).toFixed(6)} {toCoin}
                    </div>
                )}

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
                    Swap
                </button>
            </div>
        </div>
    );
}
