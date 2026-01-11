// Site-wide constants and data
export const SITE_CONFIG = {
    name: 'Web3SafePal',
    tagline: 'Own Your Crypto',
    secondaryTagline: 'Your keys. Your crypto. Your future.',
    supportedCryptos: '15,000+',
    usersWorldwide: '2M+',
    assetsManaged: '$500M+',
    // Change this to your actual domain when you deploy
    appDomain: 'https://web3safepal.com',
};

export const NAV_LINKS = [
    {
        label: 'Solutions',
        href: '/trading',
        submenu: [
            { label: 'Trading Platform', href: '/trading' },
            { label: 'Portfolio Management', href: '/portfolio' },
            { label: 'Staking & Yield', href: '/staking' },
        ],
    },
    {
        label: 'Assets',
        href: '/assets',
        submenu: [
            { label: 'Bitcoin', href: '/bitcoin' },
            { label: 'Ethereum', href: '/ethereum' },
            { label: 'Solana', href: '/solana' },
            { label: 'View All', href: '/assets' },
        ],
    },
    {
        label: 'Services',
        href: '/staking',
        submenu: [
            { label: 'Asset Trading', href: '/trading' },
            { label: 'Staking & Yield', href: '/staking' },
        ],
    },
    { label: 'Resources', href: '/help' },
];

export const SOLUTIONS = [
    {
        id: 'trading',
        name: 'Complete Trading Suite',
        icon: 'chart',
        description: 'Execute trades, manage portfolios, and store assets with institutional-grade security. Intuitive interface designed for both beginners and professionals.',
        features: ['Instant Execution', 'Multiple Exchanges', 'Advanced Orders'],
    },
    {
        id: 'analytics',
        name: 'Advanced Portfolio Analytics',
        icon: 'analytics',
        description: 'Track performance, analyze trends, and optimize your investments with comprehensive analytics and real-time market insights.',
        features: ['Real-time Data', 'Performance Tracking', 'Custom Reports'],
    },
    {
        id: 'transactions',
        name: 'Smart Transaction Management',
        icon: 'transactions',
        description: 'Monitor all transactions with detailed history, smart categorization, and automated reporting for seamless financial management.',
        features: ['Transaction History', 'Auto Categorization', 'Tax Reports'],
    },
];

export const TRUST_INDICATORS = [
    {
        icon: 'key',
        title: 'Your keys, your crypto',
        description: 'Your private keys never leave your non-custodial wallet. No one else has access to them, ever.',
    },
    {
        icon: 'shield',
        title: 'User-friendly',
        description: 'Fast, intuitive to use, and all managed from one easy interface.',
    },
    {
        icon: 'globe',
        title: 'Cross-platform',
        description: 'Access your assets anywhere—web app, browser extension, or mobile.',
    },
];

export const PLATFORM_FEATURES = [
    {
        icon: 'yield',
        title: 'Earn crypto every day',
        description: 'Increase your passive income with unique programs designed to help you earn rewards and accelerate your APY.',
    },
    {
        icon: 'trading',
        title: 'Effortless trading',
        description: 'React to market changes and swap between hundreds of assets instantly using our integrated trading solutions.',
    },
    {
        icon: 'insights',
        title: 'DeFi, demystified',
        description: 'We\'re taking the decentralized world mainstream with innovative solutions that simplify crypto onboarding.',
    },
    {
        icon: 'security',
        title: 'Go beyond crypto',
        description: 'Your gateway to the rapidly expanding galaxy of decentralized applications—NFTs, gaming, liquidity mining, all in one place.',
    },
];

export const TESTIMONIALS = [
    {
        quote: "Web3SafePal has completely transformed how I manage my crypto portfolio. The analytics are incredible and the trading is seamless.",
        author: 'Sarah Chen',
        handle: '@sarahcrypto',
        avatar: null,
    },
    {
        quote: "Finally a platform that combines security with ease of use. I've been staking my assets and earning passive income effortlessly.",
        author: 'Mike Williams',
        handle: '@mikeweb3',
        avatar: null,
    },
    {
        quote: "The portfolio tracking and real-time insights have helped me make better investment decisions. Highly recommended for serious investors.",
        author: 'Alex Rivera',
        handle: '@alexdefi',
        avatar: null,
    },
    {
        quote: "I switched from multiple platforms to Web3SafePal. Having everything in one place with top-tier security is a game changer.",
        author: 'Jordan Blake',
        handle: '@jordannft',
        avatar: null,
    },
];

