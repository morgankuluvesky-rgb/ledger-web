const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { auth, adminOnly, prisma } = require('../middleware/auth');

const router = express.Router();

// POST /api/admin/login - Admin login (separate from user login)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        if (!user.isAdmin) {
            return res.status(403).json({ error: 'Access denied. Admin only.' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, isAdmin: true },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Admin login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// GET /api/admin/me - Get current admin info
router.get('/me', auth, adminOnly, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, email: true, name: true, isAdmin: true }
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get admin info' });
    }
});

// All routes below require authentication + admin access
router.use(auth);
router.use(adminOnly);

// GET /api/admin/users - Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                isAdmin: true,
                referralCode: true,
                createdAt: true,
                wallets: {
                    select: {
                        coin: true,
                        network: true,
                        balance: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json(users);
    } catch (error) {
        console.error('Admin users error:', error);
        res.status(500).json({ error: 'Failed to get users' });
    }
});

// GET /api/admin/users/:id - Get single user
router.get('/users/:id', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.params.id },
            select: {
                id: true,
                email: true,
                name: true,
                isAdmin: true,
                referralCode: true,
                referredBy: true,
                createdAt: true,
                wallets: true,
                transactions: {
                    orderBy: { createdAt: 'desc' },
                    take: 20
                }
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Admin user error:', error);
        res.status(500).json({ error: 'Failed to get user' });
    }
});

// PUT /api/admin/users/:id/balance - Update user wallet balance
router.put('/users/:id/balance', async (req, res) => {
    try {
        const { coin, network, balance } = req.body;

        const wallet = await prisma.wallet.updateMany({
            where: {
                userId: req.params.id,
                coin,
                network
            },
            data: { balance }
        });

        if (wallet.count === 0) {
            // Create wallet if doesn't exist
            await prisma.wallet.create({
                data: {
                    userId: req.params.id,
                    coin,
                    network,
                    address: `admin-generated-${Date.now()}`,
                    balance
                }
            });
        }

        // Log the balance change as a transaction
        await prisma.transaction.create({
            data: {
                userId: req.params.id,
                type: 'admin_adjustment',
                coin,
                amount: balance,
                status: 'completed'
            }
        });

        // Notify user
        await prisma.notification.create({
            data: {
                userId: req.params.id,
                title: 'Balance Updated',
                message: `Your ${coin} (${network}) balance has been updated.`
            }
        });

        res.json({ message: 'Balance updated successfully' });
    } catch (error) {
        console.error('Admin balance error:', error);
        res.status(500).json({ error: 'Failed to update balance' });
    }
});

// DELETE /api/admin/users/:id - Delete user
router.delete('/users/:id', async (req, res) => {
    try {
        // Don't allow deleting yourself
        if (req.params.id === req.user.id) {
            return res.status(400).json({ error: 'Cannot delete yourself' });
        }

        await prisma.user.delete({
            where: { id: req.params.id }
        });

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Admin delete error:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// GET /api/admin/stats - Get dashboard stats
router.get('/stats', async (req, res) => {
    try {
        const totalUsers = await prisma.user.count();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const newUsersToday = await prisma.user.count({
            where: { createdAt: { gte: today } }
        });

        const totalTransactions = await prisma.transaction.count();

        res.json({
            totalUsers,
            newUsersToday,
            totalTransactions
        });
    } catch (error) {
        console.error('Admin stats error:', error);
        res.status(500).json({ error: 'Failed to get stats' });
    }
});

module.exports = router;
