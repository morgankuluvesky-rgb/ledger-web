import { useStaggerAnimation } from '../../hooks/useScrollAnimation';
import { SOLUTIONS } from '../../utils/constants';
import './ProductShowcase.css';

export default function ProductShowcase() {
    const { containerRef, isVisible, getItemStyle } = useStaggerAnimation(
        SOLUTIONS.length,
        150
    );

    const icons = {
        chart: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 3v18h18" />
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
            </svg>
        ),
        analytics: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 21H4.6c-.6 0-.9 0-1.1-.1a1 1 0 01-.4-.4c-.1-.2-.1-.5-.1-1.1V3" />
                <path d="M7 14l4-4 4 4 6-6" />
            </svg>
        ),
        transactions: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                <path d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
        ),
    };

    return (
        <section className="products section" id="solutions" ref={containerRef}>
            <div className="products__container container">
                {/* Section Header */}
                <div className="section-header">
                    <h2 className="section-title">
                        Choose Your Perfect{' '}
                        <span className="gradient-text">Digital Asset Solution</span>
                    </h2>
                    <p className="section-subtitle">
                        Comprehensive tools for trading, portfolio management, and financial analytics.
                    </p>
                </div>

                {/* Solutions Grid */}
                <div className="products__grid products__grid--solutions">
                    {SOLUTIONS.map((solution, index) => (
                        <article
                            key={solution.id}
                            className="product-card product-card--solution"
                            style={getItemStyle(index)}
                        >
                            <div className="product-card__icon-wrapper">
                                <div className="product-card__icon">
                                    {icons[solution.icon]}
                                </div>
                            </div>

                            <div className="product-card__content">
                                <h3 className="product-card__name">{solution.name}</h3>
                                <p className="product-card__description">{solution.description}</p>

                                <div className="product-card__features">
                                    {solution.features.map((feature) => (
                                        <span key={feature} className="product-card__feature">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20 6L9 17l-5-5" />
                                            </svg>
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                <a href={`#${solution.id}`} className="btn btn-secondary product-card__cta">
                                    Explore Features →
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Compare Link */}
                <div className="products__compare">
                    <a href="/register" className="btn btn-primary btn-lg">
                        Get Started Free
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
