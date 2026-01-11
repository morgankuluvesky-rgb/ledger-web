import PageLayout from '../components/layout/PageLayout';

export default function Staking() {
    return (
        <PageLayout
            title="Staking & Yield"
            subtitle="Earn passive income on your crypto holdings with secure staking solutions"
        >
            <div className="stats-grid">
                <div className="stat-item">
                    <div className="stat-item__value">12%</div>
                    <div className="stat-item__label">Avg. APY</div>
                </div>
                <div className="stat-item">
                    <div className="stat-item__value">$50M+</div>
                    <div className="stat-item__label">Total Staked</div>
                </div>
                <div className="stat-item">
                    <div className="stat-item__value">20+</div>
                    <div className="stat-item__label">Staking Options</div>
                </div>
                <div className="stat-item">
                    <div className="stat-item__value">Daily</div>
                    <div className="stat-item__label">Reward Payouts</div>
                </div>
            </div>

            <div className="page-section">
                <h2 className="page-section__title">How Staking Works</h2>
                <p className="page-section__text">
                    Staking allows you to earn rewards by holding and locking your cryptocurrency
                    to support the operations of a blockchain network. It's a way to put your
                    idle crypto to work and earn passive income while contributing to network security.
                </p>
            </div>

            <div className="page-section">
                <h2 className="page-section__title">Staking Options</h2>
                <div className="feature-grid">
                    <div className="feature-card">
                        <div className="feature-card__icon" style={{ background: '#627EEA20', color: '#627EEA' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">ETH Staking</h3>
                        <p className="feature-card__description">
                            Earn up to 5% APY by staking your Ethereum with our secure validators.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon" style={{ background: '#00FFA320', color: '#00FFA3' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">SOL Staking</h3>
                        <p className="feature-card__description">
                            Stake Solana for competitive yields with flexible lock periods.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon" style={{ background: '#E6007A20', color: '#E6007A' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">DOT Staking</h3>
                        <p className="feature-card__description">
                            Earn rewards on Polkadot with our trusted staking infrastructure.
                        </p>
                    </div>
                </div>
            </div>

            <div className="page-section">
                <h2 className="page-section__title">Why Stake with Web3SafePal?</h2>
                <div className="feature-grid">
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Non-Custodial</h3>
                        <p className="feature-card__description">
                            Your keys, your crypto. We never take custody of your staked assets.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Flexible Terms</h3>
                        <p className="feature-card__description">
                            Choose from flexible or fixed staking periods to match your goals.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="1" x2="12" y2="23" />
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Compound Rewards</h3>
                        <p className="feature-card__description">
                            Auto-compound your rewards to maximize your earning potential.
                        </p>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
