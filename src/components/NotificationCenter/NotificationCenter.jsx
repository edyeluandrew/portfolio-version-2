import { useState, useEffect } from 'react';

const NotificationCenter = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      app: 'Portfolio',
      title: 'Welcome! 👋',
      message: 'Thanks for visiting my portfolio. Feel free to explore!',
      time: new Date(),
      icon: '💼',
    },
    {
      id: 2,
      app: 'GitHub',
      title: 'Check out my projects',
      message: 'View my latest repositories and contributions.',
      time: new Date(Date.now() - 3600000),
      icon: '🐙',
    },
  ]);

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const clearNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const formatTimeAgo = (date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  // Calendar helpers
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
  
  const year = date.getFullYear();
  const month = date.getMonth();
  const today = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const days = [];
  
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[1999]"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-12 w-[380px] bg-[rgba(32,32,32,0.95)] backdrop-blur-xl border-l border-white/10 z-[2000] flex flex-col animate-slideIn">
        {/* Calendar Section */}
        <div className="p-4 border-b border-white/10">
          <div className="text-center mb-4">
            <div className="text-4xl font-light text-white mb-1">
              {date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
            </div>
            <div className="text-white/60">
              {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
          
          {/* Mini Calendar */}
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <button 
                className="p-1 hover:bg-white/10 rounded"
                onClick={() => setDate(new Date(year, month - 1))}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/60">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>
              <span className="text-white text-sm">
                {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <button 
                className="p-1 hover:bg-white/10 rounded"
                onClick={() => setDate(new Date(year, month + 1))}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/60">
                  <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="text-white/40 py-1">{day}</div>
              ))}
              {days.map((day, i) => (
                <div 
                  key={i} 
                  className={`py-1 rounded ${
                    day === today && month === currentMonth && year === currentYear
                      ? 'bg-[#0078d4] text-white' 
                      : day ? 'text-white/70 hover:bg-white/10 cursor-pointer' : ''
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="flex-1 overflow-auto">
          <div className="flex justify-between items-center p-4 pb-2">
            <span className="text-white text-sm font-medium">Notifications</span>
            {notifications.length > 0 && (
              <button 
                className="text-white/60 text-xs hover:text-white transition-colors"
                onClick={clearAll}
              >
                Clear all
              </button>
            )}
          </div>
          
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-white/40">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="mb-3 opacity-50">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
              </svg>
              <span>No new notifications</span>
            </div>
          ) : (
            <div className="px-4 space-y-2">
              {notifications.map(notification => (
                <div 
                  key={notification.id}
                  className="bg-white/5 rounded-lg p-3 group hover:bg-white/[0.08] transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-lg">
                      {notification.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-xs">{notification.app}</span>
                        <button 
                          className="opacity-0 group-hover:opacity-100 text-white/40 hover:text-white transition-all"
                          onClick={() => clearNotification(notification.id)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                          </svg>
                        </button>
                      </div>
                      <div className="text-white text-sm font-medium">{notification.title}</div>
                      <div className="text-white/60 text-xs mt-0.5">{notification.message}</div>
                      <div className="text-white/40 text-xs mt-1">{formatTimeAgo(notification.time)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <style>{`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }
          .animate-slideIn {
            animation: slideIn 0.2s ease-out;
          }
        `}</style>
      </div>
    </>
  );
};

export default NotificationCenter;
