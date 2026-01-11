import PageLayout from '../components/layout/PageLayout';

export default function Contact() {
    return (
        <PageLayout
            title="Contact Us"
            subtitle="We're here to help. Reach out to our team anytime."
        >
            <div className="feature-grid" style={{ marginTop: 0 }}>
                <div className="feature-card">
                    <div className="feature-card__icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                    </div>
                    <h3 className="feature-card__title">Email Support</h3>
                    <p className="feature-card__description">
                        support@web3safepal.com<br />
                        Response within 24 hours
                    </p>
                </div>
                <div className="feature-card">
                    <div className="feature-card__icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>
                    </div>
                    <h3 className="feature-card__title">Live Chat</h3>
                    <p className="feature-card__description">
                        Available 24/7<br />
                        Instant assistance from our team
                    </p>
                </div>
                <div className="feature-card">
                    <div className="feature-card__icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                    </div>
                    <h3 className="feature-card__title">Headquarters</h3>
                    <p className="feature-card__description">
                        123 Blockchain Avenue<br />
                        San Francisco, CA 94102
                    </p>
                </div>
            </div>

            <div className="page-section" style={{ marginTop: '80px' }}>
                <h2 className="page-section__title" style={{ textAlign: 'center' }}>Send Us a Message</h2>
                <form className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" placeholder="John Doe" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" placeholder="john@example.com" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input type="text" id="subject" placeholder="How can we help?" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" placeholder="Tell us more about your inquiry..."></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '18px' }}>
                        Send Message
                    </button>
                </form>
            </div>
        </PageLayout>
    );
}