export const FAQ_ITEMS = [
    {
        question: 'What is Web3SafePal?',
        answer: 'Web3SafePal is an all-in-one digital asset management platform that allows you to securely store, trade, and grow your cryptocurrency holdings. We provide enterprise-grade security while ensuring you maintain complete ownership of your digital assets.',
    },
    {
        question: 'How do I get started?',
        answer: 'Getting started is simple. Click "Get Started" to create your free account. Once registered, you can deposit your assets, start trading, and access all platform features including staking and portfolio analytics.',
    },
    {
        question: 'Is my crypto safe on Web3SafePal?',
        answer: 'Absolutely. We use enterprise-grade security infrastructure including multi-signature wallets, bank-level encryption, and cold storage for the majority of assets. Your keys, your control—we never have access to your private keys.',
    },
    {
        question: 'What cryptocurrencies do you support?',
        answer: 'We support over 15,000 cryptocurrencies and digital assets across multiple blockchains including Bitcoin, Ethereum, Solana, and many more. New assets are added regularly based on user demand and security reviews.',
    },
    {
        question: 'How can I earn passive income?',
        answer: 'You can earn passive income through our staking programs, yield farming opportunities, and liquidity provision across major DeFi protocols. Our platform helps you maximize returns with smart allocation strategies.',
    },
];

