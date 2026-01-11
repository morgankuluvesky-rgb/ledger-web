import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS, SITE_CONFIG } from '../../utils/constants';
import './Header.css';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDropdown = (label) => {
        setActiveDropdown(activeDropdown === label ? null : label);
    };

    return (
        <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
            <div className="header__container container">
                {/* Logo */}
                <Link to="/" className="header__logo">
                    <svg className="header__logo-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#14F195" />
                                <stop offset="100%" stopColor="#9945FF" />
                            </linearGradient>
                        </defs>
                        <path d="M32 4L8 16v16c0 14.4 10.24 27.84 24 32 13.76-4.16 24-17.6 24-32V16L32 4z" fill="url(#logoGradient)" />
                        <path d="M32 12L16 20v12c0 10.8 6.88 20.88 16 24 9.12-3.12 16-13.2 16-24V20L32 12z" fill="#0A0A0F" />
                        <path d="M32 20l-8 4v6c0 5.4 3.44 10.44 8 12 4.56-1.56 8-6.6 8-12v-6l-8-4z" fill="url(#logoGradient)" opacity="0.8" />
                    </svg>
                    <span className="header__logo-text">{SITE_CONFIG.name}</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="header__nav">
                    {NAV_LINKS.map((link) => (
                        <div
                            key={link.label}
                            className="header__nav-item"
                            onMouseEnter={() => link.submenu && setActiveDropdown(link.label)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link
                                to={link.href}
                                className="header__nav-link"
                            >
                                {link.label}
                                {link.submenu && (
                                    <svg className="header__nav-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                )}
                            </Link>

                            {link.submenu && activeDropdown === link.label && (
                                <div className="header__dropdown">
                                    {link.submenu.map((item) => (
                                        <Link key={item.label} to={item.href} className="header__dropdown-item">
                                            {item.label}
                                            {item.badge && <span className="header__dropdown-badge">{item.badge}</span>}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* CTA Buttons */}
                <div className="header__actions">
                    <Link to="/login" className="btn btn-ghost btn-sm">
                        Sign In
                    </Link>
                    <Link to="/register" className="btn btn-primary btn-sm">
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className={`header__mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Mobile Menu */}
                <div className={`header__mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    <nav className="header__mobile-nav">
                        {NAV_LINKS.map((link) => (
                            <div key={link.label} className="header__mobile-nav-item">
                                <button
                                    className="header__mobile-nav-link"
                                    onClick={() => link.submenu && toggleDropdown(link.label)}
                                >
                                    {link.label}
                                    {link.submenu && (
                                        <svg
                                            className={`header__mobile-chevron ${activeDropdown === link.label ? 'rotated' : ''}`}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M6 9l6 6 6-6" />
                                        </svg>
                                    )}
                                </button>

                                {link.submenu && activeDropdown === link.label && (
                                    <div className="header__mobile-submenu">
                                        {link.submenu.map((item) => (
                                            <Link
                                                key={item.label}
                                                to={item.href}
                                                className="header__mobile-submenu-item"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {item.label}
                                                {item.badge && <span className="header__dropdown-badge">{item.badge}</span>}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                    <div className="header__mobile-cta">
                        <Link to="/login" className="btn btn-secondary btn-lg" onClick={() => setIsMobileMenuOpen(false)}>
                            Sign In
                        </Link>
                        <Link to="/register" className="btn btn-primary btn-lg" onClick={() => setIsMobileMenuOpen(false)}>
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
