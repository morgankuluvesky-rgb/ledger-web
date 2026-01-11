import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CryptoIcon, { coinNames } from '../components/CryptoIcon';
import './ReceivePage.css';

export default function ReceivePage() {
    const navigate = useNavigate();
    const { api } = useAuth();
    const [wallets, setWallets] = useState([]);
    const [prices, setPrices] = useState({});
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [copied, setCopied] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [networkFilter, setNetworkFilter] = useState('all');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [walletsData, pricesData] = await Promise.all([
                api('/wallet/addresses'),
                api('/prices')
            ]);
            setWallets(walletsData);
            setPrices(pricesData);
        } catch (error) {
            console.error('Failed to load data:', error);
        }
    };

    const copyAddress = () => {
        navigator.clipboard.writeText(selectedWallet.address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Get unique networks for filter
    const networks = ['all', ...new Set(wallets.map(w => w.network))];

    // Filter wallets based on search and network
    const filteredWallets = wallets
        .filter(wallet => {
            const matchesSearch = searchQuery === '' ||
                wallet.coin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (coinNames[wallet.coin] || '').toLowerCase().includes(searchQuery.toLowerCase());
            const matchesNetwork = networkFilter === 'all' || wallet.network === networkFilter;
            return matchesSearch && matchesNetwork;
        })
        .sort((a, b) => {
            const order = ['BTC', 'USDT', 'ETH', 'TRX', 'BNB', 'DOT', 'SOL', 'BCH', 'LTC', 'XRP', 'ADA', 'DOGE'];
            const aIndex = order.indexOf(a.coin);
            const bIndex = order.indexOf(b.coin);
            if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
            if (aIndex !== -1) return -1;
            if (bIndex !== -1) return 1;
            return a.coin.localeCompare(b.coin);
        });

    // Selected wallet view
    if (selectedWallet) {
        return (
            <div className="receive-page">
                <div className="receive-header">
                    <button className="receive-back-btn" onClick={() => setSelectedWallet(null)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="receive-title">Receive {selectedWallet.coin}</h1>
                    <div style={{ width: 24 }}></div>
                </div>

                <div className="receive-detail-card">
                    <CryptoIcon coin={selectedWallet.coin} size={64} style={{ marginBottom: '16px' }} />

                    <div className="receive-coin-name">
                        {selectedWallet.coin} <span className="receive-network-badge">{selectedWallet.network}</span>
                    </div>

                    {/* QR Code Placeholder */}
                    <div className="receive-qr-container">
                        <div className="receive-qr-placeholder">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1">
                                <rect x="3" y="3" width="7" height="7" />
                                <rect x="14" y="3" width="7" height="7" />
                                <rect x="14" y="14" width="7" height="7" />
                                <rect x="3" y="14" width="7" height="7" />
                            </svg>
                        </div>
                    </div>

                    <div className="receive-address-label">
                        {selectedWallet.coin} Address
                    </div>

                    <div className="receive-address-box">
                        {selectedWallet.address}
                    </div>

                    <button className="receive-copy-btn" onClick={copyAddress}>
                        {copied ? (
                            <>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Copied!
                            </>
                        ) : (
                            <>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </svg>
                                Copy Address
                            </>
                        )}
                    </button>

                    <p className="receive-warning">
                        Only send {selectedWallet.coin} ({selectedWallet.network}) to this address. Sending any other coin may result in permanent loss.
                    </p>
                </div>
            </div>
        );
    }

    // Main receive list view
    return (
        <div className="receive-page">
            {/* Header */}
            <div className="receive-header">
                <button className="receive-back-btn" onClick={() => navigate(-1)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="receive-title">Receive via Crypto</h1>
                <div style={{ width: 24 }}></div>
            </div>

            {/* Search Bar */}
            <div className="receive-search-container">
                <svg className="receive-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                    type="text"
                    className="receive-search-input"
                    placeholder="Enter coin name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Network Filter */}
            <div className="receive-network-filters">
                {networks.map(network => (
                    <button
                        key={network}
                        className={`receive-network-btn ${networkFilter === network ? 'active' : ''}`}
                        onClick={() => setNetworkFilter(network)}
                    >
                        {network === 'all' ? 'All Networks' : network}
                    </button>
                ))}
            </div>

            {/* Wallet List */}
            <div className="receive-wallet-list">
                {filteredWallets.map((wallet) => {
                    const price = prices[wallet.coin]?.usd || 0;
                    const change = prices[wallet.coin]?.change24h || 0;
                    const balance = parseFloat(wallet.balance) || 0;
                    const usdValue = balance * price;

                    return (
                        <div
                            key={`${wallet.coin}-${wallet.network}`}
                            className="receive-wallet-item"
                            onClick={() => setSelectedWallet(wallet)}
                        >
                            <CryptoIcon coin={wallet.coin} size={40} />
                            <div className="receive-wallet-info">
                                <div className="receive-wallet-name">
                                    <span className="receive-wallet-symbol">{wallet.coin}</span>
                                    <span className="receive-wallet-network">{wallet.network}</span>
                                </div>
                                <div className="receive-wallet-price">
                                    ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    <span className={`receive-wallet-change ${change >= 0 ? 'positive' : 'negative'}`}>
                                        {change >= 0 ? '+' : ''}{change.toFixed(2)}%
                                    </span>
                                </div>
                            </div>
                            <div className="receive-wallet-balance">
                                <div className="receive-wallet-amount">{balance.toFixed(4)}</div>
                                <div className="receive-wallet-usd">${usdValue.toFixed(2)}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
