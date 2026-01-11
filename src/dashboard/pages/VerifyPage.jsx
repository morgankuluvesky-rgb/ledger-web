import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../../config/api';

export default function VerifyPage() {
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email') || '';
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    // Auto-focus first input
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (index, value) => {
        // Only allow numbers
        if (value && !/^\d+$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value.slice(-1); // Only take last character
        setCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const newCode = [...code];
        pastedData.split('').forEach((char, index) => {
            if (index < 6) newCode[index] = char;
        });
        setCode(newCode);
        // Focus last filled input or next empty one
        const lastIndex = Math.min(pastedData.length, 5);
        inputRefs.current[lastIndex]?.focus();
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setError('');

        const fullCode = code.join('');
        if (fullCode.length !== 6) {
            setError('Please enter the 6-digit code');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/auth/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code: fullCode })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Verification failed');
            }

            // Store token and redirect
            localStorage.setItem('token', data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setResending(true);
        setResendSuccess(false);
        setError('');

        try {
            const res = await fetch(`${API_URL}/auth/resend`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to resend code');
            }

            setResendSuccess(true);
            setTimeout(() => setResendSuccess(false), 5000);
        } catch (err) {
            setError(err.message);
        } finally {
            setResending(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0a0a0f',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '420px',
                background: '#12121a',
                borderRadius: '24px',
                padding: '48px 40px',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                        <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
                            <defs>
                                <linearGradient id="verifyLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#14F195" />
                                    <stop offset="100%" stopColor="#9945FF" />
                                </linearGradient>
                            </defs>
                            <path d="M32 4L8 16v16c0 14.4 10.24 27.84 24 32 13.76-4.16 24-17.6 24-32V16L32 4z" fill="url(#verifyLogoGrad)" />
                            <path d="M32 12L16 20v12c0 10.8 6.88 20.88 16 24 9.12-3.12 16-13.2 16-24V20L32 12z" fill="#0A0A0F" />
                        </svg>
                        <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff' }}>Web3SafePal</span>
                    </Link>
                </div>

                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        margin: '0 auto 16px',
                        background: 'rgba(20, 241, 149, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#14F195" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                    </div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
                        Check your email
                    </h1>
                    <p style={{ color: '#888', fontSize: '0.95rem', marginBottom: '16px' }}>
                        We sent a verification code to<br />
                        <span style={{ color: '#14F195' }}>{email}</span>
                    </p>
                    <div style={{
                        background: 'rgba(251, 191, 36, 0.1)',
                        border: '1px solid rgba(251, 191, 36, 0.2)',
                        borderRadius: '8px',
                        padding: '10px 16px',
                        fontSize: '0.85rem',
                        color: '#FBBF24'
                    }}>
                        ⚠️ Can't find it? Check your <strong>spam</strong> or <strong>junk</strong> folder
                    </div>
                </div>

                {error && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        color: '#EF4444',
                        marginBottom: '24px',
                        fontSize: '0.9rem',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                {resendSuccess && (
                    <div style={{
                        background: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        color: '#10B981',
                        marginBottom: '24px',
                        fontSize: '0.9rem',
                        textAlign: 'center'
                    }}>
                        New code sent! Check your email.
                    </div>
                )}

                <form onSubmit={handleVerify}>
                    {/* Code Input Boxes */}
                    <div style={{
                        display: 'flex',
                        gap: '8px',
                        justifyContent: 'center',
                        marginBottom: '24px'
                    }}>
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={el => inputRefs.current[index] = el}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                style={{
                                    width: '48px',
                                    height: '56px',
                                    background: '#0a0a0f',
                                    border: digit ? '2px solid #14F195' : '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    color: '#fff',
                                    fontSize: '1.5rem',
                                    fontWeight: '600',
                                    textAlign: 'center',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || code.join('').length !== 6}
                        style={{
                            width: '100%',
                            padding: '16px',
                            background: code.join('').length === 6
                                ? 'linear-gradient(135deg, #14F195 0%, #9945FF 100%)'
                                : 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: '12px',
                            color: code.join('').length === 6 ? '#000' : '#666',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: loading || code.join('').length !== 6 ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        {loading ? 'Verifying...' : 'Verify Email'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '24px', color: '#666' }}>
                    Didn't receive the code?{' '}
                    <button
                        onClick={handleResend}
                        disabled={resending}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#14F195',
                            cursor: resending ? 'not-allowed' : 'pointer',
                            textDecoration: 'underline'
                        }}
                    >
                        {resending ? 'Sending...' : 'Resend'}
                    </button>
                </p>

                <p style={{ textAlign: 'center', marginTop: '16px' }}>
                    <Link to="/login" style={{ color: '#888', textDecoration: 'none' }}>
                        ← Back to login
                    </Link>
                </p>
            </div>
        </div>
    );
}
