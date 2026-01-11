/**
 * Crypto Icons Component
 * Uses cryptocurrency-icons from jsDelivr CDN (reliable, open-source)
 * Source: https://github.com/spothq/cryptocurrency-icons
 */

// Fallback colors for coins
export const coinColors = {
    BTC: '#F7931A',
    ETH: '#627EEA',
    USDT: '#26A17B',
    SOL: '#9945FF',
    XRP: '#23292F',
    BNB: '#F3BA2F',
    ADA: '#0033AD',
    DOGE: '#C2A633',
    MATIC: '#8247E5',
    DOT: '#E6007A',
    LTC: '#345D9D',
    AVAX: '#E84142',
    LINK: '#2A5ADA',
    UNI: '#FF007A',
    ATOM: '#2E3148',
    TRX: '#FF0013',
    BCH: '#8DC351',
};

// Full names for coins
export const coinNames = {
    BTC: 'Bitcoin',
    ETH: 'Ethereum',
    USDT: 'Tether',
    SOL: 'Solana',
    XRP: 'Ripple',
    BNB: 'Binance Coin',
    ADA: 'Cardano',
    DOGE: 'Dogecoin',
    MATIC: 'Polygon',
    DOT: 'Polkadot',
    LTC: 'Litecoin',
    AVAX: 'Avalanche',
    LINK: 'Chainlink',
    UNI: 'Uniswap',
    ATOM: 'Cosmos',
    TRX: 'Tron',
    BCH: 'Bitcoin Cash',
};

/**
 * Get the icon URL for a cryptocurrency
 * Uses jsDelivr CDN hosting cryptocurrency-icons package
 */
function getIconUrl(coin) {
    const symbol = coin.toLowerCase();
    // Using jsDelivr CDN with cryptocurrency-icons package (SVG, 128px color icons)
    return `https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/${symbol}.svg`;
}

/**
 * CryptoIcon Component
 * Displays a cryptocurrency icon with fallback to colored text
 */
export default function CryptoIcon({ coin, size = 40, style = {} }) {
    const color = coinColors[coin] || '#666';
    const iconUrl = getIconUrl(coin);

    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: '50%',
                background: `${color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                flexShrink: 0,
                ...style
            }}
        >
            <img
                src={iconUrl}
                alt={coin}
                style={{
                    width: size * 0.7,
                    height: size * 0.7,
                    objectFit: 'contain'
                }}
                onError={(e) => {
                    // Hide broken image and show text fallback
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) {
                        e.target.nextSibling.style.display = 'flex';
                    }
                }}
            />
            <span
                style={{
                    display: 'none',
                    color: color,
                    fontWeight: 'bold',
                    fontSize: size * 0.3,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {coin}
            </span>
        </div>
    );
}

// Export icon URL getter for use elsewhere
export function getCryptoIconUrl(coin) {
    return getIconUrl(coin);
}

