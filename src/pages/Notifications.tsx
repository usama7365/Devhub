import React, { useState } from 'react';
import {
  Bell,
  Check,
  X,
  MessageSquare,
  Heart,
  Star,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface Notification {
  id: string;
  type: 'comment' | 'like' | 'mention' | 'follow' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link: string;
}

const dummyNotifications: Notification[] = [
  {
    id: '1',
    type: 'comment',
    title: 'New Comment',
    message: 'John Doe commented on your post "Best practices for React performance optimization"',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    read: false,
    link: '/discussions/1',
  },
  {
    id: '2',
    type: 'like',
    title: 'Post Liked',
    message: 'Your post received 10 likes',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
    link: '/blog/1',
  },
  {
    id: '3',
    type: 'mention',
    title: 'Mentioned in Discussion',
    message: 'Alice mentioned you in "Docker networking issues"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    read: true,
    link: '/discussions/2',
  },
  {
    id: '4',
    type: 'system',
    title: 'System Update',
    message: 'New features have been added to the platform',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: true,
    link: '/announcements',
  },
  {
    id: '5',
    type: 'follow',
    title: 'New Follower',
    message: 'Sarah started following you',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    read: false,
    link: '/profile/sarah',
  },
];

export function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>(dummyNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filteredNotifications = notifications.filter(
    (n) => filter === 'all' || !n.read
  );

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'comment': return <MessageSquare className="w-5 h-5" />;
      case 'like': return <Heart className="w-5 h-5" />;
      case 'mention': return <Star className="w-5 h-5" />;
      case 'follow': return <Bell className="w-5 h-5" />;
      case 'system': return <AlertCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="py-8 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-sm text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 flex justify-center">
        {/* Fixed width container locked to 700px on desktop */}
        <div className="bg-[var(--card-bg)] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col w-full min-w-[320px] sm:w-[700px]">
          
          {/* Header */}
          <div className="border-b dark:border-gray-700 p-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                  Notifications
                </h1>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-indigo-500 text-white">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as 'all' | 'unread')}
                  className="rounded-md border-gray-300 shadow-sm border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-primary)] text-sm p-1 outline-none"
                >
                  <option value="all">All</option>
                  <option value="unread">Unread</option>
                </select>
                <button
                  onClick={markAllAsRead}
                  className="text-sm font-medium text-[var(--accent)] hover:underline whitespace-nowrap"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          </div>

          {/* List */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700 w-full">
            {filteredNotifications.length === 0 ? (
              <div className="p-20 text-center text-[var(--text-secondary)] w-full min-h-[350px] flex flex-col items-center justify-center">
                <Bell className="w-12 h-12 mb-4 opacity-20" />
                <p>No notifications found</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 w-full transition-all ${
                    !notification.read ? 'bg-[var(--bg-primary)]' : 'bg-[var(--card-bg)]'
                  } hover:bg-[var(--bg-primary)] opacity-100`}
                >
                  <div className="flex items-start gap-4 w-full justify-between">
                    
                    <div className={`flex-shrink-0 mt-1 ${!notification.read ? 'text-[var(--accent)]' : 'text-[var(--text-hover)]'}`}>
                      {getNotificationIcon(notification.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-[var(--text-primary)] truncate">
                        {notification.title}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--text-secondary)] break-words leading-relaxed">
                        {notification.message}
                      </p>
                      <p className="mt-1 text-xs text-[var(--text-secondary)] opacity-60">
                        {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                      </p>
                    </div>

                    {/* Actions: Fixed 84px width prevents 'X' and 'Tick' buttons from causing shifts */}
                    <div className="flex items-center space-x-2 flex-shrink-0 min-w-[84px] justify-end self-center">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 text-gray-400 hover:text-[var(--accent)] transition-colors"
                          title="Mark as read"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete notification"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}