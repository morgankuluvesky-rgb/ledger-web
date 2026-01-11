import Layout from '../components/layout/Layout';
import Hero from '../components/sections/Hero';
import TrustIndicators from '../components/sections/TrustIndicators';
import VerifySection from '../components/sections/VerifySection';
import ProductShowcase from '../components/sections/ProductShowcase';
import CryptoSupport from '../components/sections/CryptoSupport';
import WalletFeatures from '../components/sections/WalletFeatures';
import SecuritySection from '../components/sections/SecuritySection';
import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';
import Newsletter from '../components/sections/Newsletter';
import FinalCTA from '../components/sections/FinalCTA';

export default function Home() {
    return (
        <Layout>
            <Hero />
            <TrustIndicators />
            <VerifySection />
            <ProductShowcase />
            <CryptoSupport />
            <WalletFeatures />
            <SecuritySection />
            <Testimonials />
            <FAQ />
            <Newsletter />
            <FinalCTA />
        </Layout>
    );
}
