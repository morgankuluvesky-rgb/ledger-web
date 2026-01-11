import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import CryptoIcon, { coinColors, coinNames } from '../components/CryptoIcon';
import ConnectWalletModal from '../components/ConnectWalletModal';

export default function WalletPage() {
    const { user, api } = useAuth();
    const [wallets, setWallets] = useState([]);
    const [prices, setPrices] = useState({});
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('crypto');
    const [showConnectModal, setShowConnectModal] = useState(false);

    useEffect(() => {
        loadData();
        // Refresh prices every 60 seconds
        const interval = setInterval(loadPrices, 60000);
        return () => clearInterval(interval);
    }, []);

    const loadData = async () => {
        try {
            await Promise.all([loadWallets(), loadPrices()]);
        } finally {
            setLoading(false);
        }
    };

    const loadWallets = async () => {
        try {
            const data = await api('/wallet/balances');
            setWallets(data);
        } catch (error) {
            console.error('Failed to load wallets:', error);
        }
    };

    const loadPrices = async () => {
        try {
            const data = await api('/prices');
            setPrices(data);
        } catch (error) {
            console.error('Failed to load prices:', error);
        }
    };

    // Calculate total USD balance
    const totalUSD = wallets.reduce((total, wallet) => {
        const price = prices[wallet.coin]?.usd || 0;
        return total + (parseFloat(wallet.balance) * price);
    }, 0);

    // Group wallets by coin (some coins have multiple networks)
    const groupedWallets = wallets.reduce((acc, wallet) => {
        if (!acc[wallet.coin]) {
            acc[wallet.coin] = {
                coin: wallet.coin,
                totalBalance: 0,
                wallets: []
            };
        }
        acc[wallet.coin].totalBalance += parseFloat(wallet.balance);
        acc[wallet.coin].wallets.push(wallet);
        return acc;
    }, {});

    // Custom sort order: BTC, ETH, XRP, SOL, USDT first, then others
    const coinOrder = ['BTC', 'ETH', 'XRP', 'SOL', 'USDT'];
    const coinList = Object.values(groupedWallets).sort((a, b) => {
        const aIndex = coinOrder.indexOf(a.coin);
        const bIndex = coinOrder.indexOf(b.coin);
        // If both are in priority list, sort by priority
        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        // Priority coins come first
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
        // Others sorted alphabetically
        return a.coin.localeCompare(b.coin);
    });

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '48px', color: '#888' }}>
                Loading wallet...
            </div>
        );
    }

    return (
        <>
            {/* Balance Display */}
            <div className="balance-card">
                <div className="balance-username">{user?.name}</div>
                <div className="balance-amount">
                    ${totalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="balance-change">
                    <span>$0.00 (0.0%)</span>
                    <button style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
                <a href="/dashboard/send" className="quick-action">
                    <div className="quick-action-icon blue">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="19" x2="12" y2="5" />
                            <polyline points="5 12 12 5 19 12" />
                        </svg>
                    </div>
                    <span className="quick-action-label">Send</span>
                </a>
                <a href="/dashboard/receive" className="quick-action">
                    <div className="quick-action-icon purple">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7" />
                            <rect x="14" y="3" width="7" height="7" />
                            <rect x="14" y="14" width="7" height="7" />
                            <rect x="3" y="14" width="7" height="7" />
                        </svg>
                    </div>
                    <span className="quick-action-label">Receive</span>
                </a>
                <a href="/dashboard/buy" className="quick-action">
                    <div className="quick-action-icon yellow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="1" x2="12" y2="23" />
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                    </div>
                    <span className="quick-action-label">Buy</span>
                </a>
                <div className="quick-action" onClick={() => setShowConnectModal(true)} style={{ cursor: 'pointer' }}>
                    <div className="quick-action-icon green">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                    </div>
                    <span className="quick-action-label">Connect Wallet</span>
                </div>
            </div>

            {/* Asset Tabs */}
            <div className="asset-tabs">
                <button
                    className={`asset-tab ${activeTab === 'crypto' ? 'active' : ''}`}
                    onClick={() => setActiveTab('crypto')}
                >
                    Crypto
                </button>
                <button
                    className={`asset-tab ${activeTab === 'nft' ? 'active' : ''}`}
                    onClick={() => setActiveTab('nft')}
                >
                    NFT
                </button>
            </div>

            {/* Asset List */}
            {activeTab === 'crypto' ? (
                <div className="asset-list">
                    {wallets
                        .sort((a, b) => {
                            // Custom sort: BTC first, then USDT variants, then ETH, etc.
                            const order = ['BTC', 'USDT', 'ETH', 'TRX', 'BNB', 'DOT', 'SOL', 'XRP', 'ADA', 'DOGE', 'MATIC', 'LTC'];
                            const aIndex = order.indexOf(a.coin);
                            const bIndex = order.indexOf(b.coin);
                            if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
                            if (aIndex !== -1) return -1;
                            if (bIndex !== -1) return 1;
                            return a.coin.localeCompare(b.coin);
                        })
                        .map((wallet) => {
                            const price = prices[wallet.coin]?.usd || 0;
                            const change = prices[wallet.coin]?.change24h || 0;
                            const balance = parseFloat(wallet.balance) || 0;
                            const usdValue = balance * price;

                            // For USDT, show the network in the name
                            const displayName = wallet.coin === 'USDT'
                                ? `Tether (${wallet.network})`
                                : coinNames[wallet.coin] || wallet.coin;

                            return (
                                <div key={`${wallet.coin}-${wallet.network}`} className="asset-item">
                                    <CryptoIcon coin={wallet.coin} size={40} />
                                    <div className="asset-info">
                                        <div className="asset-name">
                                            <span className="asset-symbol">{wallet.coin}</span>
                                            <span className="asset-full-name">{displayName}</span>
                                        </div>
                                        <div className="asset-price">
                                            <span className="asset-price-value">
                                                ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </span>
                                            <span className={`asset-price-change ${change >= 0 ? 'positive' : 'negative'}`}>
                                                {change >= 0 ? '' : ''}{change.toFixed(2)}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="asset-balance">
                                        <div className="asset-balance-amount">{balance.toFixed(4)}</div>
                                        <div className="asset-balance-usd">
                                            ${usdValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            ) : (
                <div style={{
                    textAlign: 'center',
                    padding: '64px',
                    background: '#12121a',
                    borderRadius: '16px',
                    color: '#666'
                }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ marginBottom: '16px', opacity: 0.5 }}>
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <p>No NFT yet</p>
                    <button
                        style={{
                            marginTop: '16px',
                            padding: '12px 24px',
                            background: '#14F195',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#000',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        Receive NFT
                    </button>
                </div>
            )}

            {/* Connect Wallet Modal */}
            <ConnectWalletModal
                isOpen={showConnectModal}
                onClose={() => setShowConnectModal(false)}
            />
        </>
    );
}