export const CRYPTO_ICONS = [
    {
        name: 'Bitcoin',
        symbol: 'BTC',
        brandColor: '#F7931A',
        icon: (
            <svg viewBox="0 0 32 32" fill="white">
                <path d="M22.56 15.42c1.39-.93 2.1-2.56 1.76-4.9-.5-3.47-3.23-4.36-6.6-4.57V1.69h-2.38v4.15c-.63-.02-1.28-.03-1.92-.05V1.69h-2.38v4.06c-.52 0-1.04-.01-1.54-.01l-5.38.01.27 1.83s.75.17.73.18c.41.1.48.37.47.59l-.47 11.96c-.02.26-.14.65-.54.67.02.01-.73.18-.73.18l-1.04 2.39 5.06.01c.58 0 1.17.02 1.74.04v4.2h2.38v-4.14c.65.02 1.3.04 1.94.06v4.18h2.38v-4.1c4.4.17 7.42-1.34 7.9-5.11.39-3.05-1.55-4.52-4.05-5.26zm-7.6-6.32c2.7-.01 4.39.29 4.6 2.06.2 1.63-1.04 2.05-3.32 2.07l-2.07.03V9.1l.79 0zm.91 9.77l-1.03.01V13.8l1.03-.01c3.15-.01 4.9.68 5.16 2.59.27 1.9-1.27 2.53-3.9 2.53h-1.26z" />
            </svg>
        )
    },
    {
        name: 'Ethereum',
        symbol: 'ETH',
        brandColor: '#627EEA',
        icon: (
            <svg viewBox="0 0 784.37 1277.39" fill="white">
                <path d="M392.07 0l-8.57 29.11V873.74l8.57 8.55 392.06-231.75L392.07 0z" fillOpacity="0.6" />
                <path d="M392.07 0L0 650.54l392.07 231.75V472.33L392.07 0z" fillOpacity="0.4" />
                <path d="M392.07 956.52l-4.83 5.89v300.87l4.83 14.1 392.3-552.49-392.3 231.63z" fillOpacity="0.6" />
                <path d="M392.07 1277.38V956.52L0 724.89l392.07 552.49z" fillOpacity="0.4" />
                <path d="M392.07 882.29l392.06-231.75-392.06-210.61v442.36z" fillOpacity="0.2" />
                <path d="M0 650.54l392.07 231.75V472.33L0 650.54z" fillOpacity="0.2" />
            </svg>
        )
    },
    {
        name: 'Solana',
        symbol: 'SOL',
        brandColor: '#00FFA3',
        icon: (
            <svg viewBox="0 0 397.7 311.7" fill="white">
                <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 237.9z" />
                <path d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z" />
                <path d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1L333.1 120.1z" />
            </svg>
        )
    },
    {
        name: 'Ripple',
        symbol: 'XRP',
        brandColor: '#23292F',
        icon: (
            <svg viewBox="0 0 512 424" fill="white">
                <path d="M437 0h74L357 152.48c-55.77 55.19-146.19 55.19-202 0L.94 0H75L192 115.83a91.11 91.11,0,0,0,127.91 0Z" />
                <path d="M74.05 424H0L155 270.58c55.77-55.19,146.19-55.19,202 0L512 424H438L320 307.23a91.11 91.11,0,0,0-127.91 0Z" />
            </svg>
        )
    },
    {
        name: 'Cardano',
        symbol: 'ADA',
        brandColor: '#0033AD',
        icon: (
            <svg viewBox="0 0 375 346.5" fill="white">
                <path d="M102.8,172c-0.8,13.9,9.9,25.8,23.8,26.6c0.5,0,1,0,1.5,0c14,0,25.3-11.3,25.2-25.3c0-14-11.3-25.3-25.3-25.2C114.6,148.1,103.5,158.6,102.8,172z" />
                <path d="M8.6,165.5c-4.5-0.3-8.4,3.2-8.6,7.7s3.2,8.4,7.7,8.6c4.5,0.3,8.3-3.2,8.6-7.7C16.6,169.6,13.1,165.8,8.6,165.5C8.6,165.5,8.6,165.5,8.6,165.5z" />
                <path d="M101.2,25.4c4-2,5.6-7,3.6-11c-2-4-7-5.6-11-3.6c-4,2-5.6,6.9-3.6,10.9C92.2,25.8,97.1,27.5,101.2,25.4C101.1,25.4,101.2,25.4,101.2,25.4z" />
                <path d="M126.8,70.1c6.2-3.1,8.7-10.7,5.6-16.9s-10.7-8.7-16.9-5.6c-6.2,3.1-8.7,10.7-5.6,16.9C113,70.7,120.6,73.2,126.8,70.1z" />
            </svg>
        )
    },
    {
        name: 'Polkadot',
        symbol: 'DOT',
        brandColor: '#E6007A',
        icon: (
            <svg viewBox="0 0 1326.1 1410.3" fill="white">
                <ellipse cx="663" cy="147.9" rx="254.3" ry="147.9" />
                <ellipse cx="663" cy="1262.3" rx="254.3" ry="147.9" />
                <ellipse transform="matrix(0.5 -0.866 0.866 0.5 -279.1512 369.5916)" cx="180.5" cy="426.5" rx="254.3" ry="148" />
                <ellipse transform="matrix(0.5 -0.866 0.866 0.5 -279.1552 1483.9517)" cx="1145.6" cy="983.7" rx="254.3" ry="147.9" />
                <ellipse transform="matrix(0.866 -0.5 0.5 0.866 -467.6798 222.044)" cx="180.5" cy="983.7" rx="148" ry="254.3" />
                <ellipse transform="matrix(0.866 -0.5 0.5 0.866 -59.8007 629.9254)" cx="1145.6" cy="426.6" rx="147.9" ry="254.3" />
            </svg>
        )
    },
    {
        name: 'Avalanche',
        symbol: 'AVAX',
        brandColor: '#E84142',
        icon: (
            <svg viewBox="0 0 1503 1504" fill="white">
                <path fillRule="evenodd" clipRule="evenodd" d="M538.688 1050.86H392.94C362.314 1050.86 347.186 1050.86 337.962 1044.96C327.999 1038.5 321.911 1027.8 321.173 1015.99C320.619 1005.11 328.184 991.822 343.312 965.255L703.182 330.935C718.495 303.999 726.243 290.531 736.021 285.55C746.537 280.2 759.083 280.2 769.599 285.55C779.377 290.531 787.126 303.999 802.438 330.935L876.42 460.079C893.336 489.635 901.723 504.289 905.385 519.669C909.443 536.458 909.443 554.169 905.385 570.958C901.695 586.455 893.393 601.215 876.604 630.549L687.573 964.702L687.084 965.558C670.436 994.693 661.999 1009.46 650.306 1020.6C637.576 1032.78 622.263 1041.63 605.474 1046.62C590.161 1050.86 573.004 1050.86 538.688 1050.86ZM906.75 1050.86H1115.59C1146.4 1050.86 1161.9 1050.86 1171.13 1044.78C1181.09 1038.32 1187.36 1027.43 1187.92 1015.63C1188.45 1005.1 1181.05 992.33 1166.55 967.307L1060.43 785.75C1044.54 758.877 1037.12 746.324 1027.59 741.472C1017.08 736.121 1004.71 736.121 994.199 741.472C984.605 746.453 976.857 759.552 961.544 785.934L857.306 964.891L856.949 965.507C841.69 991.847 834.064 1005.01 834.614 1015.81C835.352 1027.62 841.440 1038.5 851.402 1044.96C860.443 1050.86 875.94 1050.86 906.75 1050.86Z" />
            </svg>
        )
    },
    {
        name: 'Polygon',
        symbol: 'MATIC',
        brandColor: '#8247E5',
        icon: (
            <svg viewBox="0 0 178 161" fill="white">
                <path d="M66.8,54.7l-16.7-9.7L0,74.1v58l50.1,29l50.1-29V41.9L128,25.8l27.8,16.1v32.2L128,90.2l-16.7-9.7v25.8l16.7,9.7l50.1-29V29L128,0L77.9,29v90.2l-27.8,16.1l-27.8-16.1V86.9l27.8-16.1l16.7,9.7V54.7z" />
            </svg>
        )
    },
    {
        name: 'Chainlink',
        symbol: 'LINK',
        brandColor: '#2A5ADA',
        icon: (
            <svg viewBox="0 0 37.8 43.6" fill="white">
                <path d="M18.9,0l-4,2.3L4,8.6,0,10.9V32.7L4,35l11,6.3,4,2.3,4-2.3L33.8,35l4-2.3V10.9l-4-2.3L22.9,2.3ZM8,28.1V15.5L18.9,9.2l10.9,6.3V28.1L18.9,34.4Z" />
            </svg>
        )
    },
    {
        name: 'Uniswap',
        symbol: 'UNI',
        brandColor: '#FF007A',
        icon: (
            <svg viewBox="0 0 168.3 193.8" fill="white">
                <path d="M66,44.1c-2.1-0.3-2.2-0.4-1.2-0.5c1.9-0.3,6.3,0.1,9.4,0.8c7.2,1.7,13.7,6.1,20.6,13.8l1.8,2.1l2.6-0.4c11.1-1.8,22.5-0.4,32,4c2.6,1.2,6.7,3.6,7.2,4.2c0.2,0.2,0.5,1.5,0.7,2.8c0.7,4.7,0.4,8.2-1.1,10.9c-0.8,1.5-0.8,1.9-0.3,3.2c0.4,1,1.6,1.7,2.7,1.7c2.4,0,4.9-3.8,6.1-9.1l0.5-2.1l0.9,1c5.1,5.7,9.1,13.6,9.7,19.2l0.2,1.5l-0.9-1.3c-1.5-2.3-2.9-3.8-4.8-5.1c-3.4-2.3-7-3-16.5-3.5c-8.6-0.5-13.5-1.2-18.3-2.8c-8.2-2.7-12.4-6.2-22.1-19.1c-4.3-5.7-7-8.8-9.7-11.4C79.6,48.3,73.7,45.3,66,44.1z" />
            </svg>
        )
    },
    {
        name: 'Nano',
        symbol: 'XNO',
        brandColor: '#4A90E2',
        icon: (
            <svg viewBox="0 0 1080 1080" fill="white">
                <path d="M792.9,881h-52.5L541.1,570.6L338.8,881h-52.1l226.8-351.7L306.9,206.2h53.5L542,490.4l185.4-284.2h50.2L568.8,528.4L792.9,881z" />
                <path d="M336.5,508.7h408.3v38.4H336.5V508.7z M336.5,623.9h408.3v38.4H336.5L336.5,623.9z" />
            </svg>
        )
    },
    {
        name: 'Banano',
        symbol: 'BAN',
        brandColor: '#FBD912',
        icon: (
            <svg viewBox="0 0 300 300" fill="white">
                <path d="M127.3,92.3c-55.8,7-81.5-42.1-76.9-46.9c3-3.2,7.7-3.4,11.7-3.5c18.6-0.5,45,21.3,50.3,21.2c10.4-0.2,26-16.7,36.2-30.3c4.3-5.7,31-14.3,28.1,0.7C167.2,82,134.4,91.4,127.3,92.3z M49.7,0.7C105.5-6.3,131.1,42.8,126.6,47.6c-3,3.2-7.7,3.4-11.7,3.5c-18.6,0.5-45.1-21.3-50.4-21.2s-26,16.7-36.2,30.3c-4.3,5.7-31,14.3-28,0.7C9.8,11,42.6,1.6,49.7,0.7z" transform="translate(61.8, 103.8)" />
            </svg>
        )
    },
];

export const FOOTER_LINKS = {
    solutions: [
        { label: 'Trading Platform', href: '/trading' },
        { label: 'Portfolio Management', href: '/portfolio' },
        { label: 'Staking & Yield', href: '/staking' },
    ],
    assets: [
        { label: 'Bitcoin', href: '/bitcoin' },
        { label: 'Ethereum', href: '/ethereum' },
        { label: 'Solana', href: '/solana' },
        { label: 'View All', href: '/assets' },
    ],
    services: [
        { label: 'Asset Trading', href: '/trading' },
        { label: 'Staking & Yield', href: '/staking' },
    ],
    resources: [
        { label: 'Help Center', href: '/help' },
        { label: 'Blog', href: '/blog' },
    ],
    company: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
    ],
};

export const SOCIAL_LINKS = [
    { name: 'Twitter', href: '#', icon: 'twitter' },
    { name: 'Discord', href: '#', icon: 'discord' },
    { name: 'Telegram', href: '#', icon: 'telegram' },
    { name: 'GitHub', href: '#', icon: 'github' },
    { name: 'YouTube', href: '#', icon: 'youtube' },
];
