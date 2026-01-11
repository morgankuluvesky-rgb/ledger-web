import PageLayout from '../components/layout/PageLayout';

export default function TradingPlatform() {
    return (
        <PageLayout
            title="Trading Platform"
            subtitle="Execute trades with institutional-grade tools and real-time market data"
        >
            <div className="stats-grid">
                <div className="stat-item">
                    <div className="stat-item__value">0.1%</div>
                    <div className="stat-item__label">Trading Fees</div>
                </div>
                <div className="stat-item">
                    <div className="stat-item__value">500+</div>
                    <div className="stat-item__label">Trading Pairs</div>
                </div>
                <div className="stat-item">
                    <div className="stat-item__value">&lt;1s</div>
                    <div className="stat-item__label">Execution Speed</div>
                </div>
                <div className="stat-item">
                    <div className="stat-item__value">24/7</div>
                    <div className="stat-item__label">Market Access</div>
                </div>
            </div>

            <div className="page-section">
                <h2 className="page-section__title">Professional Trading Tools</h2>
                <p className="page-section__text">
                    Our trading platform combines powerful features with an intuitive interface,
                    making it perfect for both beginners and experienced traders. Access advanced
                    charting, multiple order types, and real-time market data all in one place.
                </p>
            </div>

            <div className="page-section">
                <h2 className="page-section__title">Key Features</h2>
                <div className="feature-grid">
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Advanced Charts</h3>
                        <p className="feature-card__description">
                            Professional-grade charting with 100+ technical indicators and drawing tools.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Instant Execution</h3>
                        <p className="feature-card__description">
                            Lightning-fast order execution with minimal slippage on all trades.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                <line x1="8" y1="21" x2="16" y2="21" />
                                <line x1="12" y1="17" x2="12" y2="21" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Multi-Platform</h3>
                        <p className="feature-card__description">
                            Trade seamlessly across web, desktop, and mobile applications.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Secure Trading</h3>
                        <p className="feature-card__description">
                            Trade with confidence knowing your assets are protected by bank-level security.
                        </p>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
