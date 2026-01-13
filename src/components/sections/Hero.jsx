import './Hero.css';

export default function Hero() {
    return (
        <section className="hero">
            {/* Aurora Background Animation */}
            <div className="hero__aurora-container">
                <div className="hero__aurora-blob hero__aurora-blob--1"></div>
                <div className="hero__aurora-blob hero__aurora-blob--2"></div>
                <div className="hero__aurora-blob hero__aurora-blob--3"></div>
            </div>

            {/* Floating 3D Shapes */}
            <div className="hero__floating-shapes">
                <div className="hero__shape hero__shape--1"></div>
                <div className="hero__shape hero__shape--2"></div>
            </div>

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
