import PageLayout from '../components/layout/PageLayout';

export default function CookiePolicy() {
    return (
        <PageLayout
            title="Cookie Policy"
            subtitle="Last updated: January 2026"
        >
            <div className="legal-content">
                <h2>1. What Are Cookies</h2>
                <p>
                    Cookies are small text files that are placed on your device when you visit our
                    website. They help us provide you with a better experience by remembering your
                    preferences and understanding how you use our platform.
                </p>

                <h2>2. Types of Cookies We Use</h2>

                <p><strong>Essential Cookies</strong></p>
                <p>
                    These cookies are necessary for the website to function properly. They enable
                    core functionality such as security, network management, and accessibility.
                </p>

                <p><strong>Performance Cookies</strong></p>
                <p>
                    These cookies collect information about how visitors use our website, helping
                    us improve its performance and user experience.
                </p>

                <p><strong>Functional Cookies</strong></p>
                <p>
                    These cookies remember your preferences and choices, such as language settings
                    and display preferences.
                </p>

                <p><strong>Analytics Cookies</strong></p>
                <p>
                    We use analytics cookies to understand how visitors interact with our website,
                    which helps us improve our services and content.
                </p>

                <h2>3. Third-Party Cookies</h2>
                <p>
                    Some cookies are placed by third-party services that appear on our pages. We
                    do not control these cookies and recommend reviewing the privacy policies of
                    these third parties.
                </p>

                <h2>4. Managing Cookies</h2>
                <p>
                    You can control and manage cookies in various ways. Most browsers allow you to:
                </p>
                <ul>
                    <li>View what cookies are stored and delete them individually</li>
                    <li>Block third-party cookies</li>
                    <li>Block all cookies from being set</li>
                    <li>Delete all cookies when you close your browser</li>
                </ul>
                <p>
                    Note that blocking cookies may impact your experience on our platform and
                    limit certain functionality.
                </p>

                <h2>5. Cookie Duration</h2>
                <p>
                    Session cookies are deleted when you close your browser. Persistent cookies
                    remain on your device for a set period or until you delete them manually.
                </p>

                <h2>6. Updates to This Policy</h2>
                <p>
                    We may update this Cookie Policy from time to time. Any changes will be posted
                    on this page with an updated revision date.
                </p>

                <h2>7. Contact Us</h2>
                <p>
                    If you have questions about our use of cookies, please contact us at
                    privacy@web3safepal.com.
                </p>
            </div>
        </PageLayout>
    );
}
