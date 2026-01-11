import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function NotificationsPage() {
    const { api } = useAuth();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        try {
            const data = await api('/user/notifications');
            setNotifications(data);
        } catch (error) {
            console.error('Failed to load notifications:', error);
        }
    };

    const markAllRead = async () => {
        try {
            await api('/user/notifications/read', { method: 'PUT' });
            setNotifications(notifications.map(n => ({ ...n, read: true })));
        } catch (error) {
            console.error('Failed to mark as read:', error);
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff' }}>
                    Notifications
                </h1>
                {unreadCount > 0 && (
                    <button
                        onClick={markAllRead}
                        style={{
                            padding: '8px 16px',
                            background: 'rgba(20, 241, 149, 0.1)',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#14F195',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                        }}
                    >
                        Mark All Read
                    </button>
                )}
            </div>

            <div style={{
                background: '#12121a',
                borderRadius: '16px',
                overflow: 'hidden'
            }}>
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <div
                            key={notification.id}
                            style={{
                                padding: '20px',
                                borderBottom: '1px solid rgba(255,255,255,0.03)',
                                background: notification.read ? 'transparent' : 'rgba(20, 241, 149, 0.02)'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: notification.read ? 'rgba(255,255,255,0.05)' : 'rgba(20, 241, 149, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={notification.read ? '#666' : '#14F195'} strokeWidth="2">
                                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                    </svg>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{
                                        color: '#fff',
                                        fontWeight: notification.read ? '400' : '500',
                                        marginBottom: '4px'
                                    }}>
                                        {notification.title}
                                    </div>
                                    <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '8px' }}>
                                        {notification.message}
                                    </div>
                                    <div style={{ color: '#666', fontSize: '0.8rem' }}>
                                        {new Date(notification.createdAt).toLocaleString()}
                                    </div>
                                </div>
                                {!notification.read && (
                                    <div style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: '#14F195',
                                        flexShrink: 0,
                                        marginTop: '8px'
                                    }} />
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', padding: '48px', color: '#666' }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1" style={{ marginBottom: '16px' }}>
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                        <p>No notifications yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
