import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './PinPage.css';

export default function PinSetupPage() {
    const navigate = useNavigate();
    const { user, api } = useAuth();
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [step, setStep] = useState(1); // 1: create, 2: confirm
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleKeyPress = (num) => {
        if (step === 1) {
            if (pin.length < 4) {
                setPin(prev => prev + num);
                setError('');
            }
        } else {
            if (confirmPin.length < 4) {
                setConfirmPin(prev => prev + num);
                setError('');
            }
        }
    };

    const handleDelete = () => {
        if (step === 1) {
            setPin(prev => prev.slice(0, -1));
        } else {
            setConfirmPin(prev => prev.slice(0, -1));
        }
    };

    const handleClear = () => {
        if (step === 1) {
            setPin('');
        } else {
            setConfirmPin('');
        }
    };

    // Auto-proceed when 4 digits entered
    useEffect(() => {
        if (step === 1 && pin.length === 4) {
            setTimeout(() => setStep(2), 300);
        }
    }, [pin, step]);

    useEffect(() => {
        if (step === 2 && confirmPin.length === 4) {
            handleSubmit();
        }
    }, [confirmPin, step]);

    const handleSubmit = async () => {
        if (pin !== confirmPin) {
            setError('PINs do not match. Try again.');
            setConfirmPin('');
            return;
        }

        setLoading(true);
        try {
            await api('/user/pin', {
                method: 'POST',
                body: JSON.stringify({ pin })
            });
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to set PIN. Please try again.');
            setConfirmPin('');
        } finally {
            setLoading(false);
        }
    };

    const currentPin = step === 1 ? pin : confirmPin;

    return (
        <div className="pin-page">
            <div className="pin-container">
                <div className="pin-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                </div>

                <h1 className="pin-title">
                    {step === 1 ? 'Create PIN' : 'Confirm PIN'}
                </h1>
                <p className="pin-subtitle">
                    {step === 1
                        ? 'Create a 4-digit passcode'
                        : 'Re-enter your 4-digit passcode'}
                </p>

                {error && <div className="pin-error">{error}</div>}

                <div className="pin-dots">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={`pin-dot ${i < currentPin.length ? 'filled' : ''}`}
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
            </div>
        </div>
    );
}
