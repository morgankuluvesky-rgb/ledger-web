import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CryptoIcon, { coinNames } from '../components/CryptoIcon';
import './BuyPage.css';

// Payment provider links
const PAYMENT_PROVIDERS = {
    binance: {
        name: 'Binance',
        icon: '💳',
        getUrl: (coin, amount) => `https://www.binance.com/en/crypto/buy/${coin}?amount=${amount}&fiat=USD`
    },
    transak: {
        name: 'Transak',
        icon: '🏦',
        getUrl: (coin, amount) => `https://global.transak.com/?defaultCryptoCurrency=${coin}&fiatAmount=${amount}&fiatCurrency=USD`
    },
    moonpay: {
        name: 'MoonPay',
        icon: '🌙',
        getUrl: (coin, amount) => `https://www.moonpay.com/buy/${coin.toLowerCase()}?baseCurrencyAmount=${amount}&baseCurrencyCode=usd`
    }
};

export default function BuyPage() {
    const navigate = useNavigate();
    const { api } = useAuth();
    const [wallets, setWallets] = useState([]);
    const [prices, setPrices] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [networkFilter, setNetworkFilter] = useState('all');

    // Step management
    const [step, setStep] = useState(1); // 1: select coin, 2: enter amount
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [amount, setAmount] = useState(150);
    const [selectedProvider, setSelectedProvider] = useState('binance');
    const [showPaymentModal, setShowPaymentModal] = useState(false);

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

    // Get unique networks
    const networks = ['all', ...new Set(wallets.map(w => w.network))];

    // Filter and dedupe wallets (only show unique coins for buying)
    const uniqueCoins = wallets.reduce((acc, wallet) => {
        if (!acc.find(w => w.coin === wallet.coin)) {
            acc.push(wallet);
        }
        return acc;
    }, []);

    const filteredWallets = uniqueCoins
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

    // Calculate crypto amount based on USD
    const cryptoAmount = selectedCoin && prices[selectedCoin.coin]?.usd
        ? (amount / prices[selectedCoin.coin].usd).toFixed(8)
        : '0.00000000';

    const handleBuyNow = () => {
        const provider = PAYMENT_PROVIDERS[selectedProvider];
        const url = provider.getUrl(selectedCoin.coin, amount);
        window.open(url, '_blank');
    };

    const handleSelectCoin = (wallet) => {
        setSelectedCoin(wallet);
        setStep(2);
    };

    // Step 1: Select Coin
    if (step === 1) {
        return (
            <div className="buy-page">
                <div className="buy-header">
                    <button className="buy-back-btn" onClick={() => navigate(-1)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="buy-title">Buy Crypto</h1>
                    <div style={{ width: 24 }}></div>
                </div>

                <div className="buy-search-container">
                    <svg className="buy-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        className="buy-search-input"
                        placeholder="Enter coin name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="buy-network-filters">
                    {networks.map(network => (
                        <button
                            key={network}
                            className={`buy-network-btn ${networkFilter === network ? 'active' : ''}`}
                            onClick={() => setNetworkFilter(network)}
                        >
                            {network === 'all' ? 'All Networks' : network}
                        </button>
                    ))}
                </div>

                <div className="buy-wallet-list">
                    {filteredWallets.map((wallet) => {
                        const price = prices[wallet.coin]?.usd || 0;
                        const change = prices[wallet.coin]?.change24h || 0;
                        const balance = parseFloat(wallet.balance) || 0;

                        return (
                            <div
                                key={wallet.coin}
                                className="buy-wallet-item"
                                onClick={() => handleSelectCoin(wallet)}
                            >
                                <CryptoIcon coin={wallet.coin} size={40} />
                                <div className="buy-wallet-info">
                                    <div className="buy-wallet-name">
                                        <span className="buy-wallet-symbol">{wallet.coin}</span>
                                    </div>
                                    <div className="buy-wallet-price">
                                        ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        <span className={`buy-wallet-change ${change >= 0 ? 'positive' : 'negative'}`}>
                                            {change >= 0 ? '+' : ''}{change.toFixed(2)}%
                                        </span>
                                    </div>
                                </div>
                                <div className="buy-wallet-balance">
                                    <div className="buy-wallet-amount">{balance.toFixed(4)}</div>
                                    <div className="buy-wallet-usd">$0.00</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // Step 2: Enter Amount
    return (
        <div className="buy-page">
            <div className="buy-header">
                <button className="buy-back-btn" onClick={() => setStep(1)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="buy-title">Buy {selectedCoin?.coin}</h1>
                <div style={{ width: 24 }}></div>
            </div>

            <div className="buy-amount-card">
                <div className="buy-amount-input-container">
                    <span className="buy-currency-symbol">$</span>
                    <input
                        type="number"
                        className="buy-amount-input"
                        value={amount}
                        onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                        min="0"
                    />
                    <div className="buy-amount-controls">
                        <button onClick={() => setAmount(a => Math.min(a + 10, 10000))}>▲</button>
                        <button onClick={() => setAmount(a => Math.max(a - 10, 0))}>▼</button>
                    </div>
                </div>
                <div className="buy-crypto-equivalent">
                    ≈ {cryptoAmount} {selectedCoin?.coin}
                </div>
            </div>

            <div
                className="buy-payment-selector"
                onClick={() => setShowPaymentModal(true)}
            >
                <div className="buy-payment-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                        <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                </div>
                <div className="buy-payment-info">
                    <div className="buy-payment-label">Choose Payment Method</div>
                    <div className="buy-payment-provider">
                        {selectedProvider ? PAYMENT_PROVIDERS[selectedProvider].name : 'Select provider'}
                    </div>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </div>

            <button className="buy-now-btn" onClick={handleBuyNow}>
                Buy {selectedCoin?.coin} Now
            </button>

            {/* Payment Method Modal */}
            {showPaymentModal && (
                <div className="buy-modal-overlay" onClick={() => setShowPaymentModal(false)}>
                    <div className="buy-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="buy-modal-header">
                            <h3 className="buy-modal-title">Payment Method</h3>
                            <button className="buy-modal-close" onClick={() => setShowPaymentModal(false)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        <div className="buy-modal-options">
                            {Object.entries(PAYMENT_PROVIDERS).map(([key, provider]) => (
                                <label key={key} className="buy-payment-option">
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={selectedProvider === key}
                                        onChange={() => setSelectedProvider(key)}
                                    />
                                    <span className="buy-payment-option-icon">{provider.icon}</span>
                                    <span className="buy-payment-option-name">{provider.name}</span>
                                </label>
                            ))}
                        </div>

                        <button
                            className="buy-confirm-btn"
                            onClick={() => setShowPaymentModal(false)}
                        >
                            Confirm Payment Method
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
