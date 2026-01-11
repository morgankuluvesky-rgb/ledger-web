import './Testimonials.css';

// Testimonials data with real images
const TESTIMONIALS = [
    {
        quote: "Web3SafePal is a successful company that has strong cumulation in both technology and products. The team shows tenacity when the market is in the downturn.",
        name: "He Yi",
        title: "Binance Co-founder & CMO",
        image: "/images/avatars/he_yi.jpg"
    },
    {
        quote: "Notably, Web3SafePal allows for buying and swapping within the App, hooks into CEX like Binance, and provides powerful DApp support like Uniswap.",
        name: "Forbes",
        title: "Media Partner",
        image: "/images/avatars/forbes.png",
        isLogo: true // Keep flag for styling but use image
    },
    {
        quote: "It's rare to see a company like Web3SafePal that provides such comprehensive products. It is truly the only wallet you need.",
        name: "Eric Chen",
        title: "Founder of Injective",
        image: "/images/avatars/eric.jpg"
    },
    {
        quote: "I'm often impressed by the rapid product iterations the team has been delivering and the well-thought UX design built into every detail.",
        name: "Terry Tai",
        title: "Co-founder of Nervos",
        image: "/images/avatars/terry.jpg"
    },
    {
        quote: "Web3SafePal has combined advanced security and seamless user experience. It has truly lowered the hurdle for users onboarding to DeFi.",
        name: "Yenwen",
        title: "Founder of Perpetual",
        image: "/images/avatars/yenwen.jpg"
    },
    {
        quote: "This wallet is just the best one, you can access all DApps and manage different blockchains. I think it's the most secure wallet!",
        name: "Mat",
        title: "Verified User",
        image: "/images/avatars/mat.jpg"
    },
    {
        quote: "The mobile app is amazing and it really gives you the power of decentralization and privacy. Amazing value for money.",
        name: "Nour Halawani",
        title: "Verified User",
        image: "/images/avatars/nour.jpg"
    },
    {
        quote: "Your keys are safe on the device. No bluetooth, no WiFi. The private key stays offline. Amazing product!",
        name: "Hashoshi",
        title: "Crypto Expert",
        image: "/images/avatars/hashoshi.jpg"
    }
];

export default function Testimonials() {
    // Duplicate for seamless loop
    const marqueeData = [...TESTIMONIALS, ...TESTIMONIALS];

    return (
        <section className="testimonials section">
            <div className="testimonials__header">
                <h2 className="testimonials__title">Trusted by Industry Leaders</h2>
            </div>

            <div className="testimonials__marquee">
                <div className="testimonials__track">
                    {marqueeData.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                            <p className="testimonial-card__quote">"{testimonial.quote}"</p>

                            <div className="testimonial-card__author">
                                {testimonial.isLogo ? (
                                    <div className="testimonial-card__logo-container">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="testimonial-card__logo-img"
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="testimonial-card__avatar"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.marginLeft = '0';
                                            }}
                                        />
                                        <div className="testimonial-card__info">
                                            <span className="testimonial-card__name">{testimonial.name}</span>
                                            <span className="testimonial-card__title">{testimonial.title}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
