import './VerifySection.css';

export default function VerifySection() {
    return (
        <section className="verify section">
            <div className="verify__container container">
                <div className="verify__content">
                    <h2 className="verify__title">
                        Your keys,
                        <span className="verify__title-highlight"> your crypto.</span>
                    </h2>
                    <p className="verify__description">
                        We never have access to your private keys.
                        They remain encrypted on your device, ensuring complete self-custody.
                        Verify it on the blockchain, anytime.
                    </p>
                    <a href="/register" className="btn btn-primary btn-lg">
                        <span>Secure Your Assets</span>
                    </a>
                </div>

                <div className="verify__visual">
                    {/* Minimal Security Card */}
                    <div className="security-card">
                        <div className="security-card__header">
                            <div className="security-card__status">
                                <span className="status-dot"></span>
                                System Secure
                            </div>
                            <div className="security-card__id">ID: 8F2...9A1</div>
                        </div>

                        <div className="security-card__body">
                            <div className="security-row">
                                <span className="security-label">Encryption</span>
                                <span className="security-value">AES-256 (Military Grade)</span>
                            </div>
                            <div className="security-row">
                                <span className="security-label">Key Storage</span>
                                <span className="security-value">Local Device Enclave</span>
                            </div>
                            <div className="security-row">
                                <span className="security-label">Access Control</span>
                                <span className="security-value">Biometric / Pin Required</span>
                            </div>
                            <div className="security-row highlight">
                                <span className="security-label">Custody Type</span>
                                <span className="security-value">Non-Custodial</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
