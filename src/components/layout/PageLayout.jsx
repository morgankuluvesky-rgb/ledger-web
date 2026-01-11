import Header from './Header';
import Footer from './Footer';
import './PageLayout.css';

export default function PageLayout({ title, subtitle, children }) {
    return (
        <div className="page-layout">
            <Header />
            <main>
                <section className="page-hero">
                    <div className="container">
                        <h1 className="page-hero__title">{title}</h1>
                        {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
                    </div>
                </section>
                <section className="page-content">
                    <div className="container">
                        {children}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
