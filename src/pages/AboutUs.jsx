import PageLayout from '../components/layout/PageLayout';

export default function AboutUs() {
    return (
        <PageLayout
            title="About Us"
            subtitle="Building the future of secure digital asset management"
        >
            <div className="page-section">
                <h2 className="page-section__title">Our Mission</h2>
                <p className="page-section__text">
                    At Web3SafePal, we believe that everyone deserves access to secure,
                    user-friendly tools for managing their digital assets. Our mission is to
                    democratize crypto finance while maintaining the highest standards of
                    security and privacy.
                </p>
                <p className="page-section__text">
                    Founded by a team of blockchain enthusiasts and security experts, we've
                    built a platform that bridges the gap between institutional-grade security
                    and consumer accessibility.
                </p>
            </div>

            <div className="stats-grid">
                <div className="stat-item">
                    <div className="stat-item__value">2M+</div>
                    <div className="stat-item__label">Active Users</div>
                </div>
                <div className="stat-item">
                    <div className="stat-item__value">$500M+</div>
                    <div className="stat-item__label">Assets Secured</div>
                </div>
                <div className="stat-item">
                    <div className="stat-item__value">15,000+</div>
                    <div className="stat-item__label">Supported Assets</div>
                </div>
                <div className="stat-item">
                    <div className="stat-item__value">150+</div>
                    <div className="stat-item__label">Countries Served</div>
                </div>
            </div>

            <div className="page-section">
                <h2 className="page-section__title">Our Values</h2>
                <div className="feature-grid">
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Security First</h3>
                        <p className="feature-card__description">
                            Every feature we build starts with security. Your assets are protected
                            by industry-leading encryption and multi-layer security protocols.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4M12 8h.01" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Transparency</h3>
                        <p className="feature-card__description">
                            We operate with complete transparency. No hidden fees, no surprise
                            terms—just honest, straightforward service.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">User Empowerment</h3>
                        <p className="feature-card__description">
                            Your keys, your crypto. We empower users to take full control
                            of their digital assets without compromising on convenience.
                        </p>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
