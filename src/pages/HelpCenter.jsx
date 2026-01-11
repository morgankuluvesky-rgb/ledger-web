import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import { FAQ_ITEMS } from '../utils/constants';

export default function HelpCenter() {
    return (
        <PageLayout
            title="Help Center"
            subtitle="Find answers to common questions and get the support you need"
        >
            <div className="page-section">
                <h2 className="page-section__title">Quick Links</h2>
                <div className="feature-grid">
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Getting Started</h3>
                        <p className="feature-card__description">
                            New to Web3SafePal? Learn the basics of setting up your account.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Security</h3>
                        <p className="feature-card__description">
                            Learn how to keep your account and assets secure.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                <polyline points="17 6 23 6 23 12" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Trading Guide</h3>
                        <p className="feature-card__description">
                            Master the trading platform with our comprehensive guides.
                        </p>
                    </div>
                    <Link to="/contact" style={{ textDecoration: 'none' }}>
                        <div className="feature-card">
                            <div className="feature-card__icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                </svg>
                            </div>
                            <h3 className="feature-card__title">Contact Support</h3>
                            <p className="feature-card__description">
                                Can't find what you're looking for? Reach out to our team.
                            </p>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="page-section">
                <h2 className="page-section__title">Frequently Asked Questions</h2>
                <div style={{ marginTop: '32px' }}>
                    {FAQ_ITEMS.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                borderRadius: '12px',
                                padding: '24px',
                                marginBottom: '16px'
                            }}
                        >
                            <h3 style={{
                                color: '#fff',
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                marginBottom: '12px'
                            }}>
                                {item.question}
                            </h3>
                            <p style={{ color: '#888', lineHeight: '1.6', margin: 0 }}>
                                {item.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </PageLayout>
    );
}
