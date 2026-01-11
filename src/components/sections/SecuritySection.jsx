import './SecuritySection.css';

export default function SecuritySection() {
    return (
        <section className="security section">
            <div className="security__container container">
                <div className="security__content">
                    <h2 className="security__title">
                        Uncompromising
                        <br />
                        <span className="security__title-highlight">Security Standards</span>
                    </h2>
                    <p className="security__description">
                        Your assets are protected by industry-leading encryption and
                        security protocols. We believe in trust through verification.
                    </p>

                    <ul className="security__list">
                        <li className="security__item">
                            <span className="security__item-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                            </span>
                            <div className="security__item-text">
                                <h3>Secure Element</h3>
                                <p>CC EAL5+ certified chip for key isolation.</p>
                            </div>
                        </li>
                        <li className="security__item">
                            <span className="security__item-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                                </svg>
                            </span>
                            <div className="security__item-text">
                                <h3>True Ownership</h3>
                                <p>You hold the private keys. We never have access.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="security__visual">
                    <div className="security__shield">
                        <svg width="240" height="240" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <circle cx="12" cy="11" r="3" strokeWidth="1" />
                            <path d="M9 11h6" strokeWidth="0.5" strokeDasharray="1 1" />
                        </svg>
                        <div className="security__shield-glow"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
