import PageLayout from '../components/layout/PageLayout';

export default function Ethereum() {
    return (
        <PageLayout
            title="Ethereum (ETH)"
            subtitle="The world's leading smart contract platform powering DeFi and NFTs"
        >
            <div className="stats-grid">
                <div className="stat-item">
                    <div className="stat-item__value" style={{ color: '#627EEA' }}>$0</div>
                    <div className="stat-item__label">Current Price</div>
                </div>
                <div className="stat-item">
                    <div className="stat-item__value" style={{ color: '#627EEA' }}>∞</div>
                    <div className="stat-item__label">Max Supply</div>
                </div>
                <div className="stat-item">
                    <div className="stat-item__value" style={{ color: '#627EEA' }}>#2</div>
                    <div className="stat-item__label">Market Rank</div>
                </div>
                <div className="stat-item">
                    <div className="stat-item__value" style={{ color: '#627EEA' }}>2015</div>
                    <div className="stat-item__label">Year Founded</div>
                </div>
            </div>

            <div className="page-section">
                <h2 className="page-section__title">About Ethereum</h2>
                <p className="page-section__text">
                    Ethereum is a decentralized platform that enables developers to build and
                    deploy smart contracts and decentralized applications (dApps). Created by
                    Vitalik Buterin in 2015, it has become the backbone of the DeFi ecosystem
                    and the primary platform for NFTs.
                </p>
                <p className="page-section__text">
                    Following "The Merge" in 2022, Ethereum transitioned to a Proof of Stake
                    consensus mechanism, significantly reducing energy consumption and enabling
                    staking rewards for ETH holders.
                </p>
            </div>

            <div className="page-section">
                <h2 className="page-section__title">Ethereum on Web3SafePal</h2>
                <div className="feature-grid">
                    <div className="feature-card">
                        <div className="feature-card__icon" style={{ background: '#627EEA20', color: '#627EEA' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">ETH Staking</h3>
                        <p className="feature-card__description">
                            Stake your ETH and earn passive rewards with our secure staking solution.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon" style={{ background: '#627EEA20', color: '#627EEA' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <line x1="3" y1="9" x2="21" y2="9" />
                                <line x1="9" y1="21" x2="9" y2="9" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">DeFi Access</h3>
                        <p className="feature-card__description">
                            Connect to leading DeFi protocols directly from your Web3SafePal wallet.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon" style={{ background: '#627EEA20', color: '#627EEA' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">NFT Support</h3>
                        <p className="feature-card__description">
                            View, manage, and trade your Ethereum-based NFTs in one place.
                        </p>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
