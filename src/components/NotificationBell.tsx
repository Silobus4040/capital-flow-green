import { useEffect, useState, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, TrendingUp, MessageSquare, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Notification {
    id: string;
    type: 'bid' | 'message';
    title: string;
    description: string;
    timestamp: string;
    read: boolean;
}

export default function NotificationBell() {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const panelRef = useRef<HTMLDivElement>(null);
    const prevBidsRef = useRef<Map<string, number>>(new Map());
    const prevMsgCountRef = useRef<number>(0);
    const isInitialLoad = useRef(true);

    const formatCurrency = (n: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

    // Close panel when clicking outside
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    // Load stored notifications from sessionStorage
    useEffect(() => {
        const stored = sessionStorage.getItem('ccif_notifications');
        if (stored) {
            try {
                const parsed = JSON.parse(stored) as Notification[];
                setNotifications(parsed);
                setUnreadCount(parsed.filter(n => !n.read).length);
            } catch { }
        }
    }, []);

    // Save notifications to sessionStorage whenever they change
    const saveNotifications = useCallback((notifs: Notification[]) => {
        setNotifications(notifs);
        setUnreadCount(notifs.filter(n => !n.read).length);
        sessionStorage.setItem('ccif_notifications', JSON.stringify(notifs.slice(0, 50)));
    }, []);

    const addNotification = useCallback((notif: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
        const newNotif: Notification = {
            ...notif,
            id: `notif-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            timestamp: new Date().toISOString(),
            read: false,
        };
        setNotifications(prev => {
            const updated = [newNotif, ...prev].slice(0, 50);
            setUnreadCount(updated.filter(n => !n.read).length);
            sessionStorage.setItem('ccif_notifications', JSON.stringify(updated));
            return updated;
        });
    }, []);

    // Subscribe to bid changes for user's applications
    useEffect(() => {
        if (!user) return;

        const setupBidSubscription = async () => {
            // Get user's application IDs
            const { data: apps } = await supabase
                .from('loan_program_applications')
                .select('id')
                .eq('user_id', user.id);

            if (!apps || apps.length === 0) return;

            const appIds = apps.map(a => a.id);

            // Fetch initial bids to set baseline
            const { data: initialBids } = await supabase
                .from('closing_bids')
                .select('id, bid_amount, investor_label, application_id')
                .in('application_id', appIds);

            if (initialBids) {
                const map = new Map<string, number>();
                initialBids.forEach(b => map.set(b.id, Number(b.bid_amount)));
                prevBidsRef.current = map;
            }

            // Listen for bid changes
            const bidChannels = appIds.map(appId => {
                return supabase
                    .channel(`notif-bids-${appId}`)
                    .on('postgres_changes', {
                        event: '*',
                        schema: 'public',
                        table: 'closing_bids',
                        filter: `application_id=eq.${appId}`
                    }, async () => {
                        // Re-fetch all bids for this app
                        const { data: currentBids } = await supabase
                            .from('closing_bids')
                            .select('id, bid_amount, investor_label, application_id')
                            .eq('application_id', appId);

                        if (!currentBids || isInitialLoad.current) return;

                        for (const bid of currentBids) {
                            const prevAmount = prevBidsRef.current.get(bid.id);
                            const currentAmount = Number(bid.bid_amount);

                            if (prevAmount === undefined && currentAmount > 0) {
                                // New bid
                                addNotification({
                                    type: 'bid',
                                    title: '🎉 New Investor Bid!',
                                    description: `${bid.investor_label} placed a bid of ${formatCurrency(currentAmount)}`,
                                });
                            } else if (prevAmount !== undefined && prevAmount !== currentAmount && currentAmount > 0) {
                                // Updated bid
                                addNotification({
                                    type: 'bid',
                                    title: '💰 Bid Updated',
                                    description: `${bid.investor_label} updated their bid to ${formatCurrency(currentAmount)}`,
                                });
                            }

                            prevBidsRef.current.set(bid.id, currentAmount);
                        }
                    })
                    .subscribe();
            });

            isInitialLoad.current = false;

            return () => {
                bidChannels.forEach(ch => supabase.removeChannel(ch));
            };
        };

        const cleanup = setupBidSubscription();
        return () => { cleanup.then(fn => fn?.()); };
    }, [user, addNotification]);

    // Subscribe to new admin messages
    useEffect(() => {
        if (!user) return;

        const setupMessageSubscription = async () => {
            const { data: apps } = await supabase
                .from('loan_program_applications')
                .select('id')
                .eq('user_id', user.id);

            if (!apps || apps.length === 0) return;

            const appIds = apps.map(a => a.id);

            // Get initial message count
            const { count } = await supabase
                .from('closing_messages')
                .select('*', { count: 'exact', head: true })
                .in('application_id', appIds)
                .eq('sender_role', 'admin');

            prevMsgCountRef.current = count || 0;

            const msgChannels = appIds.map(appId => {
                return supabase
                    .channel(`notif-msgs-${appId}`)
                    .on('postgres_changes', {
                        event: 'INSERT',
                        schema: 'public',
                        table: 'closing_messages',
                        filter: `application_id=eq.${appId}`
                    }, (payload: any) => {
                        const msg = payload.new;
                        if (msg.sender_role === 'admin') {
                            const isVoice = msg.message_type === 'voice';
                            addNotification({
                                type: 'message',
                                title: isVoice ? '🎧 New Voice Note' : '💬 New Message',
                                description: isVoice
                                    ? 'Your account manager sent you a voice note'
                                    : (msg.content?.slice(0, 80) || 'You have a new message from your account manager'),
                            });
                        }
                    })
                    .subscribe();
            });

            return () => {
                msgChannels.forEach(ch => supabase.removeChannel(ch));
            };
        };

        const cleanup = setupMessageSubscription();
        return () => { cleanup.then(fn => fn?.()); };
    }, [user, addNotification]);

    const markAllRead = () => {
        const updated = notifications.map(n => ({ ...n, read: true }));
        saveNotifications(updated);
    };

    const clearAll = () => {
        saveNotifications([]);
    };

    const timeAgo = (ts: string) => {
        const diff = Date.now() - new Date(ts).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return 'Just now';
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;
        return `${Math.floor(hrs / 24)}d ago`;
    };

    return (
        <div className="relative" ref={panelRef}>
            {/* Bell icon */}
            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                    if (!isOpen && unreadCount > 0) markAllRead();
                }}
                className="relative p-2 rounded-full hover:bg-primary-foreground/10 transition-colors"
                aria-label="Notifications"
            >
                <Bell className={`h-5 w-5 text-primary-foreground ${unreadCount > 0 ? 'animate-bounce' : ''}`} />
                {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    </span>
                )}
            </button>

            {/* Dropdown panel */}
            {isOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden animate-in slide-in-from-top-2 fade-in duration-200">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
                        <h3 className="font-semibold text-sm text-gray-800">Notifications</h3>
                        <div className="flex items-center gap-2">
                            {notifications.length > 0 && (
                                <button
                                    onClick={clearAll}
                                    className="text-xs text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    Clear all
                                </button>
                            )}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Notification list */}
                    <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center">
                                <Bell className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">No notifications yet</p>
                                <p className="text-xs text-gray-400 mt-1">You'll see bid and message updates here</p>
                            </div>
                        ) : (
                            notifications.map(notif => (
                                <div
                                    key={notif.id}
                                    className={`flex items-start gap-3 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-green-50/50' : ''
                                        }`}
                                >
                                    <div className={`mt-0.5 rounded-full p-1.5 ${notif.type === 'bid'
                                            ? 'bg-green-100 text-green-600'
                                            : 'bg-blue-100 text-blue-600'
                                        }`}>
                                        {notif.type === 'bid'
                                            ? <TrendingUp className="h-3.5 w-3.5" />
                                            : <MessageSquare className="h-3.5 w-3.5" />
                                        }
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800">{notif.title}</p>
                                        <p className="text-xs text-gray-500 mt-0.5 truncate">{notif.description}</p>
                                        <p className="text-[10px] text-gray-400 mt-1">{timeAgo(notif.timestamp)}</p>
                                    </div>
                                    {!notif.read && (
                                        <span className="mt-1.5 h-2 w-2 rounded-full bg-green-500 shrink-0" />
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
