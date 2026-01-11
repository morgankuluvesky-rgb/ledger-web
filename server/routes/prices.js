const express = require('express');

const router = express.Router();

// Cache for prices (update every 60 seconds)
let priceCache = {
    data: null,
    lastUpdated: null
};

const CACHE_DURATION = 60000; // 60 seconds

// Coin mappings for CoinGecko
const COIN_IDS = {
    'BTC': 'bitcoin',
    'ETH': 'ethereum',
    'USDT': 'tether',
    'SOL': 'solana',
    'XRP': 'ripple',
    'BNB': 'binancecoin',
    'ADA': 'cardano',
    'DOGE': 'dogecoin',
    'TRX': 'tron',
    'LTC': 'litecoin',
    'BCH': 'bitcoin-cash',
    'DOT': 'polkadot',
    'MATIC': 'matic-network',
    'LINK': 'chainlink',
    'UNI': 'uniswap',
    'AVAX': 'avalanche-2'
};

// GET /api/prices - Get current crypto prices
router.get('/', async (req, res) => {
    try {
        // Check cache
        if (priceCache.data && (Date.now() - priceCache.lastUpdated) < CACHE_DURATION) {
            return res.json(priceCache.data);
        }

        // Fetch from CoinGecko
        const ids = Object.values(COIN_IDS).join(',');
        const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
        );

        if (!response.ok) {
            throw new Error('CoinGecko API error');
        }

        const data = await response.json();

        // Transform to our format
        const prices = {};
        for (const [symbol, geckoId] of Object.entries(COIN_IDS)) {
            if (data[geckoId]) {
                prices[symbol] = {
                    usd: data[geckoId].usd,
                    change24h: data[geckoId].usd_24h_change || 0
                };
            }
        }

        // Update cache
        priceCache = {
            data: prices,
            lastUpdated: Date.now()
        };

        res.json(prices);
    } catch (error) {
        console.error('Prices error:', error);

        // Return cached data if available
        if (priceCache.data) {
            return res.json(priceCache.data);
        }

        // Fallback prices
        res.json({
            BTC: { usd: 95000, change24h: 1.5 },
            ETH: { usd: 3400, change24h: 2.1 },
            USDT: { usd: 1.00, change24h: 0.01 },
            SOL: { usd: 200, change24h: 3.2 },
            XRP: { usd: 2.30, change24h: -0.5 },
            BNB: { usd: 700, change24h: 1.8 }
        });
    }
});

module.exports = router;
