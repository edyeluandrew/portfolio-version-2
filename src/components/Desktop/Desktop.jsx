import { useState, useEffect } from 'react';
import DesktopIcon from './DesktopIcon';
import Window from '../Window/Window';
import Taskbar from '../Taskbar/Taskbar';
import StartMenu from '../StartMenu/StartMenu';
import BootScreen from '../BootScreen/BootScreen';
import LockScreen from '../LockScreen/LockScreen';
import NotificationCenter from '../NotificationCenter/NotificationCenter';
import { useContextMenu } from '../ContextMenu/ContextMenu';
import soundManager from '../../utils/sounds';

// Import icons
import folderIcon from '../../assets/icons/folder.svg';
import userIcon from '../../assets/icons/user.svg';
import codeIcon from '../../assets/icons/code.svg';
import mailIcon from '../../assets/icons/mail.svg';
import terminalIcon from '../../assets/icons/terminal.svg';
import browserIcon from '../../assets/icons/browser.svg';

// Power Action Screens Component
const PowerScreen = ({ action, onWakeUp }) => {
  if (action === 'shutdown') {
    return (
      <div 
        className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center cursor-pointer animate-fadeIn"
        onClick={onWakeUp}
      >
        <div className="text-white/60 text-lg mb-4">Click anywhere to power on</div>
        <div className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-white/50">
            <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
          </svg>
        </div>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
          }
        `}</style>
      </div>
    );
  }

  if (action === 'restart') {
    return (
      <div className="fixed inset-0 bg-[#0078d4] z-[9999] flex flex-col items-center justify-center animate-fadeIn">
        <div className="relative mb-8">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
        <div className="text-white text-xl mb-2">Restarting...</div>
        <div className="text-white/70 text-sm">Please wait</div>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>
      </div>
    );
  }

  if (action === 'sleep') {
    return (
      <div 
        className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center cursor-pointer animate-fadeIn"
        onClick={onWakeUp}
      >
        <div className="text-white/40 text-6xl mb-6 animate-pulse">💤</div>
        <div className="text-white/50 text-lg">Click anywhere to wake up</div>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out;
          }
        `}</style>
      </div>
    );
  }

  return null;
};

