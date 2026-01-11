import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CardsPage.css';

export default function CardsPage() {
    const navigate = useNavigate();
    const [showSupportModal, setShowSupportModal] = useState(false);

    const handleActivateCard = () => {
        setShowSupportModal(true);
    };

    const handleCloseModal = () => {
        setShowSupportModal(false);
    };

    return (
        <div className="cards-page">
            {/* Header */}
            <div className="cards-header">
                <button className="cards-back-btn" onClick={() => navigate(-1)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="cards-title">Cards</h1>
                <div style={{ width: 24 }}></div>
            </div>

            {/* Card Display */}
            <div className="cards-container">
                <div className="demo-card">
                    {/* Card Background */}
                    <div className="card-background">
                        {/* Infinity Logo */}
                        <div className="card-logo">
                            <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                                <path d="M10 12c0-3.5 2.5-6 6-6s6 2.5 4 6c-2 3.5-4 6-4 6s2 2.5 6 2.5 6-2.5 6-6-2.5-6-6-6-6 2.5-4 6c2 3.5 4 6 4 6s-2 2.5-6 2.5-6-2.5-6-6z" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />
                            </svg>
                        </div>

                        {/* VISA Logo */}
                        <div className="card-visa-logo">
                            <span className="visa-text">VISA</span>
                        </div>

                        {/* INACTIVE Watermark */}
                        <div className="card-inactive-watermark">
                            INACTIVE
                        </div>

                        {/* Card Chip (subtle) */}
                        <div className="card-chip">
                            <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
                                <rect x="2" y="2" width="32" height="24" rx="3" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                                <line x1="2" y1="14" x2="34" y2="14" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                <line x1="18" y1="2" x2="18" y2="26" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Card Details */}
                <div className="card-details">
                    <div className="card-number">4187••••••••1667</div>
                    <div className="card-balance">$0.00</div>
                    <div className="card-status">Card is currently inactive</div>
                </div>

                {/* Activate Button */}
                <button className="activate-card-btn" onClick={handleActivateCard}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                        <line x1="12" y1="2" x2="12" y2="12" />
                    </svg>
                    Activate Card
                </button>
            </div>

            {/* Support Modal */}
            {showSupportModal && (
                <div className="support-modal-overlay" onClick={handleCloseModal}>
                    <div className="support-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="support-modal-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                            </svg>
                        </div>
                        <h2 className="support-modal-title">Contact Support</h2>
                        <p className="support-modal-message">
                            To activate your card, please contact our support team. They will assist you with the verification process.
                        </p>
                        <button className="support-modal-close-btn" onClick={handleCloseModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
