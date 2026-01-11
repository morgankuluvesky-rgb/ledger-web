const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// Generate 6-digit verification code
const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send verification email
const sendVerificationEmail = async (email, name, code) => {
    try {
        const { data, error } = await resend.emails.send({
            from: process.env.FROM_EMAIL || 'Web3SafePal <onboarding@resend.dev>',
            to: email,
            subject: 'Verify your Web3SafePal account',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin: 0; padding: 0; background-color: #0a0a0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0f; padding: 40px 20px;">
                        <tr>
                            <td align="center">
                                <table width="100%" max-width="480" cellpadding="0" cellspacing="0" style="background-color: #12121a; border-radius: 16px; overflow: hidden; max-width: 480px;">
                                    <!-- Header -->
                                    <tr>
                                        <td style="padding: 32px; text-align: center; background: linear-gradient(135deg, rgba(20, 241, 149, 0.1) 0%, rgba(153, 69, 255, 0.1) 100%);">
                                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                                                🔐 Web3SafePal
                                            </h1>
                                        </td>
                                    </tr>
                                    
                                    <!-- Content -->
                                    <tr>
                                        <td style="padding: 32px;">
                                            <h2 style="margin: 0 0 16px; color: #ffffff; font-size: 20px;">
                                                Hi ${name}! 👋
                                            </h2>
                                            <p style="margin: 0 0 24px; color: #888888; font-size: 16px; line-height: 1.5;">
                                                Welcome to Web3SafePal! Use the code below to verify your email address.
                                            </p>
                                            
                                            <!-- Verification Code -->
                                            <div style="background: #0a0a0f; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
                                                <p style="margin: 0 0 8px; color: #888888; font-size: 14px;">
                                                    Your verification code:
                                                </p>
                                                <div style="font-size: 36px; font-weight: 700; color: #14F195; letter-spacing: 8px;">
                                                    ${code}
                                                </div>
                                            </div>
                                            
                                            <p style="margin: 0; color: #666666; font-size: 14px;">
                                                This code expires in 15 minutes. If you didn't create an account, you can safely ignore this email.
                                            </p>
                                        </td>
                                    </tr>
                                    
                                    <!-- Footer -->
                                    <tr>
                                        <td style="padding: 24px 32px; border-top: 1px solid rgba(255,255,255,0.05);">
                                            <p style="margin: 0; color: #666666; font-size: 12px; text-align: center;">
                                                © 2024 Web3SafePal. Secure Crypto Wallet.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `
        });

        if (error) {
            console.error('Email error:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Send email error:', error);
        return { success: false, error };
    }
};

module.exports = { generateCode, sendVerificationEmail };