const Desktop = () => {
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [windowOrder, setWindowOrder] = useState([]);
  const [powerAction, setPowerAction] = useState(null);
  const [isBooting, setIsBooting] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false);
  const { showContextMenu, ContextMenuComponent } = useContextMenu();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't handle shortcuts when in lock/boot screen
      if (isBooting || isLocked) return;
      
      // Win key (or Escape) - Toggle Start Menu
      if (e.key === 'Meta' || (e.key === 'Escape' && startMenuOpen)) {
        e.preventDefault();
        setStartMenuOpen(prev => !prev);
        return;
      }
      
      // Alt+F4 - Close active window
      if (e.altKey && e.key === 'F4' && activeWindowId) {
        e.preventDefault();
        closeWindow(activeWindowId);
        return;
      }
      
      // Win+D - Show/hide desktop (minimize all)
      if (e.metaKey && e.key === 'd') {
        e.preventDefault();
        const allMinimized = windows.every(w => w.minimized);
        setWindows(prev => prev.map(w => ({ ...w, minimized: !allMinimized })));
        return;
      }
      
      // Win+L - Lock screen
      if (e.metaKey && e.key === 'l') {
        e.preventDefault();
        setIsLocked(true);
        return;
      }
      
      // Ctrl+Shift+Esc - Open Terminal
      if (e.ctrlKey && e.shiftKey && e.key === 'Escape') {
        e.preventDefault();
        const terminalIcon = desktopIcons.find(i => i.id === 'terminal');
        if (terminalIcon) openWindow(terminalIcon);
        return;
      }
      
      // Win+E - Open Projects (like File Explorer)
      if (e.metaKey && e.key === 'e') {
        e.preventDefault();
        const projectsIcon = desktopIcons.find(i => i.id === 'projects');
        if (projectsIcon) openWindow(projectsIcon);
        return;
      }
      
      // Win+I - Open About (like Settings)
      if (e.metaKey && e.key === 'i') {
        e.preventDefault();
        const aboutIcon = desktopIcons.find(i => i.id === 'about');
        if (aboutIcon) openWindow(aboutIcon);
        return;
      }
      
      // Win+N - Toggle Notification Center
      if (e.metaKey && e.key === 'n') {
        e.preventDefault();
        setNotificationCenterOpen(prev => !prev);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBooting, isLocked, startMenuOpen, activeWindowId, windows]);

  // Play startup sound when boot completes
  const handleBootComplete = () => {
    setIsBooting(false);
    setIsLocked(true);
    soundManager.playStartup();
  };

  const handleUnlock = () => {
    setIsLocked(false);
  };

  // Desktop context menu items
  const desktopContextMenuItems = [
    { 
      label: 'View', 
      icon: '👁️',
      action: 'view',
      disabled: true,
    },
    { 
      label: 'Sort by', 
      icon: '📊',
      action: 'sort',
      disabled: true,
    },
    { 
      label: 'Refresh', 
      icon: '🔄',
      action: 'refresh',
    },
    { separator: true },
    { 
      label: 'New folder', 
      icon: '📁',
      action: 'new-folder',
      disabled: true,
    },
    { separator: true },
    { 
      label: 'Display settings', 
      icon: '🖥️',
      action: 'display-settings',
      disabled: true,
    },
    { 
      label: 'Personalize', 
      icon: '🎨',
      action: 'personalize',
      disabled: true,
    },
  ];

  const handleContextMenuAction = (action) => {
    switch (action) {
      case 'refresh':
        window.location.reload();
        break;
      default:
        break;
    }
  };

  const handleDesktopContextMenu = (e) => {
    showContextMenu(e, desktopContextMenuItems, handleContextMenuAction);
  };

  const desktopIcons = [
    { id: 'about', title: 'About Me', icon: userIcon, component: 'about' },
    { id: 'projects', title: 'Projects', icon: folderIcon, component: 'projects' },
    { id: 'skills', title: 'Skills', icon: codeIcon, component: 'skills' },
    { id: 'contact', title: 'Contact', icon: mailIcon, component: 'contact' },
    { id: 'terminal', title: 'Terminal', icon: terminalIcon, component: 'terminal' },
    { id: 'resume', title: 'Resume', icon: browserIcon, component: 'resume' },
  ];

  // All windows open centered on screen
  const getCenteredPosition = () => {
    const windowWidth = 700;
    const windowHeight = 450;
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight - 48 : 1080; // minus taskbar
    return {
      x: Math.max(50, (screenWidth - windowWidth) / 2),
      y: Math.max(30, (screenHeight - windowHeight) / 2)
    };
  };

  const openWindow = (iconData) => {
    const existingWindow = windows.find(w => w.id === iconData.id);
    
    if (existingWindow) {
      bringToFront(iconData.id);
      if (existingWindow.minimized) {
        setWindows(prev => prev.map(w => 
          w.id === iconData.id ? { ...w, minimized: false } : w
        ));
      }
      return;
    }

    // Center the window on screen
    const position = getCenteredPosition();

    const newWindow = {
      id: iconData.id,
      title: iconData.title,
      icon: iconData.icon,
      isEmoji: iconData.isEmoji,
      component: iconData.component,
      position: position,
      size: { width: 700, height: 450 },
      minimized: false,
      maximized: false,
    };

    soundManager.playWindowOpen();
    setWindows(prev => [...prev, newWindow]);
    setWindowOrder(prev => [...prev, iconData.id]);
    setActiveWindowId(iconData.id);
  };

  const closeWindow = (id) => {
    soundManager.playWindowClose();
    setWindows(prev => prev.filter(w => w.id !== id));
    setWindowOrder(prev => prev.filter(wId => wId !== id));
    if (activeWindowId === id) {
      const remaining = windowOrder.filter(wId => wId !== id);
      setActiveWindowId(remaining[remaining.length - 1] || null);
    }
  };

  const minimizeWindow = (id) => {
    soundManager.playMinimize();
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, minimized: true } : w
    ));
    const remaining = windowOrder.filter(wId => {
      const win = windows.find(w => w.id === wId);
      return wId !== id && win && !win.minimized;
    });
    setActiveWindowId(remaining[remaining.length - 1] || null);
  };

  const maximizeWindow = (id) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, maximized: !w.maximized, snapPosition: null } : w
    ));
  };

  const snapWindow = (id, position) => {
    setWindows(prev => prev.map(w => {
      if (w.id !== id) return w;
      
      if (position === 'top') {
        // Maximize
        return { ...w, maximized: true, snapPosition: null };
      }
      
      // Snap left or right
      return { ...w, snapPosition: position, maximized: false };
    }));
  };

  const bringToFront = (id) => {
    setWindowOrder(prev => [...prev.filter(wId => wId !== id), id]);
    setActiveWindowId(id);
  };

  const updateWindowPosition = (id, position) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, position, snapPosition: null } : w
    ));
  };

  const updateWindowSize = (id, size) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, size } : w
    ));
  };

  const toggleStartMenu = () => {
    setStartMenuOpen(prev => !prev);
  };

  const handleDesktopClick = () => {
    setStartMenuOpen(false);
    setNotificationCenterOpen(false);
  };

  // Show boot screen
  if (isBooting) {
    return <BootScreen onBootComplete={handleBootComplete} />;
  }

  // Show lock screen
  if (isLocked) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  return (
    <div 
      className="w-screen h-screen bg-cover bg-center relative overflow-hidden select-none"
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('/profile.jpg')`,
        backgroundColor: '#0c0c0c',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
      onClick={handleDesktopClick}
      onContextMenu={handleDesktopContextMenu}
    >
      {/* Desktop Icons */}
      <div className="flex flex-col flex-wrap content-start gap-2 p-4 h-[calc(100vh-48px)]">
        {desktopIcons.map((icon, index) => (
          <DesktopIcon
            key={icon.id}
            icon={icon}
            onDoubleClick={() => openWindow(icon)}
            index={index}
          />
        ))}
      </div>

      {/* Windows */}
      {windows.map(window => (
        <Window
          key={window.id}
          windowData={window}
          isActive={activeWindowId === window.id}
          zIndex={windowOrder.indexOf(window.id)}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
          onFocus={() => bringToFront(window.id)}
          onPositionChange={(pos) => updateWindowPosition(window.id, pos)}
          onSizeChange={(size) => updateWindowSize(window.id, size)}
          onSnap={(position) => snapWindow(window.id, position)}
        />
      ))}

      {/* Start Menu */}
      <StartMenu 
        isOpen={startMenuOpen} 
        onClose={() => setStartMenuOpen(false)}
        onOpenApp={openWindow}
        apps={desktopIcons}
        onPowerAction={(action) => {
          setStartMenuOpen(false);
          setPowerAction(action);
          // Auto wake up after 3 seconds for restart
          if (action === 'restart') {
            setTimeout(() => setPowerAction(null), 3000);
          }
        }}
      />

      {/* Power Screen */}
      <PowerScreen action={powerAction} onWakeUp={() => setPowerAction(null)} />

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        onWindowClick={(id) => {
          const win = windows.find(w => w.id === id);
          if (win?.minimized) {
            setWindows(prev => prev.map(w => 
              w.id === id ? { ...w, minimized: false } : w
            ));
          }
          bringToFront(id);
        }}
        onStartClick={(e) => {
          e.stopPropagation();
          toggleStartMenu();
        }}
        startMenuOpen={startMenuOpen}
        onNotificationClick={(e) => {
          e.stopPropagation();
          setNotificationCenterOpen(prev => !prev);
        }}
        notificationCenterOpen={notificationCenterOpen}
      />

      {/* Notification Center */}
      <NotificationCenter 
        isOpen={notificationCenterOpen} 
        onClose={() => setNotificationCenterOpen(false)} 
      />

      {/* Context Menu */}
      {ContextMenuComponent}
    </div>
  );
};

export default Desktop;
