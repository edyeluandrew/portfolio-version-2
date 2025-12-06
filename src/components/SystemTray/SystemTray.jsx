import { useState, useEffect } from 'react';

const SystemTray = ({ onOpenNotifications }) => {
  const [time, setTime] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [volume, setVolume] = useState(80);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [wifiConnected, setWifiConnected] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // Get actual battery level if available
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        setBatteryLevel(Math.round(battery.level * 100));
        battery.addEventListener('levelchange', () => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
      });
    }
    
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const BatteryIcon = () => {
    const level = batteryLevel;
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white/70">
        <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" opacity="0.3"/>
        <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zM13 18h-2v-2h2v2zm0-4h-2V9h2v5z"/>
        <rect x="9" y={21 - (level * 0.15)} width="6" height={level * 0.15} fill="currentColor"/>
      </svg>
    );
  };

  return (
    <div className="flex items-center h-full">
      {/* Hidden icons arrow */}
      <button className="h-full px-1 flex items-center justify-center hover:bg-white/[0.06] transition-colors">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white/60">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
        </svg>
      </button>

      {/* WiFi */}
      <button 
        className="h-full px-2 flex items-center justify-center hover:bg-white/[0.06] transition-colors"
        title={wifiConnected ? 'Connected' : 'Disconnected'}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={wifiConnected ? 'text-white/70' : 'text-white/30'}>
          <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
        </svg>
      </button>

      {/* Volume */}
      <div className="relative">
        <button 
          className="h-full px-2 flex items-center justify-center hover:bg-white/[0.06] transition-colors"
          onClick={() => setShowVolumeSlider(!showVolumeSlider)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/70">
            {volume === 0 ? (
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            ) : volume < 50 ? (
              <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
            ) : (
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            )}
          </svg>
        </button>
        
        {/* Volume Slider Popup */}
        {showVolumeSlider && (
          <div className="absolute bottom-full right-0 mb-2 bg-[rgba(44,44,44,0.95)] backdrop-blur-xl rounded-lg border border-white/10 shadow-lg p-4 w-48">
            <div className="flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/60">
                <path d="M3 9v6h4l5 5V4L7 9H3z"/>
              </svg>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="flex-1 accent-[#60cdff]"
              />
              <span className="text-white/60 text-xs w-8">{volume}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Battery */}
      <button className="h-full px-2 flex items-center justify-center hover:bg-white/[0.06] transition-colors" title={`${batteryLevel}%`}>
        <BatteryIcon />
      </button>

      {/* Date & Time */}
      <button 
        className="h-full px-3 flex flex-col items-end justify-center hover:bg-white/[0.06] transition-colors text-white/80 text-xs"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <span>{formatTime(time)}</span>
        <span className="text-white/60">{formatDate(time)}</span>
      </button>

      {/* Notifications */}
      <button 
        className="h-full px-2 flex items-center justify-center hover:bg-white/[0.06] transition-colors"
        onClick={onOpenNotifications}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/70">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
        </svg>
      </button>
    </div>
  );
};

export default SystemTray;
