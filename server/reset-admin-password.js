const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function resetAdminPassword() {
    try {
        const email = 'morgankuluvesky@gmail.com';
        const newPassword = 'qwertyuiop';

        // Hash the password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password and ensure isAdmin is true
        const updatedUser = await prisma.user.update({
            where: { email },
            data: {
                password: hashedPassword,
                isAdmin: true
            }
        });

        console.log('✅ Password reset successfully for:', email);
        console.log('✅ Admin flag set to:', updatedUser.isAdmin);
        console.log('\n🔐 Admin Credentials:');
        console.log('Email:', email);
        console.log('Password:', newPassword);
        console.log('\n✨ Try logging in at /adminlogin now');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

resetAdminPassword();
