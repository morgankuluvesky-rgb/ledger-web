import PageLayout from '../components/layout/PageLayout';

export default function Terms() {
    return (
        <PageLayout
            title="Terms & Conditions"
            subtitle="Last updated: January 2026"
        >
            <div className="legal-content">
                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing and using Web3SafePal's services, you agree to be bound by these
                    Terms and Conditions. If you do not agree with any part of these terms, you
                    may not use our services.
                </p>

                <h2>2. Description of Services</h2>
                <p>
                    Web3SafePal provides a digital asset management platform that enables users to
                    store, trade, stake, and manage cryptocurrencies and other digital assets. We
                    act as a non-custodial service provider, meaning you maintain control of your
                    private keys at all times.
                </p>

                <h2>3. User Responsibilities</h2>
                <p>As a user of our platform, you agree to:</p>
                <ul>
                    <li>Provide accurate and complete information during registration</li>
                    <li>Maintain the security of your account credentials and private keys</li>
                    <li>Use the platform only for lawful purposes</li>
                    <li>Not attempt to gain unauthorized access to our systems</li>
                    <li>Comply with all applicable laws and regulations</li>
                </ul>

                <h2>4. Risk Disclosure</h2>
                <p>
                    Cryptocurrency trading and investing carry significant risks. Prices can be
                    volatile, and you may lose some or all of your investment. Past performance
                    does not guarantee future results. You should only invest what you can afford
                    to lose.
                </p>

                <h2>5. Intellectual Property</h2>
                <p>
                    All content on this platform, including text, graphics, logos, and software,
                    is the property of Web3SafePal or its licensors and is protected by
                    intellectual property laws. You may not copy, modify, or distribute our
                    content without permission.
                </p>

                <h2>6. Limitation of Liability</h2>
                <p>
                    To the maximum extent permitted by law, Web3SafePal shall not be liable for
                    any indirect, incidental, special, consequential, or punitive damages resulting
                    from your use of or inability to use our services.
                </p>

                <h2>7. Indemnification</h2>
                <p>
                    You agree to indemnify and hold harmless Web3SafePal, its affiliates, and
                    their respective officers, directors, employees, and agents from any claims,
                    damages, or expenses arising from your use of our services or violation of
                    these terms.
                </p>

                <h2>8. Termination</h2>
                <p>
                    We reserve the right to terminate or suspend your account at any time, with
                    or without cause, and with or without notice. Upon termination, your right
                    to use our services will immediately cease.
                </p>

                <h2>9. Governing Law</h2>
                <p>
                    These Terms shall be governed by and construed in accordance with the laws
                    of the State of California, without regard to its conflict of law provisions.
                </p>

                <h2>10. Contact Information</h2>
                <p>
                    For questions about these Terms, please contact us at legal@web3safepal.com.
                </p>
            </div>
        </PageLayout>
    );
}
