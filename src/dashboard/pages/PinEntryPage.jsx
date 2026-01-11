import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './PinPage.css';

export default function PinEntryPage() {
    const navigate = useNavigate();
    const { api, logout } = useAuth();
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [attempts, setAttempts] = useState(0);

    const handleKeyPress = (num) => {
        if (pin.length < 4) {
            setPin(prev => prev + num);
            setError('');
        }
    };

    const handleDelete = () => {
        setPin(prev => prev.slice(0, -1));
    };

    const handleClear = () => {
        setPin('');
    };

    // Auto-submit when 4 digits entered
    useEffect(() => {
        if (pin.length === 4) {
            handleSubmit();
        }
    }, [pin]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await api('/user/verify-pin', {
                method: 'POST',
                body: JSON.stringify({ pin })
            });

            if (response.success) {
                // Store PIN verified in session
                sessionStorage.setItem('pinVerified', 'true');
                navigate('/dashboard');
            } else {
                throw new Error('Invalid PIN');
            }
        } catch (err) {
            setError('Incorrect PIN');
            setPin('');
            setAttempts(prev => prev + 1);

            // After 5 failed attempts, log out
            if (attempts >= 4) {
                setError('Too many failed attempts. Logging out...');
                setTimeout(() => {
                    logout();
                    navigate('/login');
                }, 2000);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="pin-page">
            <div className="pin-container">
                <div className="pin-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                </div>

                <h1 className="pin-title">Security Check</h1>
                <p className="pin-subtitle">Enter your 4-digit passcode</p>

                {error && <div className="pin-error">{error}</div>}

                <div className="pin-dots">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={`pin-dot ${i < pin.length ? 'filled' : ''}`}
                        />
                    ))}
                </div>

                <div className="pin-keypad">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <button
                            key={num}
                            className="pin-key"
                            onClick={() => handleKeyPress(num.toString())}
                            disabled={loading}
                        >
                            {num}
                        </button>
                    ))}
                    <button
                        className="pin-key pin-key-action"
                        onClick={handleClear}
                        disabled={loading}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                    <button
                        className="pin-key"
                        onClick={() => handleKeyPress('0')}
                        disabled={loading}
                    >
                        0
                    </button>
                    <button
                        className="pin-key pin-key-action"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                            <line x1="18" y1="9" x2="12" y2="15" />
                            <line x1="12" y1="9" x2="18" y2="15" />
                        </svg>
                    </button>
                </div>

                <button className="pin-logout-btn" onClick={handleLogout}>
                    Use a different account
                </button>
            </div>
        </div>
    );
}
