const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function ensureDefaultAdmin() {
    try {
        const adminEmail = 'admin@web3safepal.com';
        const adminPassword = 'Admin@2024!';

        // Check if admin exists
        const existingAdmin = await prisma.user.findUnique({
            where: { email: adminEmail }
        });

        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(adminPassword, 10);

            await prisma.user.create({
                data: {
                    email: adminEmail,
                    password: hashedPassword,
                    name: 'System Admin',
                    isAdmin: true,
                    referralCode: 'ADMIN001'
                }
            });

            console.log('✅ Default admin account created');
            console.log('📧 Email:', adminEmail);
            console.log('🔑 Password:', adminPassword);
        } else if (!existingAdmin.isAdmin) {
            // Ensure existing account has admin flag
            await prisma.user.update({
                where: { email: adminEmail },
                data: { isAdmin: true }
            });
            console.log('✅ Admin flag set for existing account');
        }
    } catch (error) {
        console.error('❌ Error creating default admin:', error);
    }
}

module.exports = { ensureDefaultAdmin };
