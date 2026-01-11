import PageLayout from '../components/layout/PageLayout';

export default function Solana() {
    return (
        <PageLayout
            title="Solana (SOL)"
            subtitle="High-performance blockchain built for speed and scalability"
        >
            <div className="stats-grid">
                <div className="stat-item">
                    <div className="stat-item__value" style={{ color: '#00FFA3' }}>$0</div>
                    <div className="stat-item__label">Current Price</div>
                </div>
                <div className="stat-item">
                    <div className="stat-item__value" style={{ color: '#00FFA3' }}>65K</div>
                    <div className="stat-item__label">TPS Capacity</div>
                </div>
                <div className="stat-item">
                    <div className="stat-item__value" style={{ color: '#00FFA3' }}>#5</div>
                    <div className="stat-item__label">Market Rank</div>
                </div>
                <div className="stat-item">
                    <div className="stat-item__value" style={{ color: '#00FFA3' }}>2020</div>
                    <div className="stat-item__label">Year Founded</div>
                </div>
            </div>

            <div className="page-section">
                <h2 className="page-section__title">About Solana</h2>
                <p className="page-section__text">
                    Solana is a high-performance blockchain supporting builders around the world
                    creating crypto apps that scale. Known for its incredible speed and low
                    transaction costs, Solana can process up to 65,000 transactions per second
                    with average fees of $0.00025.
                </p>
                <p className="page-section__text">
                    Founded by Anatoly Yakovenko, Solana uses a unique Proof of History (PoH)
                    consensus combined with Proof of Stake, enabling unparalleled performance
                    for decentralized applications, gaming, and NFTs.
                </p>
            </div>

            <div className="page-section">
                <h2 className="page-section__title">Solana on Web3SafePal</h2>
                <div className="feature-grid">
                    <div className="feature-card">
                        <div className="feature-card__icon" style={{ background: '#00FFA320', color: '#00FFA3' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Lightning Fast</h3>
                        <p className="feature-card__description">
                            Experience near-instant transactions with Solana's high-speed network.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon" style={{ background: '#00FFA320', color: '#00FFA3' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Low Fees</h3>
                        <p className="feature-card__description">
                            Enjoy transactions for a fraction of a cent—perfect for everyday use.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon" style={{ background: '#00FFA320', color: '#00FFA3' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">SOL Staking</h3>
                        <p className="feature-card__description">
                            Stake your SOL to earn rewards while securing the network.
                        </p>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
