import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import { CRYPTO_ICONS } from '../utils/constants';

export default function Assets() {
    const featuredAssets = [
        { name: 'Bitcoin', symbol: 'BTC', path: '/bitcoin', color: '#F7931A' },
        { name: 'Ethereum', symbol: 'ETH', path: '/ethereum', color: '#627EEA' },
        { name: 'Solana', symbol: 'SOL', path: '/solana', color: '#00FFA3' },
    ];

    return (
        <PageLayout
            title="Supported Assets"
            subtitle="Trade, store, and stake over 15,000 cryptocurrencies with Web3SafePal"
        >
            <div className="page-section">
                <h2 className="page-section__title">Featured Assets</h2>
                <p className="page-section__text">
                    Explore our most popular cryptocurrencies with dedicated features and
                    optimized trading pairs.
                </p>
                <div className="feature-grid">
                    {featuredAssets.map((asset) => (
                        <Link to={asset.path} key={asset.symbol} style={{ textDecoration: 'none' }}>
                            <div className="feature-card">
                                <div
                                    className="feature-card__icon"
                                    style={{ background: `${asset.color}20`, color: asset.color }}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 6v6l4 2" />
                                    </svg>
                                </div>
                                <h3 className="feature-card__title">{asset.name}</h3>
                                <p className="feature-card__description">
                                    Trade, stake, and manage your {asset.symbol} with institutional-grade security.
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="page-section">
                <h2 className="page-section__title">All Supported Assets</h2>
                <p className="page-section__text">
                    We support a comprehensive range of cryptocurrencies across multiple blockchains.
                </p>
                <div className="feature-grid">
                    {CRYPTO_ICONS.map((crypto) => (
                        <div className="feature-card" key={crypto.symbol}>
                            <div
                                className="feature-card__icon"
                                style={{ background: `${crypto.brandColor}20`, color: crypto.brandColor }}
                            >
                                {crypto.icon}
                            </div>
                            <h3 className="feature-card__title">{crypto.name}</h3>
                            <p className="feature-card__description" style={{ color: '#666' }}>
                                {crypto.symbol}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </PageLayout>
    );
}
