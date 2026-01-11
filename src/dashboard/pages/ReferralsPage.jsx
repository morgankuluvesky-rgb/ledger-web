import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { SITE_CONFIG } from '../../utils/constants';

export default function ReferralsPage() {
    const { api } = useAuth();
    const [referralData, setReferralData] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        loadReferrals();
    }, []);

    const loadReferrals = async () => {
        try {
            const data = await api('/user/referrals');
            setReferralData(data);
        } catch (error) {
            console.error('Failed to load referrals:', error);
        }
    };

    // Use the configured domain instead of window.location.origin
    const referralLink = referralData
        ? `${SITE_CONFIG.appDomain}/register?ref=${referralData.referralCode}`
        : '';

    const copyLink = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', marginBottom: '24px' }}>
                Referrals
            </h1>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div style={{
                    background: '#12121a',
                    borderRadius: '16px',
                    padding: '24px',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#14F195', marginBottom: '8px' }}>
                        {referralData?.totalReferrals || 0}
                    </div>
                    <div style={{ color: '#888' }}>Total Referrals</div>
                </div>
                <div style={{
                    background: '#12121a',
                    borderRadius: '16px',
                    padding: '24px',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#9945FF', marginBottom: '8px' }}>
                        {referralData?.monthlyReferrals || 0}
                    </div>
                    <div style={{ color: '#888' }}>This Month</div>
                </div>
            </div>

            {/* Referral Link */}
            <div style={{
                background: '#12121a',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px'
            }}>
                <h3 style={{ color: '#fff', marginBottom: '16px' }}>Your Referral Link</h3>
                <div style={{
                    background: '#0a0a0f',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <div style={{
                        flex: 1,
                        color: '#888',
                        fontSize: '0.9rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {referralLink || 'Loading...'}
                    </div>
                    <button
                        onClick={copyLink}
                        style={{
                            padding: '10px 20px',
                            background: copied ? '#10B981' : '#14F195',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#000',
                            fontWeight: '600',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            </div>

            {/* Recent Referrals */}
            <div style={{
                background: '#12121a',
                borderRadius: '16px',
                padding: '24px'
            }}>
                <h3 style={{ color: '#fff', marginBottom: '16px' }}>Recent Referrals</h3>

                {referralData?.recentReferrals?.length > 0 ? (
                    referralData.recentReferrals.map((ref, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '16px',
                                borderRadius: '12px',
                                marginBottom: '8px',
                                background: 'rgba(255,255,255,0.02)'
                            }}
                        >
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #14F195 0%, #9945FF 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '16px',
                                color: '#000',
                                fontWeight: '600'
                            }}>
                                {ref.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ color: '#fff', fontWeight: '500' }}>{ref.name}</div>
                                <div style={{ color: '#666', fontSize: '0.85rem' }}>
                                    {new Date(ref.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', padding: '32px', color: '#666' }}>
                        No referrals yet. Share your link to invite friends!
                    </div>
                )}
            </div>
        </div>
    );
}
