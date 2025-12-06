import { useState, useEffect } from 'react';

// Window content components
import AboutContent from '../WindowContents/AboutContent';
import ProjectsContent from '../WindowContents/ProjectsContent';
import SkillsContent from '../WindowContents/SkillsContent';
import ContactContent from '../WindowContents/ContactContent';
import TerminalContent from '../WindowContents/TerminalContent';
import ResumeContent from '../WindowContents/ResumeContent';

const contentComponents = {
  about: AboutContent,
  projects: ProjectsContent,
  skills: SkillsContent,
  contact: ContactContent,
  terminal: TerminalContent,
  resume: ResumeContent,
};

const Window = ({
  windowData,
  isActive,
  zIndex,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  onSizeChange,
  onSnap,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [snapPreview, setSnapPreview] = useState(null); // 'left', 'right', 'top', null

  const ContentComponent = contentComponents[windowData.component];

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return;
    
    onFocus();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - windowData.position.x,
      y: e.clientY - windowData.position.y,
    });
  };

  const handleResizeMouseDown = (e) => {
    e.stopPropagation();
    onFocus();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: windowData.size.width,
      height: windowData.size.height,
    });
  };

  // Detect snap zones
  const getSnapZone = (x, y) => {
    const threshold = 20;
    const screenWidth = window.innerWidth;
    const taskbarHeight = 48;
    
    if (y <= threshold) return 'top'; // Maximize
    if (x <= threshold) return 'left'; // Left half
    if (x >= screenWidth - threshold) return 'right'; // Right half
    return null;
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && !windowData.maximized) {
        const newX = e.clientX - dragOffset.x;
        const newY = Math.max(0, e.clientY - dragOffset.y);
        
        onPositionChange({ x: newX, y: newY });
        
        // Show snap preview
        const zone = getSnapZone(e.clientX, e.clientY);
        setSnapPreview(zone);
      }
      if (isResizing && !windowData.maximized) {
        const newWidth = Math.max(400, resizeStart.width + (e.clientX - resizeStart.x));
        const newHeight = Math.max(300, resizeStart.height + (e.clientY - resizeStart.y));
        onSizeChange({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = (e) => {
      if (isDragging && snapPreview && onSnap) {
        onSnap(snapPreview);
      }
      setIsDragging(false);
      setIsResizing(false);
      setSnapPreview(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, resizeStart, windowData.maximized, onPositionChange, onSizeChange, snapPreview, onSnap]);

  if (windowData.minimized) return null;

  // Handle snap positions
  const getSnapStyle = () => {
    if (windowData.snapPosition === 'left') {
      return {
        top: 0,
        left: 0,
        width: '50vw',
        height: 'calc(100vh - 48px)',
        zIndex: zIndex + 10,
        borderRadius: 0,
      };
    }
    if (windowData.snapPosition === 'right') {
      return {
        top: 0,
        left: '50vw',
        width: '50vw',
        height: 'calc(100vh - 48px)',
        zIndex: zIndex + 10,
        borderRadius: 0,
      };
    }
    return null;
  };

  const snapStyle = getSnapStyle();

  const windowStyle = snapStyle || (windowData.maximized
    ? {
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 48px)',
        zIndex: zIndex + 10,
        borderRadius: 0,
      }
    : {
        top: windowData.position.y,
        left: windowData.position.x,
        width: windowData.size.width,
        height: windowData.size.height,
        zIndex: zIndex + 10,
      });

  // Snap preview overlay position
  const getSnapPreviewStyle = () => {
    if (!snapPreview) return null;
    if (snapPreview === 'left') return { left: 0, top: 0, width: '50%', height: 'calc(100vh - 48px)' };
    if (snapPreview === 'right') return { right: 0, top: 0, width: '50%', height: 'calc(100vh - 48px)' };
    if (snapPreview === 'top') return { left: 0, top: 0, width: '100%', height: 'calc(100vh - 48px)' };
    return null;
  };

  return (
    <>
      {/* Snap Preview Overlay */}
      {snapPreview && (
        <div
          className="fixed bg-white/10 border-2 border-white/30 rounded-lg pointer-events-none z-[9998] transition-all duration-150"
          style={getSnapPreviewStyle()}
        />
      )}
      <div
        className={`absolute flex flex-col overflow-hidden bg-[rgba(32,32,32,0.9)] backdrop-blur-2xl border rounded-xl transition-all duration-200 animate-windowOpen ${
          isActive 
            ? 'shadow-[0_8px_32px_rgba(0,0,0,0.5)] border-white/[0.08]' 
            : 'shadow-[0_4px_16px_rgba(0,0,0,0.3)] border-white/[0.05] opacity-95'
        } ${(windowData.maximized || snapStyle) ? '!rounded-none' : ''}`}
        style={windowStyle}
        onMouseDown={onFocus}
      >
      {/* Mica-like top gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none h-32" />
      
      {/* Title Bar */}
      <div 
        className="flex items-center justify-between px-3 h-9 bg-transparent cursor-grab active:cursor-grabbing shrink-0 relative z-10"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2.5 text-white/90 text-[13px]">
          {windowData.isEmoji ? (
            <span className="text-base">{windowData.icon}</span>
          ) : (
            <img src={windowData.icon} alt="" className="w-4 h-4" />
          )}
          <span className="font-medium">{windowData.title}</span>
        </div>
        
        <div className="window-controls flex">
          <button 
            className="w-12 h-9 border-none bg-transparent text-white/70 cursor-pointer flex items-center justify-center hover:bg-white/[0.06] transition-colors rounded-sm"
            onClick={onMinimize}
          >
            <svg width="10" height="10" viewBox="0 0 10 10">
              <rect x="0" y="4.5" width="10" height="1" fill="currentColor" />
            </svg>
          </button>
          <button 
            className="w-12 h-9 border-none bg-transparent text-white/70 cursor-pointer flex items-center justify-center hover:bg-white/[0.06] transition-colors rounded-sm"
            onClick={onMaximize}
          >
            <svg width="10" height="10" viewBox="0 0 10 10">
              <rect x="0" y="0" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>
          <button 
            className="w-12 h-9 border-none bg-transparent text-white/70 cursor-pointer flex items-center justify-center hover:bg-[#c42b1c] hover:text-white transition-colors rounded-sm"
            onClick={onClose}
          >
            <svg width="10" height="10" viewBox="0 0 10 10">
              <path d="M0 0 L10 10 M10 0 L0 10" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-auto p-5 text-white relative z-10" onMouseDown={(e) => e.stopPropagation()}>
        {ContentComponent && <ContentComponent />}
      </div>

      {/* Resize Handle */}
      {!windowData.maximized && !snapStyle && (
        <div 
          className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize"
          onMouseDown={handleResizeMouseDown} 
        />
      )}
      
      {/* CSS Animation */}
      <style>{`
        @keyframes windowOpen {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-windowOpen {
          animation: windowOpen 0.15s ease-out;
        }
      `}</style>
    </div>
    </>
  );
};

export default Window;
