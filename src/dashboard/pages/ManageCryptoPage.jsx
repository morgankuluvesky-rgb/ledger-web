import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ManageCryptoPage() {
    const { api } = useAuth();
    const [settings, setSettings] = useState({ enabledCoins: [] });
    const [saving, setSaving] = useState(false);

    const allCoins = [
        { symbol: 'BTC', name: 'Bitcoin', color: '#F7931A' },
        { symbol: 'ETH', name: 'Ethereum', color: '#627EEA' },
        { symbol: 'USDT', name: 'Tether', color: '#26A17B' },
        { symbol: 'SOL', name: 'Solana', color: '#00FFA3' },
        { symbol: 'BNB', name: 'BNB', color: '#F3BA2F' },
        { symbol: 'XRP', name: 'Ripple', color: '#23292F' },
        { symbol: 'TRX', name: 'Tron', color: '#EF0027' },
        { symbol: 'LTC', name: 'Litecoin', color: '#BFBBBB' }
    ];

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const data = await api('/user/settings');
            setSettings(data);
        } catch (error) {
            console.error('Failed to load settings:', error);
        }
    };

    const toggleCoin = async (symbol) => {
        const newEnabledCoins = settings.enabledCoins.includes(symbol)
            ? settings.enabledCoins.filter(c => c !== symbol)
            : [...settings.enabledCoins, symbol];

        setSettings({ ...settings, enabledCoins: newEnabledCoins });
        setSaving(true);

        try {
            await api('/user/settings', {
                method: 'PUT',
                body: JSON.stringify({ enabledCoins: newEnabledCoins })
            });
        } catch (error) {
            console.error('Failed to save settings:', error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
                Manage Crypto
            </h1>
            <p style={{ color: '#888', marginBottom: '24px' }}>
                Toggle cryptocurrencies on or off to customize your wallet view
            </p>

            <div style={{
                background: '#12121a',
                borderRadius: '16px',
                padding: '8px'
            }}>
                {allCoins.map((coin) => {
                    const isEnabled = settings.enabledCoins.includes(coin.symbol);

                    return (
                        <div
                            key={coin.symbol}
                            onClick={() => toggleCoin(coin.symbol)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '16px',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                background: isEnabled ? 'rgba(20, 241, 149, 0.05)' : 'transparent',
                                transition: 'background 0.2s'
                            }}
                        >
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: `${coin.color}20`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '16px',
                                color: coin.color,
                                fontWeight: 'bold',
                                fontSize: '0.8rem'
                            }}>
                                {coin.symbol}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ color: '#fff', fontWeight: '500' }}>{coin.symbol}</div>
                                <div style={{ color: '#666', fontSize: '0.85rem' }}>{coin.name}</div>
                            </div>
                            <div style={{
                                width: '48px',
                                height: '28px',
                                borderRadius: '14px',
                                background: isEnabled ? '#14F195' : 'rgba(255,255,255,0.1)',
                                position: 'relative',
                                transition: 'background 0.2s'
                            }}>
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    borderRadius: '50%',
                                    background: '#fff',
                                    position: 'absolute',
                                    top: '3px',
                                    left: isEnabled ? '23px' : '3px',
                                    transition: 'left 0.2s'
                                }} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {saving && (
                <div style={{ textAlign: 'center', padding: '16px', color: '#888' }}>
                    Saving...
                </div>
            )}
        </div>
    );
}
