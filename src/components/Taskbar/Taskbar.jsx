import { useState, useEffect } from 'react';
import windowsIcon from '../../assets/icons/windows.svg';

const Taskbar = ({ windows, activeWindowId, onWindowClick, onStartClick, startMenuOpen }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-[rgba(32,32,32,0.75)] backdrop-blur-2xl border-t border-white/[0.06] flex items-center justify-between px-2 z-[1000]">
      {/* Left - Hidden overflow icons */}
      <div className="flex items-center w-[100px]">
        {/* Placeholder for left side balance */}
      </div>

      {/* Center - Start Button + Open Windows */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-0.5">
        {/* Start Button */}
        <button 
          className={`w-11 h-10 border-none bg-transparent rounded cursor-pointer flex items-center justify-center transition-all duration-150 hover:bg-white/[0.06] ${startMenuOpen ? 'bg-white/[0.08]' : ''}`}
          onClick={onStartClick}
        >
          <img src={windowsIcon} alt="Start" className="w-6 h-6" />
        </button>
        
        {/* Search */}
        <button className="w-11 h-10 border-none bg-transparent rounded cursor-pointer flex items-center justify-center text-white/80 hover:bg-white/[0.06] transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </button>
        
        {/* Task View */}
        <button className="w-11 h-10 border-none bg-transparent rounded cursor-pointer flex items-center justify-center text-white/80 hover:bg-white/[0.06] transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        </button>
        
        {/* Divider */}
        {windows.length > 0 && <div className="w-px h-6 bg-white/10 mx-1" />}
        
        {/* Open Windows */}
        {windows.map((window) => (
          <button
            key={window.id}
            className={`w-11 h-10 border-none bg-transparent rounded cursor-pointer flex flex-col items-center justify-center relative transition-all duration-150 hover:bg-white/[0.06] ${
              activeWindowId === window.id && !window.minimized ? 'bg-white/[0.08]' : ''
            }`}
            onClick={() => onWindowClick(window.id)}
            title={window.title}
          >
            <img src={window.icon} alt={window.title} className="w-6 h-6" />
            <div 
              className={`absolute bottom-1 h-[3px] rounded-full transition-all duration-200 ${
                activeWindowId === window.id && !window.minimized 
                  ? 'w-4 bg-[#60cdff]' 
                  : window.minimized 
                    ? 'w-1.5 bg-white/40' 
                    : 'w-1.5 bg-white/60'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Right - System Tray */}
      <div className="flex items-center">
        <button className="h-9 px-1.5 border-none bg-transparent rounded cursor-pointer flex items-center justify-center text-white/60 hover:bg-white/[0.06] transition-colors">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </button>
        
        <div className="flex items-center gap-3 px-2 h-9 rounded hover:bg-white/[0.06] cursor-pointer transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white" fillOpacity="0.8">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white" fillOpacity="0.8">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white" fillOpacity="0.8">
            <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
          </svg>
        </div>

        <div className="flex flex-col items-end px-3 cursor-pointer h-9 justify-center rounded hover:bg-white/[0.06] transition-colors">
          <span className="text-white/90 text-xs leading-tight">{formatTime(time)}</span>
          <span className="text-white/60 text-[11px] leading-tight">{formatDate(time)}</span>
        </div>

        <button className="w-1 h-9 border-none bg-transparent cursor-pointer hover:bg-[#60cdff]/50 transition-colors ml-1" title="Show desktop" />
      </div>
    </div>
  );
};

export default Taskbar;
