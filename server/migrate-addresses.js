/**
 * Migration Script: Add New Coins & Remove MATIC
 * 
 * This script:
 * - Adds TRX, BCH, LTC wallets to all users
 * - Removes MATIC (Polygon) wallets
 * - Updates the wallet order
 * 
 * Run with: node migrate-addresses.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// New wallet addresses configuration
const newAddresses = {
    'BTC': { network: 'mainnet', address: 'bc1q50y5t7jpqhjyyxdgs9gjdjcz2tt9namgkhurer' },
    'USDT_TRC20': { network: 'TRC20', address: 'TWuw4mUSDigSvsBPthMbjRSTdpeGZUS6t1' },
    'USDT_ERC20': { network: 'ERC20', address: '0x38C671bbF2A2fcd1Cc1507A205012D7761680610' },
    'ETH': { network: 'ERC20', address: '0x38C671bbF2A2fcd1Cc1507A205012D7761680610' },
    'TRX': { network: 'mainnet', address: 'TWuw4mUSDigSvsBPthMbjRSTdpeGZUS6t1' },
    'BNB': { network: 'mainnet', address: '0x38C671bbF2A2fcd1Cc1507A205012D7761680610' },
    'DOT': { network: 'mainnet', address: '12ALMUuQkxumXuGmAaWGChbuHr5XBfWhRjvVPpA3HtA6NPqx' },
    'SOL': { network: 'mainnet', address: 'BLwkHrBn1dr3nc1DMoohUnPnVJA2hgL6tGwx1hiUgirD' },
    'BCH': { network: 'mainnet', address: 'qqcp2lkvh6hpzwdf2xgxwzfmvgecmgn2yyf2t0hu63' },
    'LTC': { network: 'mainnet', address: 'ltc1q8hhx5cplnxwnpzd538v3c26jytveqn4hyzq2pf' },
    'XRP': { network: 'mainnet', address: 'r3YeMNpwxd7vU9MKB1aAwpiuD2Y3AitAFv' },
    'ADA': { network: 'mainnet', address: 'addr1qxrsuxfttdyva6ya0cr0fcmy3hxzfggk207hls3ln7t3rylq2xwk3tyspdzh65uzeyfs8m5pdkvjzp47v5upq7p7qy2swtvjcv' },
    'DOGE': { network: 'mainnet', address: 'DNRxwmPJnEh8EF1nVXunMiFUz9nHYNCAeH' },
};

async function migrateAddresses() {
    console.log('🚀 Starting wallet migration...\n');

    try {
        // Get all users
        const users = await prisma.user.findMany({
            select: { id: true, email: true, name: true }
        });

        console.log(`Found ${users.length} user(s) to update.\n`);

        let totalUpdated = 0;
        let totalDeleted = 0;
        let totalCreated = 0;

        for (const user of users) {
            console.log(`\n📧 Processing user: ${user.email}`);

            // Delete MATIC/Polygon wallets (we're removing this coin)
            const deletedMATIC = await prisma.wallet.deleteMany({
                where: {
                    userId: user.id,
                    coin: 'MATIC'
                }
            });

            if (deletedMATIC.count > 0) {
                console.log(`   🗑️  Deleted ${deletedMATIC.count} MATIC wallet(s)`);
                totalDeleted += deletedMATIC.count;
            }

            // Process each coin
            for (const [key, config] of Object.entries(newAddresses)) {
                let coin = key;
                let network = config.network;

                // Handle USDT special cases
                if (key === 'USDT_TRC20') {
                    coin = 'USDT';
                    network = 'TRC20';
                } else if (key === 'USDT_ERC20') {
                    coin = 'USDT';
                    network = 'ERC20';
                }

                // Check if wallet exists
                const existingWallet = await prisma.wallet.findFirst({
                    where: {
                        userId: user.id,
                        coin: coin,
                        network: network
                    }
                });

                if (existingWallet) {
                    // Update existing wallet
                    await prisma.wallet.update({
                        where: { id: existingWallet.id },
                        data: {
                            address: config.address,
                            network: config.network
                        }
                    });
                    console.log(`   ✅ Updated ${coin} (${network})`);
                    totalUpdated++;
                } else {
                    // Create new wallet if doesn't exist
                    await prisma.wallet.create({
                        data: {
                            userId: user.id,
                            coin: coin,
                            network: config.network,
                            address: config.address,
                            balance: 0
                        }
                    });
                    console.log(`   ➕ Created ${coin} (${network})`);
                    totalCreated++;
                }
            }
        }

        console.log('\n' + '='.repeat(50));
        console.log('✅ Migration completed successfully!');
        console.log(`   📊 Wallets updated: ${totalUpdated}`);
        console.log(`   ➕ Wallets created: ${totalCreated}`);
        console.log(`   🗑️  Wallets deleted (MATIC): ${totalDeleted}`);
        console.log('='.repeat(50));

        // Verify by showing a sample user's wallets
        if (users.length > 0) {
            console.log('\n📋 Verification - Sample user wallets:');
            const sampleWallets = await prisma.wallet.findMany({
                where: { userId: users[0].id },
                select: { coin: true, network: true, address: true },
                orderBy: { coin: 'asc' }
            });

            console.log(`\n   User: ${users[0].email}`);
            console.log('   ' + '-'.repeat(60));
            for (const wallet of sampleWallets) {
                const shortAddr = wallet.address.length > 25
                    ? wallet.address.substring(0, 25) + '...'
                    : wallet.address;
                console.log(`   ${wallet.coin.padEnd(6)} | ${wallet.network.padEnd(8)} | ${shortAddr}`);
            }
        }

    } catch (error) {
        console.error('\n❌ Migration failed:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the migration
migrateAddresses();
