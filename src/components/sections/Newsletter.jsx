import { useState } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './Newsletter.css';

export default function Newsletter() {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.3 });
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
            setTimeout(() => setStatus('idle'), 3000);
        }, 1000);
    };

    return (
        <section className="newsletter section" ref={ref}>
            <div className="newsletter__container container">
                <div className={`newsletter__content ${isVisible ? 'animate' : ''}`}>
                    <h2 className="newsletter__title">
                        Stay Ahead of the{' '}
                        <span className="gradient-text">Curve</span>
                    </h2>
                    <p className="newsletter__subtitle">
                        Get the latest updates on security tips, product launches, and exclusive offers.
                    </p>

                    <form className="newsletter__form" onSubmit={handleSubmit}>
                        <div className="newsletter__input-wrapper">
                            <input
                                type="email"
                                className="newsletter__input"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={status === 'loading'}
                            />
                            <button
                                type="submit"
                                className="btn btn-primary newsletter__btn"
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? (
                                    <span className="newsletter__spinner"></span>
                                ) : status === 'success' ? (
                                    <>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 6L9 17l-5-5" />
                                        </svg>
                                        Subscribed!
                                    </>
                                ) : (
                                    'Subscribe'
                                )}
                            </button>
                        </div>
                        {status === 'success' && (
                            <p className="newsletter__success">
                                Welcome aboard! Check your inbox for confirmation.
                            </p>
                        )}
                    </form>

                    <p className="newsletter__disclaimer">
                        By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                    </p>
                </div>
            </div>

            {/* Background Elements */}
            <div className="newsletter__bg">
                <div className="newsletter__glow newsletter__glow--1"></div>
                <div className="newsletter__glow newsletter__glow--2"></div>
            </div>
        </section>
    );
}
