import { Link } from 'react-router-dom';
import { useScrollAnimation, useCountUp } from '../../hooks/useScrollAnimation';
import { CRYPTO_ICONS, SITE_CONFIG } from '../../utils/constants';
import './CryptoSupport.css';

export default function CryptoSupport() {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.3 });
    const count = useCountUp(15000, 2500, isVisible);

    return (
        <section className="crypto section" ref={ref}>
            <div className="crypto__container container">
                <div className={`crypto__content ${isVisible ? 'animate' : ''}`}>
                    <h2 className="crypto__title">
                        Explore{' '}
                        <span className="gradient-text">{count.toLocaleString()}+</span>{' '}
                        Cryptocurrencies
                    </h2>
                    <p className="crypto__subtitle">
                        Bitcoin, Ethereum, Solana, XRP, stablecoins... you name it, it's here.
                        Seamlessly manage all your digital assets in one secure ecosystem.
                    </p>
                    <Link to="/assets" className="btn btn-primary">
                        See All Supported Assets
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* Crypto Icons Grid */}
                <div className="crypto__icons-wrapper">
                    <div className="crypto__icons">
                        {[...CRYPTO_ICONS, ...CRYPTO_ICONS].map((crypto, index) => (
                            <div
                                key={`${crypto.symbol}-${index}`}
                                className="crypto__icon-item"
                            >
                                <div
                                    className="crypto__icon-circle"
                                    style={{ backgroundColor: crypto.brandColor, borderColor: crypto.brandColor }}
                                >
                                    {crypto.icon}
                                </div>
                                <span className="crypto__icon-name">{crypto.symbol}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="crypto__decoration">
                    <div className="crypto__glow crypto__glow--1"></div>
                    <div className="crypto__glow crypto__glow--2"></div>
                </div>
            </div>
        </section>
    );
}
