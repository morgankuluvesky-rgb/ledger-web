import PageLayout from '../components/layout/PageLayout';

export default function Bitcoin() {
    return (
        <PageLayout
            title="Bitcoin (BTC)"
            subtitle="The original cryptocurrency — secure, decentralized, and globally recognized"
        >
            <div className="stats-grid">
                <div className="stat-item">
                    <div className="stat-item__value" style={{ color: '#F7931A' }}>$0</div>
                    <div className="stat-item__label">Current Price</div>
                </div>
                <div className="stat-item">
                    <div className="stat-item__value" style={{ color: '#F7931A' }}>21M</div>
                    <div className="stat-item__label">Max Supply</div>
                </div>
                <div className="stat-item">
                    <div className="stat-item__value" style={{ color: '#F7931A' }}>#1</div>
                    <div className="stat-item__label">Market Rank</div>
                </div>
                <div className="stat-item">
                    <div className="stat-item__value" style={{ color: '#F7931A' }}>2009</div>
                    <div className="stat-item__label">Year Founded</div>
                </div>
            </div>

            <div className="page-section">
                <h2 className="page-section__title">About Bitcoin</h2>
                <p className="page-section__text">
                    Bitcoin is the first and most well-known cryptocurrency, created in 2009 by
                    the pseudonymous Satoshi Nakamoto. It pioneered blockchain technology and
                    decentralized digital currency, establishing itself as "digital gold" and
                    a store of value.
                </p>
                <p className="page-section__text">
                    With a fixed supply of 21 million coins, Bitcoin is designed to be deflationary,
                    making it an attractive hedge against inflation and a foundation of the
                    cryptocurrency ecosystem.
                </p>
            </div>

            <div className="page-section">
                <h2 className="page-section__title">Bitcoin on Web3SafePal</h2>
                <div className="feature-grid">
                    <div className="feature-card">
                        <div className="feature-card__icon" style={{ background: '#F7931A20', color: '#F7931A' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Secure Storage</h3>
                        <p className="feature-card__description">
                            Store your Bitcoin with enterprise-grade security. Your keys, your control.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon" style={{ background: '#F7931A20', color: '#F7931A' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                <polyline points="17 6 23 6 23 12" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Instant Trading</h3>
                        <p className="feature-card__description">
                            Buy, sell, and swap Bitcoin instantly with competitive fees.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon" style={{ background: '#F7931A20', color: '#F7931A' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Portfolio Tracking</h3>
                        <p className="feature-card__description">
                            Monitor your Bitcoin holdings with real-time analytics and insights.
                        </p>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
