const express = require('express');
const bcrypt = require('bcryptjs');
const { auth, prisma } = require('../middleware/auth');

const router = express.Router();

// GET /api/user/profile - Get current user profile
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                email: true,
                name: true,
                referralCode: true,
                isAdmin: true,
                createdAt: true,
                settings: true
            }
        });

        res.json(user);
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({ error: 'Failed to get profile' });
    }
});

// PUT /api/user/profile - Update user profile
router.put('/profile', auth, async (req, res) => {
    try {
        const { name } = req.body;

        const user = await prisma.user.update({
            where: { id: req.user.id },
            data: { name },
            select: {
                id: true,
                email: true,
                name: true
            }
        });

        res.json(user);
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// PUT /api/user/password - Change password
router.put('/password', auth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await prisma.user.findUnique({ where: { id: req.user.id } });

        const validPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: req.user.id },
            data: { password: hashedPassword }
        });

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Password change error:', error);
        res.status(500).json({ error: 'Failed to change password' });
    }
});

// GET /api/user/settings - Get user settings
router.get('/settings', auth, async (req, res) => {
    try {
        let settings = await prisma.userSettings.findUnique({
            where: { userId: req.user.id }
        });

        if (!settings) {
            settings = await prisma.userSettings.create({
                data: { userId: req.user.id }
            });
        }

        // Parse enabledCoins from JSON string to array
        res.json({
            ...settings,
            enabledCoins: JSON.parse(settings.enabledCoins || '["BTC","ETH","USDT","SOL"]')
        });
    } catch (error) {
        console.error('Settings error:', error);
        res.status(500).json({ error: 'Failed to get settings' });
    }
});

// PUT /api/user/settings - Update settings
router.put('/settings', auth, async (req, res) => {
    try {
        const { enabledCoins, notifications } = req.body;

        // Convert enabledCoins array to JSON string for MySQL
        const enabledCoinsJson = Array.isArray(enabledCoins) ? JSON.stringify(enabledCoins) : enabledCoins;

        const settings = await prisma.userSettings.upsert({
            where: { userId: req.user.id },
            update: { enabledCoins: enabledCoinsJson, notifications },
            create: { userId: req.user.id, enabledCoins: enabledCoinsJson, notifications }
        });

        res.json({
            ...settings,
            enabledCoins: JSON.parse(settings.enabledCoins)
        });
    } catch (error) {
        console.error('Update settings error:', error);
        res.status(500).json({ error: 'Failed to update settings' });
    }
});

// GET /api/user/notifications - Get notifications
router.get('/notifications', auth, async (req, res) => {
    try {
        const notifications = await prisma.notification.findMany({
            where: { userId: req.user.id },
            orderBy: { createdAt: 'desc' },
            take: 50
        });

        res.json(notifications);
    } catch (error) {
        console.error('Notifications error:', error);
        res.status(500).json({ error: 'Failed to get notifications' });
    }
});

// PUT /api/user/notifications/read - Mark all as read
router.put('/notifications/read', auth, async (req, res) => {
    try {
        await prisma.notification.updateMany({
            where: { userId: req.user.id, read: false },
            data: { read: true }
        });

        res.json({ message: 'All notifications marked as read' });
    } catch (error) {
        console.error('Mark read error:', error);
        res.status(500).json({ error: 'Failed to mark notifications as read' });
    }
});

// GET /api/user/referrals - Get referral stats
router.get('/referrals', auth, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { referralCode: true }
        });

        const totalReferrals = await prisma.user.count({
            where: { referredBy: user.referralCode }
        });

        // Monthly referrals (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const monthlyReferrals = await prisma.user.count({
            where: {
                referredBy: user.referralCode,
                createdAt: { gte: thirtyDaysAgo }
            }
        });

        const recentReferrals = await prisma.user.findMany({
            where: { referredBy: user.referralCode },
            select: { name: true, createdAt: true },
            orderBy: { createdAt: 'desc' },
            take: 10
        });

        res.json({
            referralCode: user.referralCode,
            totalReferrals,
            monthlyReferrals,
            recentReferrals
        });
    } catch (error) {
        console.error('Referrals error:', error);
        res.status(500).json({ error: 'Failed to get referrals' });
    }
});

// GET /api/user/has-pin - Check if user has PIN set
router.get('/has-pin', auth, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { pin: true }
        });

        res.json({ hasPin: !!user.pin });
    } catch (error) {
        console.error('Check PIN error:', error);
        res.status(500).json({ error: 'Failed to check PIN' });
    }
});

// POST /api/user/pin - Set or update PIN
router.post('/pin', auth, async (req, res) => {
    try {
        const { pin } = req.body;

        if (!pin || pin.length !== 4 || !/^\d{4}$/.test(pin)) {
            return res.status(400).json({ error: 'PIN must be 4 digits' });
        }

        // Hash the PIN before storing
        const hashedPin = await bcrypt.hash(pin, 10);

        await prisma.user.update({
            where: { id: req.user.id },
            data: { pin: hashedPin }
        });

        res.json({ message: 'PIN set successfully' });
    } catch (error) {
        console.error('Set PIN error:', error);
        res.status(500).json({ error: 'Failed to set PIN' });
    }
});

// POST /api/user/verify-pin - Verify PIN
router.post('/verify-pin', auth, async (req, res) => {
    try {
        const { pin } = req.body;

        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { pin: true }
        });

        if (!user.pin) {
            return res.status(400).json({ error: 'No PIN set' });
        }

        const validPin = await bcrypt.compare(pin, user.pin);

        if (!validPin) {
            return res.status(401).json({ success: false, error: 'Invalid PIN' });
        }

        res.json({ success: true, message: 'PIN verified' });
    } catch (error) {
        console.error('Verify PIN error:', error);
        res.status(500).json({ error: 'Failed to verify PIN' });
    }
});

module.exports = router;

