import './Hero.css';

export default function Hero() {
    return (
        <section className="hero">
            {/* Optimized Static Background Glow - No Lag */}
            <div className="hero__stage-light"></div>

            <div className="hero__container">
                <div className="hero__content-wrapper">
                    <h1 className="hero__title">
                        Own Your
                        <span className="hero__title-gradient"> Web3 Crypto</span>
                    </h1>

                    <p className="hero__subtitle">
                        The professional's choice for secure self-custody.
                        Manage Bitcoin, Ethereum, and thousands of assets with
                        uncompromising security.
                    </p>

                    <div className="hero__cta-group">
                        <a href="/register" className="btn-premium btn-filled">
                            <span>Start Now</span>
                        </a>
                        <a href="/login" className="btn-premium btn-outlined">
                            <span>Sign In</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
