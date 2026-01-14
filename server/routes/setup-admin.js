const express = require('express');
const bcrypt = require('bcryptjs');
const { prisma } = require('../middleware/auth');

const router = express.Router();

// ONE-TIME SETUP ENDPOINT - Remove after use
router.get('/setup-admin-account', async (req, res) => {
    try {
        const email = 'morgankuluvesky@gmail.com';
        const password = 'qwertyuiop';
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            // Update existing user
            await prisma.user.update({
                where: { email },
                data: {
                    password: hashedPassword,
                    isAdmin: true
                }
            });
            res.json({
                success: true,
                message: 'Admin account updated successfully',
                email: email,
                note: 'You can now login at /adminlogin'
            });
        } else {
            // Create new user
            await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name: 'Morgan Admin',
                    isAdmin: true,
                    referralCode: `ADMIN${Date.now()}`
                }
            });
            res.json({
                success: true,
                message: 'Admin account created successfully',
                email: email,
                note: 'You can now login at /adminlogin'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
