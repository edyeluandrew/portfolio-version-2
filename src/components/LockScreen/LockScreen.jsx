import { useState, useEffect } from 'react';

const LockScreen = ({ onUnlock }) => {
  const [time, setTime] = useState(new Date());
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
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
      weekday: 'long',
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleClick = () => {
    setIsUnlocking(true);
    setTimeout(onUnlock, 500);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
  };

  const handleDrag = (e) => {
    if (!isDragging) return;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    const newDragY = Math.min(0, clientY - window.innerHeight);
    setDragY(newDragY);
    
    if (newDragY < -150) {
      setIsUnlocking(true);
      setTimeout(onUnlock, 300);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (!isUnlocking) {
      setDragY(0);
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-[9998] cursor-pointer transition-transform duration-500 ease-out ${isUnlocking ? '-translate-y-full' : ''}`}
      style={{ transform: isUnlocking ? 'translateY(-100%)' : `translateY(${dragY}px)` }}
      onClick={handleClick}
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDrag}
      onTouchEnd={handleDragEnd}
    >
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('/profile.jpg')`,
          filter: 'blur(20px) brightness(0.4)',
          transform: 'scale(1.1)',
        }}
      ></div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-white">
        {/* Time */}
        <div className="text-8xl font-light mb-2 tracking-tight animate-fadeIn">
          {formatTime(time)}
        </div>
        
        {/* Date */}
        <div className="text-2xl font-light text-white/80 mb-16 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          {formatDate(time)}
        </div>

        {/* Profile */}
        <div className="flex flex-col items-center mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/30 mb-4 shadow-lg">
            <img 
              src="/profile.jpg" 
              alt="Edyelu Andrew"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-[#0078d4] to-[#00bcf2] flex items-center justify-center text-3xl">👨‍💻</div>';
              }}
            />
          </div>
          <div className="text-xl font-medium">Edyelu Andrew</div>
        </div>

        {/* Unlock hint */}
        <div className="absolute bottom-16 flex flex-col items-center animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white/60 mb-2 rotate-180">
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
          </svg>
          <span className="text-white/60 text-sm">Click or swipe up to unlock</span>
        </div>
      </div>

      {/* Quick status bar */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-6 text-white/50 text-sm">
        <div className="flex items-center gap-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
          </svg>
          <span>Connected</span>
        </div>
        <div className="flex items-center gap-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zM11 20v-5.5H9L13 7v5.5h2L11 20z"/>
          </svg>
          <span>100%</span>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LockScreen;
