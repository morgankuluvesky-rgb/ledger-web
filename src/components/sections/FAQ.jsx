import { useState } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { FAQ_ITEMS } from '../../utils/constants';
import './FAQ.css';

export default function FAQ() {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });
    const [openIndex, setOpenIndex] = useState(null);

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="faq section" ref={ref}>
            <div className="faq__container container">
                <div className="section-header">
                    <h2 className="section-title">
                        Frequently Asked{' '}
                        <span className="gradient-text">Questions</span>
                    </h2>
                    <p className="section-subtitle">
                        Find answers to some of the most common questions about crypto wallets and security.
                    </p>
                </div>

                <div className={`faq__list ${isVisible ? 'animate' : ''}`}>
                    {FAQ_ITEMS.map((item, index) => (
                        <div
                            key={index}
                            className={`faq__item ${openIndex === index ? 'open' : ''}`}
                            style={{
                                transitionDelay: `${index * 50}ms`,
                            }}
                        >
                            <button
                                className="faq__question"
                                onClick={() => toggleItem(index)}
                                aria-expanded={openIndex === index}
                            >
                                <span>{item.question}</span>
                                <svg
                                    className="faq__icon"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M12 5v14M5 12h14" />
                                </svg>
                            </button>
                            <div className="faq__answer">
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Help CTA */}
                <div className="faq__help">
                    <p>Still have questions?</p>
                    <a href="#support" className="btn btn-secondary">
                        Contact Support
                    </a>
                </div>
            </div>
        </section>
    );
}
