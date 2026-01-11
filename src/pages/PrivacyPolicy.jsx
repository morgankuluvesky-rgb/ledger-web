import PageLayout from '../components/layout/PageLayout';

export default function PrivacyPolicy() {
    return (
        <PageLayout
            title="Privacy Policy"
            subtitle="Last updated: January 2026"
        >
            <div className="legal-content">
                <h2>1. Introduction</h2>
                <p>
                    Web3SafePal ("we," "our," or "us") is committed to protecting your privacy.
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your
                    information when you use our platform and services.
                </p>

                <h2>2. Information We Collect</h2>
                <p>We may collect information about you in various ways, including:</p>
                <ul>
                    <li><strong>Personal Data:</strong> Name, email address, and contact information you provide during registration.</li>
                    <li><strong>Financial Data:</strong> Wallet addresses, transaction history, and portfolio information.</li>
                    <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage patterns.</li>
                    <li><strong>Cookies:</strong> We use cookies to enhance your experience and gather analytical data.</li>
                </ul>

                <h2>3. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                    <li>Provide and maintain our services</li>
                    <li>Process transactions and send related notifications</li>
                    <li>Improve and personalize your experience</li>
                    <li>Communicate with you about updates, security alerts, and support</li>
                    <li>Detect, prevent, and address fraud and security issues</li>
                    <li>Comply with legal obligations</li>
                </ul>

                <h2>4. Data Security</h2>
                <p>
                    We implement industry-standard security measures including encryption, secure
                    servers, and regular security audits. However, no method of transmission over
                    the internet is 100% secure, and we cannot guarantee absolute security.
                </p>

                <h2>5. Third-Party Services</h2>
                <p>
                    We may share your information with trusted third-party service providers who
                    assist us in operating our platform, conducting business, or servicing you,
                    provided they agree to keep this information confidential.
                </p>

                <h2>6. Your Rights</h2>
                <p>Depending on your location, you may have the right to:</p>
                <ul>
                    <li>Access the personal data we hold about you</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Object to or restrict processing of your data</li>
                    <li>Data portability</li>
                </ul>

                <h2>7. Data Retention</h2>
                <p>
                    We retain your personal data only for as long as necessary to fulfill the
                    purposes outlined in this policy, unless a longer retention period is required
                    by law.
                </p>

                <h2>8. Changes to This Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. We will notify you of
                    any changes by posting the new policy on this page and updating the "Last
                    updated" date.
                </p>

                <h2>9. Contact Us</h2>
                <p>
                    If you have questions about this Privacy Policy, please contact us at
                    privacy@web3safepal.com or through our Contact page.
                </p>
            </div>
        </PageLayout>
    );
}
