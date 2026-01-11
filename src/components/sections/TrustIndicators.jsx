import { TRUST_INDICATORS } from '../../utils/constants';
import './TrustIndicators.css';

export default function TrustIndicators() {
    const icons = {
        key: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="7.5" cy="15.5" r="5.5" />
                <path d="M21 2l-9.5 9.5M19 4l2 2m-2.5 2.5L21 11" />
            </svg>
        ),
        shield: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
            </svg>
        ),
        globe: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
            </svg>
        ),
    };

    return (
        <section className="trust">
            <div className="trust__container container">
                {TRUST_INDICATORS.map((indicator, index) => (
                    <div
                        key={indicator.title}
                        className="trust__item"
                    >
                        <div className="trust__icon">
                            {icons[indicator.icon]}
                        </div>
                        <div className="trust__content">
                            <h3 className="trust__title">{indicator.title}</h3>
                            <p className="trust__description">{indicator.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
