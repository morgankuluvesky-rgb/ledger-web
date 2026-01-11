import { PLATFORM_FEATURES, SITE_CONFIG } from '../../utils/constants';
import './WalletFeatures.css';

export default function WalletFeatures() {
    const icons = {
        trading: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 3v18h18" />
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
            </svg>
        ),
        yield: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v12M6 12h12" />
            </svg>
        ),
        insights: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 12h6l3-9 6 18 3-9h4" />
            </svg>
        ),
        security: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
            </svg>
        ),
    };

    return (
        <section className="features section">
            <div className="features__container container">
                <div className="features__header">
                    <h2 className="features__title">
                        {SITE_CONFIG.name} — Your All-in-One Solution
                    </h2>
                </div>

                <div className="features__grid">
                    {PLATFORM_FEATURES.map((feature) => (
                        <div key={feature.title} className="feature-card">
                            <div className="feature-card__icon">
                                {icons[feature.icon]}
                            </div>
                            <h3 className="feature-card__title">{feature.title}</h3>
                            <p className="feature-card__description">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Stats Section - Minimal */}
                <div className="features__stats">
                    <div className="features__stat">
                        <span className="features__stat-value">$500M+</span>
                        <span className="features__stat-label">Assets Managed</span>
                    </div>
                    <div className="features__stat">
                        <span className="features__stat-value">99.99%</span>
                        <span className="features__stat-label">Uptime</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
