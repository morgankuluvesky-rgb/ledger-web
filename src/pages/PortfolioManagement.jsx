import PageLayout from '../components/layout/PageLayout';

export default function PortfolioManagement() {
    return (
        <PageLayout
            title="Portfolio Management"
            subtitle="Track, analyze, and optimize your crypto investments in real-time"
        >
            <div className="page-section">
                <h2 className="page-section__title">Complete Portfolio Overview</h2>
                <p className="page-section__text">
                    Get a comprehensive view of all your crypto holdings across multiple wallets
                    and exchanges. Our portfolio management tools help you make informed decisions
                    with real-time data and powerful analytics.
                </p>
            </div>

            <div className="page-section">
                <h2 className="page-section__title">Features</h2>
                <div className="feature-grid">
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="20" x2="12" y2="10" />
                                <line x1="18" y1="20" x2="18" y2="4" />
                                <line x1="6" y1="20" x2="6" y2="16" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Performance Tracking</h3>
                        <p className="feature-card__description">
                            Monitor your portfolio's performance over time with detailed P&L tracking.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Real-Time Sync</h3>
                        <p className="feature-card__description">
                            Automatic synchronization across all your connected wallets and exchanges.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Asset Allocation</h3>
                        <p className="feature-card__description">
                            Visualize your portfolio distribution and rebalance with ease.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Tax Reports</h3>
                        <p className="feature-card__description">
                            Generate comprehensive tax reports for easy filing and compliance.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Price Alerts</h3>
                        <p className="feature-card__description">
                            Set custom alerts and never miss important price movements.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <line x1="3" y1="9" x2="21" y2="9" />
                                <line x1="9" y1="21" x2="9" y2="9" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Custom Dashboard</h3>
                        <p className="feature-card__description">
                            Personalize your dashboard with widgets that matter most to you.
                        </p>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
