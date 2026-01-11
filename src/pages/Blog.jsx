import PageLayout from '../components/layout/PageLayout';

export default function Blog() {
    const blogPosts = [
        {
            title: 'Understanding Crypto Security: A Beginner\'s Guide',
            excerpt: 'Learn the fundamentals of keeping your digital assets safe in the evolving world of cryptocurrency.',
            date: 'Jan 2, 2026',
            category: 'Security',
            readTime: '5 min read'
        },
        {
            title: 'The Future of DeFi: Trends to Watch in 2026',
            excerpt: 'Explore the emerging trends in decentralized finance and what they mean for investors.',
            date: 'Dec 28, 2025',
            category: 'DeFi',
            readTime: '8 min read'
        },
        {
            title: 'Staking vs. Yield Farming: Which is Right for You?',
            excerpt: 'A comprehensive comparison of two popular passive income strategies in crypto.',
            date: 'Dec 20, 2025',
            category: 'Education',
            readTime: '6 min read'
        },
        {
            title: 'Web3SafePal 2.0: Introducing New Portfolio Features',
            excerpt: 'Discover the latest updates to our platform including advanced analytics and tax reporting.',
            date: 'Dec 15, 2025',
            category: 'Product',
            readTime: '4 min read'
        },
        {
            title: 'Bitcoin Halving 2024: What It Means for Investors',
            excerpt: 'An analysis of the Bitcoin halving event and its historical impact on market prices.',
            date: 'Dec 10, 2025',
            category: 'Market Analysis',
            readTime: '7 min read'
        },
        {
            title: 'Getting Started with NFTs on Web3SafePal',
            excerpt: 'A step-by-step guide to viewing, managing, and trading NFTs through our platform.',
            date: 'Dec 5, 2025',
            category: 'Tutorial',
            readTime: '5 min read'
        }
    ];

    return (
        <PageLayout
            title="Blog"
            subtitle="Insights, tutorials, and updates from the Web3SafePal team"
        >
            <div className="feature-grid" style={{ marginTop: 0 }}>
                {blogPosts.map((post, index) => (
                    <article
                        key={index}
                        className="feature-card"
                        style={{ cursor: 'pointer' }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '16px'
                        }}>
                            <span style={{
                                background: '#10B98120',
                                color: '#10B981',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                fontWeight: '500'
                            }}>
                                {post.category}
                            </span>
                            <span style={{ color: '#666', fontSize: '0.85rem' }}>
                                {post.readTime}
                            </span>
                        </div>
                        <h3 className="feature-card__title" style={{ fontSize: '1.15rem' }}>
                            {post.title}
                        </h3>
                        <p className="feature-card__description">
                            {post.excerpt}
                        </p>
                        <div style={{
                            marginTop: '16px',
                            color: '#666',
                            fontSize: '0.85rem'
                        }}>
                            {post.date}
                        </div>
                    </article>
                ))}
            </div>
        </PageLayout>
    );
}
