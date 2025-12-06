import { useState } from 'react';

const DesktopIcon = ({ icon, onDoubleClick, index }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setSelected(true);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-[76px] py-2 px-1 rounded-[4px] cursor-pointer transition-all duration-100 
        ${selected 
          ? 'bg-white/[0.08] outline outline-1 outline-white/20' 
          : 'hover:bg-white/[0.05]'
        }`}
      style={{ 
        animation: `iconFadeIn 0.4s ease-out forwards`,
        animationDelay: `${index * 0.05}s`,
        opacity: 0 
      }}
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
    >
      {icon.isEmoji ? (
        <span className="text-[44px] mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
          {icon.icon}
        </span>
      ) : (
        <img 
          src={icon.icon} 
          alt={icon.title} 
          className="w-11 h-11 mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
          draggable={false} 
        />
      )}
      <span className="text-white text-[11px] text-center leading-tight px-1 py-0.5 rounded-sm max-w-[72px] break-words"
        style={{ 
          textShadow: '0 1px 2px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)',
        }}
      >
        {icon.title}
      </span>
      
      <style>{`
        @keyframes iconFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default DesktopIcon;
