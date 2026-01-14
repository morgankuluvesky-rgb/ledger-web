const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
    try {
        const email = 'morgankuluvesky@gmail.com';
        const password = 'qwertyuiop';
        const name = 'Morgan Admin';

        // Check if admin already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            // Update existing user to be admin
            const hashedPassword = await bcrypt.hash(password, 10);
            await prisma.user.update({
                where: { email },
                data: {
                    isAdmin: true,
                    password: hashedPassword,
                    name: name
                }
            });
            console.log('✅ Updated existing user to admin:', email);
        } else {
            // Create new admin user
            const hashedPassword = await bcrypt.hash(password, 10);
            await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name: name,
                    isAdmin: true,
                    referralCode: `ADMIN${Date.now()}`
                }
            });
            console.log('✅ Created new admin user:', email);
        }

        console.log('\n🔐 Admin Login Credentials:');
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('\n✨ You can now login at /adminlogin');

    } catch (error) {
        console.error('❌ Error creating admin:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createAdmin();
