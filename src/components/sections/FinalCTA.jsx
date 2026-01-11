import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './FinalCTA.css';

export default function FinalCTA() {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.3 });

    return (
        <section className="final-cta" ref={ref}>
            <div className="final-cta__container container">
                <div className={`final-cta__content ${isVisible ? 'animate' : ''}`}>
                    <h2 className="final-cta__title">
                        Start Managing Your{' '}
                        <span className="gradient-text">Digital Assets</span>{' '}
                        Today
                    </h2>
                    <p className="final-cta__subtitle">
                        Join thousands of users who trust Web3SafePal for secure trading,
                        portfolio management, and passive income generation.
                    </p>
                    <div className="final-cta__actions">
                        <a href="/register" className="btn btn-primary btn-lg">
                            Get Started Free
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                        <a href="/login" className="btn btn-secondary btn-lg">
                            Sign In
                        </a>
                    </div>
                </div>

                {/* Decorative Shield */}
                <div className={`final-cta__visual ${isVisible ? 'animate' : ''}`}>
                    <div className="final-cta__shield">
                        <svg viewBox="0 0 64 64" fill="none">
                            <defs>
                                <linearGradient id="ctaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#14F195" />
                                    <stop offset="100%" stopColor="#9945FF" />
                                </linearGradient>
                            </defs>
                            <path d="M32 4L8 16v16c0 14.4 10.24 27.84 24 32 13.76-4.16 24-17.6 24-32V16L32 4z" fill="url(#ctaGradient)" opacity="0.2" />
                            <path d="M32 12L16 20v12c0 10.8 6.88 20.88 16 24 9.12-3.12 16-13.2 16-24V20L32 12z" fill="url(#ctaGradient)" opacity="0.4" />
                            <path d="M32 20l-8 4v6c0 5.4 3.44 10.44 8 12 4.56-1.56 8-6.6 8-12v-6l-8-4z" fill="url(#ctaGradient)" />
                            <path d="M28 32l3 3 6-6" stroke="#0A0A0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Background Effects */}
            <div className="final-cta__bg">
                <div className="final-cta__glow final-cta__glow--1"></div>
                <div className="final-cta__glow final-cta__glow--2"></div>
                <div className="final-cta__grid"></div>
            </div>
        </section>
    );
}
